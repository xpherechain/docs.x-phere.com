---
title: FAQ
description: Frequently asked questions about XP Staking (Union Vault) — yield source, burn, cap, unstaking, fees, and verification.
lang: en
sidebar_position: 7
---

# Staking FAQ

## Rewards

### Where does the yield come from?
From validator rewards the Foundation's **Union validator node actually earned**. Nothing is newly minted to pay stakers — this is real yield.

### Is the APR guaranteed?
**No.** The rate moves with the node's earnings. Every figure shown in the interface or these docs is **illustrative**, not a promise. See [Fees & Risks](./fees-and-risks).

### How is the daily amount calculated?
At each daily settlement:

```
staker allocation = inflow × 60% × (staked ÷ cap)
everything else   = burned
```

See [How It Works](./how-it-works).

### Does my APR fall when more people stake?
**No.** Each staker is paid for their own seat against the cap, so your rate is independent of how many others join or leave.

### When do rewards arrive?
They **stream over 24 hours, accruing every second**, rather than landing as a daily lump sum. That also means depositing right before a settlement cannot capture a whole day of rewards.

### Do rewards expire if I don't claim?
**No.** Claim whenever you like.

### Does claiming rewards affect my principal?
No. Principal and rewards are on **separate ledgers**. Claiming does not touch your stake or start a cooldown.

## Burn

### How much is burned?
**More than 40% of every day's rewards.** At a full cap the split is exactly **60% stakers / 40% burn**; the emptier the vault, the more is burned. With **no stakers, 100% is burned**.

### Where do burned tokens go?
To `0x000000000000000000000000000000000000dEaD` — permanently and publicly, see [`/burn.html`](https://stake.x-phere.com/burn.html).

## Staking and Withdrawing

### What do I deposit?
**Native XP**, as-is. No wrapping and no approval step.

### Is my principal used for anything?
No. The vault is **non-custodial** — your principal is **not re-deployed or re-staked**. It remains yours and is withdrawable in full.

### How do I withdraw?
**Request unstake → 7-day cooldown → claim matured**, and you receive **100% of your principal**. See the [User Guide](./user-guide#4-unstake).

### What if rewards stop?
Your **principal is still fully withdrawable**. Principal and rewards are tracked separately.

### Why is there a cap?
The vault is in **guarded launch**. Capacity is raised **in stages**, each step going through the **48-hour on-chain timelock**, toward the target of **35,000,000 XP**.

## Fees

### What does it cost?
**0%** — no deposit, claim, or withdrawal fee. You pay **network gas only**.

### Do referral links cost me anything?
No. Staking through a partner link (`?ref=…`) gives **exactly the same** rewards as staking directly. See [For Partners](./for-partners).

## Security and Verification

### Can the contracts be upgraded?
**No.** The logic is **not upgradeable** and there is no proxy. Only **operational parameters** can change, and only through the **48-hour timelock**.

### What are shares, and why 1 XP = 1,000?
Shares are an **internal accounting unit** of the ERC-4626 vault. The ratio is **permanently fixed at 1 XP = 1,000 shares** to block share-price inflation attacks; redemption follows an **ERC-7540-style asynchronous** flow (request, then claim after maturity).

### How do I check the vault is solvent?
Open [`/status.html`](https://stake.x-phere.com/status.html) — it shows live, on-chain **solvency (holdings ≥ liabilities)**, governance, and current parameters. Contract addresses are in [Contracts & Verification](./contracts).

### How do I avoid scams?
Stake only at **`https://stake.x-phere.com`**, verify contract addresses against [Contracts & Verification](./contracts), and remember the Foundation never asks for seed phrases or private keys.

## See Also

- [Overview](./overview)
- [How It Works](./how-it-works)
- [User Guide](./user-guide)
- [Fees & Risks](./fees-and-risks)
