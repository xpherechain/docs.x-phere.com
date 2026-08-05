---
title: Staking (Union Staking)
description: The protocol-level Union reward shares on XPHERE — 40% of minted block rewards and 20% of transaction fees — and the two ways to take part.
lang: en
sidebar_position: 3
---

# Union Staking

**Union Staking** is XPHERE's staking mechanism. Union members secure the Main Chain, take part in
block validation, and are paid from **two distinct protocol income streams**:

| Income stream | Union share |
|---------------|-------------|
| Minted block rewards | **40%** of every minted block reward |
| Transaction fees | **20%** of every transaction fee (the fee is also **50% burned**, with 20% Miner and 10% Foundation) |

The two are accounted for separately: minted rewards follow the emission schedule, while fee income
scales with network *usage*. See [Mining Rewards](/mining/rewards) and
[Tokenomics](/resources/tokenomics).

This page covers the **protocol-level economics**. For the staking service you can use today, see
the [XP Staking (Union Vault)](/staking/overview) section.

## Two Ways to Take Part

| | [XP Union Vault](/staking/overview) | Union validator membership |
|---|---|---|
| Who it is for | Any XP holder | Institutions and infrastructure partners |
| What you do | Stake native XP in a non-custodial vault at [stake.x-phere.com](https://stake.x-phere.com) | Operate a Union validator node admitted by the Foundation |
| Requirement | No node, no membership — see the [User Guide](/staking/user-guide) | **35,000,000 XP** stake and a registered node address |
| Yield source | Validator rewards the Foundation's Union node actually earned | The **40%** Union share of blocks your node proposes, plus the Union's **20%** share of transaction fees |
| Admission | Open, subject to the vault cap | **Permissioned** — onboarding runs through the Foundation |

## How the Minted Block Reward Share Is Earned

![Union Staking reward flow: the minted block reward is split 20% Foundation / 40% Miner / 40% Union, and the Union share is paid to the member whose registered node address holds the round-robin proposer turn](/img/union-staking-flow.svg)

1. **A reward is minted every 60 seconds.** At the current emission that is `1,474.4 XP` per cycle
   (see [Mining Rewards](/mining/rewards)).
2. **The reward is split three ways** — 20% Foundation, 40% Miner, 40% Union.
3. **The Union share goes to the block proposer.** When a Union member's registered node address
   serves as the **block proposer**, that member receives the **40% Union share** of that block's
   reward.
4. **Proposer turns rotate round-robin.** Eligible Union members are cycled in a predetermined,
   sequential order — this is separate from Proof Chain mining, where miners compete through xpHash
   Proof-of-Work.
5. **Rewards are credited automatically** to the registered node address. There is **no separate
   claim transaction** at the protocol level.

## How the Transaction-Fee Share Works

Minted block rewards are not the Union's only income. Transaction fees are **not** burned in full —
every transaction's fee is split four ways, and **20% goes to the Union**:

| Destination | Share |
|-------------|-------|
| Burn | **50%** |
| **Union** | **20%** |
| Miner | 20% |
| Foundation | 10% |
| **Total** | **100%** |

:::note Two separate streams
Fee revenue is distributed separately from minted emission. A Union member therefore earns from
network *usage* as well as from block issuance — see [Mining Rewards](/mining/rewards) for the miner
side of the same split, and [Tokenomics](/resources/tokenomics) for the full fee and burn accounting.
:::

## Union Membership Requirements

| Requirement | Value |
|-------------|-------|
| Stake amount | **35,000,000 XP** per Union membership |
| Node address | A valid address, registered with the stake, that receives proposer rewards |
| Node operation | Infrastructure meeting the [Validator Node requirements](/nodes/validator-node) |
| Admission | Union slots are **permissioned** in the current network phase — onboarding runs through the Foundation |

The substantial stake threshold is deliberate: it prevents Sybil attacks and aligns Union members
with the long-term health of the network.

## Staking XP Without Running a Node

The **[XP Union Vault](/staking/overview)** at [stake.x-phere.com](https://stake.x-phere.com) is the
Foundation's non-custodial staking vault. It pays stakers out of the **real earnings** of the
Foundation's Union validator node and **permanently burns** the remainder — no node, no membership,
and no minimum membership stake required.

- [Overview](/staking/overview) — what it is and why it is different
- [How It Works](/staking/how-it-works) — daily settlement, the reserved-seat split, streaming
- [User Guide](/staking/user-guide) — stake, claim, and unstake
- [Fees & Risks](/staking/fees-and-risks) — 0% fees, and the risks you accept

:::caution Check the domain
The only official staking address is `https://stake.x-phere.com`. The Foundation will **never** ask
for your seed phrase or private key. See [Fees & Risks](/staking/fees-and-risks#staying-safe).
:::

## See Also

- [XP Staking (Union Vault)](/staking/overview)
- [Mining Rewards](/mining/rewards) — the 20 / 40 / 40 minted split and the four-way fee split
- [Validator Node](/nodes/validator-node) — infrastructure and operational requirements
- [Tokenomics](./tokenomics)
- [Whitepaper — Union Staking and Reward Mechanism](/whitepaper#b-union-staking-and-reward-mechanism)
