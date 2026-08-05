---
title: XEN CLI Commands
description: The xen command line, the xend daemon script, and what is actually callable in the interactive JavaScript console.
lang: en
---

# XEN CLI Commands

Everything on this page was checked against the XEN v0.9.0 client source and a live Mainnet node
(`https://en-hkg.x-phere.com`). Commands are shown as run from the package root — the directory
containing `bin/` and `conf/` — because the release archive does not install anything onto your
`PATH`. See [Install XEN](/nodes/Install-XEN-Guide) for unpacking and first-run setup.

## The `xen` Command Line

```bash
./bin/xen <command> [options]
./bin/xen --help            # global flags and the full command list
./bin/xen <command> --help  # flags for one command
```

`xen` registers exactly ten commands, plus the auto-generated `help`:

| Command | Arguments | What it does |
|---------|-----------|--------------|
| `account` | subcommands | Manage accounts |
| `attach` | `[endpoint]` | Start an interactive JavaScript environment (connect to node) |
| `console` | — | Start an interactive JavaScript environment (starts a node, then attaches) |
| `db-migration` | `start` | Migrate the node database to another database |
| `dumpconfig` | — | Show configuration values |
| `dumpgenesis` | — | Dump the genesis block JSON configuration to stdout |
| `init` | `<genesisPath>` | Bootstrap and initialize a new genesis block |
| `snapshot` | subcommands | State-snapshot verification tools |
| `util` | subcommands | Offline utilities |
| `version` | — | Show the version number |

:::note
Global flags such as `--datadir` belong to the application, not to every command. A command only
accepts the flags listed in its own `--help`. `--datadir`, for example, is accepted by `init`,
`attach`, `account` and `snapshot`, but **not** by `dumpgenesis`.
:::

### `init`

```bash
./bin/xen init --datadir ~/xen_data ./conf/genesis.json
```

Writes the genesis block into the data directory. The genesis file path is required — without it the
command exits with `Must supply path to genesis JSON file`.

Useful flags: `--datadir`, `--chaindatadir`, `--dbtype`, `--db.single`,
`--db.num-statetrie-shards`, `--db.leveldb.compression`, `--overwrite-genesis`,
`--state.live-pruning`.

After `init`, the chain database lives at `<DATA_DIR>/xphere/chaindata`. The subdirectory is named
after the client identifier `xphere`, **not** after the `xen` binary. (Two exceptions: `--chaindatadir`
overrides the location, and a pre-existing legacy `<DATA_DIR>/chaindata` is reused if it is already
there.) If you are unsure, find it:

```bash
find ~/xen_data -maxdepth 3 -type d -name chaindata
```

### `dumpgenesis`

```bash
./bin/xen dumpgenesis            # Mainnet genesis
./bin/xen dumpgenesis --testnet  # Testnet genesis
```

Prints the genesis configuration **built into the client** as JSON. It takes only `--mainnet` and
`--testnet`; it does not read your data directory, so it cannot be used to inspect the genesis a
particular node was initialized with.

### `account`

```bash
./bin/xen account <subcommand> [options]
```

| Subcommand | Arguments | What it does |
|------------|-----------|--------------|
| `list` | — | Print a summary of existing accounts |
| `new` | — | Create a new account |
| `update` | `<address>` | Update an existing account |
| `import` | `<keyFile>` | Import a private key into a new account |
| `bls-info` | `[endpoint]` | Fetch BLS public key info of the running node |
| `bls-import` | — | Import a BLS private key from an EIP-2335 keystore JSON |
| `bls-export` | — | Export a BLS private key to an EIP-2335 keystore JSON |

`list`, `new`, `update` and `import` accept `--datadir` and `--keystore`; `new` and `import` also
accept `--password`. Keys are stored under `<DATA_DIR>/keystore`.

### `attach` and `console`

```bash
# Connect to a node that is already running
./bin/xen attach --datadir ~/xen_data

# Connect to a specific endpoint
./bin/xen attach http://localhost:28551
```

