---
title: Use Chaindata Snapshots
description: Restore an XPHERE node from a published chaindata snapshot instead of syncing from genesis, including disk space requirements and verification.
lang: en
---

# Use Chaindata Snapshots

You can start a node from an already-synced database called a chaindata snapshot. A chaindata
snapshot is a compressed copy of a node's chain database, and restoring one is far faster than
syncing XPHERE Mainnet from genesis.

## Check Free Space First

A snapshot is **downloaded and then extracted**, so the volume must hold the compressed archive and
the uncompressed data at the same time until you delete the archive.

The current Mainnet snapshot is roughly **230 GB compressed**, and it expands well beyond that.
XPHERE block data alone already exceeds **300 GB** and grows continuously with every block, and the
node specification calls for **2 TB NVMe minimum (4 TB+ recommended)** — see
[System Requirements](./requirements).

:::caution
Do not size the volume to the current chain data. Leave headroom for the archive, for extraction,
and for ongoing growth, and monitor free space on the data volume after the node is running.
:::

## Find the Current Snapshot

Snapshot filenames carry a timestamp and change as new ones are published, so look up the current
file rather than hard-coding a name:

```bash
curl -s https://package.x-phere.com/mainnet/chain-data
```

```json
{"files":[{"prefix":"mainnet","name":"xphere-mainnet-chaindata-20260804095117.tar.gz",
 "lastModified":"2026-08-04T08:26:48.560Z","size":"246430233094"}]}
```

The `name` field is the file to download, and `size` is its compressed size in bytes.

:::note Mainnet only
No testnet snapshot is currently published — `https://package.x-phere.com/testnet/chain-data`
returns an empty list. A testnet node must sync from genesis.
:::

## Download

Download into a directory with enough free space. Substitute the filename you got above:

```bash
SNAPSHOT=xphere-mainnet-chaindata-20260804095117.tar.gz
curl -O "https://storage.googleapis.com/xphere-mainnet/$SNAPSHOT"
```

The download supports HTTP range requests, so it can be resumed if interrupted:

```bash
curl -C - -O "https://storage.googleapis.com/xphere-mainnet/$SNAPSHOT"
```

## Decompress

Extract into an empty staging directory. The archive contains the **contents** of the chain database
— partition directories such as `header/`, `body/`, and `receipts/` — not a folder named
`chaindata`:

```bash
mkdir -p ~/snapshot_stage
tar -xzf "$SNAPSHOT" -C ~/snapshot_stage
ls ~/snapshot_stage
# header/  body/  receipts/  ...
```

## Apply the Chaindata Snapshot

**First step:** Stop the node completely and confirm it has exited.

```bash
./bin/xend stop
./bin/xend status
```

**Second step:** Locate the node's chain database directory. It lives under the `DATA_DIR` set in
`conf/xend.conf`, inside a subdirectory named after the client:

```bash
find ~/xen_data -maxdepth 3 -type d -name chaindata
# e.g. /home/user/xen_data/xphere/chaindata
```

The subdirectory is named after the client identifier `xphere`, not after the `xen` binary.

Use whatever path this returns as `CHAINDATA` below. If the node has never been initialized, run
`./bin/xen init` first so the directory structure exists.

**Third step:** Replace the contents of that directory with the extracted snapshot.

```bash
CHAINDATA=~/xen_data/xphere/chaindata  # use the path found above
mv "$CHAINDATA" "$CHAINDATA.bak"       # keep the old data until the node is verified
mkdir -p "$CHAINDATA"
mv ~/snapshot_stage/* "$CHAINDATA"/
```

Moving the old directory aside rather than deleting it lets you roll back if the restore does not
take.

**Fourth step:** Restart the node and confirm it picks up the snapshot.

```bash
./bin/xend start
./bin/xen attach --datadir ~/xen_data
> xp.blockNumber
> net.peerCount
```

`xp.blockNumber` should start near the snapshot's block height rather than at `0`, and continue
climbing as the node catches up.

**Fifth step (once verified):** Reclaim the space.

```bash
rm -rf "$CHAINDATA.bak"
rm "$SNAPSHOT"
```

## Downloads

| Network | Sync option | Snapshot listing |
| ------- | ----------- | ---------------- |
| mainnet | Full Sync   | [package.x-phere.com/mainnet](https://package.x-phere.com/mainnet) · [`/mainnet/chain-data`](https://package.x-phere.com/mainnet/chain-data) (JSON) |
| testnet | Full Sync   | [package.x-phere.com/testnet](https://package.x-phere.com/testnet) — no snapshot published yet |

## See Also

- [Install XEN](./Install-XEN-Guide)
- [System Requirements](./requirements)
- [XEN Package Downloads](/nodes/downloads)
