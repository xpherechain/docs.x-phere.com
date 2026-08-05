---
title: FAQ
description: Frequently asked questions about XPHERE — network, wallets, mining, staking, the Union, development, and the ecosystem.
lang: en
sidebar_position: 1
---

# Frequently Asked Questions

## General

### What is XPHERE?
XPHERE is a Layer 1 blockchain with a **Dual-Chain Architecture**: a Main Chain running optimized PBFT consensus (1-second finality), and a Proof Chain securing the network via PoW (xpHash). See the [Whitepaper](/whitepaper).

### Is XPHERE EVM-compatible?
Yes. XPHERE targets **Cancun-level EVM equivalence**. Any contract that compiles for Ethereum mainnet runs on XPHERE without modification. See [EVM Compatibility](/developers/evm-compatibility).

### What is the native token?
On Mainnet it is **`XP`**, with 18 decimals — used for gas, staking, and protocol governance.
On Testnet the native token is **`XPT`**, also 18 decimals. XPT has no monetary value and cannot be moved to Mainnet.

### What are the Chain IDs?

| Network | Decimal | Hex | Native symbol | Explorer |
|---------|---------|-----|---------------|----------|
| Mainnet | `20250217` | `0x134fe69` | `XP` | [xpscan.io](https://xpscan.io), [xp.tamsa.io](https://xp.tamsa.io) |
| Testnet | `1998991` | `0x1e808f` | `XPT` | [xpt.tamsa.io](https://xpt.tamsa.io) |

Check either against the live node:

```bash
curl -s -X POST https://testnet.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"0x1e808f"}
```

See [Network Info](/references/network-info) for the full parameter list.

### Does XPScan show Testnet?
No. XPScan publishes **Mainnet** data — its own footer states `Chain ID: 20250217` — and no XPScan testnet instance is published. For Testnet, use the Tamsa Testnet Explorer at [xpt.tamsa.io](https://xpt.tamsa.io).

## Wallets

### Which wallets support XPHERE?
Any EVM-compatible wallet (MetaMask, Rabby, Trust Wallet, etc.) plus the native [Zigap](https://about.zigap.io) wallet. See [Wallet Setup](/developers/wallet-setup).

### How do I get testnet tokens?
Testnet tokens are **XPT**, not XP. Request them from the [faucet](https://faucet.x-phere.com): **10 XPT per address, once every 24 hours**, free. Add the Testnet first (Chain ID `1998991` / `0x1e808f`, symbol `XPT`, RPC `https://testnet.x-phere.com`), then check the resulting balance on [xpt.tamsa.io](https://xpt.tamsa.io). See [Testnet Faucet](/faucet).

### How do I bridge from Ethereum?
There is no Foundation-operated bridge available yet, so there is currently no supported route for
moving assets from Ethereum to XPHERE. See [Bridge](./bridge) for what will be published when one
exists. To acquire XP today, use an exchange that lists it.

## Mining

### What hardware do I need?
An **IceRiver XP0** xpHash ASIC — the only hardware currently supported for live mining. The legacy CPU software miner is **deprecated** and cannot produce valid xpHash blocks. See [Mining](/mining) and [System Requirements](/mining/requirements).

### What's the xpHash hard fork?
A consensus upgrade to the Proof Chain PoW algorithm, **already active** on both networks (mainnet block `1,740,000`, testnet block `327,400`). Mining now requires the IceRiver XP0 ASIC. See [xpHash Fork](/mining/xphash-fork).

### How are rewards calculated?
A reward is minted every 60 blocks and split **20% Foundation / 40% Miner / 40% Union**, and the emission reduces 26.28% per year. Transaction fees are distributed separately — see the next question. Worked figures are in [Mining Rewards](/mining/rewards).

### How are transaction fees split?
Transaction fees are **not** entirely burned. Every fee is split four ways:

| Recipient | Share |
|-----------|-------|
| Burn | **50%** |
| Union | **20%** |
| Miner | **20%** |
| Foundation | **10%** |

The 50% burn is the figure most often quoted (see [Tokenomics](./tokenomics)); the other half is distributed to the Union, the miner, and the Foundation. Miners therefore earn from network *usage* as well as from block issuance — see [Mining Rewards](/mining/rewards) and [XPHERE Union](/union).

## Staking

### Where do I stake XP?
In the **XP Union Vault** at **[stake.x-phere.com](https://stake.x-phere.com)** — the Foundation's non-custodial staking vault. See [XP Staking (Union Vault)](/staking/overview).

### Where does the yield come from?
From validator rewards the Foundation's **Union node actually earned** — not from new issuance. Each day, `60% × (staked ÷ cap)` of the inflow goes to stakers and **everything else is burned**. See [How It Works](/staking/how-it-works).

### Do I need to run a node or hold 35,000,000 XP?
No. That threshold applies to **Union validator membership**, which is permissioned and separate. The vault has no node and no membership requirement — see [Union Staking](./staking) for the difference.

### What does it cost, and how do I withdraw?
**0% fees** — you pay gas only. Withdrawing is a **request → 7-day cooldown → claim** of **100% of your principal**. See [Fees & Risks](/staking/fees-and-risks).

### Is the APR guaranteed?
**No.** It varies with the node's earnings, and staking a smart contract carries risk. See [Fees & Risks](/staking/fees-and-risks).

### How do I avoid staking scams?
Only ever stake at `https://stake.x-phere.com`, and check contract addresses against [Contracts & Verification](/staking/contracts). The Foundation never asks for seed phrases or private keys and never DMs first. Ignore any "guaranteed APR" offer not published on the portal or the [official channels](#community).

## Union

### What is the XPHERE Union?
The **XPHERE Union** is the network's core validator group. Members validate the blocks produced on the Proof Chain and record them on the Main Chain, take part in governance, and manage reward distribution. The Union receives **40% of every minted block reward** and **20% of transaction fees**. See [XPHERE Union](/union).

### How do I join the Union?
Membership is **permissioned**: each slot requires a **35,000,000 XP** stake and is admitted by the Foundation after evaluation. Registration runs in five steps — apply with an initial **1,000,000 XP** stake, evaluation by the Foundation and existing members, stake the remaining **34,000,000 XP** to complete registration, initial technical support from the Foundation, then ongoing stable operation. Enquiries go to [Contact@X-phere.com](mailto:Contact@X-phere.com). See [XPHERE Union](/union).

### How many Union members are there?
Read on-chain on **2026-08-05**: **25 active slots** against a target of **31**, held by 12 members, with exactly 35,000,000 XP staked per slot. Slot counts change — check the current state on the [Tamsa Explorer](https://xp.tamsa.io/main/unions), [XPScan](https://xpscan.io/unions), or the public API `https://api.tamsa.io/api/v1/unions?page=1&count=100`. See [Members](/union/members).

## Development

### Where do I start as a developer?
[Developer Quickstart](/developers/quickstart) — deploys your first contract in 10 minutes.

### Does Hardhat work?
Yes. Just add XPHERE as a network in `hardhat.config.ts`. See [Smart Contracts](/developers/smart-contracts).

### Is there a public RPC?
Yes — see [Public RPC Endpoints](/references/public-en). For production, run your own [Endpoint Node](/nodes/Install-XEN-Guide).

### Can I subscribe to events via WebSocket?
Yes. `wss://en-hkg.x-phere.com/ws` (mainnet) and `wss://testnet.x-phere.com/ws/` (testnet — note the trailing slash; the path without it answers `301` to `/ws/`, which not every WebSocket client follows).

## Ecosystem

### Is there a grant program?
Yes — the **XPHERE Grant Program** supports builders, developers, and teams launching dApps, building infrastructure, or growing the community. Applications are reviewed on a **rolling basis**, and selected applicants are contacted within **14 business days**. Grant amounts, tiers, and milestone structures have **not** been published. See [Grant Program](/ecosystem/grants).

## Nodes

### What's the difference between Endpoint Node, Validator Node, and Mining Node?
- **Endpoint Node (XEN)** — Read-only JSON-RPC interface. Anyone can run one.
- **Validator Node** — Main Chain PBFT consensus participant. Permissioned: run by admitted [Union](/union) members.
- **Mining Node** — Proof Chain miner, running the IceRiver XP0 xpHash ASIC. Anyone can run one for rewards.

See [Node Guide](/nodes).

### Do I need to re-sync after the xpHash fork?
No. The fork is in-place; existing chaindata remains valid. See [xpHash Fork — Node Operators](/mining/xphash-fork).

### How are network upgrades announced?
Upgrades activate at a **deterministic block height**, announced on the official channels — Telegram, X, Discord, and GitHub releases — and reflected in these docs. The Foundation has not published a fixed advance-notice period or upgrade calendar, so act on the announcement itself rather than an assumed notice window. See [Network Upgrades](./network-upgrades).

## Security

### Has XPHERE been audited?
Yes. The Main Chain client (`xchain`, the Layer 1 protocol implementation in Golang) was audited by **Hacken** and completed on **3 March 2025**, with 3 findings. The record is published on Hacken's own site at [hacken.io/audits/xphere](https://hacken.io/audits/xphere/), so it can be verified independently. See [Security → Audits](/resources/security#audits) for scope and limitations.

### How do I report a vulnerability?
Email `security@x-phere.com` with the subject `[SECURITY]`. Do **not** open a public GitHub issue or post publicly before a fix exists. See [Security](./security) for scope, what to include, and the list of verified official domains and contract addresses.

## Community

- Telegram: [t.me/Xphere_official](https://t.me/Xphere_official)
- X / Twitter: [x.com/Xphere_official](https://x.com/Xphere_official)
- Discord: [discord.gg/xphere](https://discord.gg/xphere)
- GitHub: [github.com/xpherechain](https://github.com/xpherechain)
