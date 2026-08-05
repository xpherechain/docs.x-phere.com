---
title: System Requirements
description: Requirements for operating the IceRiver XP0 xpHash ASIC miner on XPHERE.
lang: en
---

# System Requirements

:::caution CPU mining is not possible on XPHERE
Mining runs exclusively on the **IceRiver XP0** xpHash ASIC. The legacy software miner and its CPU
and operating-system requirements no longer apply — since the [xpHash fork](./xphash-fork), a CPU
cannot seal a valid block.
:::

## Mining Hardware

| Item | Requirement |
|------|-------------|
| Miner | **IceRiver XP0** (xpHash ASIC) — the only operable miner |
| Algorithm | xpHash |

For the unit's electrical, hashrate, and acoustic specifications, refer to the official IceRiver XP0 product sheet provided with the device or by the XPHERE Foundation.

## Operating Environment

- **Power**: A dedicated circuit sized to the XP0's rated draw, with stable voltage
- **Network**: Wired Ethernet with a stable internet connection to reach the XPHERE mining endpoints
- **Cooling / ventilation**: Adequate airflow and ambient temperature control for continuous ASIC operation
- **Placement**: ASIC units are loud — install in an area where noise is acceptable

## Wallet Requirements

- A [Zigap](https://about.zigap.io) wallet address on the `XPHERE 2.0` network to receive rewards (`targetMiner`)
