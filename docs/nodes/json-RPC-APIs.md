---
title: Node JSON-RPC Setup
description: Enable and secure HTTP-RPC, WebSocket, and IPC on your own XEN node, and check which namespaces an endpoint actually exposes.
lang: en
---

# Node JSON-RPC Setup

A XEN node can serve JSON-RPC over HTTP, WebSocket, and IPC. This page covers enabling and securing
those interfaces on a node you run, and confirming what your node is actually exposing.

It is not a method reference. For method documentation see
[JSON-RPC Reference](/references/json-rpc) (`eth_*`, `net_*`, `web3_*`) and
[XPHERE-specific RPC](/references/xphere-rpc) (`xp_*`).

Everything below was verified against the XEN v0.9.0 client source and a live Foundation Mainnet
endpoint node, reachable at `https://rpc.x-phere.com`.

## The three interfaces

| Interface | Enabled by | Namespaces served |
| --------- | ---------- | ----------------- |
| IPC | On by default, no flag needed | **All** of them, always. IPC has no namespace whitelist. |
| HTTP-RPC | `RPC_ENABLE=1` → `--rpc` | Only those listed in `RPC_API` / `--rpcapi` |
| WebSocket | `WS_ENABLE=1` → `--ws` | Only those listed in `WS_API` / `--wsapi` |

The `rpc` namespace is the exception to the whitelist: the RPC server registers it on every
interface automatically, so `rpc_modules` is always callable and cannot be switched off.

## Configuring RPC in `xend.conf`

`bin/xend` reads `conf/xend.conf` and translates it into `xen` command-line flags. The shipped file
enables both network interfaces. These are the values it ships with:

```bash
# rpc options setting
RPC_ENABLE=1 # if this is set, the following options will be used
RPC_API="eth,net,xp" # available apis: admin,debug,xp,eth,miner,net,personal,rpc,txpool,web3
RPC_PORT=28551
RPC_ADDR="0.0.0.0"
RPC_CORSDOMAIN="*"
RPC_VHOSTS="*"
# below options are related with http server
RPC_CONCURRENCYLIMIT=3000
RPC_READ_TIMEOUT=30
RPC_WRITE_TIMEOUT=30
RPC_IDLE_TIMEOUT=120
RPC_EXECUTION_TIMEOUT=30

# ws options setting
WS_ENABLE=1 # if this is set, the following options will be used
WS_API="eth,net,xp" # available apis: admin,debug,xp,eth,miner,net,personal,rpc,txpool,web3
WS_ADDR="0.0.0.0"
WS_PORT=28552
WS_ORIGINS="*"
```

A node started from the shipped package therefore serves HTTP-RPC on port `28551` and WebSocket on
port `28552`, both offering `eth`, `net`, and `xp`.

Edit the file, then restart to apply — the namespace set is fixed at startup and cannot be changed
on a running node:

```bash
./bin/xend restart
```

### What each setting becomes

`xend` enters each block only when `RPC_ENABLE` / `WS_ENABLE` is `1`, and appends a flag only when
the variable is non-empty.

| Setting | `xen` flag | Meaning |
| ------- | ---------- | ------- |
| `RPC_ENABLE=1` | `--rpc` | Enable the HTTP-RPC server |
| `RPC_API` | `--rpcapi` | Namespaces offered over HTTP-RPC |
| `RPC_PORT` | `--rpcport` | HTTP-RPC listening port |
| `RPC_ADDR` | `--rpcaddr` | HTTP-RPC listening interface |
| `RPC_CORSDOMAIN` | `--rpccorsdomain` | Comma-separated origins accepted for cross-origin requests (browser enforced) |
| `RPC_VHOSTS` | `--rpcvhosts` | Comma-separated virtual hostnames accepted (server enforced); accepts the `*` wildcard |
| `RPC_CONCURRENCYLIMIT` | `--rpc.concurrencylimit` | Maximum concurrent HTTP-RPC requests |
| `RPC_READ_TIMEOUT` | `--rpcreadtimeout` | HTTP read timeout, seconds |
| `RPC_WRITE_TIMEOUT` | `--rpcwritetimeout` | HTTP write timeout, seconds |
| `RPC_IDLE_TIMEOUT` | `--rpcidletimeout` | HTTP idle timeout, seconds |
| `RPC_EXECUTION_TIMEOUT` | `--rpcexecutiontimeout` | Per-call execution timeout, seconds |
| `WS_ENABLE=1` | `--ws` | Enable the WebSocket server |
| `WS_API` | `--wsapi` | Namespaces offered over WebSocket |
| `WS_ADDR` | `--wsaddr` | WebSocket listening interface |
| `WS_PORT` | `--wsport` | WebSocket listening port |
| `WS_ORIGINS` | `--wsorigins` | Origins from which WebSocket requests are accepted |

