---
title: Ecosystem Directory
description: A directory of projects, infrastructure, and services in the XPHERE ecosystem. Listing a third party is informational only and is not an endorsement by the Foundation.
lang: en
sidebar_position: 2
---

# Ecosystem Directory

This page lists projects, infrastructure, and services that operate on or serve the **XPHERE** network — explorers, wallets, staking, RPC infrastructure, and the applications built on top of them.

:::caution Listing is not an endorsement
Only some entries below are operated by the XPHERE Foundation: the XPScan explorer, the XP Union Vault staking portal, and the official `x-phere.com` RPC endpoints. The authoritative record of what the Foundation operates is the verified properties list in [Security](/resources/security).

ZIGAP is an **official XPHERE partner** wallet, operated by its own team rather than by the Foundation. Every other entry — the Tamsa Explorer and the Ankr RPC endpoint among them — is a **third party**.

Listing a partner or third party is **informational only**. It is **not** an endorsement, a security audit, a due-diligence result, or a guarantee of any kind by the XPHERE Foundation. The Foundation does not review the code, custody arrangements, or business practices of the parties listed here, and does not accept liability for their use.

**Do your own research** before connecting a wallet, signing a transaction, or depositing funds — for Foundation-operated services as well as third-party ones. Always confirm a project's domain against its own official channels before entering credentials, and never share a seed phrase or private key with anyone.
:::

This directory lists services the Foundation can currently link to. It is not exhaustive. Categories with no entries yet are listed anyway, so the structure is visible and the gaps are obvious.

## Explorers

Block explorers let you inspect blocks, transactions, addresses, and validator state without running a node.

| Project | Network | What it does | Link |
|---------|---------|--------------|------|
| XPScan | Mainnet | Official XPHERE block explorer — blocks, transactions, addresses, the Union validator list, and a web form for [contract verification](https://xpscan.io/verify) | [xpscan.io](https://xpscan.io) |
| Tamsa Explorer | Mainnet | Explorer with a public read API for network and Union data | [xp.tamsa.io](https://xp.tamsa.io) |
| Tamsa Testnet Explorer | Testnet | The Testnet instance — Chain ID `1998991`, native token `XPT` | [xpt.tamsa.io](https://xpt.tamsa.io) |

:::note Testnet goes to xpt.tamsa.io
XPScan publishes Mainnet data — its own footer states `Chain ID: 20250217` — and no XPScan testnet instance is published, so a Testnet transaction will not resolve there. Network identifiers for both environments are listed in [Network Info](/references/network-info).
:::

## Wallets

| Project | What it does | Link |
|---------|--------------|------|
| ZIGAP | Official XPHERE partner wallet with built-in network support — no manual network configuration required | [about.zigap.io](https://about.zigap.io) |

XPHERE is EVM-compatible, so wallets that support custom EVM networks — MetaMask, Rabby, and WalletConnect-compatible wallets among them — can be pointed at XPHERE manually. Configuration values and step-by-step instructions are in [Wallet Setup](/developers/wallet-setup).

## Staking

| Project | What it does | Link |
|---------|--------------|------|
| XP Union Vault | Non-custodial staking vault operated by the Foundation; pays stakers from the Union node's real earnings and burns the remainder | [stake.x-phere.com](https://stake.x-phere.com) |

Parameters, contract addresses, risks, and the settlement model are documented in [XP Staking (Union Vault)](/staking/overview). Contract addresses can be verified independently on [XPScan](https://xpscan.io).

## Infrastructure / RPC

| Project | What it does | Link |
|---------|--------------|------|
| XPHERE Foundation | Official public JSON-RPC endpoints for Mainnet. `rpc` is load balanced across regions and is the one to use in production; the other two address single nodes | `https://rpc.x-phere.com` · `https://en-hkg.x-phere.com` · `https://en-bkk.x-phere.com` |
| [Ankr](https://www.ankr.com/rpc/xphere/) | Global RPC provider serving **both Mainnet and Testnet**; XPHERE is listed in Ankr's public chain directory, and Ankr also runs a [Union](/union) validator slot | `https://rpc.ankr.com/xphere_mainnet` · `https://rpc.ankr.com/xphere_testnet` |

Testnet endpoints, WebSocket URLs, namespaces, and rate-limit caveats are covered in [Public JSON-RPC Endpoints](/references/public-en).

You can confirm any endpoint yourself before relying on it:

```bash
curl -X POST https://rpc.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```

A Mainnet endpoint returns the Mainnet chain ID `20250217` (hex `0x134fe69`).

:::note
Ankr also operates a Union validator slot. The authoritative, live membership list is on-chain — see [Union Members](/union/members).
:::

## Mining Pools

| Project | What it does | Link |
|---------|--------------|------|
| [XP Pool](https://xppool.io) | xpHash mining pool serving Mainnet and Testnet over Stratum | `stratum+tcp://xphash.xppool.io:3333` · `stratum+tcp://testnet-xphash.xppool.io:3333` |

This is currently the **only** mining pool operating on XPHERE. Setup instructions, its published fee and payout terms, and what that concentration means are covered in [Mining → Getting Started](/mining/getting-started).

## Union Members

Union members are the network's validators. Because membership changes as slots are registered, this directory does **not** duplicate the list.

- **Current members and slot counts:** [Union Members](/union/members)
- **Verify on-chain:** [xpscan.io/unions](https://xpscan.io/unions), [xp.tamsa.io/main/unions](https://xp.tamsa.io/main/unions), or the API at `https://api.tamsa.io/api/v1/unions?page=1&count=100`

## DeFi

No entries are listed yet. Protocols that are live on XPHERE Mainnet and publicly reachable will be added here as they are submitted and confirmed.

## Applications & dApps

No entries are listed yet. This section will cover user-facing applications deployed on XPHERE Mainnet.

## Tooling & Developer Services

No entries are listed yet. This section will cover SDKs, indexers, node services, and other developer-facing tooling beyond the official references in [Developers](/developers/quickstart).

## Data & Analytics

No entries are listed yet. This section will cover analytics dashboards, data feeds, and market-data services covering XPHERE.

## Get Listed

If you are building on XPHERE, contact the Foundation at **[Contact@X-phere.com](mailto:Contact@X-phere.com)**. Teams looking for funding can also apply to the [Grant Program](./grants).

## See Also

- [Grant Program](./grants) — funding for builders on XPHERE
- [Union Members](/union/members) — the current validator set
- [XP Staking (Union Vault)](/staking/overview) — the Foundation's staking vault
- [Wallet Setup](/developers/wallet-setup) — connect any EVM wallet to XPHERE
- [Public JSON-RPC Endpoints](/references/public-en) — official and third-party RPC endpoints
