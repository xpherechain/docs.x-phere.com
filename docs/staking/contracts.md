---
title: Contracts & Verification
description: XP Union Vault mainnet contract addresses and how to verify the vault's state, parameters, and burn record on-chain.
lang: en
sidebar_position: 6
---

# Contracts & Verification

## Mainnet Addresses

XPHERE Mainnet — Chain ID `20250217`.

| Contract | Address |
|----------|---------|
| **XPStakingVault** | `0xaE4435bB474716E130be2aC8e6C244f171451064` |
| **RewardDistributor** | `0x24C5912B63a8B41DA80EBDC2115949fcbb41Fddf` |
| **WXP** | `0x780E8c0443F6d702De0c72650648C7CAA591e8f0` |
| **Timelock (48 h)** | `0x0737B4EEB4dA0920cE7CeE2D1eF64E0f57211F4E` |
| **Burn address** | `0x000000000000000000000000000000000000dEaD` |

:::caution Always verify the address
Confirm addresses against this page or the official portal **before** you interact with a contract. Never trust an address pasted in a DM, a comment, or an unofficial site.
:::

## What You Can Verify

### Live state — [`/status.html`](https://stake.x-phere.com/status.html)

Anyone can check, in real time and directly against the chain:

- **Solvency** — that vault holdings cover its obligations (holdings ≥ liabilities)
- **Governance** — the timelock that controls parameter changes
- **Parameters** — cap, settlement epoch, distribution split, and cooldown

### Burn record — [`/burn.html`](https://stake.x-phere.com/burn.html)

Every burn is a transfer to `0x…dEaD`, permanent and publicly auditable. The burn page publishes the record; the burn address balance is independently checkable on [XPScan](https://xpscan.io) or the [Tamsa Explorer](https://xp.tamsa.io).

### Partner attribution — [`/partners.html`](https://stake.x-phere.com/partners.html)

Attribution totals are readable from the contracts themselves (`partnerTVL`, and the indexed `partnerId` on `Deposited` events). See [For Partners](./for-partners).

## Change Control

| Property | Guarantee |
|----------|-----------|
| Contract logic | **Not upgradeable** — no proxy sits in front of the vault |
| Operational parameters | Change **only through the 48-hour timelock**, visible on-chain before taking effect |
| Cap increases | Applied **in stages** through that same timelock |

Because there is no proxy, the code deployed at the addresses above is the code that runs. The 48 hours in the table is the minimum delay the Timelock contract itself reports on-chain — see [Checking the timelock delay](#checking-the-timelock-delay) to read it back yourself.

## Reading the Contracts Directly

Any EVM tool works. Point it at a mainnet RPC endpoint from [Public RPC Endpoints](/references/public-en), for example:

```bash
# Native XP balance of the burn address
curl -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x000000000000000000000000000000000000dEaD","latest"],"id":1}'
```

### Checking the timelock delay

The timelock's minimum delay is a public read — `getMinDelay()`, selector `0xf27a0c92`:

```bash
# Minimum delay enforced by the Timelock
curl -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x0737B4EEB4dA0920cE7CeE2D1eF64E0f57211F4E","data":"0xf27a0c92"},"latest"],"id":1}'
```

That returns one 32-byte word, `0x…02a300` — `0x2a300` decodes to **172,800 seconds, or 48 hours**, the delay stated under [Change Control](#change-control).

See the [JSON-RPC Reference](/references/json-rpc) for the full method list.

## See Also

- [How It Works](./how-it-works)
- [Fees & Risks](./fees-and-risks)
- [For Partners](./for-partners)
