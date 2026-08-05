---
title: Glossary
description: Definitions for XPHERE-specific and general blockchain terms used throughout the documentation.
lang: en
sidebar_position: 2
---

# Glossary

## A

**Account** — An entity with a balance, identified by a 20-byte address starting with `0x`. Two kinds exist: externally-owned accounts (EOAs, controlled by private keys) and contract accounts.

## B

**Base Fee** — The per-gas component of a transaction fee under EIP-1559, adjusting dynamically with block fullness. The resulting transaction fee is **not** burned in full — it enters the four-way split of **50% burned, 20% Union, 20% Miner, 10% Foundation**. See **Transaction Fee** and [Tokenomics](/resources/tokenomics).

**Block Time** — Average interval between Main Chain blocks. XPHERE targets **1 second**.

**Burn** — Permanent removal of XP from circulation. The protocol burns **50% of transaction fees** (the remaining 50% is distributed — see **Transaction Fee**); the [XP Union Vault](/staking/overview) additionally burns **more than 40%** of each day's staking rewards.

**Burn Address** — `0x000000000000000000000000000000000000dEaD`, the address burned XP is sent to. Balances there are publicly auditable and unspendable.

## C

**Cap** — The maximum total XP the [Union Vault](/staking/overview) accepts. It also sets the denominator of the staker split, `staked ÷ cap`. Raised in stages through the 48-hour timelock.

**Chain ID** — Numeric identifier used in transaction signatures to prevent replay across networks. XPHERE Mainnet: `20250217` (`0x134fe69`); Testnet: `1998991` (`0x1e808f`). The hex form is what `wallet_addEthereumChain` and `eth_chainId` use. See [Network Info](/references/network-info).

**Committee** — PBFT structural term: the subset of the Council producing blocks in the current round. Rotates each round. See **Round-Robin** for how proposer turns are ordered.

**Consensus Node** — Synonym for Validator Node on the Main Chain.

