---
title: Security
description: How to report a vulnerability to the XPHERE Foundation, what is in scope, and how to verify official XPHERE properties and contract addresses.
lang: en
sidebar_position: 6
---

# Security

This page states how to report a security issue to the XPHERE Foundation, what the Foundation
considers in scope, and how anyone can independently verify that a domain, repository, or contract
address is genuinely ours.

## Reporting a Vulnerability

Send security reports to **`security@x-phere.com`** with the subject prefix **`[SECURITY]`**.

:::caution Do not disclose publicly first
Do **not** open a public GitHub issue, forum post, or social media thread for a suspected
vulnerability. A public report exposes the issue to everyone before a fix exists.
:::

Please include as much of the following as you can:

| Field | What to provide |
|-------|-----------------|
| Description | What the issue is, in plain terms |
| Affected component | Protocol, node software, a specific contract address, or a specific domain |
| Reproduction steps | The minimum sequence needed to observe the behaviour |
| Impact assessment | What an attacker could achieve — funds at risk, consensus effect, data exposure |

Supporting material helps: transaction hashes, block heights, logs, proof-of-concept code, and the
software version or commit you tested against.

### Coordinated disclosure

The Foundation asks reporters to allow time for the issue to be investigated and remediated before
publishing details. If you intend to disclose publicly, please tell us in your first message so
timing can be coordinated.

:::note
The Foundation has **not published** a bug bounty program or a stated response-time commitment.
Anyone offering a bounty payout, or claiming to act for the Foundation, outside of
`security@x-phere.com` should be treated as unverified.
:::

## Scope

| In scope | Out of scope |
|----------|--------------|
| The XPHERE protocol and consensus | Third-party dApps, bridges, and services built on XPHERE |
| XPHERE node software | Third-party wallets, explorers, and RPC providers not operated by the Foundation |
| The Foundation's official contracts (see below) | Contracts deployed by other parties on XPHERE |
| The Foundation's official web properties (see below) | Sites, tokens, and social accounts not listed below |

Issues in third-party applications belong to their operators. If you find one, report it to that
operator. If a third-party issue also indicates a defect in the protocol or in an official contract,
report that part to `security@x-phere.com`.

## Verified Official Properties

Impersonation is the most common attack against blockchain users. Everything the Foundation operates
is listed here. **Anything not on this list is not ours.**

| Property | Address |
|----------|---------|
| Website | `https://x-phere.com` |
| Documentation | `https://docs.x-phere.com` |
| Staking portal | `https://stake.x-phere.com` |
| Mainnet explorer | `https://xpscan.io` |
| Testnet faucet | `https://faucet.x-phere.com` |
| Mainnet RPC | `https://rpc.x-phere.com`, `https://en-hkg.x-phere.com`, `https://en-bkk.x-phere.com` |
| Testnet RPC | `https://testnet.x-phere.com` |
| GitHub organization | [`github.com/xpherechain`](https://github.com/xpherechain) |
| Telegram | [`t.me/Xphere_official`](https://t.me/Xphere_official) |
| X | [`x.com/Xphere_official`](https://x.com/Xphere_official) |
| Discord | [`discord.com/invite/xphere`](https://discord.com/invite/xphere) (same invite as `discord.gg/xphere`) |
| General contact | `Contact@X-phere.com` |
| Staking partnerships | `partners@x-phere.com` |
| Security reports | `security@x-phere.com` |

### Official contract addresses

XPHERE Mainnet — Chain ID `20250217`.

| Contract | Address |
|----------|---------|
| **XPStakingVault** | `0xaE4435bB474716E130be2aC8e6C244f171451064` |
| **RewardDistributor** | `0x24C5912B63a8B41DA80EBDC2115949fcbb41Fddf` |
| **WXP** | `0x780E8c0443F6d702De0c72650648C7CAA591e8f0` |
| **Timelock (48 h)** | `0x0737B4EEB4dA0920cE7CeE2D1eF64E0f57211F4E` |

The authoritative copy of this list, with the burn address and verification instructions, is
[Contracts & Verification](/staking/contracts).

:::note Explorers the Foundation does not operate
The Tamsa explorers — [xp.tamsa.io](https://xp.tamsa.io) (Mainnet) and [xpt.tamsa.io](https://xpt.tamsa.io) (Testnet) — are operated by their own team, not by the XPHERE Foundation. They are the explorers the docs link to for Testnet because no XPScan testnet instance is published, but they are third-party properties and are not covered by the list above.
:::

The faucet distributes **XPT** on Testnet (Chain ID `1998991`) only. It never distributes Mainnet `XP`, never asks for a private key or seed phrase, and never requires a wallet connection — a "faucet" that asks for any of those is not ours. See [Testnet Faucet](/faucet).

## Protecting Yourself

- **Check the domain before connecting a wallet.** Look-alike domains are the most common attack.
  The only official staking address is `https://stake.x-phere.com`.
- **The Foundation never asks for your seed phrase or private key**, and **never DMs first**. Anyone
  who does either is impersonating us.
- **Treat unpublished offers as fraud.** Any "guaranteed APR", bonus, or airdrop claim that does not
  appear on the official channels above is fraudulent. Rewards from the vault come from what the
  validator node actually earns and are **not guaranteed** — see [Fees & Risks](/staking/fees-and-risks).
- **Verify contract addresses against these docs** before you interact with a contract. Never trust
  an address pasted in a DM, a comment, or an unofficial site.
- **Report impersonation** to `security@x-phere.com` so it can be taken down.

## What You Can Verify On-Chain

Two properties of the XP Union Vault bound its security surface, and both are checkable on-chain
rather than taken on trust:

| Property | Guarantee |
|----------|-----------|
| Contract logic | **Not upgradeable** — no proxy sits in front of the vault, so the code deployed at the addresses above is the code that runs |
| Operational parameters | Change **only through a 48-hour on-chain timelock**, so every change is publicly visible before it takes effect |

Read the contracts directly with any EVM tool against a public RPC endpoint — see
[Contracts & Verification](/staking/contracts) for worked examples, and
[Fees & Risks](/staking/fees-and-risks) for the risks that remain even with these properties in
place.

## Audits

The XPHERE Main Chain client has been audited by [Hacken](https://hacken.io/audits/xphere/), an
independent blockchain security firm.

| Field | Value |
|-------|-------|
| Auditor | Hacken |
| Scope | `xchain` — the Layer 1 protocol implementation (Golang) |
| Completed | **3 March 2025** |
| Findings | 3 |
| Status | Completed |
| Listing | [hacken.io/audits/xphere](https://hacken.io/audits/xphere/) |

The audit record is published on Hacken's own site, so it can be checked independently of anything
the Foundation states here.

:::note Scope and timing
This audit covers the Main Chain client source. It is a point-in-time review completed on the date
above — it does not certify code written or changed afterwards, and it does not cover the staking
contracts, which have their own verifiable on-chain properties documented in
[Contracts & Verification](/staking/contracts).
:::

Further audit reports are published as they become available, through the
[GitHub organization](https://github.com/xpherechain) and Foundation announcements. No report should
be considered official unless it is published there or on the auditor's own site.

## See Also

- [Contracts & Verification](/staking/contracts)
- [Fees & Risks](/staking/fees-and-risks)
- [FAQ](./faq)
