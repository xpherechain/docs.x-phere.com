---
title: Token Standards
description: Deploy ERC-20, ERC-721, and ERC-1155 tokens on XPHERE using OpenZeppelin contracts, Hardhat, and Foundry.
lang: en
sidebar_position: 5
---

# Token Standards

XPHERE targets **Ethereum Cancun-level EVM compatibility** (see [EVM Compatibility](./evm-compatibility)). Token standards are ordinary Solidity contracts with no host-chain dependencies, so the reference OpenZeppelin implementations of **ERC-20**, **ERC-721**, and **ERC-1155** compile and deploy on XPHERE **unchanged** — same source, same compiler settings, same addresses derivation rules.

This page assumes you already have a Hardhat or Foundry project pointed at the XPHERE networks. If not, set that up first with the [Quickstart](./quickstart) and [Smart Contracts](./smart-contracts) pages; the network names used below (`xphereTestnet`, `xphereMainnet`) are the ones defined there.

## Which Standards Work

| Standard | Use it for | OpenZeppelin base |
|----------|------------|-------------------|
| **ERC-20** | Fungible tokens — utility tokens, stable units of account, LP shares | `ERC20` |
| **ERC-721** | Non-fungible tokens — one-of-a-kind items, identity, deeds | `ERC721` |
| **ERC-1155** | Multi-token contracts — many fungible and non-fungible IDs in one contract, batch transfers | `ERC1155` |

Commonly used extensions (`ERC20Burnable`, `ERC20Permit`, `ERC20Capped`, `ERC721URIStorage`, `ERC721Enumerable`, `ERC1155Supply`) work the same way — they are pure Solidity and rely only on opcodes XPHERE supports.

:::note
Nothing is pre-deployed. XPHERE does not ship canonical token factories or registry contracts. You install the library and deploy your own contract, exactly as on Ethereum. See [Pre-deployed Standards](./smart-contracts#pre-deployed-standards).
:::

## Install the Library

```bash
npm install @openzeppelin/contracts
```

The examples below are written against **OpenZeppelin Contracts v5**, which requires `pragma solidity ^0.8.20` or later. The Hardhat config in the [Quickstart](./quickstart) pins `0.8.24`, which satisfies this.

## ERC-20

`contracts/MyToken.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("MyToken", "MTK")
        Ownable(initialOwner)
    {
        _mint(initialOwner, 1_000_000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
```

`decimals()` returns `18` unless you override it. That matches the native **XP** token, which also has 18 decimals — so helpers such as `ethers.parseEther` and `viem`'s `parseUnits(v, 18)` behave identically for your token and for native value transfers.

:::caution
In OpenZeppelin v5, `Ownable` takes an explicit `initialOwner` argument. A v4-era constructor that omits it will not compile.
:::

### Deploy

`scripts/deploy-token.ts`:

```ts
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const token = await ethers.deployContract("MyToken", [deployer.address]);
  await token.waitForDeployment();
  console.log("MyToken deployed to:", await token.getAddress());
}

main().catch((e) => { console.error(e); process.exit(1); });
```

```bash
npx hardhat run scripts/deploy-token.ts --network xphereTestnet
# > MyToken deployed to: 0xYour...Token
```

### Verify the Source

:::caution `npx hardhat verify` and `forge verify-contract` do not work on XPHERE
Both tools require an Etherscan-compatible verification API. XPHERE does not publish one — `https://xp.tamsa.io/api` and `https://xpt.tamsa.io/api` both return `404`, and XPScan exposes no Etherscan-style `/api?module=contract` route. Do not add an `etherscan` block to `hardhat.config.ts` for XPHERE; it will fail.
:::

Verification is done through **XPScan's web form at [xpscan.io/verify](https://xpscan.io/verify)**, which takes the contract address, contract name, compiler version, license, optimizer setting, Solidity source, and ABI-encoded constructor arguments. XPScan serves **Mainnet** (`Chain ID: 20250217`); no Testnet verification service is published, so plan to verify after the Mainnet deployment rather than on Testnet. Details are under [Verifying Contracts](./smart-contracts#verifying-contracts).

:::tip
After deployment, add the token to your wallet by contract address to confirm that `name`, `symbol`, and `decimals` read back correctly. See [Wallet Setup](./wallet-setup).
:::

## ERC-721

Use ERC-721 when every unit is distinct and ownership is tracked per token ID.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MyCollection is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("MyCollection", "MYC")
        Ownable(initialOwner)
    {}

    function safeMint(address to) external onlyOwner returns (uint256 tokenId) {
        tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://example.com/metadata/";
    }
}
```

Deploy and verify exactly as for ERC-20 — the constructor takes the same single `address` argument. Copy `scripts/deploy-token.ts` to `scripts/deploy-collection.ts` and change the contract name passed to `deployContract` from `"MyToken"` to `"MyCollection"`:

```bash
npx hardhat run scripts/deploy-collection.ts --network xphereTestnet
```

Source verification follows the same route as ERC-20 — the [XPScan web form](https://xpscan.io/verify), not `npx hardhat verify`.

## ERC-1155

Use ERC-1155 when one contract holds many token IDs — for example game items, tiered passes, or a mix of fungible and non-fungible supply — and you want batch mints and transfers in a single call.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MyItems is ERC1155, Ownable {
    constructor(address initialOwner)
        ERC1155("https://example.com/metadata/{id}.json")
        Ownable(initialOwner)
    {}

    function mint(address to, uint256 id, uint256 amount) external onlyOwner {
        _mint(to, id, amount, "");
    }

    function mintBatch(
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts
    ) external onlyOwner {
        _mintBatch(to, ids, amounts, "");
    }
}
```

