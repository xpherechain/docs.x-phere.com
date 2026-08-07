---
title: Tokenomics
description: XP token supply, distribution, emission, the transaction fee split, and burn mechanisms.
lang: en
sidebar_position: 4
---

# Tokenomics

The native token **XP** powers gas, mining rewards, and Union Staking on the XPHERE network.

## Token Parameters

| Field | Value |
|-------|-------|
| Symbol | `XP` |
| Decimals | `18` |
| Wei sub-unit | `1 XP = 10^18 wei` |
| Initial Supply | 1.5 billion XP pre-distributed (XPHERE 1.0 continuity) |
| Max Supply | **5.5 billion XP** (1.5B pre-distributed + 4B emitted over 100 years) |
| Issuance | Minted every 60 blocks; **−26.28% per year** (×0.7372 every 31,536,000 blocks) |
| Minted reward split | **20%** Foundation · **40%** Miner · **40%** Union |
| Transaction fee split | **50%** burn · **20%** Union · **20%** Miner · **10%** Foundation |

## Supply Composition

The 5.5 billion XP max supply comes from two sources:

| Source | Amount | How it enters circulation |
|--------|--------|---------------------------|
| Pre-distributed | 1.5 billion XP | Carried over for XPHERE 1.0 continuity |
| Emitted | 4 billion XP | Minted as mining and validation rewards over 100 years |
| **Total** | **5.5 billion XP** | |

:::note
The Foundation has not published a bucket-level breakdown of the 1.5 billion pre-distributed XP. [Whitepaper §5.e](/whitepaper#e-distribution-model) documents the **ongoing minted-reward split** (20% Foundation / 40% Miner / 40% Union) that governs the 4 billion emitted XP — it is not an allocation of the pre-distribution.
:::

## Emission Schedule

A fixed reward is minted **every 60 blocks** (≈ every 60 seconds) and reduced by **26.28% per year** (×`0.7372` every `31,536,000` blocks). The **first reduction has already occurred**.

```
Emission per 60 blocks:
  Year 1 (initial)          → 2000 XP
  Year 2 (current)          → 1474.4 XP
  Year 3                    → 1086.93 XP
  …−26.28% each year, over a 100-year schedule
```

Each minted reward is split: **20% Foundation, 40% Miner, 40% Union**. See [Mining Rewards](/mining/rewards) and [Whitepaper §5.e](/whitepaper#e-distribution-model).

The **Union 40%** is a protocol-level allocation paid to **[Union](/union) validator members** — the
validator group that records blocks on the Main Chain. It is not a pool product, and it is distinct
from the Foundation's **[XP Union Vault](/staking/overview)** staking service at
[stake.x-phere.com](https://stake.x-phere.com), which pays stakers from the real earnings of the
Foundation's own Union node and **permanently burns** the remainder — see [Union Staking](./staking).

## Transaction Fees and Burn

Transaction fees are **not** burned in full. Every transaction's fees are split four ways:

| Destination | Share | Where it goes |
|-------------|-------|---------------|
| Burn | **50%** | Permanently removed from circulation |
| Union | **20%** | [Union](/union) validator members |
| Miner | **20%** | xpHash Proof Chain miners — see [Mining Rewards](/mining/rewards) |
| Foundation | **10%** | Ongoing network operations |
| **Total** | **100%** | |

The **50% burn** is permanent. Combined with the 26.28% annual emission reduction, it provides
deflationary pressure during periods of high network activity.

:::note
Fee revenue is separate from minted emission. Miners and Union members each receive **two** streams:
a share of the minted block reward *and* a share of transaction fees.
:::

See [Whitepaper §5.d](/whitepaper#d-transaction-fee-burn-mechanism) for the formal burn model.

A second, non-protocol burn comes from the [XP Union Vault](/staking/overview): at each daily
settlement, **more than 40% of the rewards** flowing into the vault are sent to
`0x…dEaD` permanently. The public record is at
[`/burn.html`](https://stake.x-phere.com/burn.html).

## Where XP Flows

```
Minted reward (every 60 blocks):
  Foundation                 ← 20%
  Miner (Proof Chain)        ← 40%
  Union (validator members)  ← 40%
                               ───── 100%

Transaction fees (every transaction):
  Burn (protocol)            ← 50%
  Union (validator members)  ← 20%
  Miner (Proof Chain)        ← 20%
  Foundation                 ← 10%
                               ───── 100%

Union Vault settlement (daily, staking service — not protocol):
  Stakers                    ← 60% × (staked ÷ cap)
  Burn (0x…dEaD)             ← everything else
```

The first two blocks are **protocol-level** distributions built into the network. The third is the
Foundation's [XP Union Vault](/staking/overview) staking service, which redistributes what the
Foundation's own Union node earns.

## Tracking Supply

Query current circulating supply:

```bash
curl -X POST https://rpc.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getTotalSupply","params":[],"id":1}'
```

Or use the supply pages on [XPScan](https://xpscan.io) or the [Tamsa Explorer](https://xp.tamsa.io).

## See Also

- [Union](/union) — the validator group that receives the Union share
- [Union Staking](./staking) — the protocol-level Union share
- [XP Staking (Union Vault)](/staking/overview) — the Foundation's staking vault and its burn mechanism
- [Mining Rewards](/mining/rewards) — the miner share of both minted rewards and transaction fees
- [Whitepaper §5](/whitepaper#5-economic-model-of-the-coin)