`attach` connects to an existing node. With no endpoint argument it dials
`<DATA_DIR>/xphere.ipc` — note the IPC socket sits directly in the data directory, not inside the
`xphere/` subdirectory.

`console` is a different command: it **starts a new node** and attaches a console to it. It takes
the full node and RPC flag set. Use `attach` against a node managed by `xend`.

Both accept `--exec` (run one JavaScript statement and exit), `--preload` (comma-separated JS files)
and `--jspath`.

```bash
./bin/xen attach --datadir ~/xen_data --exec "xp.blockNumber"
```

### `db-migration`

```bash
./bin/xen db-migration start [flags]
```

One subcommand, `start`. Migrates a database to another database; the source and destination types
may differ (for example LevelDB to LevelDB, LevelDB to BadgerDB, LevelDB to DynamoDB).

:::caution
The client's own documentation states two constraints: migration is only supported when the source
DB is a single LevelDB, and you must not run a migration while the node is running.
:::

### `util`

Offline helpers. None of them contact a node.

| Subcommand | Arguments | What it does |
|------------|-----------|--------------|
| `decode-extra` | `<header file (json format)>` | Decode a header's `extraData` field |
| `decode-vote` | `<hex bytes>` | Decode a header's vote field |
| `decode-gov` | `<hex bytes>` | Decode a header's governance field |
| `decrypt-keystore` | `<keystore path> <password>` | Decrypt a keystore file |

`decode-extra` prints the Istanbul consensus data carried in the header: `hash`, `sigHash`,
`validators`, `seal`, `committedSeal`, `committers`, `validatorSize`, `committedSealSize`,
`proposer` and `round`.

Passing the wrong number of arguments prints `Invalid command. Check usage through --help command`.

:::danger
`util decrypt-keystore` prints the **unencrypted private key** to stdout, along with the address and
public key. Do not run it on a shared machine or anywhere the output could be logged.
:::

### `snapshot`

```bash
./bin/xen snapshot <subcommand> <root> [flags]
```

| Subcommand | Arguments | What it does |
|------------|-----------|--------------|
| `verify-state` | `<root>` | Traverse the whole account and storage set from the given snapshot and recalculate the state root hash — a snapshot-to-trie conversion used to verify state |
| `trace-trie` | `<root>` | Trace all account and storage nodes from the last block's state root and log any missing nodes |
| `iterate-triedb` | `<root>` | Count the nodes in the state-trie database |

:::note
This command operates on the node's **local state snapshot layer**. It is unrelated to the
downloadable chaindata archives — for those, see
[Use Chaindata Snapshots](./Use-Chaindata-Snapshots).
:::

`verify-state` takes an optional state root (it defaults to the head block's root when omitted).
`trace-trie` and `iterate-triedb` accept the argument positionally but do not use it — they operate on the last block's state root. All three accept the database flags (`--datadir`,
`--chaindatadir`, `--dbtype`, `--db.single`, `--db.num-statetrie-shards`,
`--db.leveldb.compression`, and the RocksDB/DynamoDB flags).

### `dumpconfig` and `version`

```bash
./bin/xen dumpconfig   # print the effective configuration as TOML
./bin/xen version      # print "Xphere" followed by the version
```

`dumpconfig` writes the resolved node configuration to stdout in TOML, with the genesis block
omitted.

## The `xend` Daemon Script

`xend` starts and stops the node using the settings in `conf/xend.conf`. It resolves `conf/`
relative to its own location, so keep it inside `bin/`.

| Command | Effect |
|---------|--------|
| `./bin/xend start` | Start the node in the background |
| `./bin/xend start-docker` | Run the node in the foreground and echo the `xen` command line it assembled from `xend.conf` |
| `./bin/xend stop` | Stop the node |
| `./bin/xend restart` | Stop, wait three seconds, then start |
| `./bin/xend status` | Report whether the node is running |

Any other argument prints the usage line:

```
Usages: xend {start|start-docker|stop|restart|status}
```

