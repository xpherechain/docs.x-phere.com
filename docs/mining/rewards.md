---
title: Mining Rewards
description: How XPHERE distributes mining income — minted emission and its periodic reduction, the Foundation / Miner / Union split, and the miner share of transaction fees.
lang: en
---

# Mining Rewards

Miners on XPHERE earn from **two** protocol-level streams:

| Stream | Miner share | Basis |
|--------|-------------|-------|
| Minted block reward | **40%** | A fixed amount minted every 60 blocks |
| Transaction fees | **20%** | Fees paid by users on every transaction |

XPHERE **mints** new XP on a fixed cadence and distributes it across three recipients; transaction
fees are distributed separately across four. There is **no separate claim transaction** — allocations
are credited directly.

## Emission & Reduction

A fixed amount of XP is minted **every 60 seconds** (every 60 main blocks). The emission **decreases by `26.28%` per cycle** — i.e. it is multiplied by a factor of `0.7372` — every **31,536,000 main blocks** (≈ 1 year at the ~1 second block time).

The **first reduction has already occurred**, so the current emission is `2000 × 0.7372 = 1474.4` XP per 60 seconds.

| Period | Reduction Boundary (main block) | Emission / 60s |
|--------|--------------------------------|----------------|
| Initial | 0 | 2000 XP |
| **After 1st reduction (current)** | 31,536,000 | **1474.4 XP** |
| After 2nd reduction | 63,072,000 | ~1086.93 XP |
| After 3rd reduction | 94,608,000 | ~801.28 XP |

Each successive cycle multiplies the previous emission by `0.7372` (a 26.28% annual reduction). See [Whitepaper §5.c](/whitepaper#c-emission-mechanism) for the full 100-year schedule.

## Minted Reward Allocation

Every emission is split across three recipients:

| Recipient | Share | Current (per 60s, post-1st-reduction) |
|-----------|-------|----------------------------------------|
| Foundation | **20%** | 294.88 XP |
| Miner | **40%** | 589.76 XP |
| Union | **40%** | 589.76 XP |

- **Miner (40%)** is distributed to xpHash miners according to their share of network hashrate.
- **Union (40%)** goes to [Union](/union) validator members — the validator group that records blocks
  on the Main Chain.
- **Foundation (20%)** funds ongoing network operations.

## Transaction Fee Allocation

Transaction fees are distributed separately from minted emission, across four destinations:

| Destination | Share | Where it goes |
|-------------|-------|---------------|
| Burn | **50%** | Permanently removed from circulation |
| Union | **20%** | [Union](/union) validator members |
| **Miner** | **20%** | **xpHash Proof Chain miners** |
| Foundation | **10%** | Ongoing network operations |
| **Total** | **100%** | |

This is the second half of a miner's income. It is **not** minted — it comes from fees users already
paid, so it scales with network activity rather than with the emission schedule. The same split is
documented in [Tokenomics](/resources/tokenomics#transaction-fees-and-burn).

:::tip The Union share is not the same thing as the staking vault
Mining earns you the **miner** shares (40% of minted rewards, 20% of fees). The **Union** shares go
to [Union](/union) validator members at the protocol level — that is not a pool product you buy into.
Separately, XP holders can stake in the Foundation's **[XP Union Vault](/staking/overview)** at
[stake.x-phere.com](https://stake.x-phere.com), a staking service that pays stakers from the real
earnings of the Foundation's own Union node and burns the remainder. See
[Union Staking](/resources/staking) for the protocol-level economics.
:::

## Payout Flow

Mining is done through a pool, so there are two hops — the protocol's, and the pool's.

1. Your IceRiver XP0 submits shares to the pool over Stratum.
2. When the pool seals a valid Proof Chain block, the protocol credits the **miner allocation** for
   that reward cycle.
3. The pool distributes that income among its participants according to their accumulated difficulty
   contribution, after deducting its fee.
4. Your balance is queryable on [XPScan](https://xpscan.io), the
   [Tamsa Explorer](https://xp.tamsa.io), or via `eth_getBalance`.

There is **no claim transaction** at either hop — payouts arrive in your address on the pool's
schedule. See [Getting Started](./getting-started#how-pool-payouts-work) for the current pool's fee,
minimum payout, and distribution interval.

## Estimating Your Earnings

Total mining income is the sum of both streams:

```
your_income = minted_share + fee_share
```

### Minted share

This part is predictable, because the emission is fixed for the current cycle. It is proportional to
your share of network hashrate:

```
your_xp_per_60s ≈ (your_hashrate / network_hashrate) × (emission_per_60s × 0.40)
```

Example, at the current emission (1474.4 XP / 60s) with 1% of network hashrate:

```
0.01 × (1474.4 × 0.40) ≈ 5.90 XP per 60s ≈ 8,493 XP/day
```

This is the figure **before** your pool's fee. At a 1% pool fee, you would receive about
`8,493 × 0.99 ≈ 8,408 XP/day` of it.

Network and pool hashrate are published on the [XPScan](https://xpscan.io) mining dashboard and on
[xppool.io](https://xppool.io).

### Fee share

Miners additionally receive **20% of transaction fees**. This part cannot be projected the same way:
it depends on how much the network is actually used. The Foundation has published neither an
aggregate fee-volume forecast nor a per-miner fee distribution formula, so no estimate of it should
be treated as official.

So read the `8,493 XP/day` above as the **minted portion only** — a floor for the current emission
cycle, not a total. Real fee income is observable after the fact: check your address balance on
[XPScan](https://xpscan.io) or the [Tamsa Explorer](https://xp.tamsa.io), or query it with
`eth_getBalance`.

:::caution
These figures are illustrative arithmetic, not a forecast. Emission falls **26.28% each cycle**,
network hashrate changes continuously, and fee volume is not guaranteed. Nothing here is a projection
of revenue or token value.
:::

## Tax & Reporting

The XPHERE Foundation does not issue mining tax forms. Consult your local jurisdiction's rules for cryptocurrency mining income.

## See Also

- [Getting Started with Mining](./getting-started)
- [System Requirements](./requirements)
- [xpHash Hard Fork](./xphash-fork)
- [Union](/union) — the validator group that receives the Union shares
- [Tokenomics](/resources/tokenomics) — full token supply, emission, and fee distribution
