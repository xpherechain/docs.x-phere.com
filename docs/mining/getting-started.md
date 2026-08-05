---
title: Getting Started
description: Set up and run the IceRiver XP0 xpHash ASIC miner on XPHERE.
lang: en
---

# Getting Started

This guide covers running the **IceRiver XP0** xpHash ASIC — the only miner currently operable on XPHERE.

:::caution The software miner is deprecated
The previous setup based on the `miner-darwin-amd64` / `miner-windows-amd64` software binaries and `config.json` is **no longer supported**. After the [xpHash hard fork](/mining/xphash-fork), only the IceRiver XP0 ASIC can seal valid blocks. The instructions below replace the legacy software flow entirely.
:::

## Prerequisites

Before you begin, ensure you have:

- An **IceRiver XP0** xpHash ASIC unit (see [System Requirements](/mining/requirements))
- A [Zigap](https://about.zigap.io) wallet address on the `XPHERE 2.0` network — this is your `targetMiner` payout address
- A wired network connection and adequate power/cooling for the device

## 1. Wallet Setup

1. Create a wallet at [Zigap](https://about.zigap.io)
2. Select the `XPHERE 2.0` network
3. Copy your wallet address — you will configure it as the payout (`targetMiner`) address on the miner

## 2. Connect the IceRiver XP0

1. Connect the XP0 to power and to your network via Ethernet
2. Find the device's IP address on your local network (via your router's client list or the IceRiver discovery tool)
3. Open the device's web dashboard in a browser at its IP address and sign in

## 3. Configure the Mining Endpoint

In the XP0 dashboard, point the miner at one of the XPHERE mining endpoints and set your payout address:

**Mainnet endpoints**

```
https://sgp-mining.x-phere.com
https://bkk-mining.x-phere.com
https://hkg-mining.x-phere.com
https://idn-mining.x-phere.com
```

**Testnet endpoint**

```
https://testnet-asia-mining.x-phere.com
```

- **Payout / worker address** (`targetMiner`): your Zigap `XPHERE 2.0` address
- Configure at least two endpoints where the dashboard allows it, so the miner can fail over if one is unavailable

Save the configuration and restart mining from the dashboard.

## 4. Verify Operation

- The XP0 dashboard should show an accepted-share / accepted-block rate above zero once it connects to an endpoint
- Confirm rewards are being credited to your address on [XPScan](https://xpscan.io), the [Tamsa Explorer](https://xp.tamsa.io), or via `eth_getBalance`

See [Mining Rewards](/mining/rewards) for how the minted reward (20% Foundation / 40% Miner / 40% Union) is distributed.