**Cooldown** — The **7-day** waiting period between requesting an unstake from the Union Vault and claiming the principal. See [How It Works](/staking/how-it-works#unstaking).

**Council** — PBFT structural term: the full set of validator nodes registered on the Main Chain, from which the Committee is drawn each round. On XPHERE these are the node addresses registered by [Union](/union) members — the Union is the membership group, the Council and Committee describe the consensus structure it operates within.

## D

**Dual-Chain Architecture** — XPHERE's design: a Main Chain (PBFT for finality) plus a Proof Chain (PoW for trust anchoring). See [Whitepaper §3](/whitepaper#3-dual-chain-architecture).

## E

**Endpoint Node (XEN)** — A node providing JSON-RPC access to the Main Chain. Does not participate in consensus.

**Epoch (settlement)** — The Union Vault's settlement cycle: **1 day**. At each epoch the vault splits inflowing rewards between stakers and the burn address.

**ERC-4626** — Tokenized vault standard. The Union Vault implements it, with an **ERC-7540-style asynchronous redemption** flow (request, then claim after the cooldown).

**EVM** — Ethereum Virtual Machine. XPHERE implements EVM at the Cancun level.

## F

**Faucet** — Service distributing **XPT**, the Testnet native token, for free at [faucet.x-phere.com](https://faucet.x-phere.com). **10 XPT per address, once every 24 hours.** It does not distribute Mainnet XP. See [Testnet Faucet](/faucet).

**Finality** — Point at which a block cannot be reverted. XPHERE's PBFT provides **instant finality** (1 block).

## G

**Gas** — Unit of computational work. Each opcode has a fixed gas cost.

**Grant Program** — The **XPHERE Grant Program**, the Foundation's support program for builders, developers, and teams launching dApps, building infrastructure, or growing the community. Applications are reviewed on a **rolling basis**; selected applicants are contacted within **14 business days**. Amounts and funding tiers are not published. See [Grant Program](/ecosystem/grants).

**Gwei** — `10^9` wei, or `10^-9` XP. Standard unit for gas prices.

## H

**Hard Fork** — Consensus-breaking protocol upgrade. See [xpHash Fork](/mining/xphash-fork).

**Hash Rate** — Number of hash attempts per second by a miner.

## J

**JSON-RPC** — The remote procedure call interface every XPHERE node exposes. See [JSON-RPC Reference](/references/json-rpc).

## M

**Main Chain** — The PBFT-consensus chain holding account state and processing transactions.

**Mining Node** — A node performing xpHash PoW on the Proof Chain, earning the **40%** miner share of each minted block reward and **20%** of transaction fees. xpHash mining runs on the **IceRiver XP0** ASIC; the legacy CPU software miner is deprecated. See [Mining](/mining).

## N

**Non-custodial** — Property of the [Union Vault](/staking/overview): staked principal is not re-deployed or re-staked, and remains withdrawable in full by its owner.

**Nonce** — Per-account transaction counter. Prevents replay and orders transactions.

## P

**PBFT** — Practical Byzantine Fault Tolerance. The consensus algorithm used on XPHERE's Main Chain.

**PoW** — Proof of Work. Consensus mechanism used on the Proof Chain via xpHash.

**Precompile** — Built-in contract at a fixed address implementing cryptographic primitives (sha256, ecRecover, etc.).

**Priority Fee** — The tip a sender adds above the base fee to gain inclusion priority. It is part of the transaction fee and enters the same four-way split of **50% burned, 20% Union, 20% Miner, 10% Foundation**. See **Transaction Fee** and [Tokenomics](/resources/tokenomics).

**Proof Chain** — The PoW chain anchoring Main Chain finality. Secured by miners.

## R

**Real Yield** — Rewards paid from revenue actually earned — for the Union Vault, validator rewards earned by the Foundation's Union node — rather than from newly minted tokens.

**Round-Robin** — The proposer rotation used by the Union on the Main Chain: eligible Union slots take turns proposing blocks in a predetermined, sequential order rather than competing for the turn. A member holding several slots takes proportionally more turns. Proof Chain mining works the other way — miners compete through xpHash PoW. See [Union Staking](./staking).

**RPC** — See JSON-RPC.

## S

**Settle** — The Union Vault's daily, **permissionless** settlement call that splits inflowing rewards between stakers and the burn address.

**Share (vault)** — Internal accounting unit of the ERC-4626 Union Vault, fixed permanently at **1 XP = 1,000 shares** to block share-price inflation attacks.

**Slot (Union)** — One Union membership position. Each slot carries its own **35,000,000 XP** stake and its own turn in the round-robin proposer rotation. A member may hold several slots; governance voting is per member, not per slot. See [Members](/union/members).

**Smart Contract** — Program deployed to an account; executes on-chain when called.

**Streaming (rewards)** — Distribution of a settled allocation continuously over the following **24 hours**, accruing every second, instead of as a lump sum. Makes reward sniping ineffective.

## T

**Tamsa Explorer** — Block explorer serving both environments on separate instances: [xp.tamsa.io](https://xp.tamsa.io) for Mainnet and [xpt.tamsa.io](https://xpt.tamsa.io) for Testnet.

**Testnet** — XPHERE's parallel network for development. Chain ID `1998991` (`0x1e808f`), native token **XPT**, RPC `https://testnet.x-phere.com`, explorer [xpt.tamsa.io](https://xpt.tamsa.io), funded from the [Faucet](/faucet). Tokens have no monetary value and are not transferable to Mainnet. See [Network Info](/references/network-info).

**Timelock** — The 48-hour on-chain delay every Union Vault parameter change must pass through. Contract logic itself is not upgradeable.

**TPS** — Transactions Per Second. XPHERE targets **4,000 TPS** sustained throughput.

**Transaction Fee** — The fee paid by the sender of a transaction. It is split four ways: **50% burned, 20% Union, 20% Miner, 10% Foundation**. See [FAQ](./faq#how-are-transaction-fees-split) and [XPHERE Union](/union).

## U

**Union** — The network's **core validator group**. Members validate the blocks produced on the Proof Chain and record them on the Main Chain, take **round-robin** turns proposing Main Chain blocks, and hold **one governance vote each**. Each membership slot requires a **35,000,000 XP** stake, and admission is permissioned through the Foundation. The Union receives **40% of every minted block reward** and **20% of transaction fees**. See [XPHERE Union](/union).

**Union Member** — A party admitted to the Union, holding one or more slots. Each slot carries its own 35,000,000 XP stake and its own proposer turn, so slots scale reward share; **governance voting is one vote per member**, not per slot, with the Foundation casting the tie-breaking vote. See [Members](/union/members).

**Union Staking** — XPHERE's staking mechanism, under which the Union receives 40% of every minted block reward and 20% of transaction fees. See [Staking](/resources/staking).

**Union Vault (XP Union Vault)** — The XPHERE Foundation's non-custodial staking vault at [stake.x-phere.com](https://stake.x-phere.com). Pays stakers from the Union node's real earnings and burns the remainder. See [XP Staking (Union Vault)](/staking/overview).

**Utilization** — How full the Union Vault is, `staked ÷ cap`. It scales the staker allocation; the yield attached to unfilled capacity is burned.

## V

**Validator** — The technical role: the operator of a Main Chain consensus node. On XPHERE the validator group is the **[Union](/union)** — validator slots are permissioned and admitted through the Foundation. Infrastructure and operating requirements are on [Validator Node](/nodes/validator-node).

## W

**Wallet** — Software/hardware managing private keys and signing transactions. See [Wallet Setup](/developers/wallet-setup).

## X

**XEN** — XPHERE Endpoint Node binary. See [Install Guide](/nodes/Install-XEN-Guide).

**xpHash** — XPHERE's Proof Chain PoW algorithm, **active** on Mainnet from block `1,740,000` and on Testnet from block `327,400`. Mining under xpHash runs on the IceRiver XP0 ASIC. See [xpHash Fork](/mining/xphash-fork).

**XP** — Native token of XPHERE **Mainnet** (Chain ID `20250217`). 18 decimals. Used for gas, staking, and governance.

**XPHERE v2.0** — Current version of the protocol, introducing EVM compatibility and dual-chain architecture.

**XPScan** — Block explorer at [xpscan.io](https://xpscan.io), serving **Mainnet** (its footer states `Chain ID: 20250217`). No XPScan testnet instance is published — for Testnet use [xpt.tamsa.io](https://xpt.tamsa.io).

**XPT** — Native token of XPHERE **Testnet** (Chain ID `1998991`). 18 decimals. Obtained from the [Faucet](/faucet), has no monetary value, and cannot be moved to Mainnet. Configure a wallet with the symbol `XPT`, not `XP`, when connecting to Testnet.
