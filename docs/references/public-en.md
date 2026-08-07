---
title: Public JSON-RPC Endpoints
description: Public JSON-RPC endpoints for XPHERE mainnet and testnet, who operates them, and what to know before depending on one.
lang: en
---

Public JSON-RPC endpoints let you read the chain and send transactions without running a node of
your own. They are the fastest way to start, and for many applications they are enough permanently.

Running your own [Endpoint Node](/nodes/Xphere-Endpoint-Node) buys you a dedicated rate limit,
access to namespaces the public endpoints do not serve, and independence from a third party — at the
cost of storage, bandwidth, and the operational time to keep it healthy.

## Considerations

- Node providers are not liable for any damages or losses resulting from traffic or interactions with the nodes.
- High traffic concentration on certain nodes may lead to service delays.
- To prevent excessive requests, rate limits may be applied on a per-node basis and are subject to change without prior notice.

## Public JSON-RPC Endpoints

Below is a list of network domains offered by XPHERE’s public node providers.

The namespace column in the tables below is what each endpoint reports for `rpc_modules`. You can reproduce it against any endpoint:

```bash
curl -s -X POST <ENDPOINT> \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}'
```

### Mainnet Public JSON-RPC Endpoints — Chain ID `20250217` (`0x134fe69`)

Please note that these endpoints are provided to the community for testing and development purposes. As uptime and stability cannot be guaranteed, they should not be used for commercial purposes.

**HTTPS**

| Service Provider  | Endpoints                                                      | Namespaces (`rpc_modules`) | Type |
| ----------------- | -------------------------------------------------------------- | -------------------------- | ---- |
| XPHERE Foundation | `https://rpc.x-phere.com` (load balanced, use this)<br />`https://en-hkg.x-phere.com`<br />`https://en-bkk.x-phere.com` | `eth`, `net`, `rpc`, `xp` | Full |
| Ankr              | `https://rpc.ankr.com/xphere_mainnet`                          | `eth`, `net`, `rpc`, `xp`, plus `admin`, `debug`, `personal`, `txpool`, `web3` advertised but partly disabled — see the caveats below | Full |

**WebSocket**

| Service Provider  | Endpoints                                                        | Namespaces (`rpc_modules`) | Type |
| ----------------- | ---------------------------------------------------------------- | -------------------------- | ---- |
| XPHERE Foundation | `wss://rpc.x-phere.com/ws` (load balanced, use this)<br />`wss://en-hkg.x-phere.com/ws`<br />`wss://en-bkk.x-phere.com/ws` | `eth`, `net`, `rpc`, `xp` | Full |

### Testnet Public JSON-RPC Endpoints — Chain ID `1998991` (`0x1e808f`)

The Testnet native token is **XPT**, not XP. Fund an address from the [Faucet](/faucet) and read the result on [xpt.tamsa.io](https://xpt.tamsa.io).

**HTTPS**

| Service Provider  | Endpoints                             | Namespaces (`rpc_modules`) | Type |
| ----------------- | ------------------------------------- | -------------------------- | ---- |
| XPHERE Foundation | `https://testnet.x-phere.com`         | `eth`, `net`, `rpc`, `xp`, `debug` | Full |
| Ankr              | `https://rpc.ankr.com/xphere_testnet` | `eth`, `net`, `rpc`, `xp`, plus `admin`, `debug`, `personal`, `txpool`, `web3` advertised but partly disabled — see the caveats below | Full |

**WebSocket**

| Service Provider  | Endpoints                       | Namespaces (`rpc_modules`) | Type |
| ----------------- | ------------------------------- | -------------------------- | ---- |
| XPHERE Foundation | `wss://testnet.x-phere.com/ws/` | `eth`, `net`, `rpc`, `web3` | Full |

:::note Two Testnet WebSocket differences from Mainnet
- **Trailing slash.** `wss://testnet.x-phere.com/ws` answers `301 Moved Permanently` to `/ws/`. Clients that do not follow redirects during the handshake must use `/ws/`. Mainnet upgrades at `/ws` directly.
- **No `xp` namespace over WebSocket.** The Testnet WebSocket endpoint reports `eth`, `net`, `rpc`, `web3`, and `xp_blockNumber` there returns `-32601`. Use `https://testnet.x-phere.com` over HTTPS for `xp_*` calls. `eth_subscribe` works on both networks' WebSocket endpoints.
:::

## RPC Service Providers

Below is a list of XPHERE's Public Node Providers.

| Provider | Mainnet | Testnet | Notes |
|----------|---------|---------|-------|
| XPHERE Foundation | `https://rpc.x-phere.com`, `https://en-hkg.x-phere.com`, `https://en-bkk.x-phere.com` | `https://testnet.x-phere.com` | Operated by the Foundation, rate-limited |
| [Ankr](https://www.ankr.com/rpc/xphere/) | `https://rpc.ankr.com/xphere_mainnet` | `https://rpc.ankr.com/xphere_testnet` | Global infrastructure provider; XPHERE is listed in Ankr's public chain directory. Ankr also operates a [Union](/union) validator slot on XPHERE. |

### Ankr

XPHERE is available in [Ankr's public RPC directory](https://www.ankr.com/rpc/xphere/) alongside
80+ other networks, with **both Mainnet and Testnet endpoints served from Ankr's global
infrastructure** — no signup or API key required to start.

| What it gives you | Detail |
|-------------------|--------|
| Both environments | `xphere_mainnet` (Chain ID `20250217`, native `XP`) and `xphere_testnet` (Chain ID `1998991`, native `XPT`) — `eth_chainId` returns `0x134fe69` and `0x1e808f` respectively |
| Geographic reach | Requests are served from Ankr's global edge network rather than a single region |
| Standard EVM surface | The methods dApps rely on — `eth_call`, `eth_getLogs`, `eth_gasPrice`, `eth_getBlockByNumber`, `eth_sendRawTransaction` — work as on any EVM chain |
| The `xp_*` namespace | Available on both Ankr endpoints — `xp_blockNumber` returns a height on `xphere_mainnet` and `xphere_testnet` alike |
| A second opinion | An independently operated endpoint to fail over to when a Foundation endpoint is unreachable |

Ankr also operates a **Union validator** slot on XPHERE, staking 35,000,000 XP and taking its turn
proposing Main Chain blocks (see [Union Members](/union/members)).

:::note What to know before relying on it
- `rpc_modules` on Ankr advertises `admin`, `debug`, `personal`, `txpool`, and `web3`, but the
  methods behind them are gated on the public tier. `eth_newFilter` and `personal_listAccounts`
  both return `-32075 Method disabled` on `xphere_testnet`. If your indexer needs filters or
  `debug_*`, use a Foundation endpoint or [run your own node](/nodes/Install-XEN-Guide).
- Historical **state** queries against very old blocks are not served (this applies to the
  Foundation's public endpoints as well). Recent state, and full block/transaction/log history,
  are available.
- Ankr applies its own rate limits to the public tier, independent of the Foundation's.
:::

Community providers who would like their public endpoint referenced here can contact the Foundation at **[Contact@X-phere.com](mailto:Contact@X-phere.com)**.

## Running Your Own RPC

For production workloads (dApps with > 1k DAU, indexers, bots), run a dedicated [Endpoint Node](/nodes/Install-XEN-Guide). Public endpoints are best-effort.

## See Also

- [Network Info](./network-info) — Chain IDs, native symbols, explorers
- [Testnet Faucet](/faucet) — 10 XPT per address per 24 h
- [JSON-RPC Reference](./json-rpc)
- [XPHERE-Specific RPC](./xphere-rpc)