`start-docker` is the quickest way to see exactly which flags your `xend.conf` produces, because it
prints the assembled command before running it.

## Interactive Console

`./bin/xen attach` opens a JavaScript console against a running node. **Which objects exist is
decided by the node, not by the console**: on connect the console calls `rpc_modules` and defines a
global for every namespace the node reports. `xp` and `eth` are always defined; everything else
appears only if the node serves it.

The banner prints the client version, the data directory, and the module list — for an IPC attach to
a default Endpoint Node:

```
Welcome to the Xphere JavaScript console!

instance: Xphere/v0.9.0/linux-amd64/go1.22.12
 datadir: /home/user/xen_data
  modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0 xp:1.0
```

The `modules:` line is the node's own answer to `rpc_modules`, so it is authoritative for that
connection. Over IPC no namespace whitelist is applied, which is why the list is long. Attaching to
an HTTP endpoint instead shows only the namespaces that endpoint exposes.

### Properties and Methods Behave Differently

This trips people up, so it is worth stating explicitly:

- **Properties** are read without parentheses: `xp.blockNumber`, `xp.syncing`.
- **Methods** are functions and must be called: `xp.clientVersion()`. Typing `xp.clientVersion`
  without parentheses prints the function object, not a value.
- **Argument counts are exact.** Each method declares a fixed parameter count and throws
  `Invalid number of input parameters to RPC method` if you pass a different number — including
  passing none. `xp.getCommittee()` fails; `xp.getCommittee("latest")` works.

### `xp` Properties

Read without parentheses. Each also has an async form (`xp.getBlockNumber(callback)` for
`xp.blockNumber`, and so on).

| Property | Value |
|----------|-------|
| `xp.blockNumber` | Current block height, in decimal |
| `xp.syncing` | `false` when synced, otherwise a sync-progress object |
| `xp.accounts` | Accounts held by the node |
| `xp.protocolVersion` | Protocol version |
| `xp.chainID` / `xp.chainId` | Chain ID |
| `xp.gasPrice` | Current gas price |
| `xp.upperBoundGasPrice` | Upper bound of the dynamic gas price |
| `xp.lowerBoundGasPrice` | Lower bound of the dynamic gas price |
| `xp.maxPriorityFeePerGas` | Maximum priority fee per gas |
| `xp.nodeAddress` | This node's address |
| `xp.rewardbase` | Reward recipient address (only set on nodes configured with one) |
| `xp.pendingTransactions` | Transactions pending in this node's pool |

### `xp` Methods — Chain Data

The argument count shown is mandatory.

| Method | Args | Returns |
|--------|------|---------|
| `xp.clientVersion()` | 0 | Client version string |
| `xp.getBlock(numberOrHash, fullTx)` | 2 | Block object |
| `xp.getHeader(numberOrHash)` | 1 | Block header |
| `xp.getBlockReceipts(numberOrHash)` | 1 | All receipts in the block |
| `xp.getBlockTransactionCount(numberOrHash)` | 1 | Transaction count in the block |
| `xp.getBalance(address, block)` | 2 | Account balance |
| `xp.getCode(address, block)` | 2 | Contract bytecode |
| `xp.getStorageAt(address, position, block)` | 3 | Storage value |
| `xp.getTransaction(hash)` | 1 | Transaction object |
| `xp.getTransactionFromBlock(numberOrHash, index)` | 2 | Transaction object |
| `xp.getTransactionReceipt(hash)` | 1 | Transaction receipt |
| `xp.getTransactionCount(address, block)` | 2 | Account nonce |
| `xp.getLogs(filterObject)` | 1 | Matching logs |
| `xp.call(callObject, block)` | 2 | Call result |
| `xp.estimateGas(callObject)` | 1 | Gas estimate |
| `xp.sendRawTransaction(signedData)` | 1 | Transaction hash |
| `xp.sign(address, data)` | 2 | Signature |

`xp.getBlock`, `xp.getHeader`, `xp.getBlockTransactionCount` and `xp.getTransactionFromBlock`
dispatch on the shape of their first argument: a 32-byte `0x…` hash selects the by-hash RPC method,
anything else the by-number one.

