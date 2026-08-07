---
title: XEN Install Guide
description: Download, verify, and install the XEN endpoint node client on Linux, including checksum verification and first run.
lang: en
---

# XEN Install Guide

## Download {#download}
Get the current release from the [Download page](/nodes/downloads), or fetch it directly:

```bash
curl -LO https://docs.x-phere.com/downloads/xen-v0.9.0-amd64-linux.tar.gz
curl -LO https://docs.x-phere.com/downloads/xen-v0.9.0-amd64-linux.tar.gz.sha256
sha256sum -c xen-v0.9.0-amd64-linux.tar.gz.sha256
```

Verify the checksum before extracting — the expected output is
`xen-v0.9.0-amd64-linux.tar.gz: OK`.

Only the **Linux x86-64 (amd64)** build is distributed.

## Installation

### Linux Archive Distribution {#linux-archive-distribution}
Extract the archive where you want the node to live:

```bash
tar -xzf xen-v0.9.0-amd64-linux.tar.gz
cd xen-v0.9.0-amd64-linux
```

The package contains the binary, the daemon script, and a working configuration:

```text
xen-v0.9.0-amd64-linux/
├── bin/
│   ├── xen
│   └── xend
├── conf/
│   ├── xend.conf
│   └── genesis.json
└── README.md
```

| File Name         | File Description                  |
| :---------------- | :-------------------------------- |
| bin/xen           | XEN executable file               |
| bin/xend          | XEN start/termination script file |
| conf/xend.conf    | XEN configuration file            |
| conf/genesis.json | Mainnet genesis file              |
| README.md         | Setup guide bundled with the package |

**Note**: Do NOT alter the file structure or file names. `xend` locates `conf/` relative to its own
directory, so moving the binaries out of `bin/` breaks startup.

### Running the Commands {#installed-location}
The binaries are **not installed onto your `PATH`**. Run every command in this guide from the
package root — the directory holding `bin/` and `conf/` — as `./bin/xen` and `./bin/xend`.

If you prefer them on your `PATH`, add the `bin/` directory rather than copying the binaries out of
it:

```bash
export PATH="$PWD/bin:$PATH"
```

## Configuration {#configuration}
The EN configuration is to create a data directory and to set up the environment variables on the configuration file `xend.conf`.

1. Create the EN data directory.
2. Configure the XEN with `xend.conf`.

### XEN Data Directory Creation {#en-data-directory-creation}
XPHERE blockchain data keeps increasing, so place the data directory on a volume with room to spare. Block data alone already exceeds **300 GB** and grows with every block, and the node specification calls for **2 TB NVMe minimum (4 TB+ recommended)** — see [System Requirements](./requirements). You need to create the directory on your desired path.

```bash
mkdir -p ~/xen_data
```

The path must match `DATA_DIR` in `conf/xend.conf`, which defaults to `~/xen_data`. If you place the
data elsewhere, update that value before starting the node.

:::caution
Chain data grows continuously with every block. Size the volume with headroom rather than to the current chain size, and monitor free space on the data volume for the life of the node.
:::

### Then, initialize the blockchain data using xen init

```bash
./bin/xen init --datadir ~/xen_data ./conf/genesis.json
```

`conf/genesis.json` is the **Mainnet** genesis (network ID `20250217`).

### Update the Configuration File {#update-the-configuration-file}
The configuration file is `conf/xend.conf` inside the extracted package. The shipped defaults are
ready to run against Mainnet — review these before starting:

| Setting | Shipped value | Note |
|---------|---------------|------|
| `NETWORK_ID` | `20250217` | Mainnet |
| `DATA_DIR` | `~/xen_data` | Must match the directory you created |
| `PORT` | `44323` | P2P — must be reachable for peering |
| `BOOTNODES` | two Mainnet bootstrap nodes | Pre-set; see below |
| `RPC_ADDR` / `WS_ADDR` | `0.0.0.0` | Binds to **all** interfaces — see the security note |

#### Bootstrap Nodes {#bootstrap-nodes}
`BOOTNODES` in the shipped `conf/xend.conf` already lists the Mainnet bootstrap nodes, so a freshly
initialized node discovers peers on its own. The entries use XPHERE's `xni://` node URL form:

```text
xni://<128-char node id>@<ip>:31323?ntype=bn
```

Multiple nodes are comma-separated. Discovery runs over **UDP port 31323**, so outbound UDP to that
port must be permitted by your firewall. If you need to add a peer by hand at runtime:

```javascript
> admin.addPeer("xni://<node id>@<ip>:<port>?ntype=bn")
```

:::caution Review the RPC binding before exposing the node
The shipped configuration binds HTTP-RPC (`28551`) and WebSocket (`28552`) to `0.0.0.0` with
`RPC_VHOSTS="*"`, `RPC_CORSDOMAIN="*"`, and `WS_ORIGINS="*"`. On a host with a public IP, the
node's RPC is reachable from the internet. The exposed namespaces are `eth,net,xp` — `admin` and
`personal` are not enabled — but the endpoint can still be used without limit by anyone who finds it.

For a node that is not meant to be a public endpoint, set `RPC_ADDR` and `WS_ADDR` to `127.0.0.1`,
or block both ports at the firewall. Port `44323` (P2P) does need to stay reachable.
:::

## Startup the Xend {#startup-the-en}
Start, stop, and inspect the node with the `xend` script:

