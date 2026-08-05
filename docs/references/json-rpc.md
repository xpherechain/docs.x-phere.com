---
title: JSON-RPC API
description: A stateless, light-weight remote procedure call (RPC) protocol for XPHERE clients.
lang: en
---

# JSON-RPC API

In order for a software application to interact with the XPHERE blockchain — either by reading blockchain data or sending transactions to the network — it must connect to an XPHERE node.

XPHERE nodes expose an Ethereum-compatible [JSON-RPC](https://www.jsonrpc.org/specification) interface, so most Ethereum tooling works unchanged. JSON-RPC is a stateless, light-weight remote procedure call protocol that uses JSON as its data format.

This page documents the `eth_*`, `net_*` and `rpc_*` methods **that were confirmed to exist on the XPHERE public endpoints**. XPHERE's own namespace is documented separately in [XPHERE-Specific RPC (`xp_*`)](./xphere-rpc).

:::note Everything on this page is reproducible
Every example request and response below was executed against `https://en-hkg.x-phere.com`. Values that change over time (block numbers, gas prices, balances) are labelled as such; the shapes and the method availability are not expected to change.
:::

## Endpoints {#endpoints}

| Network | HTTPS | WebSocket |
|---------|-------|-----------|
| Mainnet (chain ID `20250217` / `0x134fe69`) | `https://en-hkg.x-phere.com`<br/>`https://en-bkk.x-phere.com` | `wss://en-hkg.x-phere.com/ws`<br/>`wss://en-bkk.x-phere.com/ws` |
| Testnet (chain ID `1998991` / `0x1e808f`) | `https://testnet.x-phere.com` | `wss://testnet.x-phere.com/ws/` |

Confirm which network an endpoint serves before you use it:

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"0x134fe69"}
```

See [Network Information](./network-info) for the full parameter list and [Public RPC Endpoints](./public-en) for provider details.

## Client {#client}

XPHERE runs a single reference client. Its version string is served by `xp_clientVersion` (there is no `web3_clientVersion` — see below):

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_clientVersion","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"Xphere/v0.9.0/linux-amd64/go1.22.12"}
```

## Method availability {#availability}

Ask any endpoint which namespaces it serves:

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":{"eth":"1.0","net":"1.0","rpc":"1.0","xp":"1.0"}}
```

| Endpoint | Namespaces served |
|----------|-------------------|
| `https://en-hkg.x-phere.com` | `eth`, `net`, `rpc`, `xp` |
| `https://en-bkk.x-phere.com` | `eth`, `net`, `rpc`, `xp` |
| `https://testnet.x-phere.com` | `debug`, `eth`, `net`, `rpc`, `xp` |

### Methods that do not exist {#not-available}

These are commonly assumed to be present because they exist on Ethereum clients. On XPHERE they return JSON-RPC error `-32601` (`the method ... does not exist/is not available`). Do not use them; there is no drop-in equivalent unless noted.

| Method | Status on XPHERE endpoints | Use instead |
|--------|---------------------------|-------------|
| `web3_clientVersion` | `-32601` — the `web3` namespace is not served | [`xp_clientVersion`](./xphere-rpc) |
| `web3_sha3` | `-32601` | Hash locally (`ethers.keccak256`, `cast keccak`) |
| `eth_protocolVersion` | `-32601` | [`xp_protocolVersion`](./xphere-rpc) |
| `debug_*` | `-32601` on mainnet endpoints. Served on `https://testnet.x-phere.com`. | Run your own node with `--http.api debug` |
| `personal_*` | `-32601` | Sign locally, then [`eth_sendRawTransaction`](#eth_sendrawtransaction) |
| `admin_*` | `-32601` | Only meaningful on a node you operate |
| `txpool_*` | `-32601` | — |
| `miner_*` | `-32601` | — |

Verify any of them yourself — `-32601` means the method does not exist, `-32602` means it exists but needs arguments:

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"error":{"code":-32601,"message":"the method web3_clientVersion does not exist/is not available"}}
```

### Methods that need a node you control {#node-scoped}

`eth_accounts`, `eth_coinbase`, `eth_sign`, `eth_signTransaction` and `eth_sendTransaction` exist on the public endpoints but operate on the node's own key store, which is empty for callers. They return `[]` or `-32000 unknown account`. To use them you must run your own node with unlocked accounts. For normal application development, sign transactions in your wallet or library and submit them with [`eth_sendRawTransaction`](#eth_sendrawtransaction).

## Conventions {#conventions}

### Hex value encoding {#hex-encoding}

Two key data types get passed over JSON: unformatted byte arrays and quantities. Both are passed with a hex encoding but with different requirements for formatting.

#### Quantities {#quantities-encoding}

When encoding quantities (integers, numbers): encode as hex, prefix with "0x", the most compact representation (slight exception: zero should be represented as "0x0").

Here are some examples:

- 0x41 (65 in decimal)
- 0x400 (1024 in decimal)
- WRONG: 0x (should always have at least one digit - zero is "0x0")
- WRONG: 0x0400 (no leading zeroes allowed)
- WRONG: ff (must be prefixed 0x)

### Unformatted data {#unformatted-data-encoding}

When encoding unformatted data (byte arrays, account addresses, hashes, bytecode arrays): encode as hex, prefix with "0x", two hex digits per byte.

Here are some examples:

- 0x41 (size 1, "A")
- 0x004200 (size 3, "0B0")
- 0x (size 0, "")
- WRONG: 0xf0f0f (must be even number of digits)
- WRONG: 004200 (must be prefixed 0x)

### The default block parameter {#default-block}

The following methods have an extra default block parameter:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

When requests are made that act on the state of XPHERE, the last default block parameter determines the height of the block.

The following options are possible for the defaultBlock parameter:

| Value | Meaning | Accepted |
|-------|---------|----------|
| `HEX String` | an integer block number, e.g. `"0x2b102c3"` | Yes |
| `"earliest"` | the genesis block | Yes |
| `"latest"` | the latest proposed block | Yes |
| `"pending"` | the pending state/transactions | Yes |
| `"safe"` | — | **No** |
| `"finalized"` | — | **No** |

:::warning `safe` and `finalized` are not supported
XPHERE nodes reject both tags with `-32602 invalid argument: hex string without 0x prefix`. If you copied a snippet that uses them, replace them with `"latest"`. XPHERE's PBFT main chain finalizes each block as it is proposed, so `"latest"` is already final.

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x21864fcde19a0ea12726b4c2fbd8c7ff972c5c11","finalized"],"id":1}'
# {"jsonrpc":"2.0","id":1,"error":{"code":-32602,"message":"invalid argument 1: hex string without 0x prefix"}}
```
:::

