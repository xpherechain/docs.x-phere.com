---
title: xpHash Hard Fork
description: Migration guide for the xpHash Proof Chain hard fork — activation blocks, miner upgrade path, and verification.
lang: en
---

# xpHash Hard Fork

The **xpHash** hard fork upgrades XPHERE's Proof Chain PoW algorithm. Once activated, blocks sealed with the legacy algorithm are rejected. The fork is **now active on both Testnet and Mainnet** — only xpHash blocks (from the IceRiver XP0 ASIC) are accepted.

:::caution
This is a **consensus-breaking** change that has already activated. Running an outdated/legacy software miner produces orphaned blocks and no rewards — you must mine with the [IceRiver XP0](/mining/getting-started).
:::

## Activation Schedule

| Network | Fork Block | Status |
|---------|-----------|--------|
| **Testnet** | `327,400` | Active |
| **Mainnet** | `1,740,000` | **Active** (completed) |

Environment variable used internally by reference clients:

```bash
XPHASH_FORK_BLOCK=327400   # testnet
XPHASH_FORK_BLOCK=1740000  # mainnet
```

You can verify your client's compiled fork height with:

```bash
xen --help | grep -i fork
```

## What Changes

| Aspect | Pre-fork | Post-fork (xpHash) |
|--------|----------|--------------------|
| Algorithm | Legacy PoW | **xpHash** |
| Hash family | SHA-256 based | xpHash (XPHERE-tuned) |
| Hardware | CPU multi-thread (deprecated) | **IceRiver XP0** xpHash ASIC |
| Block reward | Unchanged | Unchanged |
| Block time | ~1s | ~1s |

The change is intentionally scoped to the PoW function only — **economic parameters, RPC, and account state are unaffected**.

## Migrating to ASIC Mining

:::caution The software miner is deprecated
The legacy CPU software miner (`miner-*-amd64` binaries + `config.json`) **cannot** produce valid xpHash blocks and is no longer supported. To mine after the fork you must use the **IceRiver XP0** xpHash ASIC.
:::

1. Obtain an **IceRiver XP0** xpHash ASIC
2. Connect it to power and network and open its web dashboard
3. Point it at a mining pool over Stratum, with your XPHERE address as the payout account — see [Getting Started](./getting-started)
4. Confirm post-fork acceptance — accepted blocks should appear in the dashboard and rewards on [XPScan](https://xpscan.io) or the [Tamsa Explorer](https://xp.tamsa.io)

See [Getting Started](/mining/getting-started) for the full XP0 setup walkthrough.

## Node Operators (XEN)

Endpoint Node operators must also upgrade. Skip steps differ:

1. Stop `xend` → `xend stop`
2. Replace `bin/xen` with the xpHash-capable binary from [Downloads](/nodes/downloads)
3. **No genesis re-init required** — the fork is in-place
4. `xend start`
5. Confirm sync continues past the fork block: `xp.blockNumber` should advance monotonically

## Validator Nodes (Main Chain)

Main Chain validators are **not affected** by xpHash — the fork only changes the Proof Chain PoW. However, validators should still upgrade their `xen` binary to maintain compatibility with new block headers signed by upgraded miners.

## Rollback Plan

There is **no rollback**. If a critical bug is discovered post-fork, the Foundation will coordinate a follow-up fork rather than reverting. Watch announcements on [Telegram](https://t.me/Xphere_official) and [X](https://x.com/Xphere_official).

## Timeline

```
Testnet 327,400  ──── soak test ────  Mainnet 1,740,000  ✓ activated
```

Both forks have completed. The testnet remains available to validate your IceRiver XP0 setup before pointing it at mainnet.

## FAQ

**Q: Will my old rewards remain valid after the fork?**
Yes. Pre-fork balances and historical transactions are preserved — only future PoW validation changes.

**Q: Do I need to re-download chaindata?**
No. The fork applies to new blocks only; existing chain history is unchanged.

**Q: What if my pool endpoint goes offline?**
Configure a backup pool on the XP0 dashboard so the unit fails over instead of idling. The fork
itself is long past, so this is ordinary operational practice rather than a fork concern.
