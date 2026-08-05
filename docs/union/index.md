---
title: XPHERE Union
description: The XPHERE Union — the network's core validator group, its role in the dual-chain architecture, reward shares, membership requirements, and the registration process.
lang: en
sidebar_position: 1
---

# XPHERE Union

The **XPHERE Union** is the network's **core validator group**. Union members validate the blocks
produced on the Proof Chain, record them on the Main Chain, take part in governance, and receive a
protocol-defined share of block rewards and transaction fees.

Union membership is **permissioned**: each membership slot requires a **35,000,000 XP** stake and is
admitted through the Foundation after evaluation. Applications go to
**[Contact@X-phere.com](mailto:Contact@X-phere.com)**.

## What the Union Does

| Role | What it means |
|------|---------------|
| **① Block validation** | Validating the blocks produced on the **Proof Chain** and finalizing them on the **Main Chain** through PBFT consensus. Members take turns proposing. |
| **② Governance participation** | Voting on network policy — **one vote per member**, not per slot, with the Foundation breaking ties. See [Governance](/resources/governance). |
| **③ Reward distribution** | Union members collectively receive **40%** of each minted block reward and **20%** of transaction fees. See [Tokenomics](/resources/tokenomics). |

## The Union in the Dual-Chain Architecture

XPHERE separates the two jobs a Layer 1 has to do — deciding *who* may write a block, and agreeing on
*what* the block contains — across two chains:

| Chain | Consensus | What it decides |
|-------|-----------|-----------------|
| **Proof Chain** | PoW (xpHash) | Validator selection |
| **Main Chain** | PBFT | Block consensus |

Within the Union, **proposer turns rotate round-robin** — eligible slots are cycled in a
predetermined, sequential order rather than competing for a turn. Proof Chain mining works the other
way: miners compete through xpHash Proof-of-Work. See [Mining Rewards](/mining/rewards) and
[Union Staking](/resources/staking) for how the two interact.

:::note One slot, one turn
A Union member may hold more than one slot, and **each slot takes its own turn** in the rotation.
See [Members](./members) for the current slot distribution.
:::

## What a Union Member Earns

Union members are paid from **two separate sources**: newly minted block rewards, and the
transaction fees paid by users.

### Block Rewards (minted)

A fixed amount of XP is minted every 60 blocks (≈ 60 seconds) and split three ways:

| Recipient | Share |
|-----------|-------|
| **Union** | **40%** |
| Miner | 40% |
| Foundation | 20% |

The Union share of a block goes to the member whose registered node address holds the proposer turn
for that block. Current emission figures and worked examples are on
[Mining Rewards](/mining/rewards).

### Transaction Fees

Transaction fees are **not** entirely burned. They are split four ways:

| Recipient | Share |
|-----------|-------|
| Burn | **50%** |
| **Union** | **20%** |
| Miner | 20% |
| Foundation | 10% |

:::note The full fee accounting
The 50% burn is the figure most often quoted outside the docs, but it is only half of the fee. The
other 50% of every transaction fee is distributed — **20% to the Union**, 20% to the miner, and 10%
to the Foundation. A Union member therefore earns from network *usage* as well as from block
issuance. The full four-way split is documented in [Tokenomics](/resources/tokenomics).
:::

## Membership Requirements

| Requirement | Detail |
|-------------|--------|
| **Stake** | **35,000,000 XP** per membership slot |
| **Infrastructure** | Maintain stable server infrastructure |
| **Policy** | A commitment to contribute to network policy |
| **Operations** | The capability to administer and maintain the server on an ongoing basis |

### Published Eligibility Floor

| Component | Published minimum |
|-----------|-------------------|
| CPU | **16 cores** or more |
| RAM | **32 GB** or more |

The eligibility floor is what the Foundation publishes for applicants; provisioning must follow
[Validator Node](/nodes/validator-node), which reflects current chain size. Storage and network are
therefore not listed above — those two figures move with the chain, and the Validator Node page is
authoritative for both.

