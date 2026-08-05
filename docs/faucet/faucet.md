---
title: Testnet Faucet
description: Request free XPT test tokens for the XPHERE Testnet — amount, interval, network parameters, and where to check the resulting balance.
lang: en
---

# Testnet Faucet

The XPHERE Faucet dispenses **XPT**, the native token of the **XPHERE Testnet**. XPT exists so you can deploy and exercise contracts before spending real gas. It has no monetary value and cannot be moved to Mainnet.

**Faucet: [faucet.x-phere.com](https://faucet.x-phere.com)**

:::caution The faucet funds Testnet only
The faucet does not distribute Mainnet `XP`, and nothing it sends you is transferable to Mainnet. Any site offering "free mainnet XP" is not operated by the XPHERE Foundation — see [Security](/resources/security) for the list of verified official domains.
:::

## What You Get

| Item | Value |
|------|-------|
| Token | `XPT` — XPHERE Testnet native token, 18 decimals |
| Amount per request | **10 XPT** |
| Interval | one request per **24 hours** |
| Required input | a single XPHERE Testnet address (`0x…`) |
| Cost | Free — no wallet connection, no signature |

Both figures are published on the faucet page itself, which states *"Applications can be made at 24-hour intervals"* and *"Token 10 XPT"*. Requests are made through the web form; no public faucet API is documented.

## Step 1 — Add the Testnet to Your Wallet

| Field | Value |
|-------|-------|
| Network Name | `Xphere Testnet` |
| RPC URL | `https://testnet.x-phere.com` |
| Chain ID (decimal) | `1998991` |
| Chain ID (hex) | `0x1e808f` |
| Currency Symbol | `XPT` |
| Decimals | `18` |
| Block Explorer | `https://xpt.tamsa.io` |

MetaMask, Rabby, and Zigap instructions are on [Wallet Setup](/developers/wallet-setup). To add the network from a dApp:

```ts
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

Confirm your wallet is on Testnet and not Mainnet before requesting:

```bash
curl -s -X POST https://testnet.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
# {"jsonrpc":"2.0","id":1,"result":"0x1e808f"}   ← 1998991, Testnet
```

Mainnet returns `0x134fe69` (`20250217`). If you see that, you are on the wrong network and the faucet cannot fund you.

## Step 2 — Request Tokens

1. Open **[faucet.x-phere.com](https://faucet.x-phere.com)**.
2. Paste your Testnet address into the field labelled *"Enter your XPHERE 2.0 (Testnet) address"*.
3. Submit the request.
4. Wait 24 hours before requesting again for the same address.

## Step 3 — Check the Balance

Query the Testnet RPC directly — this is the definitive check:

```bash
curl -s -X POST https://testnet.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xYourAddress","latest"],"id":1}'
```

The result is a hex wei value; `10 XPT` is `0x8ac7230489e80000`.

Or open the **Tamsa Testnet Explorer at [xpt.tamsa.io](https://xpt.tamsa.io)** and search for your address.

:::note Which explorer for Testnet
Use **[xpt.tamsa.io](https://xpt.tamsa.io)** for Testnet. [XPScan](https://xpscan.io) publishes **Mainnet** data — its own footer states `Chain ID: 20250217` — and no XPScan testnet instance is published (`https://xpscan.io/testnet` returns 404). Do not expect a Testnet transaction to appear on XPScan.
:::

## Troubleshooting

| Symptom | Cause and fix |
|---------|---------------|
| Wallet shows `0` after a successful request | The wallet is on the wrong network. Confirm the Chain ID reads `1998991`, and that the currency symbol is `XPT`, not `XP`. |
| Balance is on-chain but the wallet shows nothing | The wallet's RPC is behind or unreachable. Re-check with the `eth_getBalance` call above; if it disagrees with the wallet, switch the wallet's RPC URL to `https://testnet.x-phere.com`. |
| A second request returns nothing | The published interval is 24 hours per address. No other limit is documented. |
| The transaction is not on `xpscan.io` | Expected — XPScan serves Mainnet. Look on [xpt.tamsa.io](https://xpt.tamsa.io). |

## What to Do Next

| Goal | Page |
|------|------|
| Deploy your first contract on Testnet | [Developer Quickstart](/developers/quickstart) |
| Issue an ERC-20 or ERC-721 | [Token Standards](/developers/token-standards) |
| Full parameter list for both networks | [Network Information](/references/network-info) |
| Testnet RPC endpoints and rate limits | [Public JSON-RPC Endpoints](/references/public-en) |

## See Also

- [Network Information](/references/network-info) — Chain IDs, RPC endpoints, explorers
- [Wallet Setup](/developers/wallet-setup) — adding XPHERE Testnet to MetaMask, Rabby, Zigap
- [Developer Quickstart](/developers/quickstart)
- [Security](/resources/security) — verified official domains
