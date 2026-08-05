---
title: Overview
description: XP Union Vault — a non-custodial staking vault that pays stakers from real validator earnings and permanently burns the remainder.
lang: en
sidebar_position: 1
---

# XP Staking (Union Vault)

**XP Union Vault** is a non-custodial staking vault that turns the real earnings of the Foundation's Union validator node into **staker rewards and permanent XP burn at the same time**.

:::tip Staking service — [stake.x-phere.com](https://stake.x-phere.com)
Stake, claim, and unstake at **[stake.x-phere.com](https://stake.x-phere.com)**.
Live protocol state: [`/status.html`](https://stake.x-phere.com/status.html) · Burn record: [`/burn.html`](https://stake.x-phere.com/burn.html)
:::

## What Makes It Different

| Pillar | What it means |
|--------|---------------|
| **① Real yield** | Rewards are **not newly minted**. They come from validator rewards the Union node actually earned. |
| **② Deflationary** | **More than 40% of every day's rewards are permanently burned** to `0x…dEaD`. |
| **③ Non-custodial** | Your principal is **never re-deployed or re-staked**. It stays yours and is withdrawable in full. |

## At a Glance

| Parameter | Current value |
|-----------|---------------|
| Network | XPHERE Mainnet, Chain ID `20250217` |
| Deposit asset | Native **XP** — no wrapping required |
| Cap | **2,000,000 XP** (guarded launch; raised in stages through the 48-hour timelock, target **35,000,000 XP**) |
| Settlement epoch | **1 day**, permissionless `settle` |
| Distribution | **60% to stakers · 40%+ burned** |
| Reward accrual | Streamed over 24 hours, **accruing every second** |
| Unstaking | Request → **7-day cooldown** → 100% of principal |
| Reward claiming | **No expiry** — claim any time |
| User fees | **0%** — you pay gas only |
| Standard | ERC-4626 vault with ERC-7540-style asynchronous redemption |
| Upgradeability | Contract logic is **not upgradeable** (no proxy). Operational parameters change only through a **48-hour on-chain timelock**. |

## How the Split Works, in One Line

Each day, the rewards that flowed into the vault are split by how full the cap is:

```
staker allocation = inflow × 60% × (staked ÷ cap)
everything else   = burned
```

Every staker is paid for **their own seat only**, so your APR does not depend on how many others join. The yield attached to empty seats is burned. See [How It Works](./how-it-works).

:::caution
APR **varies with the node's earnings and is not guaranteed**, and staking a smart contract carries risk. All example figures in these pages are illustrative. Read [Fees & Risks](./fees-and-risks) before staking.
:::

## Where to Next

- [How It Works](./how-it-works) — settlement, the reserved-seat model, streaming, vault accounting
- [User Guide](./user-guide) — stake, claim, and unstake step by step
- [Fees & Risks](./fees-and-risks) — what you pay and what you accept
- [For Partners](./for-partners) — one-URL referral integration
- [Contracts & Verification](./contracts) — addresses and how to verify them yourself
- [FAQ](./faq)

## See Also

- [Union Staking](/resources/staking) — the protocol-level Union reward share
- [Mining Rewards](/mining/rewards) — the 20 / 40 / 40 minted-reward split