Batch operations are where ERC-1155 pays off: one transaction, one signature, one set of base costs instead of *n*.

## XPHERE-Specific Considerations

The standards themselves need no changes. These network properties do affect token contracts that encode time, cost, or supply assumptions.

### 1-second blocks

XPHERE produces blocks at **~1 second**, against Ethereum's ~12 seconds ([EVM Compatibility → Differences](./evm-compatibility#differences-from-ethereum)). Two consequences for token contracts:

- **Block-count schedules elapse about twelve times faster.** Vesting, cliffs, cooldowns, or emission caps expressed in `block.number` deltas that were tuned for Ethereum will complete far sooner than intended. Convert them to timestamps, or recompute the block counts for a 1-second cadence.
- **Audit `block.timestamp` arithmetic.** Timestamp-based logic is generally portable, but any code that infers elapsed time from block height — or that assumes a minimum spacing between blocks — should be reviewed before deployment.

### Gas for batch operations

XPHERE does **not** enforce a minimum priority fee — `eth_maxPriorityFeePerGas` returns `0x0` on
both networks, and transactions are included with a zero tip (see
[Gas Pricing](./smart-contracts#gas-pricing)). You do not need to set a tip for a transaction to be
mined.

What does matter for minting scripts, airdrop batches, and relayers is the **gas limit**: estimate
it and add headroom rather than relying on a default, since a batch that grows past your estimate
reverts out of gas.

```ts
import { ethers } from "hardhat";

const estimated = await token.mint.estimateGas(recipient, amount);
const tx = await token.mint(recipient, amount, {
  gasLimit: (estimated * 12n) / 10n, // +20% buffer
});
await tx.wait();
```

Add a `maxPriorityFeePerGas` only when you want to bid above other transactions during congestion,
not because the network requires it.

### Decimals and wrapped XP

Native **XP** has **18 decimals**, so an ERC-20 that keeps the default `decimals()` shares the same unit scale. If your protocol needs an ERC-20 representation of native XP rather than the native asset itself, note that a wrapped XP (**WXP**) contract is already deployed on mainnet at `0x780E8c0443F6d702De0c72650648C7CAA591e8f0` — it is the wrapped asset used by the XP Union Vault. Addresses and how to check them yourself are listed under [Staking → Contracts & Verification](/staking/contracts).

:::caution Verify addresses before you integrate
Confirm any contract address against an official docs page or the explorer before wiring it into a deployment. Never trust an address pasted in a DM or an unofficial site.
:::

## Testing Path

Deploy to testnet first. Nothing about a token contract is cheaper to fix after mainnet deployment.

| Step | Network | Details |
|------|---------|---------|
| 1. Fund a dev wallet | Testnet — Chain ID `1998991` (`0x1e808f`) | Request **XPT** from the [Faucet](/faucet): 10 XPT per address per 24 h |
| 2. Deploy | Testnet | `--network xphereTestnet` |
| 3. Read the deployment | Testnet | On [xpt.tamsa.io](https://xpt.tamsa.io) — the Testnet explorer. Testnet transactions do **not** appear on XPScan |
| 4. Exercise the contract | Testnet | Mint, transfer, approve, batch — including the paths only an owner can call |
| 5. Deploy to production | Mainnet — Chain ID `20250217` (`0x134fe69`) | `--network xphereMainnet` |
| 6. Verify the source | Mainnet | Submit source and ABI through the [XPScan web form](https://xpscan.io/verify) |

Source verification happens at the Mainnet step, not the Testnet step: XPScan's verification form serves Mainnet, and no Testnet verification service is published.

Use a **disposable** private key for testnet work, and a separate key you control for mainnet. Full parameter list for both networks: [Network Information](/references/network-info).

## See Also

- [Smart Contracts](/developers/smart-contracts) — toolchains, gas pricing, verification, event subscriptions
- [EVM Compatibility](/developers/evm-compatibility) — opcode, precompile, and hard-fork matrix
- [Developer Quickstart](/developers/quickstart) — project scaffold and network configuration
- [Network Information](/references/network-info) — chain IDs, RPC endpoints, explorers
- [Testnet Faucet](/faucet) — 10 XPT per address per 24 h
