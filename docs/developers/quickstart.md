---
title: Developer Quickstart
description: Build, deploy, and interact with a smart contract on XPHERE Testnet in about 10 minutes.
lang: en
sidebar_position: 1
---

# Developer Quickstart

This guide walks from an empty directory to a deployed, working contract on XPHERE Testnet in **about 10 minutes**.

Source verification runs on Mainnet — `npx hardhat verify` works against XPScan, but the testnet
explorer has no verification API. See [Source Verification](#6-source-verification) below.

## Prerequisites

- Node.js ≥ 18
- Wallet with **XP testnet** funds — get some at [faucet.x-phere.com](https://faucet.x-phere.com)
- Basic Solidity knowledge

## 1. Scaffold a Hardhat Project

```bash
mkdir my-xphere-dapp && cd my-xphere-dapp
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
# Select: Create a TypeScript project
```

## 2. Configure XPHERE Networks

Replace `hardhat.config.ts`:

```ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    xphereTestnet: {
      url: "https://testnet.x-phere.com",
      chainId: 1998991,
      accounts: [process.env.PRIVATE_KEY!],
    },
    xphereMainnet: {
      url: "https://rpc.x-phere.com",
      chainId: 20250217,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
```

:::tip Need a second endpoint?
[Ankr](https://www.ankr.com/rpc/xphere/) serves both XPHERE environments from its global
infrastructure, with no signup or API key — swap either `url` above for
`https://rpc.ankr.com/xphere_testnet` or `https://rpc.ankr.com/xphere_mainnet` if a Foundation
endpoint is slow or unreachable. See [Public JSON-RPC Endpoints](/references/public-en#ankr).
:::

Export your private key (use a **disposable** dev wallet):

```bash
export PRIVATE_KEY=0xabc...
```

## 3. Write a Contract

`contracts/Counter.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint256 public count;
    event Incremented(uint256 newValue);

    function increment() external {
        count += 1;
        emit Incremented(count);
    }
}
```

## 4. Deploy

`scripts/deploy.ts`:

```ts
import { ethers } from "hardhat";

async function main() {
  const counter = await ethers.deployContract("Counter");
  await counter.waitForDeployment();
  console.log("Counter deployed to:", await counter.getAddress());
}

main().catch((e) => { console.error(e); process.exit(1); });
```

Run:

```bash
npx hardhat run scripts/deploy.ts --network xphereTestnet
# > Counter deployed to: 0xYour...Address
```

## 5. Interact

```ts
const counter = await ethers.getContractAt("Counter", "0xYourAddress");
const tx = await counter.increment();
await tx.wait();
console.log("count:", (await counter.count()).toString());
```

## 6. Source Verification

`npx hardhat verify` works on XPHERE **Mainnet** through XPScan's Etherscan-compatible API. Add the
custom chain to `hardhat.config.ts`:

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

No API key is issued — any string is accepted. Then verify a Mainnet deployment, passing the
constructor arguments in declaration order:

```bash
npx hardhat verify --network xphereMainnet 0xYourContract "constructorArg"
```

```
Successfully verified contract Counter on the block explorer.
https://xpscan.io/address/0xYourContract#code
```

### Verifying the testnet contract you just deployed

XPScan serves Mainnet only, so the CLI path above does not cover testnet. Verify a testnet
deployment through the Tamsa testnet form at
[xpt.tamsa.io/main/verifyContract](https://xpt.tamsa.io/main/verifyContract), pasting the flattened
source.

The full procedure for both paths is in
[Smart Contracts → Verifying Contracts](./smart-contracts#verifying-contracts).

An unverified contract is still fully usable: the testnet explorer lists it at
`https://xpt.tamsa.io/address/<contract-address>`, and you can call it with the ABI your own build
produced, as in step 5.

## Next Steps

- [Smart Contracts (in-depth)](./smart-contracts)
- [EVM Compatibility Matrix](./evm-compatibility)
- [JSON-RPC Reference](/references/json-rpc)
- [XPHERE-specific RPC](/references/xphere-rpc)