## Curl examples {#curl-examples}

The examples below use the command line tool [curl](https://curl.se). Each one gives the endpoint's parameters, return type, and a request/response pair captured from `https://en-hkg.x-phere.com`.

Always set the content type header — without `-H "Content-Type: application/json"`, curl sends `application/x-www-form-urlencoded` and the node may reject the request. A complete request takes the following form:

```shell
curl -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

For brevity, the individual examples below omit the URL and the header. Append `-H "Content-Type: application/json" https://en-hkg.x-phere.com` to run any of them.

## Gossip, State, History {#gossip-state-history}

A handful of core JSON-RPC methods require data from the XPHERE network, and fall neatly into three main categories: _Gossip, State, and History_. Use the links in these sections to jump to each method, or use the table of contents to explore the whole list of methods.

### Gossip Methods {#gossip-methods}

> These methods track the head of the chain. This is how transactions make their way around the network, find their way into blocks, and how clients find out about new blocks.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### State Methods {#state_methods}

> Methods that report the current state of all the data stored. The "state" is like one big shared piece of RAM, and includes account balances, contract data, and gas estimations.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### History Methods {#history_methods}

> Fetches historical records of every block back to genesis. This is like one large append-only file, and includes all block headers, block bodies, and transaction receipts.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [Uncle methods](#uncle-methods) — present for compatibility, always empty on XPHERE

## JSON-RPC API Methods {#json-rpc-methods}

:::note `web3_clientVersion`, `web3_sha3` and `eth_protocolVersion` are not documented here
They are not served by XPHERE nodes. See [Methods that do not exist](#not-available).
:::

### net_version {#net_version}

Returns the current network id.

**Parameters**

None

**Returns**

`String` - The current network id, in decimal.

XPHERE network IDs:

| Network | `net_version` | `eth_chainId` |
|---------|---------------|---------------|
| XPHERE Mainnet | `"20250217"` | `0x134fe69` |
| XPHERE Testnet | `"1998991"` | `0x1e808f` |

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "jsonrpc": "2.0",
  "id": 67,
  "result": "20250217"
}
```

### net_listening {#net_listening}

Returns `true` if client is actively listening for network connections.

**Parameters**

None

**Returns**

`Boolean` - `true` when listening, otherwise `false`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "jsonrpc": "2.0",
  "id": 67,
  "result": true
}
```

### net_peerCount {#net_peercount}

Returns number of peers currently connected to the client.

**Parameters**

None

**Returns**

`QUANTITY` - integer of the number of connected peers.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "jsonrpc": "2.0",
  "id": 74,
  "result": "0x7" // 7 — varies over time
}
```

### rpc_modules {#rpc_modules}

Returns the RPC namespaces served by the endpoint, with their versions. Use this before assuming any method is available.

**Parameters**

None

**Returns**

`Object` - Map of namespace name to version string.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { "eth": "1.0", "net": "1.0", "rpc": "1.0", "xp": "1.0" }
}
```

### eth_syncing {#eth_syncing}

Returns an object with data about the sync status or `false`.

**Parameters**

None

**Returns**

`Object|Boolean` - `false` when the node is in sync with the head of the chain, otherwise an object with:

- `startingBlock`: `QUANTITY` - The block at which the import started
- `currentBlock`: `QUANTITY` - The current block, same as `eth_blockNumber`
- `highestBlock`: `QUANTITY` - The estimated highest block

**Example**

A healthy public endpoint is in sync, so it returns `false`:

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

Returns the coinbase address configured on the node being queried.

:::note This is the node's address, not yours
The address returned belongs to the operator of the endpoint. It has no relationship to your accounts and is not a XPHERE-wide value — different endpoints return different addresses.
:::

**Parameters**

None

**Returns**

`DATA`, 20 bytes - the node's coinbase address.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result — from https://en-hkg.x-phere.com; other nodes return other addresses
{
  "jsonrpc": "2.0",
  "id": 64,
  "result": "0x8a03c85e8d058c8c9fa51dcaf5e6e43f96b1a3a0"
}
```

### eth_chainId {#eth_chainId}

Returns the chain ID used for signing replay-protected transactions.

**Parameters**

None

**Returns**

`chainId`, hexadecimal value as a string representing the integer of the current chain id.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result — XPHERE Mainnet (20250217)
{
  "jsonrpc": "2.0",
  "id": 67,
  "result": "0x134fe69"
}
// XPHERE Testnet (1998991) returns "0x1e808f"
```

### eth_mining {#eth_mining}

Returns whether the queried node process is itself producing blocks.

**Parameters**

None

**Returns**

`Boolean` - `true` if the node is producing blocks, otherwise `false`.

**Example**

Public endpoint nodes serve RPC only, so they report `false`:

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
// Result
{
  "jsonrpc": "2.0",
  "id": 71,
  "result": false
}
```

### eth_hashrate {#eth_hashrate}

Returns the hash rate reported by the queried node process.

**Parameters**

None

**Returns**

`QUANTITY` - number of hashes per second.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result — public endpoint nodes report 0
{
  "jsonrpc": "2.0",
  "id": 71,
  "result": "0x0"
}
```

### eth_gasPrice {#eth_gasprice}

Returns an estimate of the current price per gas in wei.

**Parameters**

None

**Returns**

`QUANTITY` - integer of the current gas price in wei.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result — value varies over time
{
  "jsonrpc": "2.0",
  "id": 73,
  "result": "0x66720b300" // 27500000000 wei
}
```

### eth_maxPriorityFeePerGas {#eth_maxpriorityfeepergas}

Returns a suggested priority fee (tip) per gas, in wei, for EIP-1559 transactions.

**Parameters**

None

**Returns**

`QUANTITY` - suggested priority fee per gas in wei.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params":[],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x0"
}
```

### eth_accounts {#eth_accounts}

Returns the list of addresses held in the **queried node's** key store.

:::warning This returns an empty list on public endpoints
Public XPHERE endpoints hold no unlocked accounts on your behalf, so the result is always `[]`. This method only returns addresses when you query a node you operate that has accounts in its key store. It never exposes your wallet's accounts.
:::

**Parameters**

None

**Returns**

`Array of DATA`, 20 Bytes - addresses held by the queried node.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result — from https://en-hkg.x-phere.com
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": []
}
```

### eth_blockNumber {#eth_blocknumber}

Returns the number of most recent block.

**Parameters**

None

**Returns**

`QUANTITY` - integer of the current block number the client is on.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result — grows continuously; XPHERE produces a block roughly every second
{
  "jsonrpc": "2.0",
  "id": 83,
  "result": "0x2b102c4" // 45089476
}
```

