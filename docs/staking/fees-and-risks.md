---
title: Fees & Risks
description: What you pay to use the XP Union Vault, and the risks you accept when staking.
lang: en
sidebar_position: 4
---

# Fees & Risks

## Fees

| Item | Amount |
|------|--------|
| Deposit fee | **0%** |
| Reward claim fee | **0%** |
| Withdrawal fee | **0%** |
| Network gas | Paid by you, as with any on-chain transaction |

Nothing is deducted from your deposit, your rewards, or your principal. **Your only cost is gas.**

## Risks

:::caution Read before staking
Staking is not risk-free. The points below are conditions of using the vault, not edge cases.
:::

### APR varies and is not guaranteed

Rewards come from what the Union validator node **actually earns**, so the rate **moves with node earnings**. Every yield figure shown in the interface or in these docs is **illustrative** — it describes current conditions, it does not promise future returns.

### Smart contract risk

The vault is a smart contract. Smart contracts can contain defects, and using one carries risk. Stake only what you are prepared to expose to that risk.

Two properties bound the surface area, and both are verifiable on-chain:

- Contract **logic is not upgradeable** — there is no proxy.
- Operational parameters change **only through a 48-hour timelock**, so every change is publicly visible before it takes effect.

### Withdrawals are not instant

Unstaking requires a **request followed by a 7-day cooldown** before you can claim. Plan for that delay — staked XP is **not** liquid on demand.

### Guarded launch

The vault is running under a **guarded launch** with a limited cap. Capacity is **expanded in stages**, each step going through the **48-hour on-chain timelock** and published as it happens. Deposits may be limited while the cap is full.

## Staying Safe

- The only official staking address is **`https://stake.x-phere.com`**. Verify the domain before connecting a wallet — look-alike domains are the most common attack.
- Check contract addresses against [Contracts & Verification](./contracts) before interacting.
- The Foundation will **never** ask for your seed phrase or private key, and never DMs first.
- Treat any "guaranteed APR", bonus, or airdrop offer that is not published on the portal or the official channels as fraudulent.

## Official Channels

- [Telegram](https://t.me/Xphere_official) · [X](https://x.com/Xphere_official) · [Discord](https://discord.gg/xphere)

## See Also

- [How It Works](./how-it-works)
- [Contracts & Verification](./contracts)
- [FAQ](./faq)
