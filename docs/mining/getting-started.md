---
title: Getting Started
description: Point an IceRiver XP0 xpHash ASIC at an XPHERE mining pool and confirm it is earning.
lang: en
---

# Getting Started

This guide covers running the **IceRiver XP0** xpHash ASIC — the only miner currently able to seal
valid XPHERE blocks.

:::caution The software miner is deprecated
The previous setup based on the `miner-darwin-amd64` / `miner-windows-amd64` binaries and
`config.json` is **no longer supported**, and the HTTP mining endpoints that went with it
(`*-mining.x-phere.com`) no longer serve anything. After the [xpHash hard fork](./xphash-fork), only
the IceRiver XP0 ASIC can produce valid blocks. The instructions below replace that flow entirely.
:::

## What you need

- An **IceRiver XP0** xpHash ASIC (see [System Requirements](./requirements))
- An XPHERE wallet address to be paid to — a [Zigap](https://about.zigap.io) wallet on the
  `XPHERE 2.0` network works, as does any address you control
- Wired Ethernet, and power and cooling adequate for the unit

You do **not** need to run a node. The pool submits work to the network on your behalf.

## 1. Get a payout address

Mining rewards are paid to an ordinary XPHERE address. Create one in
[Zigap](https://about.zigap.io) on the `XPHERE 2.0` network, or use any wallet address you already
control, and copy it.

Keep the private key for this address secure — it is the only thing standing between an attacker and
your accumulated rewards.

## 2. Connect the XP0

1. Connect the unit to power and to your network over Ethernet.
2. Find its IP address from your router's client list or the IceRiver discovery tool.
3. Open that IP in a browser and sign in to the device dashboard.

## 3. Point it at a pool

XPHERE mining runs over **Stratum**. In the XP0 dashboard, add a pool with these values:

| Field | Mainnet | Testnet |
|-------|---------|---------|
| Pool URL | `stratum+tcp://xphash.xppool.io:3333` | `stratum+tcp://testnet-xphash.xppool.io:3333` |
| Worker / account | your XPHERE payout address | your XPHERE payout address |
| Password | not used — leave blank or `x` | not used — leave blank or `x` |

Save and restart mining from the dashboard.

:::caution Check the address you paste
Mining pools are a standing target for lookalike domains. Confirm the hostname character by
character against [xppool.io](https://xppool.io) before saving it, and treat any pool address that
arrived by direct message as unverified. See [Security](/resources/security).
:::

### Running several units

Use the **same payout address** on every unit and give each one a distinct worker name — `rig-01`,
`rig-02`, and so on. Contributions from all workers accumulate to that one address. The exact field
name for the worker label depends on your dashboard firmware.

## 4. Confirm it is working

Three checks, in order:

1. **On the unit** — the dashboard should show accepted shares climbing within a minute or two of
   connecting. Rejected shares at a steady non-trivial rate mean something is misconfigured.
2. **On the pool** — your address should appear with a live hashrate on
   [xppool.io](https://xppool.io).
3. **On chain** — once a payout clears, the balance shows up on
   [XPScan](https://xpscan.io) or through `eth_getBalance`:

```bash
curl -s -X POST https://rpc.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xYOUR_ADDRESS","latest"],"id":1}'
```

Expect a delay before the first payout — see the thresholds below.

## How pool payouts work

These are the terms XP Pool publishes:

| | |
|---|---|
| Algorithm | XPHash, with variable difficulty (VarDiff) |
| Pool fee | **1%**, deducted from each reward cycle before distribution |
| Minimum payout | **10 XP** — paid out automatically once your confirmed balance reaches it |
| Distribution | every **10 minutes**, in proportion to accumulated difficulty contribution |
| VarDiff target | one share every ~10 seconds, adjusted to your hashrate |

Shares are weighted by difficulty rather than counted: a difficulty-256 share is worth twice a
difficulty-128 share. What earns you a payout is total difficulty contributed, not how many shares
you submitted — so VarDiff adjusting your difficulty up does not reduce your earnings.

If a unit disconnects, it is marked offline immediately, but any balance already accrued is
preserved and still paid.

:::note Pool rewards and protocol rewards are different things
The pool distributes the **40% miner share** of each minted block reward among its participants,
after its own fee. The 40/40/20 split between miners, the [Union](/union), and the Foundation is set
by the protocol. See [Mining Rewards](./rewards) and [Tokenomics](/resources/tokenomics).
:::

## One pool is a concentration risk

**[XP Pool](https://xppool.io) is currently the only mining pool operating on XPHERE.** That is a
practical fact worth planning around rather than a recommendation:

- If it is unreachable, there is no second pool to fail over to today.
- Hashrate concentrated in a single pool is a centralization pressure the network would rather not
  have. Additional pools are welcome.

Listing a pool here is informational. It is not an endorsement, an audit, or a guarantee — the same
policy that applies to the [Ecosystem Directory](/ecosystem/directory). Operating a pool is
independent of the Foundation, and you deal with its operator on your own terms.

If you run a pool and want it listed, contact the Foundation at
[Contact@X-phere.com](mailto:Contact@X-phere.com).

## See Also

- [System Requirements](./requirements) — the XP0 and what it needs
- [Mining Rewards](./rewards) — how the protocol splits each block reward
- [xpHash Fork](./xphash-fork) — why ASICs, and what changed at the fork
- [Tokenomics](/resources/tokenomics) — emission schedule and supply
- [Security](/resources/security) — verifying official XPHERE properties
