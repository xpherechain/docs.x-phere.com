---
title: XEN Package Downloads
sidebar_label: XEN Package Downloads
slug: /nodes/downloads
description: Download the XEN node package for XPHERE Mainnet, verify its checksum, and see what the archive contains.
lang: en
---

# XEN Package Downloads

**XEN** is the XPHERE node client. The package below contains the node binary, the daemon control
script, the Mainnet genesis file, and a working configuration with bootstrap nodes already set.

## Current Release

| Field | Value |
|-------|-------|
| Version | **v0.9.0** |
| Platform | Linux · x86-64 (amd64) |
| Network | XPHERE Mainnet (network ID `20250217`) |
| Size | 35.3 MB compressed |
| Download | **[xen-v0.9.0-amd64-linux.tar.gz](/downloads/xen-v0.9.0-amd64-linux.tar.gz)** |
| Checksum | [SHA256](/downloads/xen-v0.9.0-amd64-linux.tar.gz.sha256) |

```
SHA256: 5f9e97a117e9d05b4e1d158b80e838779fb740ed580340a169b410ec72232611
```

### Verify Before Use

```bash
curl -LO https://docs.x-phere.com/downloads/xen-v0.9.0-amd64-linux.tar.gz
curl -LO https://docs.x-phere.com/downloads/xen-v0.9.0-amd64-linux.tar.gz.sha256
sha256sum -c xen-v0.9.0-amd64-linux.tar.gz.sha256
```

Expected output: `xen-v0.9.0-amd64-linux.tar.gz: OK`

### Extract

```bash
tar -xzf xen-v0.9.0-amd64-linux.tar.gz
cd xen-v0.9.0-amd64-linux
```

## What the Archive Contains

```
xen-v0.9.0-amd64-linux/
├── bin/
│   ├── xen            # node client
│   └── xend           # daemon control script (start | stop | restart | status)
├── conf/
│   ├── genesis.json   # Mainnet genesis
│   └── xend.conf      # node configuration, bootstrap nodes pre-set
└── README.md          # setup guide bundled with the package
```

Run every command from the package root — the binaries are not on your `PATH`, so they are invoked
as `./bin/xen` and `./bin/xend`.

## Getting Started

The bundled `README.md` walks through initialization and startup. The same flow, expanded with
operational guidance, is in [Install XEN](/nodes/Install-XEN-Guide).

```bash
mkdir ~/xen_data
./bin/xen init --datadir ~/xen_data ./conf/genesis.json
./bin/xend start
```

Bootstrap nodes are already configured, so the node begins discovering peers on startup. Confirm
with `net.peerCount` after attaching:

```bash
./bin/xen attach --datadir ~/xen_data
> net.peerCount
```

:::tip Sync faster with a chain-data snapshot
Syncing Mainnet from genesis takes a long time. A snapshot is published and is the faster path for
a new node — see [Chain Data Snapshots](/nodes/Use-Chaindata-Snapshots).
:::

:::caution Review the RPC binding before exposing the node
The shipped configuration binds HTTP-RPC (`28551`) and WebSocket (`28552`) to all interfaces with
open origins. On a machine with a public IP, that makes the node's RPC reachable from the internet.
The bundled README's security section explains how to restrict it. Port `44323` (P2P) does need to
be reachable for peering.
:::

## Platform Availability

Only the Linux amd64 build is published. Builds for other platforms are not currently distributed.

## See Also

- [Install XEN](/nodes/Install-XEN-Guide) — full setup walkthrough
- [XEN CLI Commands](/nodes/xen-cli-commands)
- [Chain Data Snapshots](/nodes/Use-Chaindata-Snapshots)
- [System Requirements](/nodes/requirements)
