---
title: XPHERE-Specific JSON-RPC
description: The xp_* namespace served by XPHERE nodes - chain state, accounts, consensus and governance data, on-chain reward figures, and subscriptions. Every method listed was confirmed against a live Mainnet endpoint.
lang: en
---

# XPHERE-Specific JSON-RPC (`xp_*`)

XPHERE nodes serve an `xp_*` namespace alongside the [Ethereum-compatible methods](/references/json-rpc). Most of it mirrors the `eth_*` namespace — `xp_getBalance`, `xp_getCode`, `xp_blockNumber` and `xp_chainId` return byte-identical results to their `eth_*` counterparts. A smaller set has no Ethereum equivalent: the council and committee, the block-level consensus record, the on-chain governance parameters, and the per-block reward breakdown.

:::note Everything on this page was called
Every method documented below was invoked against `https://en-hkg.x-phere.com` (client `Xphere/v0.9.0/linux-amd64/go1.22.12`) on 2026-08-05, and every response shown was captured from that endpoint. Nothing is listed because it is expected to exist. Methods that were tried and did **not** answer are listed in [Names that are not RPC methods](#not-methods).
:::

## Checking a method yourself {#checking}

Call it with no arguments and read the error code:

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getCouncilSize","params":[],"id":1}'
```

| Response | Meaning |
|----------|---------|
| A `result` | The method exists and needs no arguments |
| `-32601 the method ... does not exist/is not available` | The method is not registered — do not use it |
| `-32602 missing value for required argument N` | The method exists and requires at least `N + 1` arguments |
| `-32000 ...` | The method exists and ran; the error came from the node, not from method lookup |

Adding arguments one at a time until the `-32602` stops is how the parameter counts on this page were established.

## Namespaces on the public endpoints {#namespaces}

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
| `wss://en-hkg.x-phere.com/ws`, `wss://en-bkk.x-phere.com/ws` | `eth`, `net`, `rpc`, `xp` |
| `https://testnet.x-phere.com` | `debug`, `eth`, `net`, `rpc`, `xp` |

Third-party providers run their own configuration and may serve more. Run `rpc_modules` against any endpoint before assuming what it offers. To add `xp` to a node you operate, put it in `RPC_API` / `WS_API` (`--rpcapi` / `--wsapi`) — see [Node JSON-RPC Setup](/nodes/json-RPC-APIs).

## Chain state {#chain-state}

| Method | Parameters | Returns |
|--------|-----------|---------|
| `xp_blockNumber` | none | `QUANTITY` — latest block number |
| `xp_getBlockByNumber` | `QUANTITY\|TAG`, `Boolean` | Block object (see [block shape](#block-shape)) |
| `xp_getBlockByHash` | `DATA` 32 bytes, `Boolean` | Block object |
| `xp_getHeaderByNumber` | `QUANTITY\|TAG` | Header object |
| `xp_getHeaderByHash` | `DATA` 32 bytes | Header object |
| `xp_getBlockTransactionCountByNumber` | `QUANTITY\|TAG` | `QUANTITY` |
| `xp_getBlockTransactionCountByHash` | `DATA` 32 bytes | `QUANTITY` |
| `xp_getBlockReceipts` | `QUANTITY\|TAG` | Array of receipt objects |
| `xp_getTotalSupply` | `QUANTITY\|TAG` | Supply object |
| `xp_gasPrice` | none | `QUANTITY` — suggested gas price in wei |
| `xp_lowerBoundGasPrice` | none | `QUANTITY` — base-fee floor in wei |
| `xp_upperBoundGasPrice` | none | `QUANTITY` — base-fee ceiling in wei |
| `xp_maxPriorityFeePerGas` | none | `QUANTITY` — suggested tip in wei |
| `xp_feeHistory` | `QUANTITY` block count, `QUANTITY\|TAG`, `Array` of percentiles | Fee history object |
| `xp_chainID`, `xp_chainId` | none | `QUANTITY` — chain ID (both spellings work) |
| `xp_syncing` | none | `false` when in sync |

### The XPHERE block shape {#block-shape}

`xp_getBlockByNumber` and `xp_getBlockByHash` do not return the Ethereum block object. There is no `difficulty`, `totalDifficulty`, `miner`, `nonce`, `mixHash`, `sha3Uncles`, `uncles` or `gasLimit`. Captured from Mainnet, with the long fields elided:

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getHeaderByNumber","params":["latest"],"id":1}'
```

```json
{
  "baseFeePerGas": "0x5d21dba00",
  "blockScore": "0x1",
  "extraData": "0xda820900...",
  "gasUsed": "0x44e21",
  "governanceData": "0x",
  "hash": "0x2df9f79cec256eebdb8c086d67184ea7dc229b0b77ad599e0a073f6b72244a30",
  "logsBloom": "0x00...",
  "number": "0x2b103dc",
  "parentHash": "0x2ad29229321f55585754504e4b1020f2533408c21c447f7169844d581baf024a",
  "receiptsRoot": "0x5fd88aadc3b7f93b04be728229cd027f117aca0b00a1367118e67e1f76814bc5",
  "reward": "0x3c96c3ec7eb41a165a01f82199798ee986f57cf7",
  "stateRoot": "0xead432e9133218308a02949e36c7c131c507e4cc1b2e9f5002bcb7c5d6b365f2",
  "timestamp": "0x6a72f439",
  "timestampFoS": "0x4e",
  "transactionsRoot": "0xffb63f71241cbe0ef91a8a18b88611b017fdc30c04a3614495b46795135a52b2",
  "voteData": "0x"
}
```

A full block adds `size`, `totalBlockScore` and `transactions`. Transaction objects carry `senderTxHash`, `signatures` and `typeInt` in addition to the usual Ethereum fields, and no `v`/`r`/`s`.

### `xp_getBlockReceipts` {#xp_getblockreceipts}

Returns every receipt in one block in a single call.

**Parameters**

1. `QUANTITY|TAG` — block number or tag

**Returns**

`Array` — one entry per transaction; `[]` for an empty block. Each entry merges transaction and receipt fields: `blockHash`, `blockNumber`, `contractAddress`, `effectiveGasPrice`, `from`, `gas`, `gasPrice`, `gasUsed`, `input`, `logs`, `logsBloom`, `nonce`, `senderTxHash`, `signatures`, `status`, `to`, `transactionHash`, `transactionIndex`, `type`, `typeInt`, `value`.

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getBlockReceipts","params":["latest"],"id":1}'
```

### `xp_getTotalSupply` {#xp_gettotalsupply}

Returns the supply accounting for a block. This has no `eth_*` equivalent.

**Parameters**

1. `QUANTITY|TAG` — block number or tag

**Returns**

`Object` with `number`, `totalSupply`, `totalMinted`, `totalBurnt`, `burntFee`, `zeroBurn`, `deadBurn`, all as hex quantities in wei.

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getTotalSupply","params":["latest"],"id":1}'
```

```json
{
  "number": "0x2b10270",
  "totalSupply": "0x953192fe4a161c23f16f4d7",
  "totalMinted": "0x111b0ec57e6499a1f4b1967f4f4f95bfd45f6ec0000",
  "totalBurnt": "0x111b0ec57e6499a1f4b1014dbc514ba9b83b7d50b29",
  "burntFee": "0x7304936c4727f083b29",
  "zeroBurn": "0xb1a2bc2ec50000",
  "deadBurn": "0x111b0ec57e6499a1f4b1014d494cad234550a07d000"
}
```

:::caution Some historical state is pruned
The public endpoints do not keep state for every past block. `xp_getCommitteeSize` answered normally for blocks up to 400 behind the head and returned `-32000 missing trie node ...` at 700 behind, on the node tested. Other state-reading methods can hit the same limit. Where the boundary sits is a property of the node you are querying, so check it against the endpoint you use rather than assuming a depth.
:::

## Accounts and transactions {#accounts}

| Method | Parameters | Returns |
|--------|-----------|---------|
| `xp_getBalance` | `DATA` 20 bytes, `QUANTITY\|TAG` | `QUANTITY` — balance in wei |
| `xp_getCode` | `DATA` 20 bytes, `QUANTITY\|TAG` | `DATA` — deployed code, `0x` for an EOA |
| `xp_getTransactionCount` | `DATA` 20 bytes, `QUANTITY\|TAG` | `QUANTITY` — next nonce |
| `xp_getStorageAt` | `DATA` 20 bytes, `QUANTITY` slot, `QUANTITY\|TAG` | `DATA` — 32-byte word |
| `xp_getAccount` | `DATA` 20 bytes, `QUANTITY\|TAG` | Account object |
| `xp_isContractAccount` | `DATA` 20 bytes, `QUANTITY\|TAG` | `Boolean` |
| `xp_accountCreated` | `DATA` 20 bytes, `QUANTITY\|TAG` | `Boolean` |
| `xp_call` | call `Object`, `QUANTITY\|TAG` | `DATA` — return value |
| `xp_estimateGas` | call `Object` | `QUANTITY` — gas estimate |
| `xp_getTransactionByHash` | `DATA` 32 bytes | Transaction object |
| `xp_getTransactionReceipt` | `DATA` 32 bytes | Receipt object |
| `xp_getTransactionBySenderTxHash` | `DATA` 32 bytes | Transaction object |
| `xp_getTransactionReceiptBySenderTxHash` | `DATA` 32 bytes | Receipt object |
| `xp_getRawTransactionByHash` | `DATA` 32 bytes | `DATA` — RLP-encoded transaction |
| `xp_getTransactionByBlockNumberAndIndex` | `QUANTITY\|TAG`, `QUANTITY` index | Transaction object |
| `xp_getTransactionByBlockHashAndIndex` | `DATA` 32 bytes, `QUANTITY` index | Transaction object |
| `xp_getRawTransactionByBlockNumberAndIndex` | `QUANTITY\|TAG`, `QUANTITY` index | `DATA` — RLP-encoded transaction |
| `xp_pendingTransactions` | none | `Array` — pending transactions known to the node |
| `xp_sha3` | `DATA` | `DATA` — keccak-256 of the input |
| `xp_encodeAccountKey`, `xp_decodeAccountKey` | registered; require at least 1 argument | Account-key encoding helpers |
| `xp_getProof`, `xp_createAccessList` | registered; require at least 1 argument | As their `eth_*` counterparts |

Unlike Ethereum's `eth_estimateGas`, `xp_estimateGas` answers with a single argument — the block parameter is optional.

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getAccount","params":["0x9e24c8ad703c8d9a638469f19e737da0e7c0b447","latest"],"id":1}'
```

```json
{
  "accType": 1,
  "account": {
    "nonce": 1,
    "balance": "0x245b90f21eb8a45fed02d6",
    "humanReadable": false,
    "key": { "keyType": 1, "key": {} }
  }
}
```

### Logs and filters {#filters}

| Method | Parameters | Returns |
|--------|-----------|---------|
| `xp_getLogs` | filter `Object` | `Array` of log objects |
| `xp_newFilter` | filter `Object` | `DATA` — filter id |
| `xp_newBlockFilter` | none | `DATA` — filter id |
| `xp_newPendingTransactionFilter` | none | `DATA` — filter id |
| `xp_getFilterChanges` | `DATA` filter id | `Array` — new items since the last poll |
| `xp_getFilterLogs` | `DATA` filter id | `Array` of logs; `-32000 filter not found` for a block or pending filter |
| `xp_uninstallFilter` | `DATA` filter id | `Boolean` |

A full round trip, all four calls verified against Mainnet:

```bash
EP=https://en-hkg.x-phere.com
ID=$(curl -s -X POST $EP -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_newBlockFilter","params":[],"id":1}' \
  | sed 's/.*"result":"//;s/".*//')
sleep 3
curl -s -X POST $EP -H "Content-Type: application/json" \
  --data "{\"jsonrpc\":\"2.0\",\"method\":\"xp_getFilterChanges\",\"params\":[\"$ID\"],\"id\":1}"
curl -s -X POST $EP -H "Content-Type: application/json" \
  --data "{\"jsonrpc\":\"2.0\",\"method\":\"xp_uninstallFilter\",\"params\":[\"$ID\"],\"id\":1}"
# {"jsonrpc":"2.0","id":1,"result":["0x4f9b1ce3...","0xa0d657a5...","0x9557734f..."]}
# {"jsonrpc":"2.0","id":1,"result":true}
```

### Methods that need a node you control {#node-scoped}

`xp_accounts`, `xp_sign`, `xp_signTransaction`, `xp_sendTransaction` and `xp_resend` are registered on the public endpoints but act on the queried node's key store, which holds nothing for you — `xp_accounts` returns `[]`. `xp_sendRawTransaction` is registered and takes one argument, the signed transaction; it was not exercised here because doing so writes to the chain. For application development, sign in your wallet or library and submit with [`eth_sendRawTransaction`](/references/json-rpc#eth_sendrawtransaction).

## Consensus and governance {#consensus}

These have no Ethereum equivalent.

### `xp_getCouncil` and `xp_getCommittee` {#council-committee}

`xp_getCouncil` returns the validator set recorded on chain for a block; `xp_getCommittee` returns the set used for consensus at that block — the same list that appears in the `committee` field of [`xp_getBlockWithConsensusInfoByNumber`](#xp_getblockwithconsensusinfobynumber). `xp_getCouncilSize` and `xp_getCommitteeSize` return the counts.

**Parameters**

1. `QUANTITY|TAG` — *optional*. Omit for the latest block.

**Returns**

`Array of DATA`, 20 bytes for the list methods; `Number` (decimal, not hex) for the size methods.

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getCommitteeSize","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":29}
```

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    "0x17d525d6437014abf62df0695338b46b3a0ce137",
    "0x1aa28342397f437db5c425d8bec100c52bf98b23",
    "0x26942edca606355fa72a0c7536f7f6772d53d374"
  ]
}
```

At the time of verification the two Mainnet sets were identical — 29 addresses each, with `xp_getCouncilSize` and `xp_getCommitteeSize` both returning `29`, and `xp_getCommittee` for a given block returned the same list, in the same order, as that block's `committee` field. The governance parameter `istanbul.committeesize` was `31`. Do not assume council and committee will always coincide — compare them for the block you care about.

### `xp_getBlockWithConsensusInfoByNumber` {#xp_getblockwithconsensusinfobynumber}

Returns a block together with who proposed it and who signed it.

**Parameters**

1. `QUANTITY|TAG` — block number or tag

**Returns**

`Object` — a full block object plus these consensus fields:

| Field | Type | Meaning |
|-------|------|---------|
| `proposer` | `DATA` 20 bytes | Address that proposed the block |
| `originProposer` | `DATA` 20 bytes | Proposer selected for round 0 |
| `round` | `Number` | Consensus round that produced the block |
| `committee` | `Array of DATA` | Committee for this block |
| `committers` | `Array of DATA` | Committee members whose signatures are in the block |
| `sigHash` | `DATA` 32 bytes | Hash the committers signed |
| `reward` | `DATA` 20 bytes | Reward recipient recorded in the header |

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getBlockWithConsensusInfoByNumber","params":["0x2b103da"],"id":1}'
```

```json
{
  "number": "0x2b103da",
  "hash": "0x7c7b0b6751e3edb6ea2faebf626edd5876e283330e86bc32ab26179525fa64b7",
  "proposer": "0xaff1c7909ce2dd5a8a19ab7a9f81e72a231c8496",
  "originProposer": "0xaff1c7909ce2dd5a8a19ab7a9f81e72a231c8496",
  "round": 0,
  "committee": ["0x17d525d6437014abf62df0695338b46b3a0ce137", "..."],
  "committers": ["0x485db80dca69e47b911611c28332682d6578ef8c", "..."],
  "sigHash": "0xe06e10c1a3cb58034ce045f35044fb88fcb51b46a6bda763c550fd0676924a6c",
  "reward": "0x3c96c3ec7eb41a165a01f82199798ee986f57cf7",
  "blockScore": "0x1",
  "totalBlockScore": "0x2b103db",
  "gasUsed": "0x44e53",
  "transactions": []
}
```

In that block `committee` held 29 addresses and `committers` 20 — the quorum that actually signed.

### `xp_getBlockWithConsensusInfoByHash` {#xp_getblockwithconsensusinfobyhash}

Same result, addressed by block hash.

**Parameters**

1. `DATA`, 32 bytes — block hash

### `xp_getBlockWithConsensusInfoByNumberRange` {#xp_getblockwithconsensusinfobynumberrange}

**Parameters**

1. `QUANTITY` — first block
2. `QUANTITY` — last block

**Returns**

`Object` keyed by block number in hex, each value a consensus-info block object.

The range is capped. Asking for 200 blocks returns:

```json
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"number of requested blocks should be smaller than 50"}}
```

### `xp_getChainConfig` {#xp_getchainconfig}

Returns the active chain configuration, including the governance and reward parameters. This is the authoritative source for XPHERE's emission settings — they are read from the chain, not from documentation.

**Parameters** — none, or an optional `QUANTITY|TAG`

**Returns** — `Object`

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getChainConfig","params":[],"id":1}'
```

```json
{
  "chainId": 20250217,
  "istanbul": { "epoch": 604800, "policy": 0, "sub": 31 },
  "unitPrice": 0,
  "deriveShaImpl": 0,
  "governance": {
    "governingNode": "0x9e24c8ad703c8d9a638469f19e737da0e7c0b447",
    "governanceMode": "single",
    "reward": {
      "xifAddress": "0x05d4a19b4304b2de51ac2578aa0eec5de2301e62",
      "mintingAmount": 2000000000000000000000,
      "ratio": "40/40/20",
      "blockInterval": 60
    },
    "dgp": {
      "lowerboundbasefee": 25000000000,
      "upperboundbasefee": 750000000000,
      "gastarget": 30000000,
      "maxblockgasusedforbasefee": 60000000,
      "basefeedenominator": 20
    }
  }
}
```

`governance.reward.ratio` is the split applied to newly minted XP — `proposer/miner/xif` — and it matches the figures returned by [`xp_getRewards`](#xp_getrewards). `dgp.lowerboundbasefee` and `dgp.upperboundbasefee` are the same wei values that `xp_lowerBoundGasPrice` and `xp_upperBoundGasPrice` return in hex.

### `xp_getParams` {#xp_getparams}

The same governance parameters as a flat map. Useful because the large numbers come back as strings here.

**Parameters** — none, or an optional `QUANTITY|TAG`

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getParams","params":[],"id":1}'
```

```json
{
  "dgp.basefeedenominator": 20,
  "dgp.gastarget": 30000000,
  "dgp.lowerboundbasefee": 25000000000,
  "dgp.maxblockgasusedforbasefee": 60000000,
  "dgp.upperboundbasefee": 750000000000,
  "governance.deriveshaimpl": 0,
  "governance.governancemode": "single",
  "governance.governingnode": "0x9e24c8ad703c8d9a638469f19e737da0e7c0b447",
  "governance.unitprice": 0,
  "istanbul.committeesize": 31,
  "istanbul.epoch": 604800,
  "istanbul.policy": 0,
  "reward.blockinterval": 60,
  "reward.mintingamount": "2000000000000000000000",
  "reward.ratio": "40/40/20",
  "reward.xifaddress": "0x05d4a19b4304b2de51ac2578aa0eec5de2301e62"
}
```

### `xp_getRewards` {#xp_getrewards}

Returns the reward and fee breakdown for a block: what was minted, what was burnt, and what each recipient received.

**Parameters**

1. `QUANTITY|TAG` — *optional*. Omit for the latest block.

**Returns**

| Field | Type | Meaning |
|-------|------|---------|
| `minted` | `Number` | XP newly issued at this block, in wei. `0` for most blocks |
| `totalFee` | `Number` | Transaction fees collected in the block, in wei |
| `burntFee` | `Number` | Portion of `totalFee` burnt |
| `proposer` | `Number` | Amount credited to the block proposer |
| `miner` | `Number` | Amount credited to the miner share |
| `xif` | `Number` | Amount credited to the XIF address from `xp_getChainConfig` |
| `rewards` | `Object` | Address → amount actually paid |

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getRewards","params":["0x2b10358"],"id":1}'
```

```json
{
  "minted": 1474400000000000262144,
  "totalFee": 7055125000000000,
  "burntFee": 3527562500000000,
  "proposer": 589761411025000104857,
  "miner": 589761411025000104857,
  "xif": 294880705512500052428,
  "rewards": {
    "0x05d4a19b4304b2de51ac2578aa0eec5de2301e62": 294880705512500052428,
    "0x26942edca606355fa72a0c7536f7f6772d53d374": 589761411025000104857,
    "0x29fe01d3adc64ba2f8ac2e64f08204a33a676f17": 589761411025000104857
  }
}
```

The numbers are internally consistent and reproduce the split held in governance. On the sampled blocks:

| Quantity | Identity |
|----------|----------|
| `burntFee` | 50% of `totalFee` |
| `proposer` | 40% of `minted` + 20% of `totalFee` |
| `miner` | 40% of `minted` + 20% of `totalFee` |
| `xif` | 20% of `minted` + 10% of `totalFee` |

The 40/40/20 part is exactly `governance.reward.ratio` from [`xp_getChainConfig`](#xp_getchainconfig). Blocks with no transactions and no minting return all zeros, which is normal.

:::caution These are JSON numbers, not hex strings
Unlike the `eth_*` namespace, `xp_getRewards`, `xp_getChainConfig` and `xp_getParams` emit plain JSON numbers. Values above 2<sup>53</sup> lose precision in any parser backed by IEEE-754 doubles — `1474400000000000262144` above is the double nearest to `1474400000000000000000`, and the trailing digits are an artifact. Parse with a big-number-aware JSON reader, or take `reward.mintingamount` from `xp_getParams`, where it is a string.
:::

## Node information {#node-info}

| Method | Parameters | Returns |
|--------|-----------|---------|
| `xp_clientVersion` | none | `String` — e.g. `"Xphere/v0.9.0/linux-amd64/go1.22.12"` |
| `xp_protocolVersion` | none | `String` — e.g. `"0x40"` |
| `xp_nodeAddress` | none | `DATA` 20 bytes — the queried node's own address |
| `xp_syncing` | none | `false` when the node is in sync |
| `xp_accounts` | none | `Array` — the node's key store, `[]` on public endpoints |
| `xp_rewardbase` | none | The node's reward address; returns `-32000 rewardbase must be explicitly specified` when the operator did not set one |

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_clientVersion","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"Xphere/v0.9.0/linux-amd64/go1.22.12"}
```

`xp_nodeAddress` describes the endpoint you happen to be talking to, not the network.

## Subscriptions {#subscriptions}

`xp_subscribe` and `xp_unsubscribe` are WebSocket-only. Over HTTP the node answers:

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_subscribe","params":["newHeads"],"id":1}'
# {"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"notifications not supported"}}
```

Connect to `wss://en-hkg.x-phere.com/ws` or `wss://en-bkk.x-phere.com/ws` instead. The bare host without `/ws` is not a WebSocket endpoint — it answers HTTP 200 and the handshake fails.

**Topics confirmed to subscribe:** `newHeads`, `logs`, `newPendingTransactions`. An unknown topic returns `-32601 no "<topic>" subscription in xp namespace`.

`xp_subscribe` returns a subscription id. Notifications then arrive with method `xp_subscription` and a `params` object holding `subscription` and `result`. `xp_unsubscribe` takes the id and returns `true`.

```python
import asyncio, json, websockets

async def main():
    async with websockets.connect("wss://en-hkg.x-phere.com/ws") as ws:
        await ws.send(json.dumps({"jsonrpc":"2.0","method":"xp_subscribe","params":["newHeads"],"id":1}))
        sub = json.loads(await ws.recv())["result"]
        print("subscription", sub)
        msg = json.loads(await ws.recv())
        print(msg["method"], msg["params"]["result"]["number"])
        await ws.send(json.dumps({"jsonrpc":"2.0","method":"xp_unsubscribe","params":[sub],"id":2}))

asyncio.run(main())
```

```text
subscription 0x8a68571c3149f0d562dbb20e2d219e7
xp_subscription 0x2b102c5
```

`eth_subscribe` works over the same connection and behaves the same way.

## Names that are not RPC methods {#not-methods}

An earlier version of this page listed the methods below. They are **not** registered on XPHERE nodes: every one returns `-32601`. If you copied them, replace them with the method in the right-hand column.

| Name | Status | Use instead |
|------|--------|-------------|
| `xp_getBlock` | `-32601` | `xp_getBlockByNumber`, `xp_getBlockByHash` |
| `xp_getBlockNumber` | `-32601` | `xp_blockNumber` |
| `xp_getBlockTransactionCount` | `-32601` | `xp_getBlockTransactionCountByNumber`, `xp_getBlockTransactionCountByHash` |
| `xp_getBlockWithConsensusInfo` | `-32601` | [`xp_getBlockWithConsensusInfoByNumber`](#xp_getblockwithconsensusinfobynumber), [`xp_getBlockWithConsensusInfoByHash`](#xp_getblockwithconsensusinfobyhash) |
| `xp_getBlockWithConsensusInfoRange` | `-32601` | [`xp_getBlockWithConsensusInfoByNumberRange`](#xp_getblockwithconsensusinfobynumberrange) |

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getBlockWithConsensusInfo","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"error":{"code":-32601,"message":"the method xp_getBlockWithConsensusInfo does not exist/is not available"}}
```

Two clarifications:

- **This is a statement about RPC only.** A name in the table above may still exist as a member of the `xp` object in the XEN JavaScript console. Console helpers are JavaScript wrappers that call whatever RPC method they are bound to, and that name need not match the one you type. If a console call works, that does not make the console's name a valid RPC method. See [XEN CLI Commands](/nodes/xen-cli-commands).
- **Two response shapes shown on the earlier page do not exist.** No XPHERE response contains a `consensus` object with `prepareMsgNum`, `commitMsgNum` and `validators` — the real consensus fields are listed [above](#xp_getblockwithconsensusinfobynumber). And `xp_getChainConfig` returns no `xpHashForkBlock`, `blockTime`, `consensus` or `proofChain` fields; its actual response is [above](#xp_getchainconfig).

`xp_getCode` was also listed on the earlier page as a compatibility helper. It is real — see [Accounts and transactions](#accounts).

## See Also

- [JSON-RPC API](./json-rpc) — the `eth_*`, `net_*` and `rpc_*` methods
- [Node JSON-RPC Setup](/nodes/json-RPC-APIs) — enabling and securing `xp` on your own node
- [XEN CLI Commands](/nodes/xen-cli-commands) — the JavaScript console
- [Network Information](./network-info) — chain IDs and endpoints