### eth_getBalance {#eth_getbalance}

Returns the balance of the account of given address.

**Parameters**

1. `DATA`, 20 Bytes - address to check for balance.
2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](/references/json-rpc/#default-block)

```js
params: ["0x21864fcde19a0ea12726b4c2fbd8c7ff972c5c11", "latest"]
```

**Returns**

`QUANTITY` - integer of the current balance in wei (1 XP = 10<sup>18</sup> wei).

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x21864fcde19a0ea12726b4c2fbd8c7ff972c5c11", "latest"],"id":1}'
// Result — balance changes over time
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x2a69c8149ab567d5fa6c"
}
```

### eth_getStorageAt {#eth_getstorageat}

Returns the value from a storage position at a given address.

**Parameters**

1. `DATA`, 20 Bytes - address of the storage.
2. `QUANTITY` - integer of the position in the storage.
3. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](/references/json-rpc/#default-block)

**Returns**

`DATA` - the 32-byte value at this storage position.

**Example**

Reading slot `0` of a contract deployed on XPHERE Mainnet:

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getStorageAt","params":["0x511b90c056cfdc41173ba0f6bfac6ea603e16eb4", "0x0", "latest"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x000000000000000000000000df8ec803056b5ed5d0ed32f697c13d0e7cf642e5"
}
```

Which slot holds which variable follows Solidity's storage layout rules. For a value type declared at position `n`, the slot is simply `n`. For an entry in `mapping(K => V)` declared at position `p`, the slot is:

```
keccak256(LeftPad32(key) . LeftPad32(p))
```

Compute that hash locally — XPHERE nodes do not serve `web3_sha3` (see [Methods that do not exist](#not-available)). For example, with ethers.js:

```js
import { keccak256, zeroPadValue } from "ethers"
const slot = keccak256(zeroPadValue(key, 32) + zeroPadValue("0x01", 32).slice(2))
```

### eth_getTransactionCount {#eth_gettransactioncount}

Returns the number of transactions _sent_ from an address.

**Parameters**

1. `DATA`, 20 Bytes - address.
2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](/references/json-rpc/#default-block)

```js
params: [
  "0x21864fcde19a0ea12726b4c2fbd8c7ff972c5c11",
  "latest", // state at the latest block
]
```

**Returns**

`QUANTITY` - integer of the number of transactions sent from this address. This is the next nonce to use.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x21864fcde19a0ea12726b4c2fbd8c7ff972c5c11","latest"],"id":1}'
// Result — increases as the account sends transactions
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x223cef" // 2243311
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Returns the number of transactions in a block from a block matching the given block hash.

**Parameters**

1. `DATA`, 32 Bytes - hash of a block

```js
params: ["0x32b0e286c15e446659d683c316941b656bd94871799c82ba70378bf72f4037b6"]
```

**Returns**

`QUANTITY` - integer of the number of transactions in this block.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x32b0e286c15e446659d683c316941b656bd94871799c82ba70378bf72f4037b6"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x4" // 4
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Returns the number of transactions in a block matching the given block number.

**Parameters**

1. `QUANTITY|TAG` - integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](/references/json-rpc/#default-block).

```js
params: [
  "0x2b102c3", // 45089475
]
```

**Returns**

`QUANTITY` - integer of the number of transactions in this block.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x2b102c3"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x4" // 4
}
```

### eth_getCode {#eth_getcode}

Returns code at a given address.

**Parameters**

1. `DATA`, 20 Bytes - address
2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](/references/json-rpc/#default-block)

```js
params: ["0x511b90c056cfdc41173ba0f6bfac6ea603e16eb4", "latest"]
```

**Returns**

`DATA` - the deployed bytecode at the given address, or `0x` if the address is not a contract.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0x511b90c056cfdc41173ba0f6bfac6ea603e16eb4", "latest"],"id":1}'
// Result (truncated - the real response is ~27 kB of hex)
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x608060405234801561001057600080fd5b50600436106102115760003560e01c806371a99c22116101255780...
}
```

An externally owned account returns `0x`:

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0x21864fcde19a0ea12726b4c2fbd8c7ff972c5c11", "latest"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x"
}
```

### eth_sign {#eth_sign}

Signs a message with an account held **in the queried node's key store**, applying the node's EIP-191 personal-message prefix before hashing. The prefix makes the resulting signature unusable as a transaction signature.

:::warning Not usable through a public endpoint
The address to sign with must be present and unlocked on the node you are calling. Public XPHERE endpoints hold no accounts for you, so this method always fails with `-32000 unknown account`. To sign messages in an application, use your wallet or a library (`signer.signMessage()` in ethers.js) — never send a private key to a node.
:::

**Parameters**

1. `DATA`, 20 Bytes - address
2. `DATA`, N Bytes - message to sign

**Returns**

`DATA`: Signature

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x8a03c85e8d058c8c9fa51dcaf5e6e43f96b1a3a0", "0xdeadbeaf"],"id":1}'
// Result on a public endpoint
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": { "code": -32000, "message": "unknown account" }
}
```

A signature is only returned when the node you call holds and has unlocked that account.

### eth_signTransaction {#eth_signtransaction}

Signs a transaction with an account held in the queried node's key store, without broadcasting it. The result can be submitted later with [eth_sendRawTransaction](#eth_sendrawtransaction).

