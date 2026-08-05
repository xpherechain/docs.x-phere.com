---
title: Wallet Setup
description: Add the XPHERE network to MetaMask, Rabby, Zigap, and WalletConnect-compatible wallets.
lang: en
---

# Wallet Setup

XPHERE is fully EVM-compatible, so any wallet that supports custom EVM networks works out of the box. This guide covers the four most common cases.

## 1. MetaMask (Browser & Mobile)

### Option A — One-click add
Both networks are in the public chain registry that backs [chainlist.org](https://chainlist.org): **Xphere Mainnet** (`20250217`, symbol `XP`) and **Xphere Testnet** (`1998991`, symbol `XPT`). Search for `xphere` there, connect your wallet, and add the one you want.

You can confirm both entries yourself:

```bash
curl -s https://chainid.network/chains.json \
  | python3 -c "import json,sys; [print(c['chainId'], c['name'], c['nativeCurrency']['symbol']) for c in json.load(sys.stdin) if c['chainId'] in (20250217, 1998991)]"
# 1998991 Xphere Testnet XPT
# 20250217 Xphere Mainnet XP
```

### Option B — Manual
1. Open MetaMask → click the network selector (top-left) → **Add network → Add a network manually**
2. Fill in the form:

   **Mainnet**
   ```
   Network Name:     Xphere Mainnet
   New RPC URL:      https://en-hkg.x-phere.com
   Chain ID:         20250217
   Currency Symbol:  XP
   Block Explorer:   https://xp.tamsa.io
   ```

   **Testnet**
   ```
   Network Name:     Xphere Testnet
   New RPC URL:      https://testnet.x-phere.com
   Chain ID:         1998991
   Currency Symbol:  XPT
   Block Explorer:   https://xpt.tamsa.io
   ```
3. Click **Save** → MetaMask switches to XPHERE automatically.

:::caution The native symbol differs between networks
Mainnet is `XP`; Testnet is `XPT`. Entering `XP` on Chain ID `1998991` produces a wallet that silently mislabels test tokens as mainnet ones. Use the exact values above.
:::

The Mainnet explorer is [xpscan.io](https://xpscan.io) or [xp.tamsa.io](https://xp.tamsa.io); the Testnet explorer is [xpt.tamsa.io](https://xpt.tamsa.io). XPScan serves Mainnet only — its footer states `Chain ID: 20250217`, and no XPScan testnet instance is published — so a Testnet address will not resolve there.

## 2. Rabby Wallet

1. Open Rabby → **More → Add Custom Network**
2. Paste the RPC URL above and Rabby auto-detects Chain ID and currency.

## 3. Zigap Wallet

Zigap is an official XPHERE partner wallet with built-in XPHERE 2.0 support, so the network does not have to be configured manually. It is operated by its own team, not by the XPHERE Foundation.

1. Install: [about.zigap.io](https://about.zigap.io)
2. Create or import a wallet
3. Select network: `XPHERE 2.0` (Mainnet) or `XPHERE 2.0 TESTNET`

For [Mining](/mining/getting-started), rewards are paid to an ordinary XPHERE address that you set as the payout account on the pool. A Zigap `XPHERE 2.0` address works, as does any address you control.

## 4. WalletConnect (Trust Wallet, Rainbow, etc.)

In your dApp, request the chain programmatically:

```ts
// Mainnet
await window.ethereum.request({
  method: "wallet_addEthereumChain",
  params: [{
    chainId: "0x134fe69", // 20250217 in hex
    chainName: "Xphere Mainnet",
    nativeCurrency: { name: "Xphere", symbol: "XP", decimals: 18 },
    rpcUrls: ["https://en-hkg.x-phere.com"],
    blockExplorerUrls: ["https://xpscan.io", "https://xp.tamsa.io"],
  }],
});
```

```ts
// Testnet
await window.ethereum.request({
  method: "wallet_addEthereumChain",
  params: [{
    chainId: "0x1e808f", // 1998991 in hex
    chainName: "Xphere Testnet",
    nativeCurrency: { name: "Xphere Testnet", symbol: "XPT", decimals: 18 },
    rpcUrls: ["https://testnet.x-phere.com"],
    blockExplorerUrls: ["https://xpt.tamsa.io"],
  }],
});
```

`wallet_addEthereumChain` requires the chain ID as a hex string. The two values are:

| Network | Decimal | Hex |
|---------|---------|-----|
| Mainnet | `20250217` | `0x134fe69` |
| Testnet | `1998991` | `0x1e808f` |

Both are readable from the live endpoints — `eth_chainId` returns exactly these strings:

```bash
curl -s -X POST https://testnet.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"0x1e808f"}
```

## Funding Your Wallet

| Source | Network | Token | Notes |
|--------|---------|-------|-------|
| Centralized exchanges | Mainnet | `XP` | Search "XP" on supported exchanges |
| [Faucet](/faucet) | Testnet | `XPT` | 10 XPT per address per 24 hours, free |
| Mining | Both | native | Run a [mining node](/mining/getting-started) |
| Bridge from Ethereum | — | — | Not yet available — see [Bridge](/resources/bridge) |

Testnet `XPT` cannot be moved to Mainnet, and the faucet does not distribute Mainnet `XP`.

## Troubleshooting

**"Transaction underpriced"** — Read the current suggestion from the node rather than assuming a floor. Both networks currently report a base fee of `25 gwei` and an `eth_gasPrice` of `27.5 gwei`; the chain's configured lower bound is `25 gwei` (`lowerboundbasefee: 25000000000`) and the upper bound is `750 gwei`. Set `maxFeePerGas` from a live call:

```bash
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"0x66720b300"}   ← 27,500,000,000 wei = 27.5 gwei
```

`eth_maxPriorityFeePerGas` returns `0x0` on both networks, so no tip is required for inclusion.

**"Nonce too low"** — MetaMask cached the wrong nonce. Settings → Advanced → **Clear activity tab data**.

**Wallet shows balance as 0 despite the explorer showing a balance** — You're on the wrong network. Confirm the Chain ID in MetaMask matches the network you funded: `20250217` for Mainnet (explorer [xpscan.io](https://xpscan.io) / [xp.tamsa.io](https://xp.tamsa.io)), `1998991` for Testnet (explorer [xpt.tamsa.io](https://xpt.tamsa.io)).

**`eth_chainId` returns something other than `0x134fe69` / `0x1e808f`** — You are pointed at the wrong endpoint, or the node is behind. Switch to another endpoint from the [Network Info](/references/network-info) list.

## See Also

- [Network Information](/references/network-info) — full parameter list for both networks
- [Testnet Faucet](/faucet) — free XPT for development
- [Public JSON-RPC Endpoints](/references/public-en)
