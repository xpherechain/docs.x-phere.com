---
title: Members
description: The current XPHERE Union member list, slot counts, and how to verify it yourself on the explorer or the public API.
lang: en
sidebar_position: 2
---

# Union Members

The **XPHERE Union** is the network's validator group. Membership is held in **slots**, and every
slot carries an identical stake. This page lists the members recorded on-chain at the time of the
snapshot below.

:::note Snapshot taken 2026-08-05
The figures and the member list on this page are a **point-in-time snapshot** read from the Tamsa
Explorer API on **2026-08-05**. The **live on-chain list is authoritative** — see
[Verify This List Yourself](#verify-this-list-yourself) before relying on any number here.
:::

## At a Glance

| Metric | Value |
|--------|-------|
| Active Union slots | **25** of a target of **31** |
| Stake per slot | Exactly **35,000,000 XP** — identical across every slot |
| Total staked | **875,000,000 XP** |
| Blocks proposed (cumulative) | **31,855,983** |
| Earliest registration | 2025-04-22 |
| Most recent registration | 2026-07-30 |

## Member List

Ordered by first registration date.

| Member | Slots | First registered |
|--------|-------|------------------|
| HorizonXVC | 10 | 2025-04-22 |
| NextGen Ventures | 4 | 2025-06-25 |
| SeoulLabs | 1 | 2025-07-01 |
| B+Healthy | 1 | 2025-07-07 |
| ankr | 1 | 2025-08-04 |
| Nansen | 1 | 2025-11-05 |
| XP1 | 1 | 2026-01-06 |
| TOKENPOST | 1 | 2026-06-03 |
| Web3Wave | 2 | 2026-06-08 |
| RWA | 1 | 2026-06-12 |
| XBM | 1 | 2026-06-12 |
| XP VAULT | 1 | 2026-07-30 |

**Total: 12 members holding 25 slots.**

Where a member holds more than one slot, the date shown is the registration date of its **first**
slot; later slots were added afterwards.

:::note Wallet addresses
Individual member node addresses are **not published here**, because the set of addresses changes as
slots are added. Each slot's registered address is visible on the explorer pages linked below and in
the API response.
:::

## Slots, Not Seats

A Union member may hold **more than one slot**. Slots are not a tier or a weighting factor — each one
is an independent membership position:

- **Each slot requires its own 35,000,000 XP stake.** A member holding 10 slots has staked
  `10 × 35,000,000 = 350,000,000 XP`. This is why 25 slots correspond to 875,000,000 XP staked.
- **Each slot takes its own turn in the round-robin proposer rotation.** Proposer turns cycle through
  the eligible slots in a predetermined, sequential order, so a member with more slots receives
  proportionally more proposer turns — and, with them, a proportionally larger share of the
  [40% Union block reward](/mining/rewards).

Governance voting is **not** scaled by slot count. Each **member** holds one vote, and the XPHERE
Foundation casts the tie-breaking vote when a decision is tied — see the
[Union overview](/union).

## Verify This List Yourself

The list above is derived from public on-chain data. Three independent ways to check the current
state:

| Source | Where |
|--------|-------|
| Tamsa Explorer | [https://xp.tamsa.io/main/unions](https://xp.tamsa.io/main/unions) |
| XPScan | [https://xpscan.io/unions](https://xpscan.io/unions) |
| Public API | `https://api.tamsa.io/api/v1/unions?page=1&count=100` |

Query the API directly:

```bash
curl "https://api.tamsa.io/api/v1/unions?page=1&count=100"
```

The response paginates; `count=100` is sufficient to return all slots at the size recorded above.
If your query returns a different slot count, total stake, or member set than this page, **the API
result is correct and this page is stale**.

:::caution
Slot counts, total stake, and cumulative proposed blocks all change over time as slots are added and
as blocks are produced. Do not cite the figures on this page as current without re-checking one of
the sources above.
:::

## See Also

- [XPHERE Union](/union) — what the Union is, requirements, and the registration process
- [Validator Node](/nodes/validator-node) — infrastructure and operational requirements
- [Union Staking](/resources/staking) — the protocol-level Union reward share
- [Mining Rewards](/mining/rewards) — the 20 / 40 / 40 minted-reward split