**start**

```bash
$ ./bin/xend start
Starting xend: OK
```

**stop**

```bash
$ ./bin/xend stop
Shutting down xend: Killed
```

**status**

```bash
$ ./bin/xend status
xend is running
```

`restart` is also supported. Logs are written to `LOG_DIR`, which defaults to `$DATA_DIR/logs`.

### Confirm the Node Is Syncing

```bash
./bin/xen attach --datadir ~/xen_data
> net.peerCount
> xp.blockNumber
```

`net.peerCount` should rise above `0` within a minute or two, and `xp.blockNumber` should keep
climbing. If the peer count stays at `0`, check outbound UDP/TCP on port `31323` and confirm
`BOOTNODES` is populated in `conf/xend.conf`.

:::tip Sync faster with a snapshot
Syncing Mainnet from genesis takes a long time. Restoring a published chain-data snapshot is the
faster path — see [Chain Data Snapshots](./Use-Chaindata-Snapshots).
:::

## Testing the Installation {#testing-the-installation}
It is time to check that X Endpoint Node is successfully installed and it is working as expected after installation.

### Process Status {#process-status}
Check the node's process status with the `xend` script:

```bash
$ ./bin/xend status
xend is running
```

You can also confirm the process directly:

```bash
$ ps -ef | grep '[x]en --networkid'
```

:::note Running XEN as a service
Only the archive distribution is published — there is no RPM or `.deb` package, so no
`xend.service` unit is installed and `systemctl status xend.service` will not find anything.

To run XEN under systemd, write your own unit that calls the `xend` script, for example:

```ini
# /etc/systemd/system/xend.service
[Unit]
Description=XPHERE Endpoint Node
After=network-online.target

[Service]
Type=forking
User=xphere
WorkingDirectory=/opt/xen-v0.9.0-amd64-linux
ExecStart=/opt/xen-v0.9.0-amd64-linux/bin/xend start
ExecStop=/opt/xen-v0.9.0-amd64-linux/bin/xend stop
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Adjust `User` and the paths to match your installation, then
`sudo systemctl daemon-reload && sudo systemctl enable --now xend`.
:::

### Logs {#logs}
The log is stored in `xend.out` file located in the path defined in the `LOG_DIR` field of the `xend.conf` file. When the node works properly, you can see that each block is imported per second as follows.

Example:

```bash
$ tail xend.out
INFO[03/05,11:52:58 +09] [5] Inserted a new block                      number=208163 hash=09d12c…7e2b27 txs=0 gas=0 elapsed=1.862ms      processTxs=250ns     finalize=231.833µs validateState=38.583µs  totalWrite=977.25µs     trieWrite=240.25µs
INFO[03/05,11:52:59 +09] [51] Commit new mining work                    number=208164 hash=df58fa…94e3c4 txs=0 elapsed=355µs        commitTime=217.917µs finalizeTime=130.875µs
INFO[03/05,11:52:59 +09] [25] received a quorum of the messages and change state to prepared  msgType=1 prepareMsgNum=3 commitMsgNum=0 valSet=4
INFO[03/05,11:52:59 +09] [24] Committed                                 number=208164 hash=612653…bfd9ba address=0xB54da36969A54362D0EDbA4E8c38eE199471eB9F
INFO[03/05,11:52:59 +09] [51] Successfully sealed new block             number=208164 hash=612653…bfd9ba
INFO[03/05,11:52:59 +09] [51] Successfully wrote mined block            num=208164 hash=612653…bfd9ba txs=0 elapsed=597.416µs
INFO[03/05,11:53:00 +09] [51] Commit new mining work                    number=208165 hash=105c7a…ecf460 txs=0 elapsed=2.503ms      commitTime=496.125µs finalizeTime=1.987ms
INFO[03/05,11:53:00 +09] [25] received a quorum of the messages and change state to prepared  msgType=2 valSet=4
INFO[03/05,11:53:00 +09] [24] Committed                                 number=208165 hash=be0cc2…80878c
```

### Queries {#queries}
#### xen console {#xen-console}
XPHERE provides a CLI client: `xen console`. Another way of using the client is to connect to the process via IPC (inter-process communication). The IPC file `xphere.ipc` is located in the `DATA_DIR` path on an XEN.

Please execute the following command and check out the result.

```text
$ ./bin/xen attach --datadir ~/xen_data
Welcome to the Xphere JavaScript console!

instance: Xphere/v0.9.0/linux-amd64/go1.22.12
 datadir: /home/user/xen_data
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0 xp:1.0
 >
```

The `modules:` line lists the namespaces this connection can call. Over IPC no whitelist is applied,
which is why the list is long. The full command reference is in
[XEN CLI Commands](./xen-cli-commands).

The useful APIs to check the status of XEN:

- `xp.blockNumber` (to get the latest block number)
- `net.peerCount` (to get the number of the connected XPHERE nodes currently)

#### xp.blockNumber {#xphere-blocknumber}
You can get the latest block number to see if blocks are propagated properly.

```text
> xp.blockNumber
45160854
```

Compare it against a public endpoint or [XPScan](https://xpscan.io) — if your node is still syncing,
its number will be lower and should be climbing.

#### net.peerCount {#net-peercount}
```text
> net.peerCount
6
```

The above command line returns the number of nodes that the XEN connects to.