:::warning Not usable through a public endpoint
Same constraint as [eth_sign](#eth_sign): the `from` account must exist and be unlocked on the node you are calling. On public endpoints this returns `-32000 unknown account`. Sign locally instead.
:::

**Parameters**

1. `Object` - The transaction object

- `from`: `DATA`, 20 Bytes - The address the transaction is sent from.
- `to`: `DATA`, 20 Bytes - (optional when creating a new contract) The address the transaction is directed to.
- `gas`: `QUANTITY` - (optional) Integer of the gas provided for the transaction execution. Unused gas is returned.
- `gasPrice`: `QUANTITY` - Integer of the gas price for each paid gas, in wei. Required unless `maxFeePerGas`/`maxPriorityFeePerGas` are given.
- `maxFeePerGas` / `maxPriorityFeePerGas`: `QUANTITY` - EIP-1559 fee fields, as an alternative to `gasPrice`.
- `value`: `QUANTITY` - (optional) Integer of the value sent with this transaction, in wei.
- `data`: `DATA` - The compiled code of a contract, or the method selector plus encoded parameters.
- `nonce`: `QUANTITY` - (optional) Integer of a nonce.

Omitting the fee fields is rejected before the account is even checked:

```json
{ "jsonrpc": "2.0", "id": 1, "error": { "code": -32000, "message": "missing gasPrice or maxFeePerGas/maxPriorityFeePerGas" } }
```

**Returns**

`DATA`, The RLP-encoded transaction object signed by the specified account.

### eth_sendTransaction {#eth_sendtransaction}

Creates a new message call transaction or a contract creation, and signs it using the account specified in `from`.

:::warning Not usable through a public endpoint
`from` must be an account held and unlocked on the node you are calling. Public XPHERE endpoints return `-32000 unknown account`. The normal path for applications is to sign the transaction in your wallet or library and submit it with [eth_sendRawTransaction](#eth_sendrawtransaction) — see [Smart Contracts](/developers/smart-contracts).
:::

**Parameters**

1. `Object` - The transaction object

- `from`: `DATA`, 20 Bytes - The address the transaction is sent from. Must be unlocked on the queried node.
- `to`: `DATA`, 20 Bytes - (optional when creating a new contract) The address the transaction is directed to.
- `gas`: `QUANTITY` - (optional) Integer of the gas provided for the transaction execution. Unused gas is returned.
- `gasPrice`: `QUANTITY` - (optional) Integer of the gas price for each paid gas, in wei.
- `value`: `QUANTITY` - (optional) Integer of the value sent with this transaction, in wei.
- `input`: `DATA` - The compiled code of a contract, or the method selector plus encoded parameters.
- `nonce`: `QUANTITY` - (optional) Integer of a nonce. Allows overwriting your own pending transactions that use the same nonce.

```js
params: [
  {
    from: "0x8a03c85e8d058c8c9fa51dcaf5e6e43f96b1a3a0",
    to: "0x99eab2c5d36ce533168c00bea700b10f5413b4ad",
    gas: "0x5208", // 21000
    value: "0x1",
  },
]
```

**Returns**

`DATA`, 32 Bytes - the transaction hash.

Use [eth_getTransactionReceipt](#eth_gettransactionreceipt) to get the contract address, after the transaction was proposed in a block, when you created a contract.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"0x8a03c85e8d058c8c9fa51dcaf5e6e43f96b1a3a0","to":"0x99eab2c5d36ce533168c00bea700b10f5413b4ad","gas":"0x76c0","value":"0x1"}],"id":1}'
// Result on a public endpoint
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": { "code": -32000, "message": "unknown account" }
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

Submits an already-signed transaction. **This is the method applications should use** — it works on the public endpoints because the node never needs your key.

**Parameters**

1. `DATA`, The signed, RLP-encoded transaction.

```js
params: ["0xf86c8085..."]
```

**Returns**

`DATA`, 32 Bytes - the transaction hash.

Use [eth_getTransactionReceipt](#eth_gettransactionreceipt) to check whether the transaction was included and, for a contract creation, to get the deployed address.

**Example**

Sign the transaction locally, then submit the raw bytes. Sign with chain ID `20250217` for Mainnet or `1998991` for Testnet.

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0xf86c8085..."],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x040ccb9da0b1929b101e7a992f59ccde09b02bfba3209e7731c67111c95ee9ab"
}
```

Common errors returned by this method: `-32000 nonce too low`, `-32000 insufficient funds for gas * price + value`, `-32000 already known` (the transaction is already in the pool).

### eth_call {#eth_call}

Executes a new message call immediately without creating a transaction on the block chain. Often used for executing read-only smart contract functions, for example the `balanceOf` for an ERC-20 contract.

**Parameters**

1. `Object` - The transaction call object

- `from`: `DATA`, 20 Bytes - (optional) The address the transaction is sent from.
- `to`: `DATA`, 20 Bytes - The address the transaction is directed to.
- `gas`: `QUANTITY` - (optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
- `gasPrice`: `QUANTITY` - (optional) Integer of the gasPrice used for each paid gas
- `value`: `QUANTITY` - (optional) Integer of the value sent with this transaction
- `input`: `DATA` - (optional) Hash of the method signature and encoded parameters. For details see [XPHERE Contract ABI in the Solidity documentation](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](/references/json-rpc/#default-block)

**Returns**

`DATA` - the ABI-encoded return value of the executed contract function.

**Example**

Reading a value from a contract deployed on XPHERE Mainnet:

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x511b90c056cfdc41173ba0f6bfac6ea603e16eb4","input":"0x8da5cb5b"},"latest"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x000000000000000000000000df8ec803056b5ed5d0ed32f697c13d0e7cf642e5"
}
```

### eth_estimateGas {#eth_estimategas}

Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction is not added to the blockchain. The estimate may be higher than the gas the transaction eventually uses.

**Parameters**

See [eth_call](#eth_call) parameters, except that all properties are optional. If no gas limit is specified, the node uses the pending block's gas limit as an upper bound.

**Returns**

`QUANTITY` - the estimated gas.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{"from":"0x21864fcde19a0ea12726b4c2fbd8c7ff972c5c11","to":"0x99eab2c5d36ce533168c00bea700b10f5413b4ad","value":"0x1"}],"id":1}'
// Result — a plain value transfer
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x5208" // 21000
}
```

If the `from` account cannot pay for the call, the node returns an error rather than an estimate:

```json
{ "jsonrpc": "2.0", "id": 1, "error": { "code": -32000, "message": "err: insufficient balance for transfer" } }
```

### eth_getBlockByHash {#eth_getblockbyhash}

Returns information about a block by hash.

**Parameters**

1. `DATA`, 32 Bytes - Hash of a block.
2. `Boolean` - If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.

```js
params: [
  "0x32b0e286c15e446659d683c316941b656bd94871799c82ba70378bf72f4037b6",
  false,
]
```

**Returns**

`Object` - A block object, or `null` when no block was found:

- `number`: `QUANTITY` - the block number. `null` for the pending block.
- `hash`: `DATA`, 32 Bytes - hash of the block. `null` for the pending block.
- `parentHash`: `DATA`, 32 Bytes - hash of the parent block.
- `proposer`: `DATA`, 20 Bytes - **XPHERE-specific.** The validator that proposed this block.
- `miner`: `DATA`, 20 Bytes - the block's reward beneficiary.
- `nonce`: `DATA`, 8 Bytes - always `0x0000000000000000` on XPHERE.
- `mixHash`: `DATA`, 32 Bytes - always zero on XPHERE.
- `sha3Uncles`: `DATA`, 32 Bytes - always the hash of the empty list.
- `logsBloom`: `DATA`, 256 Bytes - the bloom filter for the logs of the block.
- `transactionsRoot`: `DATA`, 32 Bytes - the root of the transaction trie of the block.
- `stateRoot`: `DATA`, 32 Bytes - the root of the final state trie of the block.
- `receiptsRoot`: `DATA`, 32 Bytes - the root of the receipts trie of the block.
- `difficulty`: `QUANTITY` - always `0x1` on XPHERE's PBFT main chain.
- `totalDifficulty`: `QUANTITY` - cumulative difficulty; tracks the block height.
- `baseFeePerGas`: `QUANTITY` - the block's base fee per gas.
- `extraData`: `DATA` - the "extra data" field of this block.
- `size`: `QUANTITY` - the size of this block in bytes.
- `gasLimit`: `QUANTITY` - the maximum gas allowed in this block.
- `gasUsed`: `QUANTITY` - the total gas used by all transactions in this block.
- `timestamp`: `QUANTITY` - the unix timestamp for when the block was produced.
- `transactions`: `Array` - transaction objects, or 32-byte transaction hashes, depending on the second parameter.
- `uncles`: `Array` - always empty on XPHERE.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0x32b0e286c15e446659d683c316941b656bd94871799c82ba70378bf72f4037b6", false],"id":1}'
// Result (logsBloom abbreviated)
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "baseFeePerGas": "0x5d21dba00",
    "difficulty": "0x1",
    "extraData": "0x",
    "gasLimit": "0xe8d4a50fff",
    "gasUsed": "0x9405c",
    "hash": "0x32b0e286c15e446659d683c316941b656bd94871799c82ba70378bf72f4037b6",
    "logsBloom": "0x0100010000...",
    "miner": "0xdb8ef97a2c4f5dadf3a5a1cede188b4159578dec",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "nonce": "0x0000000000000000",
    "number": "0x2b102c3",
    "parentHash": "0x27d80c6f5b0d5900f5ec9c0999ac6ffda954058fd79e0bf442fb6e2d75df14f0",
    "proposer": "0xc3e4a11939c7edd5e87122cb1ddfe17dbf6369de",
    "receiptsRoot": "0x48f48230ebf678d9197d5edec7ed755bc6891b56e74b94ace1470c343b927f5a",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0xdbd",
    "stateRoot": "0x7fdc1206ec1e67799f256d98c9d703a53cf124f449f77cbc4f5da45fc194db76",
    "timestamp": "0x6a72f2d0",
    "totalDifficulty": "0x2b102c4",
    "transactions": [
      "0x040ccb9da0b1929b101e7a992f59ccde09b02bfba3209e7731c67111c95ee9ab",
      "0x18d3e60f7691d97c441b3c81fee97067918222b8c9190aeab098b664bac7bb00",
      "0x41b059651dd20b4c493d01da334b15fcf4f740789a2abc6fa84192d9d312fc5b",
      "0xd6afdbc82a4471811e76109b3affe035c663851bdbb47f83ba0ecc5d7123182e"
    ],
    "transactionsRoot": "0xa6214dcf33dc3f2b2924e9ea863abea4879808d3661ba0de3d7cea886fc920e6",
    "uncles": []
  }
}
```

### eth_getBlockByNumber {#eth_getblockbynumber}

Returns information about a block by block number.

**Parameters**

1. `QUANTITY|TAG` - integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](/references/json-rpc/#default-block).
2. `Boolean` - If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.

```js
params: [
  "0x2b102c3", // 45089475
  true,
]
```

**Returns**
See [eth_getBlockByHash](#eth_getblockbyhash). With the tag `"pending"`, `hash` is `null`.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x2b102c3", true],"id":1}'
```

Result see [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Returns the information about a transaction requested by transaction hash.

**Parameters**

1. `DATA`, 32 Bytes - hash of a transaction

```js
params: ["0x040ccb9da0b1929b101e7a992f59ccde09b02bfba3209e7731c67111c95ee9ab"]
```

**Returns**

`Object` - A transaction object, or `null` when no transaction was found:

- `blockHash`: `DATA`, 32 Bytes - hash of the block containing this transaction. `null` when pending.
- `blockNumber`: `QUANTITY` - block number containing this transaction. `null` when pending.
- `from`: `DATA`, 20 Bytes - address of the sender.
- `gas`: `QUANTITY` - gas provided by the sender.
- `gasPrice`: `QUANTITY` - gas price provided by the sender in wei.
- `hash`: `DATA`, 32 Bytes - hash of the transaction.
- `input`: `DATA` - the data sent along with the transaction.
- `nonce`: `QUANTITY` - the number of transactions made by the sender prior to this one.
- `to`: `DATA`, 20 Bytes - address of the receiver. `null` for a contract creation.
- `transactionIndex`: `QUANTITY` - index position in the block. `null` when pending.
- `value`: `QUANTITY` - value transferred in wei.
- `type`: `QUANTITY` - transaction type, e.g. `0x0` for legacy.
- `v`, `r`, `s`: `QUANTITY` - ECDSA signature components.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x040ccb9da0b1929b101e7a992f59ccde09b02bfba3209e7731c67111c95ee9ab"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x32b0e286c15e446659d683c316941b656bd94871799c82ba70378bf72f4037b6",
    "blockNumber": "0x2b102c3",
    "from": "0x21864fcde19a0ea12726b4c2fbd8c7ff972c5c11",
    "gas": "0x5208",
    "gasPrice": "0x66720b300",
    "hash": "0x040ccb9da0b1929b101e7a992f59ccde09b02bfba3209e7731c67111c95ee9ab",
    "input": "0x",
    "nonce": "0x223cc0",
    "to": "0x99eab2c5d36ce533168c00bea700b10f5413b4ad",
    "transactionIndex": "0x0",
    "value": "0x9d29f891d4593bab",
    "type": "0x0",
    "v": "0x269fcf5",
    "r": "0x91274a2ee3ece47fc4db44eb71b4af2bd3806734734e0ab6e117cc96a1220da2",
    "s": "0x2d4db298571ab4f82bbeec5a63371ebca4db6e73d41245cb659a6ed77c456d2d"
  }
}
```

The `v` value `0x269fcf5` (40500469) carries EIP-155 replay protection: `40500469 = 20250217 * 2 + 35`, confirming the transaction was signed for XPHERE Mainnet.

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Returns information about a transaction by block hash and transaction index position.

**Parameters**

1. `DATA`, 32 Bytes - hash of a block.
2. `QUANTITY` - integer of the transaction index position.

```js
params: [
  "0x32b0e286c15e446659d683c316941b656bd94871799c82ba70378bf72f4037b6",
  "0x0", // 0
]
```

**Returns**
See [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x32b0e286c15e446659d683c316941b656bd94871799c82ba70378bf72f4037b6", "0x0"],"id":1}'
```

Result see [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Returns information about a transaction by block number and transaction index position.

**Parameters**

1. `QUANTITY|TAG` - a block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](/references/json-rpc/#default-block).
2. `QUANTITY` - the transaction index position.

```js
params: [
  "0x2b102c3", // 45089475
  "0x0", // 0
]
```

**Returns**
See [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x2b102c3", "0x0"],"id":1}'
```

Result see [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Returns the receipt of a transaction by transaction hash.

**Note** That the receipt is not available for pending transactions.

**Parameters**

1. `DATA`, 32 Bytes - hash of a transaction

```js
params: ["0x040ccb9da0b1929b101e7a992f59ccde09b02bfba3209e7731c67111c95ee9ab"]
```

**Returns**
`Object` - A transaction receipt object, or `null` when no receipt was found:

- `transactionHash `: `DATA`, 32 Bytes - hash of the transaction.
- `transactionIndex`: `QUANTITY` - integer of the transactions index position in the block.
- `blockHash`: `DATA`, 32 Bytes - hash of the block where this transaction was in.
- `blockNumber`: `QUANTITY` - block number where this transaction was in.
- `from`: `DATA`, 20 Bytes - address of the sender.
- `to`: `DATA`, 20 Bytes - address of the receiver. null when its a contract creation transaction.
- `cumulativeGasUsed` : `QUANTITY ` - The total amount of gas used when this transaction was executed in the block.
- `effectiveGasPrice` : `QUANTITY` - The sum of the base fee and tip paid per unit of gas.
- `gasUsed `: `QUANTITY ` - The amount of gas used by this specific transaction alone.
- `contractAddress `: `DATA`, 20 Bytes - The contract address created, if the transaction was a contract creation, otherwise `null`.
- `logs`: `Array` - Array of log objects, which this transaction generated.
- `logsBloom`: `DATA`, 256 Bytes - Bloom filter for light clients to quickly retrieve related logs.
- `type`: `QUANTITY` - integer of the transaction type, `0x0` for legacy transactions, `0x1` for access list types, `0x2` for dynamic fees.

It also returns _either_ :

- `root` : `DATA` 32 bytes of post-transaction state root
- `status`: `QUANTITY` either `0x1` (success) or `0x0` (failure)

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x040ccb9da0b1929b101e7a992f59ccde09b02bfba3209e7731c67111c95ee9ab"],"id":1}'
// Result (logsBloom abbreviated)
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x32b0e286c15e446659d683c316941b656bd94871799c82ba70378bf72f4037b6",
    "blockNumber": "0x2b102c3",
    "contractAddress": null,
    "cumulativeGasUsed": "0x5208",
    "effectiveGasPrice": "0x66720b300",
    "from": "0x21864fcde19a0ea12726b4c2fbd8c7ff972c5c11",
    "gasUsed": "0x5208",
    "logs": [],
    "logsBloom": "0x00000000...",
    "status": "0x1",
    "to": "0x99eab2c5d36ce533168c00bea700b10f5413b4ad",
    "transactionHash": "0x040ccb9da0b1929b101e7a992f59ccde09b02bfba3209e7731c67111c95ee9ab",
    "transactionIndex": "0x0",
    "type": "0x0"
  }
}
```

### Uncle methods {#uncle-methods}

XPHERE's main chain uses PBFT, which produces a single canonical block per height. **There are no uncle blocks.** The four uncle methods are served for Ethereum tooling compatibility and always return an empty answer:

| Method | Exists | Always returns |
|--------|--------|----------------|
| `eth_getUncleCountByBlockHash` | Yes | `"0x0"` |
| `eth_getUncleCountByBlockNumber` | Yes | `"0x0"` |
| `eth_getUncleByBlockHashAndIndex` | Yes | `null` |
| `eth_getUncleByBlockNumberAndIndex` | Yes | `null` |

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0x2b102c3"],"id":1}'
// Result
{ "jsonrpc": "2.0", "id": 1, "result": "0x0" }
```

Do not build logic that depends on uncle rewards or uncle inclusion on XPHERE.

### eth_newFilter {#eth_newfilter}

Creates a filter object, based on filter options, to notify when the state changes (logs).
To check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).

**A note on specifying topic filters:**
Topics are order-dependent. A transaction with a log with topics [A, B] will be matched by the following topic filters:

- `[]` "anything"
- `[A]` "A in first position (and anything after)"
- `[null, B]` "anything in first position AND B in second position (and anything after)"
- `[A, B]` "A in first position AND B in second position (and anything after)"
- `[[A, B], [A, B]]` "(A OR B) in first position AND (A OR B) in second position (and anything after)"
- **Parameters**

1. `Object` - The filter options:

- `fromBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"`, `"earliest"`, `"pending"`. `"safe"` and `"finalized"` are [not supported](#default-block).
- `toBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Same values as `fromBlock`.
- `address`: `DATA|Array`, 20 Bytes - (optional) Contract address or a list of addresses from which logs should originate.
- `topics`: `Array of DATA`, - (optional) Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can also be an array of DATA with "or" options.

```js
params: [
  {
    fromBlock: "0x2b10260",
    toBlock: "0x2b10262",
    address: "0x511b90c056cfdc41173ba0f6bfac6ea603e16eb4",
    topics: [
      "0x0109fc6f55cf40689f02fbaad7af7fe7bbac8a3d2186600afc7d3e10cac60271",
      null,
    ],
  },
]
```

**Returns**
`DATA` - A filter id. XPHERE returns a 16-byte random identifier, not a small counter.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{}],"id":73}'
// Result — a new id on every call
{
  "jsonrpc": "2.0",
  "id": 73,
  "result": "0xb9c126677f6656c922ef6138a211d32b"
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Creates a filter in the node, to notify when a new block arrives.
To check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).

**Parameters**
None

**Returns**
`DATA` - A filter id.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "jsonrpc": "2.0",
  "id": 73,
  "result": "0x7b32c417bc39705a0f4a7fe150253fa0"
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Creates a filter in the node, to notify when new pending transactions arrive.
To check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).

**Parameters**
None

**Returns**
`DATA` - A filter id.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "jsonrpc": "2.0",
  "id": 73,
  "result": "0x6dd1140f770d3374662da3b207ca695"
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Uninstalls a filter with given id. Should always be called when watch is no longer needed.
Additionally Filters timeout when they aren't requested with [eth_getFilterChanges](#eth_getfilterchanges) for a period of time.

**Parameters**

1. `DATA` - The filter id.

```js
params: ["0xb9c126677f6656c922ef6138a211d32b"]
```

**Returns**
`Boolean` - `true` if the filter was successfully uninstalled, `false` if no such filter exists (including if it already timed out).

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb9c126677f6656c922ef6138a211d32b"],"id":73}'
// Result
{
  "jsonrpc": "2.0",
  "id": 73,
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Polling method for a filter, which returns an array of logs which occurred since last poll.

**Parameters**

1. `DATA` - the filter id.

```js
params: ["0xb9c126677f6656c922ef6138a211d32b"]
```

**Returns**
`Array` - Array of log objects, or an empty array if nothing has changed since last poll. An unknown or expired id returns `-32000 filter not found`.

- For filters created with `eth_newBlockFilter` the return are block hashes (`DATA`, 32 Bytes), e.g. `["0x3454645634534..."]`.
- For filters created with `eth_newPendingTransactionFilter ` the return are transaction hashes (`DATA`, 32 Bytes), e.g. `["0x6345343454645..."]`.
- For filters created with `eth_newFilter` logs are objects with following params:
  - `removed`: `TAG` - `true` when the log was removed, due to a chain reorganization. `false` if its a valid log.
  - `logIndex`: `QUANTITY` - integer of the log index position in the block. `null` when its pending log.
  - `transactionIndex`: `QUANTITY` - integer of the transactions index position log was created from. `null` when its pending log.
  - `transactionHash`: `DATA`, 32 Bytes - hash of the transactions this log was created from. `null` when its pending log.
  - `blockHash`: `DATA`, 32 Bytes - hash of the block where this log was in. `null` when its pending. `null` when its pending log.
  - `blockNumber`: `QUANTITY` - the block number where this log was in. `null` when its pending. `null` when its pending log.
  - `address`: `DATA`, 20 Bytes - address from which this log originated.
  - `data`: `DATA` - contains zero or more 32 Bytes non-indexed arguments of the log.
  - `topics`: `Array of DATA` - Array of 0 to 4 32 Bytes `DATA` of indexed log arguments. (In _solidity_: The first topic is the _hash_ of the signature of the event (e.g. `Deposit(address,bytes32,uint256)`), except you declared the event with the `anonymous` specifier.)
**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0xb9c126677f6656c922ef6138a211d32b"],"id":73}'
// Result — log objects, in the shape shown under eth_getLogs
{
  "jsonrpc": "2.0",
  "id": 73,
  "result": []
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

Returns an array of all logs matching filter with given id.

**Parameters**

1. `DATA` - The filter id.

```js
params: ["0xb9c126677f6656c922ef6138a211d32b"]
```

**Returns**
See [eth_getFilterChanges](#eth_getfilterchanges)

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0xb9c126677f6656c922ef6138a211d32b"],"id":74}'
```

Result see [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Returns an array of all logs matching a given filter object.

**Parameters**

1. `Object` - The filter options:

- `fromBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"`, `"earliest"`, `"pending"`. `"safe"` and `"finalized"` are [not supported](#default-block).
- `toBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Same values as `fromBlock`.
- `address`: `DATA|Array`, 20 Bytes - (optional) Contract address or a list of addresses from which logs should originate.
- `topics`: `Array of DATA`, - (optional) Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can also be an array of DATA with "or" options.
- `blockHash`: `DATA`, 32 Bytes - (optional) Restricts the result to the single block with this hash. Cannot be combined with `fromBlock`/`toBlock`.

```js
params: [
  {
    fromBlock: "0x2b10260",
    toBlock: "0x2b10262",
  },
]
```

**Returns**

`Array` - Array of log objects with the following fields:

- `removed`: `Boolean` - `true` when the log was removed due to a chain reorganization.
- `logIndex`: `QUANTITY` - index of the log within the block.
- `transactionIndex`: `QUANTITY` - index of the transaction that produced the log.
- `transactionHash`: `DATA`, 32 Bytes - hash of that transaction.
- `blockHash`: `DATA`, 32 Bytes - hash of the block containing the log.
- `blockNumber`: `QUANTITY` - number of that block.
- `address`: `DATA`, 20 Bytes - address that emitted the log.
- `data`: `DATA` - the non-indexed event arguments, ABI-encoded.
- `topics`: `Array of DATA` - 0 to 4 32-byte indexed arguments. For non-anonymous events, `topics[0]` is the keccak-256 hash of the event signature.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"fromBlock":"0x2b10260","toBlock":"0x2b10262"}],"id":74}'
// Result (first entry of 12)
{
  "jsonrpc": "2.0",
  "id": 74,
  "result": [
    {
      "address": "0x511b90c056cfdc41173ba0f6bfac6ea603e16eb4",
      "topics": [
        "0x0109fc6f55cf40689f02fbaad7af7fe7bbac8a3d2186600afc7d3e10cac60271",
        "0x0000000000000000000000000000000000000000000000000000000000009414",
        "0x000000000000000000000000df8ec803056b5ed5d0ed32f697c13d0e7cf642e5"
      ],
      "data": "0x000000000000000000000000000000000000000000000000000000006a72f23c",
      "blockNumber": "0x2b10260",
      "transactionHash": "0x151b23e61fd71b09cb5a1f6d4c059b27dcd0e7f8f655dfe483040b3de8a66542",
      "transactionIndex": "0x0",
      "blockHash": "0xa8dc1b9a8c20cb0b558fbf86cba7e7068c27f1aabacd24e9885667d9600d2575",
      "logIndex": "0x0",
      "removed": false
    }
  ]
}
```

:::tip Keep ranges small
XPHERE produces a block roughly every second, so a range of a few thousand blocks is only an hour of history. Public endpoints may reject or truncate very wide ranges.
:::

## Subscriptions (WebSocket only) {#subscriptions}

`eth_subscribe` and `eth_unsubscribe` require a persistent connection. Over HTTP they return `-32000 notifications not supported`:

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_subscribe","params":["newHeads"],"id":1}'
# {"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"notifications not supported"}}
```

Use the WebSocket endpoint instead — `wss://en-hkg.x-phere.com/ws` or `wss://en-bkk.x-phere.com/ws` on Mainnet, `wss://testnet.x-phere.com/ws/` on Testnet. Sending `{"jsonrpc":"2.0","method":"eth_subscribe","params":["newHeads"],"id":1}` over that connection returns a subscription id such as `"0x9781da59352731af278342760be05a24"`, followed by `eth_subscription` notifications. `eth_unsubscribe` takes that id and returns `-32000 subscription not found` for an unknown one.

The `/ws` path is required — connecting to the bare host does not upgrade. On Testnet the trailing slash matters: `/ws` answers with a `301` redirect to `/ws/`, which some WebSocket clients will not follow.

## Additional methods verified on the public endpoints {#additional-methods}

These exist and accept arguments (they return `-32602` when called with none), but are not documented in detail on this page. Their behaviour matches the Ethereum JSON-RPC specification.

| Method | Purpose |
|--------|---------|
| `eth_feeHistory` | Historical base fee and priority-fee percentiles |
| `eth_getBlockReceipts` | All receipts for one block in a single call |
| `eth_getProof` | Merkle proof for an account and storage slots (contract addresses only) |
| `eth_createAccessList` | Build an EIP-2930 access list for a call |

Check any of them before you depend on it:

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_feeHistory","params":["0x2","latest",[25,75]],"id":1}'
```

## Worked example: reading a contract {#usage-example}

Everything in this walkthrough runs against the public Mainnet endpoint with no accounts and no keys.

**1. Confirm which chain you are talking to.**

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"0x134fe69"}
```

**2. Check the address is a contract.** An empty result (`0x`) means it is an externally owned account.

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0x511b90c056cfdc41173ba0f6bfac6ea603e16eb4","latest"],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"0x60806040523480156100105760..."}
```

**3. Call a read-only function.** The `input` field is the 4-byte function selector — the first four bytes of `keccak256("owner()")` — followed by ABI-encoded arguments. Compute the selector locally; XPHERE nodes do not serve `web3_sha3`.

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x511b90c056cfdc41173ba0f6bfac6ea603e16eb4","input":"0x8da5cb5b"},"latest"],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000df8ec803056b5ed5d0ed32f697c13d0e7cf642e5"}
```

The result is a left-padded 32-byte word; the address is its last 20 bytes.

**4. Read the events it emitted.**

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"address":"0x511b90c056cfdc41173ba0f6bfac6ea603e16eb4","fromBlock":"0x2b10260","toBlock":"0x2b10262"}],"id":1}'
```

### Writing state {#writing-state}

Deploying a contract or calling a state-changing function is **not** shown as a curl flow here, because it cannot be done through a public endpoint with `eth_sendTransaction` — the node has no key for your account and returns `-32000 unknown account`.

The supported path is:

1. Build and sign the transaction locally, with chain ID `20250217` (Mainnet) or `1998991` (Testnet).
2. Estimate gas with [`eth_estimateGas`](#eth_estimategas) and read the nonce with [`eth_getTransactionCount`](#eth_gettransactioncount).
3. Submit the signed bytes with [`eth_sendRawTransaction`](#eth_sendrawtransaction).
4. Poll [`eth_getTransactionReceipt`](#eth_gettransactionreceipt) until it returns a receipt; `contractAddress` holds the deployed address for a contract creation.

Every mainstream toolchain does steps 1–4 for you. See [Smart Contracts](/developers/smart-contracts) for Hardhat and Foundry configuration, and [JavaScript API](./javascript-api) for ethers.js, web3.js and viem.

## See Also {#see-also}

- [XPHERE-Specific RPC (`xp_*`)](./xphere-rpc) — Council, Committee and dual-chain state methods
- [Network Information](./network-info) — chain IDs, endpoints, explorers
- [Public RPC Endpoints](./public-en) — providers and rate limits
- [JavaScript API](./javascript-api) — ethers.js, web3.js, viem
- [Smart Contracts](/developers/smart-contracts) — deploying and verifying
- [Endpoint Node](/nodes/Xphere-Endpoint-Node) — running your own node to enable additional namespaces
- [JSON-RPC 2.0 specification](https://www.jsonrpc.org/specification)