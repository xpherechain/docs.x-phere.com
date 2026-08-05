---
title: User Guide
description: Connect a wallet, stake native XP, claim rewards, and unstake from the XP Union Vault.
lang: en
sidebar_position: 3
---

# User Guide

Everything below happens at **[stake.x-phere.com](https://stake.x-phere.com)**. You pay **no protocol fee** — only network gas.

## Before You Start

| Requirement | Detail |
|-------------|--------|
| Network | XPHERE Mainnet, Chain ID `20250217` — see [Network Info](/references/network-info) |
| Asset | **Native XP**. No wrapping, no token approval step |
| Gas | A small XP balance for transaction fees |

## 1. Connect a Wallet

**Browser wallet** (MetaMask, Rabby, and other EVM wallets)
The site **adds the XPHERE network automatically** — approve the network prompt, then connect.

**ZIGAP app**
Choose the ZIGAP option, **scan the QR code** with the app, and approve the connection. Every transaction is then **signed in the app**.

See [Wallet Setup](/developers/wallet-setup) for wallet configuration details.

## 2. Stake

1. Enter the amount of XP to stake, or press **MAX**.
2. The interface shows your **estimated annual yield** for that amount — an *illustrative* figure based on current conditions, **not a guarantee**.
3. Confirm the transaction in your wallet.

Your XP is deposited as-is. It is **not re-deployed or re-staked** anywhere — it stays in your name in the vault.

:::note Cap
The vault is in **guarded launch** with a limited cap. If the cap is full, deposits are limited until the cap is raised — cap changes go through the **48-hour timelock**. See [How It Works](./how-it-works#upgradeability-and-governance).
:::

## 3. Claim Rewards

- **Claimable rewards increase every second** while your stake is in the vault.
- Press **Claim** whenever you want. There is **no expiry** and no minimum holding period for claiming.
- Claiming rewards does **not** touch your principal and does **not** start a cooldown.

## 4. Unstake

Unstaking takes two transactions, with a cooldown in between:

1. **Request unstake** — submit the request for the amount you want to withdraw. A **7-day
   cooldown** follows; the interface shows a **progress bar** until the request matures.
2. **Claim matured** — receive **100% of your principal**.

Principal and rewards sit on separate ledgers, so a withdrawal is always for the full amount you put in.

## 5. Verify Everything Yourself

Open **[`/status.html`](https://stake.x-phere.com/status.html)** to check, live and on-chain:

- **Solvency** — that vault holdings cover its obligations (holdings ≥ liabilities)
- **Governance** — the timelock controlling parameter changes
- **Parameters** — cap, epoch, distribution split, cooldown

The burn record is public at **[`/burn.html`](https://stake.x-phere.com/burn.html)**, and contract addresses are listed in [Contracts & Verification](./contracts).

:::caution Check the domain
The only official staking address is `https://stake.x-phere.com`. The Foundation will **never** ask for your seed phrase or private key. See [Fees & Risks](./fees-and-risks#staying-safe).
:::

## See Also

- [How It Works](./how-it-works)
- [Fees & Risks](./fees-and-risks)
- [FAQ](./faq)