### `xp` Methods — Consensus and Governance

| Method | Args | Returns |
|--------|------|---------|
| `xp.getCouncil(block)` | 1 | Addresses of all Council members |
| `xp.getCouncilSize(block)` | 1 | Number of Council members |
| `xp.getCommittee(block)` | 1 | Addresses in that block's Committee |
| `xp.getCommitteeSize(block)` | 1 | Number of Committee members |
| `xp.getRewards(block)` | 1 | Reward and fee distribution for that block |
| `xp.getChainConfig(block)` | 1 | Chain configuration |
| `xp.getParams(block)` | 1 | Governance parameters in effect |
| `xp.getBlockWithConsensusInfo(numberOrHash)` | 1 | Block plus proposer and committee data |
| `xp.getBlockWithConsensusInfoRange(start, end)` | 2 | The same, for a block range |
| `xp.getTotalSupply(block, showPartial)` | 2 | Total supply at that block |

:::caution The console name and the RPC name are not always the same
Several console members are client-side wrappers that call a differently named RPC method.
`xp.getBlock` calls `xp_getBlockByNumber` or `xp_getBlockByHash`; `xp.getBlockWithConsensusInfo`
calls `xp_getBlockWithConsensusInfoByNumber` or `…ByHash`; `xp.getBlockNumber` is the async form of
the `xp.blockNumber` property and calls `xp_blockNumber`.

The wrapper names are **not** valid JSON-RPC methods. Over curl, `xp_getBlock`, `xp_getBlockNumber`,
`xp_getBlockTransactionCount`, `xp_getBlockWithConsensusInfo` and `xp_getBlockWithConsensusInfoRange`
all return `-32601`. Use the real method names — see
[XPHERE-specific RPC](/references/xphere-rpc).
:::

### Other Console Objects

| Object | Available when | Notes |
|--------|----------------|-------|
| `web3` | Always | The web3 root object |
| `xp` | Always defined | Calls still fail if the node does not serve the `xp` namespace |
| `eth` | Always defined | Standard Ethereum methods |
| `net` | Node reports `net` | `net.peerCount`, `net.version`, `net.listening`, `net.peerCountByType()` |
| `rpc` | Node reports `rpc` | `rpc.modules` only |
| `personal` | Node reports `personal` | Account management |
| `admin` | Node reports `admin` | Node administration, plus console-side `admin.sleep()`, `admin.sleepBlocks()` and `admin.clearHistory()` |
| `debug` | Node reports `debug` | Debugging |
| `txpool` | Node reports `txpool` | Transaction pool inspection |
| `governance`, `istanbul` | Node reports them | Governance and consensus |

:::caution Not available at all
There is **no `miner` object** in the XEN console, and no `miner` RPC namespace in the client.
`miner.start()` and `miner_start` do not exist — `miner_start` returns `-32601`. The comment listing
`miner` among the available APIs in the shipped `conf/xend.conf` is inherited boilerplate and is
wrong.

`xp.submitTransaction` is defined as a console binding, but the RPC method behind it,
`xp_submitTransaction`, does not exist on the node. Calling it returns `-32601`. Use
`xp.sendRawTransaction` or `xp.sendTransaction`.
:::

### Worked Example

```javascript
$ ./bin/xen attach --datadir ~/xen_data

> xp.blockNumber
45152778

> xp.syncing
false

> xp.clientVersion()
"Xphere/v0.9.0/linux-amd64/go1.22.12"

> xp.getCommitteeSize("latest")
29

> net.peerCount
7
```

