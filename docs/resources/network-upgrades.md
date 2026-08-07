---
title: Network Upgrades
description: How XPHERE network upgrades and hard forks activate, who must act, and where upgrades are announced.
lang: en
sidebar_position: 7
---

# Network Upgrades

This page documents how protocol upgrades reach the **XPHERE** network, who is obliged to act, and how each participant can verify that an upgrade took effect. It is written for node operators, miners, Union validators, exchanges, and integrators.

## How Upgrades Activate

XPHERE upgrades activate at a **deterministic block height**. The client carries the activation height — for the xpHash fork it is read from the `XPHASH_FORK_BLOCK` setting, so you can inspect and confirm it on your own node — and every node applies the new rules from that block onward and the old rules to every block before it.

This has three consequences that matter operationally:

| Property | What it means for you |
|----------|-----------------------|
| **Full history is preserved** | The chain is not reset and chaindata is not re-downloaded. Pre-upgrade balances, transactions, and blocks remain valid. |
| **The boundary is verifiable** | The activation point is a single, public block number. Anyone can check it on [XPScan](https://xpscan.io) or the [Tamsa Explorer](https://xp.tamsa.io) — there is no ambiguity about when the rules changed. |
| **Upgrading is time-bound, not optional** | For a **consensus-breaking** change, every affected operator must be running a compatible client *before* the activation height. Work produced by an outdated client after that height is not accepted by the network. |

This is exactly how the [xpHash hard fork](/mining/xphash-fork) activated: a fork height was published for Testnet, soaked there, and then activated at a separate height on Mainnet.

:::note
Not every upgrade is consensus-breaking. Client releases that only change performance, logging, RPC ergonomics, or tooling do not need a fork height and can be adopted on your own schedule. Check the release notes on [GitHub](https://github.com/xpherechain) for which category a release falls into.
:::

## Upgrade History

| Upgrade | Scope | Testnet block | Mainnet block | Status |
|---------|-------|---------------|---------------|--------|
| [xpHash hard fork](/mining/xphash-fork) | Proof Chain PoW algorithm | `327,400` | `1,740,000` | **Active** — completed on both networks |

No further hard fork **activation height** has been announced. Planned protocol work is described in the [whitepaper roadmap](/whitepaper#7-roadmap); when a height is announced for any of it, it will appear in this table.

## Who Is Affected by What

### Miners

Miners are the group most directly exposed to Proof Chain changes, because a consensus-breaking PoW change invalidates work produced by non-compliant hardware or software.

- Mining on XPHERE today requires an **xpHash-capable ASIC — the IceRiver XP0**. The legacy CPU software miner is deprecated and cannot produce valid xpHash blocks.
- Keep at least two mining endpoints configured (`sgp-mining`, `bkk-mining`, `hkg-mining`, `idn-mining`) so an endpoint outage around an activation height does not stop your hashrate.
- After an activation height passes, confirm your ASIC dashboard still shows **accepted** shares, and confirm payouts to your address on an explorer.

See [Mining — Getting Started](/mining/getting-started) and the [xpHash Hard Fork](/mining/xphash-fork) guide.

### Endpoint Node (XEN) Operators

Endpoint Nodes serve RPC and follow the chain, so they must be able to *validate* post-activation blocks even when they produce none.

- Replace the `xen` binary with the release that carries the new activation height, from [XEN Package Downloads](/nodes/downloads).
- The xpHash fork was applied **in place** — no genesis re-initialisation and no chaindata re-download were required.
- After restart, confirm the head block advances past the activation height.

Setup and operations are covered in [Install XEN](/nodes/Install-XEN-Guide) and [XEN CLI Commands](/nodes/xen-cli-commands).

### Union Validators

Union members validate blocks on the Main Chain under optimized PBFT consensus.

- A Proof Chain change does not necessarily alter Main Chain consensus. xpHash, for example, did **not** change validator consensus rules — but validators were still advised to update their `xen` binary so they stayed compatible with headers produced by upgraded miners.
- Treat every announced upgrade as applying to you until the announcement says otherwise, and complete the update before the activation height.
- Union membership carries governance participation — one vote per member, with the XPHERE Foundation holding the tie-breaking vote. The Foundation has **not** published a separate on-chain voting procedure or threshold specific to activating protocol upgrades; do not assume one exists.

See [Validator Node](/nodes/validator-node) and [Union Staking](./staking).

### Exchanges and Integrators

Exchanges, custodians, bridges, and indexers should plan around the activation height rather than around a wall-clock time, since block production rate determines when the height is reached.

- Upgrade any self-operated Endpoint Nodes before the activation height. If you depend on a third-party RPC provider, confirm with that provider that they will have upgraded in time.
- Check the announcement for whether the upgrade touches account state, RPC surface, or the chain ID. The xpHash fork was scoped to the PoW function only — economic parameters, RPC, and account state were unaffected — but that scope is specific to that upgrade and must be re-read for each one.
- Current chain IDs and endpoints are listed in [Network Information](/references/network-info). Verify the chain ID directly against the live RPC with `eth_chainId` before resuming signing in production.
- The Foundation does not publish a network status page. Use the explorers and the official channels below to confirm network state.

## Where Upgrades Are Announced

Upgrade announcements — including activation heights, affected components, and required operator action — are published on the official XPHERE channels and reflected in these documentation pages. There is no other authoritative source.

| Channel | Address |
|---------|---------|
| Telegram | [t.me/Xphere_official](https://t.me/Xphere_official) |
| X | [x.com/Xphere_official](https://x.com/Xphere_official) |
| Discord | [discord.com/invite/xphere](https://discord.com/invite/xphere) |
| GitHub (releases and source) | [github.com/xpherechain](https://github.com/xpherechain) |
| Documentation | [docs.x-phere.com](https://docs.x-phere.com) |

:::caution
The Foundation has not published a fixed advance-notice period, upgrade calendar, or service-level commitment for network upgrades. Do not plan against an assumed notice window — subscribe to the channels above and act on the announcement itself.
:::

For questions that are not answered by an announcement, contact [Contact@X-phere.com](mailto:Contact@X-phere.com). Suspected security issues should go to [security@x-phere.com](mailto:security@x-phere.com) rather than a public channel.

## Pre-Upgrade Checklist

Run this sequence for any announced consensus-breaking upgrade.

**1. Verify your client version.** Confirm the binary you are running is the release named in the announcement, and that it came from the official [Downloads](/nodes/downloads) or [GitHub](https://github.com/xpherechain) source.

**2. Confirm the configured activation height.** Check that your client actually carries the announced height rather than assuming the upgrade shipped. For the xpHash fork the configured height is exposed as:

```bash
xen --help | grep -i fork
```

Reference clients read the height from an environment variable:

```bash
XPHASH_FORK_BLOCK=327400   # testnet
XPHASH_FORK_BLOCK=1740000  # mainnet
```

**3. Rehearse on Testnet.** The xpHash fork activated on Testnet before Mainnet, which made Testnet the place to validate configuration, hardware, and integration first. Where an announcement gives both heights, rehearse against the Testnet height before the Mainnet one arrives. Testnet parameters are in [Network Information](/references/network-info).

**4. Watch for the activation block.** Track the head block against the announced height:

```bash
curl -X POST https://rpc.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

Cross-check the same height on [XPScan](https://xpscan.io) or the [Tamsa Explorer](https://xp.tamsa.io).

**5. Confirm acceptance after activation.** Once the height has passed, verify that your node's head advances monotonically, that a miner's blocks are still accepted rather than orphaned, and that a validator is still proposing and finalising. If your node stalls at the activation height, you are almost certainly running a pre-upgrade binary.

## Rollback Stance for the xpHash Fork

For the xpHash fork the Foundation stated that **there is no rollback**: if a critical bug were found after activation, it would coordinate a **follow-up fork** — a new upgrade with its own published activation height — rather than reverting blocks already produced. This is documented in the [xpHash Hard Fork](/mining/xphash-fork) guide.

That is the only upgrade for which a rollback position has been published; the Foundation has not stated a general stance covering future forks, so do not assume one. For the xpHash fork the practical implication was that recovery from a missed upgrade ran forward: update the client and resync from the network, rather than waiting for the chain to return to a prior state.

## See Also

- [xpHash Hard Fork](/mining/xphash-fork) — the one completed upgrade, with its activation heights and migration steps
- [Network Information](/references/network-info) — chain IDs, RPC endpoints, and current fork heights
- [Validator Node](/nodes/validator-node) — Main Chain validator requirements and operations
- [Endpoint Node](/nodes/Xphere-Endpoint-Node) — running your own RPC node
- [Governance](./governance)