:::danger[The shipped config is wide open]
`RPC_ADDR="0.0.0.0"` and `WS_ADDR="0.0.0.0"` bind to **every** network interface, and
`RPC_CORSDOMAIN="*"`, `RPC_VHOSTS="*"`, and `WS_ORIGINS="*"` accept **any** origin and hostname. On
a host with a public IP and ports `28551`/`28552` reachable, the node's RPC is open to the internet
as shipped.

For a node that is not meant to be a public endpoint:

```bash
RPC_ADDR="127.0.0.1"
WS_ADDR="127.0.0.1"
RPC_VHOSTS="localhost"
WS_ORIGINS="localhost"
```

Then reach it through a reverse proxy or an SSH tunnel. Alternatively keep the defaults and block
both ports at the firewall. Port `44323` (`PORT` in `xend.conf`, passed as `--port`) is the P2P
port and must stay reachable for peering.

Never add `personal`, `admin`, or `debug` to `RPC_API` or `WS_API` on an interface reachable from
the internet. `personal` can unlock accounts and sign transactions, `admin` can manipulate peering,
and `debug` includes expensive tracing calls that are easy to abuse as a denial-of-service vector.
:::

## Namespaces

These are the namespaces a XEN node registers. Anything not in this table is not served by the
client.

| Namespace | Purpose | In the shipped `RPC_API` / `WS_API` | On Foundation public endpoints |
| --------- | ------- | ----------------------------------- | ------------------------------ |
| `xp` | XPHERE-specific methods — chain and account state, transactions, filters, council and committee, chain config, rewards | Yes | Available |
| `eth` | Ethereum-compatible JSON-RPC | Yes | Available |
| `net` | Network ID, peer count, listening state | Yes | Available |
| `rpc` | `rpc_modules` introspection | Registered automatically | Available |
| `admin` | Node and peer administration | No | Not available |
| `personal` | Account management and signing | No | Not available |
| `debug` | Debugging, tracing, state dumps | No | Not available |
| `txpool` | Transaction pool inspection | No | Not available |
| `governance` | On-chain governance items and votes | No | Not available |
| `istanbul` | Istanbul consensus snapshots and validators | No | Not available |
| `web3` | `web3_clientVersion`, `web3_sha3` | No | Not available |

To enable an additional namespace on your own node, add it to `RPC_API` / `WS_API` and restart:

```bash
RPC_API="eth,net,xp,txpool"
```

Names that do not match a registered namespace are silently ignored — the node starts normally and
simply does not serve them. There is no warning, so always confirm with `rpc_modules` after a change.

:::caution[There is no `miner` namespace]
The comment in the shipped `conf/xend.conf` reads
`# available apis: admin,debug,xp,eth,miner,net,personal,rpc,txpool,web3`. That comment is wrong
about `miner`: no `miner` namespace is registered anywhere in the XEN client, so adding it to
`RPC_API` has no effect and `miner_*` calls fail on every interface, including IPC. Check for
yourself:

```bash
curl -s -X POST https://rpc.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"miner_start","params":[],"id":1}'
```

```json
{"jsonrpc":"2.0","id":1,"error":{"code":-32601,"message":"the method miner_start does not exist/is not available"}}
```
:::

## IPC

IPC needs no configuration and always serves **every** namespace listed above, including `admin`,
`personal`, `debug`, `txpool`, `governance`, and `istanbul`. There is no way to restrict the
namespace set on IPC — only to disable the interface entirely.

With the shipped `DATA_DIR=~/xen_data`, the socket is at `~/xen_data/xphere.ipc`. Attach the
JavaScript console to it:

```bash
./bin/xen attach --datadir ~/xen_data
```

`attach` defaults to `<datadir>/xphere.ipc` when given no endpoint argument. Once in the console,
run `rpc.modules` to print the namespaces that connection actually has — it will list considerably
more than an HTTP connection does.

Because IPC exposes everything, treat filesystem access to `~/xen_data/xphere.ipc` as equivalent to
full control of the node. Use `--ipcdisable` to turn the interface off, or `--ipcpath` to relocate
the socket.

Some `debug` methods become IPC-only when the node is started with `--rpc.unsafe-debug.disable`;
with that flag set they stay reachable over IPC but are not served on HTTP or WebSocket even if
`debug` is listed in `RPC_API`.

## Enabling RPC without `xend`

If you run `bin/xen` directly, pass the flags yourself. The HTTP server stays off unless `--rpc` is
present.

:::danger[Omitting `--rpcapi` does not mean "serve nothing"]
If `--rpc` is given without `--rpcapi`, the node falls back to its **built-in default module set** —
`net`, `web3`, `xp`, and `eth` — rather than serving no namespaces. Running `./bin/xen --rpc` alone
therefore exposes four namespaces.

Always pass `--rpcapi` explicitly so the exposed set is the one you chose:

```bash
./bin/xen --rpc --rpcapi eth,net,xp --rpcaddr 127.0.0.1
```

Confirm the result with `rpc_modules` rather than assuming.
:::

