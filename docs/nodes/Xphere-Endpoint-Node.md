---
title: XPHERE Endpoint Node
description: What an Endpoint Node (XEN) does, who needs one, and what ships in the package.
lang: en
---

# XPHERE Endpoint Node

An **Endpoint Node** — XEN — is how an application reaches the XPHERE network. It holds a full copy
of the chain, answers queries locally, and relays the transactions you submit to its peers.

## Who needs one {#intended-audience}

You do **not** need to run a node to build on XPHERE. The
[public endpoints](/references/public-en) are enough to get started, and for many applications they
are enough permanently.

Run your own Endpoint Node when you want:

- **No shared rate limit** — public endpoints are shared infrastructure.
- **Namespaces the public endpoints do not serve** — `debug_*`, `admin_*`, and `personal_*` are not
  exposed publicly. See [JSON-RPC APIs](./json-RPC-APIs).
- **Independence** — your service keeps working if a third-party provider has an outage, and you are
  not trusting anyone else's view of the chain.
- **Archive or indexing workloads** — heavy historical queries that would be throttled elsewhere.

## What it does {#endpoint-node-overview}

- Synchronizes blockchain data from its peers.
- Validates every block it receives, rather than trusting what it is told.
- Answers state and history queries over JSON-RPC.
- Propagates the transactions it receives to the rest of the network, so they reach the
  [Union](/union) members who propose blocks.

An Endpoint Node does **not** propose or seal blocks. Block production is split between
[Union validators](/nodes/validator-node), which finalize on the Main Chain, and
[miners](/mining), who seal Proof Chain blocks.

## What ships in the package

| Interface | Purpose |
|-----------|---------|
| **JSON-RPC server** | Ethereum-compatible `eth_*` / `net_*` / `web3_*` plus the XPHERE-specific [`xp_*`](/references/xphere-rpc) namespace, over HTTP, WebSocket, and IPC |
| **Command-line interface** | `bin/xen` for node operation and account management, plus an interactive JavaScript console that attaches to a running node |

The published package is a single Linux x86-64 build. See [Requirements](./requirements) for what it
runs on.

## Next steps

1. [Requirements](./requirements) — hardware, OS, and disk sizing
2. [Install XEN](./Install-XEN-Guide) — download, configure, and start the node
3. [Chain Data Snapshots](./Use-Chaindata-Snapshots) — skip the initial sync
4. [CLI commands](./xen-cli-commands) — operating the node
5. [JSON-RPC APIs](./json-RPC-APIs) — exposing and securing the RPC interfaces
