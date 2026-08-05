---
title: Node Guide
description: Overview of XPHERE network node types, including Endpoint Node (XEN), Validator Node, and Mining Node.
lang: en
---

# Node Guide

XPHERE is a Layer 1 blockchain with a **Dual-Chain Architecture**: the **Main Chain** runs an optimized PBFT consensus, while the **Proof Chain** secures the network through a **PoW (xpHash)** validation layer. Each chain is operated by a distinct set of nodes.

## Node Types

| Node Type | Chain | Role | Audience |
|-----------|-------|------|----------|
| **Endpoint Node (XEN)** | Main Chain | Read-only interface, JSON-RPC server, transaction relay | dApp developers, RPC providers |
| **Validator Node** | Main Chain | PBFT consensus participation, block production | [Union members](/union) (permissioned) |
| **Mining Node** | Proof Chain | xpHash PoW mining, block validation reward | Anyone with mining hardware |

## Quick Links

### Endpoint Node (XEN)
- [Overview](./Xphere-Endpoint-Node)
- [System Requirements](./requirements)
- [Install Guide](./Install-XEN-Guide)
- [CLI Commands](./xen-cli-commands)
- [JSON-RPC APIs](./json-RPC-APIs)
- [Use Chaindata Snapshots](./Use-Chaindata-Snapshots)
- [Downloads](/nodes/downloads)

### Validator Node
- [Validator Node Guide](./validator-node)

### Mining Node
- [Mining Overview](/mining)
- [Getting Started](/mining/getting-started)
- [xpHash Hard Fork](/mining/xphash-fork)

## Which Node Should I Run?

- **Building a dApp?** → Run an **Endpoint Node** or use a [public RPC endpoint](/references/public-en).
- **Want to secure the network and earn rewards?** → Run a **Mining Node**.
- **Holding XP but not running anything?** → Stake in the **[XP Union Vault](/staking/overview)** at [stake.x-phere.com](https://stake.x-phere.com) — no node required.
- **Operating institutional infrastructure?** → Apply for **[XPHERE Union](/union)** membership, then provision and run a **[Validator Node](./validator-node)**.