:::caution Size storage from the Validator Node page, not from this floor
Block data alone already exceeds 300 GB and grows continuously. The operating requirement is
**2 TB NVMe minimum, 4 TB NVMe recommended** — see [Validator Node](/nodes/validator-node) for the
full sizing table.
:::

Meeting the eligibility floor makes an application admissible; it does not make a node operable. Full
operational requirements for running a Main Chain validator — sizing, monitoring, and the operating
conditions the Foundation enforces — are documented on
[Validator Node](/nodes/validator-node). Read that page before provisioning.

## Registration Process

Registration runs in five steps:

| Step | What happens |
|------|--------------|
| **1. Apply** | Submit an application and stake an initial **1,000,000 XP**. |
| **2. Evaluation** | The application is evaluated by the **Foundation and existing Union members**. |
| **3. Complete the stake** | Stake an additional **34,000,000 XP**, bringing the total to **35,000,000 XP**. Registration is complete at this point. |
| **4. Technical support** | The XPHERE Foundation provides initial technical support for bringing the node online. |
| **5. Ongoing operation** | The member takes on the obligation to operate the node stably as part of the network. |

:::caution
Step 5 is an ongoing obligation, not a formality. Union membership is a commitment to keep validating
— the operating conditions are set out on [Validator Node](/nodes/validator-node).
:::

## Governance

| Rule | Detail |
|------|--------|
| Voting weight | **One vote per member** |
| Tie-break | Where a vote is tied, the **XPHERE Foundation** casts the **tie-breaking vote** |

Voting weight is per **member**, not per slot — holding multiple slots increases proposer turns and
reward share, not voting power. The Foundation has not yet published a wider governance framework,
so the two rules above are the full published set. [Governance](/resources/governance) is where it
will appear once published.

## Current State

Read from on-chain data on **2026-08-05**:

| Metric | Value |
|--------|-------|
| Active Union slots | **25** of a target of **31** |
| Stake per slot | Exactly **35,000,000 XP**, identical across every slot |
| Total staked | **875,000,000 XP** |

The member list, slot counts, and registration dates are on **[Members](./members)**, along with
three independent ways to verify them yourself:

| Source | Where |
|--------|-------|
| Tamsa Explorer | [https://xp.tamsa.io/main/unions](https://xp.tamsa.io/main/unions) |
| XPScan | [https://xpscan.io/unions](https://xpscan.io/unions) |
| Public API | `https://api.tamsa.io/api/v1/unions?page=1&count=100` |

```bash
curl "https://api.tamsa.io/api/v1/unions?page=1&count=100"
```

:::caution
Slot counts and total stake change as slots are added. Treat the figures above as a snapshot and
re-check one of the sources before citing them.
:::

## How to Apply

Send an enquiry to **[Contact@X-phere.com](mailto:Contact@X-phere.com)**. Include the infrastructure
you intend to operate and how you meet the requirements above; the Foundation and existing members
evaluate applications at step 2 of the process.

:::tip Not running a node?
Union membership is aimed at institutions and infrastructure partners. XP holders who want exposure
to the Union reward share without operating a node can use the Foundation's non-custodial
**[XP Union Vault](/staking/overview)** at
[stake.x-phere.com](https://stake.x-phere.com) — no node and no membership stake required.
:::

## See Also

- [Members](./members) — the current member list and how to verify it on-chain
- [Validator Node](/nodes/validator-node) — authoritative hardware sizing and operational requirements for validators
- [System Requirements](/nodes/requirements) — hardware sizing for Endpoint Nodes (XEN)
- [Mining Rewards](/mining/rewards) — emission schedule and the 20 / 40 / 40 minted-reward split
- [Union Staking](/resources/staking) — the protocol-level Union reward share
- [Tokenomics](/resources/tokenomics) — supply, emission, and the fee burn
