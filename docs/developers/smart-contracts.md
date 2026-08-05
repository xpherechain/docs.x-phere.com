---
title: Smart Contracts
description: Develop, test, deploy, and verify Solidity smart contracts on XPHERE with Hardhat, Foundry, and Remix.
lang: en
sidebar_position: 3
---

# Smart Contracts

XPHERE is **fully EVM-compatible at the Cancun upgrade level**. Any contract that compiles for Ethereum mainnet runs on XPHERE without modification.

## Toolchains

### Hardhat
Recommended for most TypeScript-based teams. See the [Quickstart](./quickstart) for a complete walkthrough.

### Foundry
```bash
# foundry.toml
[rpc_endpoints]
xphere_mainnet = "https://en-hkg.x-phere.com"
xphere_testnet = "https://testnet.x-phere.com"
```

Deploy with:
```bash
forge create Counter --rpc-url xphere_testnet --private-key $PRIVATE_KEY
```

For Mainnet source verification, point Foundry at XPScan — see
[Verifying Contracts](#verifying-contracts).

### Remix (Browser)
1. Open [remix.ethereum.org](https://remix.ethereum.org)
2. Compile with Solidity ≥ 0.8.20
3. **Deploy & Run** → Environment → **Injected Provider - MetaMask**
4. Switch MetaMask to XPHERE (see [Wallet Setup](./wallet-setup))
5. Click Deploy

## Gas Pricing

| Field | Value | Notes |
|-------|-------|-------|
| `baseFeePerGas` | Dynamic (EIP-1559) | Adjusts every block based on network demand |
| Priority fee (tip) | **`0`** | `eth_maxPriorityFeePerGas` returns `0x0` on both networks — transactions are included with a zero tip. No minimum is enforced |
| Block gas limit | **`0xe8d4a50fff`** (999,999,999,999) | Read from `eth_getBlockByNumber`. Far above Ethereum's 30M |
| `dgp.gastarget` | `30,000,000` | The EIP-1559 gas *target* used for base-fee adjustment — not the block limit |

Confirm either value yourself:

```bash
curl -s -X POST https://en-hkg.x-phere.com -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"0x0"}
```

Estimate gas before submitting:

```ts
const estimated = await contract.increment.estimateGas();
const tx = await contract.increment({ gasLimit: estimated * 12n / 10n }); // +20% buffer
```

## Verifying Contracts

XPScan exposes an **Etherscan-compatible verification API**, so `npx hardhat verify` and
`forge verify-contract` both work on XPHERE Mainnet. The API and the flow below were run end to end
against a contract deployed on Mainnet before being documented here.

### Hardhat

Add XPScan as a custom chain in `hardhat.config.ts`:

```ts
etherscan: {
  apiKey: { xphereMainnet: "any" },
  customChains: [{
    network: "xphereMainnet",
    chainId: 20250217,
    urls: {
      apiURL: "https://xpscan.io/api",
      browserURL: "https://xpscan.io",
    },
  }],
}
```

No API key is issued or needed — the parameter is accepted and ignored, so any string works.

Verify after deploying, passing the constructor arguments in declaration order:

```bash
npx hardhat verify --network xphereMainnet 0xYourContract "constructorArg"
```

```
Successfully submitted source code for contract
contracts/Counter.sol:Counter at 0xYourContract
for verification on the block explorer. Waiting for verification result...

Successfully verified contract Counter on the block explorer.
https://xpscan.io/address/0xYourContract#code
```

:::note A deprecation warning is expected
hardhat-verify prints a warning about network-specific API keys and the Etherscan v2 API. XPScan
implements the v1 request format, which is what custom chains use, so the warning is harmless and
verification succeeds.
:::

### Foundry

```bash
forge verify-contract 0xYourContract src/Counter.sol:Counter \
  --chain-id 20250217 \
  --verifier-url https://xpscan.io/api \
  --etherscan-api-key any
```

### How it behaves

- **Verification is asynchronous.** Submission returns a GUID immediately and the result is polled.
  Compilation runs server-side, and the compiler is fetched on demand if that build has not been
  used before, so a first submission for an unusual compiler version takes longer.
- **Re-submitting a verified address returns** `Contract source code already verified`.
- **`solidity-single-file` submissions do not populate the ABI.** That path does not extract one, so
  `getabi` returns nothing for contracts verified that way. Verify with standard-JSON input — which
  is what `hardhat verify` sends — if you need the ABI to be queryable.
- **The compiler version must include the commit hash.** `v0.8.24` is rejected; `v0.8.24+commit.e11b9ed9`
  is accepted. Bytecode cannot be reproduced without the exact build.

### Checking a contract from the API

```bash
# ABI of a verified contract
curl "https://xpscan.io/api?module=contract&action=getabi&address=0xYourContract"

# Full verification record — source, compiler, optimizer, constructor args
curl "https://xpscan.io/api?module=contract&action=getsourcecode&address=0xYourContract"
```

An unverified address returns `{"status":"0","message":"NOTOK","result":"Contract source code not verified"}`.

### Manual verification

For contracts deployed without a local build — or from Remix — the web form at
**[xpscan.io/verify](https://xpscan.io/verify)** does the same job by hand.

The submitted source must reproduce the deployed bytecode exactly, using the compiler settings used
at deployment:

| Field | Required | What to supply |
|-------|----------|----------------|
| Contract address | Yes | The deployed address |
| Contract name | No | The Solidity contract name, e.g. `Counter` |
| Compiler version | Yes | Picked from a dropdown of exact builds |
| License | Yes | `MIT`, `Apache-2.0`, `GPL-3.0`, and the other SPDX options |
| Optimization | Yes | `On` or `Off` — must match the compile-time setting |
| Solidity source code | Yes | The full source, in a single field |
| ABI-encoded constructor arguments | Only if the constructor takes arguments | The encoded argument blob |

The form accepts **one source field**, so a multi-file project has to be flattened first
(`npx hardhat flatten` or `forge flatten`). The CLI path above has no such limitation.

### Testnet

XPScan serves Mainnet only — its footer reports Chain ID `20250217`, and no testnet instance is
published. Testnet contracts are verified through the Tamsa testnet explorer's form at
[xpt.tamsa.io/main/verifyContract](https://xpt.tamsa.io/main/verifyContract); there is no
Etherscan-compatible API for testnet, so CLI verification is Mainnet-only.


## Pre-deployed Standards

Battle-tested OpenZeppelin contracts are not auto-deployed — install via npm and inherit:

```bash
npm install @openzeppelin/contracts
```

```solidity
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}
```

## Common Patterns

### Reading on-chain state from a backend
```ts
import { createPublicClient, http } from "viem";
import { xphere } from "./chains";

const client = createPublicClient({ chain: xphere, transport: http() });
const count = await client.readContract({
  address: "0x...",
  abi: counterAbi,
  functionName: "count",
});
```

### Subscribing to events (WebSocket)
```ts
import { createPublicClient, webSocket } from "viem";

const client = createPublicClient({
  chain: xphere,
  transport: webSocket("wss://en-hkg.x-phere.com/ws"),
});

client.watchContractEvent({
  address: "0x...",
  abi: counterAbi,
  eventName: "Incremented",
  onLogs: (logs) => console.log(logs),
});
```

## Limitations

See [EVM Compatibility](./evm-compatibility) for the full opcode and precompile matrix.

## See Also

- [XPScan contract verification form](https://xpscan.io/verify)
- [JavaScript API libraries](/references/javascript-api)
- [JSON-RPC Reference](/references/json-rpc)
- [Network Info](/references/network-info)
