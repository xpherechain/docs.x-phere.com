---
title: Introduction
description: Overview of XPHERE mining under the xpHash Proof Chain — ASIC-based mining with the IceRiver XP0.
lang: en
---

# Mining on XPHERE

XPHERE secures its **Proof Chain** with the **xpHash** Proof of Work algorithm. Mining is now **ASIC-based**: the only hardware currently supported for live mining is the **IceRiver XP0** xpHash miner.

:::caution Legacy CPU / software mining is deprecated
The previous CPU multi-threaded software miner (`Xphere-miner` binary, SHA-256 based) is **no longer supported**. All documentation describing the software miner — its system requirements, the `miner-*-amd64` binaries, and the SHA-256 algorithm — is **deprecated** and retained for historical reference only.

After the [xpHash hard fork](/mining/xphash-fork), blocks must be sealed with xpHash. Only the **IceRiver XP0** ASIC can produce valid blocks.
:::

## Current Mining Model

| Aspect | Value |
|--------|-------|
| Algorithm | **xpHash** (XPHERE-tuned Proof of Work) |
| Chain | Proof Chain — where miners submit work |
| Supported hardware | **IceRiver XP0** (xpHash ASIC) — only operable miner |
| Proof Chain block interval | ~1 minute |
| Main Chain block interval | ~1 second — this is the chain that finalizes transactions |
| How to mine | Through a pool, over Stratum |
| Payout | To an ordinary XPHERE address — no claim transaction |

Do not confuse the two intervals. The **Main Chain** produces a block roughly every second and is
what gives XPHERE its ~1-second finality. The **Proof Chain**, which is what you are mining,
produces a block roughly every minute.

## What You Need

1. An **IceRiver XP0** xpHash ASIC unit
2. An XPHERE address to receive rewards — see [Wallet Setup](/developers/wallet-setup)
3. A stable power and network environment for the device

Mining is done through a pool. **[XP Pool](https://xppool.io) is currently the only pool operating
on XPHERE**; see [Getting Started](/mining/getting-started) for its terms and for what that
concentration means.

## Next Steps

- [Getting Started](/mining/getting-started) — point the XP0 at a pool and confirm it is earning
- [xpHash Hard Fork](/mining/xphash-fork) — why ASIC mining is required
- [Mining Rewards](/mining/rewards) — emission, fee sharing, and payout flow
- [XP Staking (Union Vault)](/staking/overview) — stake XP at [stake.x-phere.com](https://stake.x-phere.com); real yield, with the remainder burned
