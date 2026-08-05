---
title: References
description: Index of technical references for dApp developers building on XPHERE — network parameters, RPC endpoints, SDKs, and protocol specifications.
lang: en
---

# References

This section is the single source of truth for **machine-readable** information about XPHERE. If you are integrating XPHERE into a wallet, indexer, SDK, or backend service, start here.

## Network Parameters
- [**Network Info**](./network-info) — Chain IDs, native token, RPC endpoints, explorer URLs, block time.
- [**Public RPC Endpoints**](./public-en) — Free public JSON-RPC providers with rate limits.

## Protocol APIs
- [**JSON-RPC Reference**](./json-rpc) — Ethereum-compatible `eth_*` and `net_*` methods.
- [**XPHERE-Specific RPC**](./xphere-rpc) — `xp_*` namespace methods unique to XPHERE (Council, Committee, dual-chain state).

## Indexed Data
- [**Explorer API**](./explorer-api) — XPScan's REST API for indexed data: supply, rankings, daily aggregates, token lists, search.

## Client Libraries
- [**JavaScript API**](./javascript-api) — ethers.js, web3.js, viem usage with XPHERE.

## Specifications (External)
- [**Whitepaper**](/whitepaper) — Dual-chain architecture, consensus, economic model.
- [**xpHash Algorithm**](/mining/xphash-fork) — Proof Chain PoW specification and fork activation.
- [**GitHub**](https://github.com/xpherechain) — Reference client source code.

## For Different Audiences

| If you are… | Start here |
|-------------|------------|
| A dApp frontend developer | [JavaScript API](./javascript-api) + [Wallet Setup](/developers/wallet-setup) |
| A smart-contract engineer | [Smart Contracts](/developers/smart-contracts) + [EVM Compatibility](/developers/evm-compatibility) |
| An infra/RPC operator | [Public Endpoints](./public-en) + [Endpoint Node](/nodes/Xphere-Endpoint-Node) |
| A miner | [Mining Getting Started](/mining/getting-started) + [xpHash Fork](/mining/xphash-fork) |
| A researcher | [Whitepaper](/whitepaper) + [XPHERE-specific RPC](./xphere-rpc) |