Most console members are thin wrappers over an RPC method, so the same value can usually be fetched
with curl — the quickest way to check something without running a node. Note that the console name
and the RPC name do not always match (see the caution above), so confirm the RPC name before
scripting against it. `xp.getRewards(45150208)` in the console is this over curl:

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getRewards","params":["0x2b0f000"],"id":1}'
```

```json
{"jsonrpc":"2.0","id":1,"result":{
  "minted": 0,
  "totalFee": 7053625000000000,
  "burntFee": 3526812500000000,
  "proposer": 1410725000000000,
  "miner": 1410725000000000,
  "xif": 705362500000000,
  "rewards": {
    "0x05d4a19b4304b2de51ac2578aa0eec5de2301e62": 705362500000000,
    "0x2fd87c94c2e8899f5f4f6753ae97eaa0e39d9285": 1410725000000000,
    "0x6499453224cbed5e95192fb65160df84da68751c": 1410725000000000
  }
}}
```

This is the on-chain view of the transaction-fee split described in
[Tokenomics](/resources/tokenomics).

## Namespace Availability

Exposed namespaces are controlled by `RPC_API` and `WS_API` in `conf/xend.conf`. The shipped
configuration sets both to `eth,net,xp`.

Ask any endpoint what it offers:

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}'
```

The Foundation's public endpoints answer:

```json
{"eth":"1.0","net":"1.0","rpc":"1.0","xp":"1.0"}
```

| Namespace | Public endpoints | Notes |
|-----------|------------------|-------|
| `eth` | Available | Standard Ethereum JSON-RPC |
| `net` | Available | Network status |
| `rpc` | Available | `rpc_modules` — always present, it is served by the RPC server itself |
| `xp` | Available | XPHERE-specific methods |
| `admin` | **Not available** | Can be enabled on your own node |
| `personal` | **Not available** | Can be enabled on your own node |
| `debug` | **Not available** | Can be enabled on your own node |
| `txpool` | **Not available** | Can be enabled on your own node |
| `governance`, `istanbul`, `web3` | **Not available** | Can be enabled on your own node |

`admin_nodeInfo`, `personal_listAccounts`, `txpool_status` and `debug_metrics` all return `-32601` on
the public endpoints. To use them, enable the namespace on a node you run yourself:

```
RPC_API="eth,net,xp,admin,txpool"
WS_API="eth,net,xp,admin,txpool"
```

The namespaces that can be listed there are `xp`, `eth`, `net`, `admin`, `personal`, `debug`,
`txpool`, `governance`, `istanbul` and `web3`. Listing `miner` has no effect — that namespace does
not exist in the client.

Over the IPC socket (`<DATA_DIR>/xphere.ipc`) no whitelist is applied: every namespace is available
regardless of `RPC_API`. That is why `xen attach --datadir …` gives you `admin` and `debug` even when
the HTTP endpoint does not. Some `debug` methods are IPC-only by design — they are withheld from
HTTP and WebSocket when the node runs with `--rpc.unsafe-debug.disable`.

:::caution
Never expose `admin`, `personal` or `debug` on an endpoint reachable from the internet. See the
security note in [Install XEN](/nodes/Install-XEN-Guide#update-the-configuration-file).
:::

## Checking Whether a Method Exists

You do not have to take this page's word for anything. Probe the method directly:

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_blockNumber","params":[],"id":1}'
```

| Response | Meaning |
|----------|---------|
| A `result` field | The method exists and ran |
| `-32601` `the method … does not exist/is not available` | The method is **not available** on this endpoint |
| `-32602` `missing value for required argument` | The method **does** exist; it needs arguments |
| `-32000` with a semantic message | The method exists; the arguments or node state were unsuitable |

For example, `xp_getBlockWithConsensusInfoByNumber` with empty parameters returns
`-32000 block number is not assigned` — proof that it exists — while `xp_getBlockWithConsensusInfo`
returns `-32601`, proof that it does not.

## See Also

- [Install XEN](/nodes/Install-XEN-Guide)
- [XEN Package Downloads](/nodes/downloads)
- [Node JSON-RPC Setup](./json-RPC-APIs)
- [Use Chaindata Snapshots](./Use-Chaindata-Snapshots)
- [XPHERE-specific RPC (`xp_*`)](/references/xphere-rpc)
- [JSON-RPC Reference](/references/json-rpc)