```bash
./bin/xen --rpc --rpcapi xp,eth,net --rpcaddr 127.0.0.1 --rpcport 28551 \
          --ws  --wsapi  xp,eth,net --wsaddr  127.0.0.1 --wsport  28552 \
          --datadir ~/xen_data
```

Each flag also has a longer alias — `--rpc` / `--http-rpc.enable`, `--rpcapi` / `--http-rpc.api`,
`--rpcaddr` / `--http-rpc.addr`, `--rpcport` / `--http-rpc.port`, `--ws` / `--ws-rpc.enable`,
`--wsapi` / `--ws-rpc.api`, and so on. Both spellings work.

## Checking what an endpoint exposes

`rpc_modules` reports the enabled namespaces and their versions, and works on every interface.

**Against your own node**, with the shipped `RPC_API="eth,net,xp"`:

```bash
curl -s -X POST http://localhost:28551 \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}'
```

```json
{"jsonrpc":"2.0","id":1,"result":{"eth":"1.0","net":"1.0","rpc":"1.0","xp":"1.0"}}
```

**Against a Foundation public endpoint:**

```bash
curl -s -X POST https://rpc.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}'
```

```json
{"jsonrpc":"2.0","id":1,"result":{"eth":"1.0","net":"1.0","rpc":"1.0","xp":"1.0"}}
```

Both return the same four namespaces because the public endpoints run the same whitelist as the
shipped config. An IPC connection to the same node returns considerably more.

### Confirming the node is answering

Swap `http://localhost:28551` for `https://rpc.x-phere.com` to run any of these against a public
endpoint instead.

```bash
# Client version — confirms the xp namespace is live
curl -s -X POST http://localhost:28551 -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_clientVersion","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"Xphere/v0.9.0/linux-amd64/go1.22.12"}

# Network ID — matches NETWORK_ID in xend.conf
curl -s -X POST http://localhost:28551 -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"20250217"}

# Sync state — false once the node has caught up
curl -s -X POST http://localhost:28551 -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_syncing","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":false}

# Current head — a hex block number
curl -s -X POST http://localhost:28551 -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_blockNumber","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"0x2b0fa4d"}

# Connected peers
curl -s -X POST http://localhost:28551 -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"0x7"}
```

The version and network ID are fixed by your client build and `xend.conf`. The block number and
peer count are specific to the node you asked and change constantly.

## Verifying a single method

```bash
curl -s -X POST https://rpc.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getBalance","params":[],"id":1}'
```

| Response | Meaning |
| -------- | ------- |
| A `result` value | The method exists and ran |
| `-32602` `missing value for required argument` | The method **exists**; you just did not pass its arguments |
| `-32601` `does not exist/is not available` | The method is **not served on this interface** |

`-32601` has two possible causes: the method does not exist in the client at all, or its namespace
is not enabled on that endpoint. Compare against `rpc_modules` to tell the two apart — if the
namespace is listed there and the method still returns `-32601`, the method does not exist.

## WebSocket

The WebSocket server accepts JSON-RPC on any path, so a local node is reached directly at
`ws://localhost:28552`. The Foundation's public WebSocket endpoints are published under a `/ws`
path, for example `wss://rpc.x-phere.com/ws`.

WebSocket also supports subscriptions, which HTTP does not. Subscribe with
`<namespace>_subscribe`, receive pushes as `<namespace>_subscription`, and cancel with
`<namespace>_unsubscribe`:

```json
--> {"jsonrpc":"2.0","method":"xp_subscribe","params":["newHeads"],"id":1}
<-- {"jsonrpc":"2.0","id":1,"result":"0xc4a6b194c284fc916b295a6d1ef62956"}
<-- {"jsonrpc":"2.0","method":"xp_subscription","params":{"subscription":"0xc4a6b194c284fc916b295a6d1ef62956","result":{ ...block header... }}}

--> {"jsonrpc":"2.0","method":"xp_unsubscribe","params":["0xc4a6b194c284fc916b295a6d1ef62956"],"id":2}
<-- {"jsonrpc":"2.0","id":2,"result":true}
```

`eth_subscribe` behaves the same way. Subscriptions are not available over HTTP — sending
`xp_subscribe` to an HTTP endpoint returns `-32000 notifications not supported`.

## Where the methods are documented

| Looking for | Reference |
| ----------- | --------- |
| `eth_*`, `net_*`, `web3_*` | [JSON-RPC Reference](/references/json-rpc) |
| `xp_*` | [XPHERE-specific RPC](/references/xphere-rpc) |
| Console equivalents | [XEN CLI Commands](./xen-cli-commands) |
| Public endpoint hostnames and namespaces | [Public JSON-RPC Endpoints](/references/public-en) |
| Chain IDs and network parameters | [Network Information](/references/network-info) |

## See Also

- [Install XEN](./Install-XEN-Guide)
- [XEN CLI Commands](./xen-cli-commands)
- [System Requirements](./requirements)
- [Public JSON-RPC Endpoints](/references/public-en)
