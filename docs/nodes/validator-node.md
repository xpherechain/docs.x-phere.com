---
title: Validator Node
description: Run a Main Chain Validator (Consensus) Node on XPHERE — eligibility, hardware, setup, and operations.
lang: en
---

# Validator Node

A **Validator Node** participates in the Main Chain's optimized PBFT consensus, proposing and finalizing blocks. Validators are sampled from the **Council** into the active **Committee** each round.

:::caution
Validator slots are **permissioned** during the current network phase. Applications go through the [XPHERE Foundation](https://x-phere.com). This guide documents the operational requirements once admitted.
:::

## Eligibility

To be admitted to the Council, a candidate must:

1. Submit a formal application to the XPHERE Foundation
2. Stake the validator bond — a Union membership is **35,000,000 XP** (see [Union Staking](/resources/staking))
3. Operate infrastructure meeting the hardware requirements below
4. Maintain ≥ 99.9% uptime across two consecutive monitoring epochs — operating the node reliably is an ongoing obligation of membership, not a one-time admission check

## Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| vCPU | 16 | 32 |
| Memory | 32 GiB | 64 GiB |
| Storage | 2 TB NVMe | 4 TB NVMe |
| Disk IOPS | 5,000 | 15,000+ |
| Network | 1 Gbps | 5 Gbps |
| Geographic redundancy | Single region | Multi-AZ |

The vCPU minimum matches the **16 cores** published in the [Union](/union) eligibility requirements.
Storage is sized well above the published floor because chain data alone already exceeds 300 GB and
grows continuously. PBFT message rounds are latency-sensitive, so network jitter matters as much as
raw bandwidth.

## Setup Overview

:::info
Detailed setup instructions — the validator binary, configuration, keystore provisioning, seed peers, and registration — are not published here. The XPHERE Foundation provides initial technical support to admitted members as part of the registration process.
:::

## Operational SLOs

These are the service levels Union members commit to under the Council agreement. They are not
enforced automatically by the protocol — the Foundation monitors them and applies the conduct terms
below.

| Metric | Target | Action if breached |
|--------|--------|--------------------|
| Block proposal success | ≥ 99.5% | Investigate dropped peers |
| PREPARE→COMMIT latency | ≤ 200 ms p99 | Check network jitter |
| Disk IOPS | ≥ 5,000 | Upgrade storage |
| Uptime | ≥ 99.9% | Improve runbook coverage |

## Slashing Conditions

The current network does **not** implement automated on-chain slashing. The Foundation enforces the
following conditions through the Council agreement:

- **Double-signing** — proposing conflicting blocks at the same height and round
- **Equivocation** — voting `PREPARE` and `COMMIT` for conflicting blocks in the same round
- **Extended downtime** — more than 48 hours consecutively offline

Penalties range from bond reduction to removal from the Council.

## Monitoring

Recommended Prometheus metrics to scrape from `--metrics --prometheus`:

```
xphere_consensus_round_total
xphere_consensus_proposals_accepted_total
xphere_consensus_proposals_orphaned_total
xphere_p2p_peers
xphere_chain_head_block_number
```

## See Also

- [Endpoint Node setup](./Install-XEN-Guide) — base of the validator binary
- [Whitepaper §3 — Main Chain Consensus](/whitepaper#i-main-chain-optimized-pbft-consensus)
- [Whitepaper §4 — 51% Attack Mitigation](/whitepaper#ii-51-attack-mitigation-in-xphere)
