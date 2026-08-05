---
title: Network Information
description: Chain IDs, native token, RPC endpoints, block explorer, and other network parameters for XPHERE Mainnet and Testnet.
lang: en
---

# Network Information

This page consolidates every parameter you need to connect to XPHERE from a wallet, dApp, indexer, or backend service.

## Mainnet

| Field | Value |
|-------|-------|
| Network Name | `Xphere Mainnet` |
| Chain ID (decimal) | `20250217` |
| Chain ID (hex) | `0x134fe69` |
| Native Token Symbol | `XP` |
| Token Name | `Xphere` |
| Decimals | `18` |
| Block Time | ~1 second |
| Consensus | Optimized PBFT (Main Chain) + xpHash PoW (Proof Chain) |
| HTTPS RPC | `https://en-hkg.x-phere.com`<br/>`https://en-bkk.x-phere.com`<br/>`https://rpc.ankr.com/xphere_mainnet` (Ankr) |
| WebSocket RPC | `wss://en-hkg.x-phere.com/ws`<br/>`wss://en-bkk.x-phere.com/ws` |
| Block Explorer | `https://xpscan.io` (XPScan)<br/>`https://xp.tamsa.io` (Tamsa Explorer) |
| xpHash Fork Block | `1,740,000` |

## Testnet

| Field | Value |
|-------|-------|
| Network Name | `Xphere Testnet` |
| Chain ID (decimal) | `1998991` |
| Chain ID (hex) | `0x1e808f` |
| Native Token Symbol | `XPT` |
| Token Name | `Xphere Testnet` |
| Decimals | `18` |
| HTTPS RPC | `https://testnet.x-phere.com`<br/>`https://rpc.ankr.com/xphere_testnet` (Ankr) |
| WebSocket RPC | `wss://testnet.x-phere.com/ws/` (note the trailing slash) |
| Block Explorer | `https://xpt.tamsa.io` (Tamsa Testnet Explorer) |
| Faucet | `https://faucet.x-phere.com` — 10 XPT per address per 24 h |
| xpHash Fork Block | `327,400` |

:::caution The two networks use different native symbols
Mainnet is `XP`; Testnet is `XPT`. A wallet configured with `XP` against Chain ID `1998991` will display the wrong symbol and mislead you about which network you are signing on. Both entries are registered under these symbols in the public [chain registry](https://chainid.network/chains.json) that backs [chainlist.org](https://chainlist.org).
:::

:::note Testnet WebSocket path
`wss://testnet.x-phere.com/ws` answers `301 Moved Permanently` to `/ws/`. Clients that do not follow redirects during the WebSocket handshake must use the trailing-slash form. Mainnet upgrades at `/ws` directly.
:::

### Explorer routing

| Network | Explorer to use | Notes |
|---------|-----------------|-------|
| Mainnet | [xpscan.io](https://xpscan.io), [xp.tamsa.io](https://xp.tamsa.io) | Either serves Mainnet blocks, transactions, and addresses |
| Testnet | [xpt.tamsa.io](https://xpt.tamsa.io) | The only published XPHERE Testnet explorer |

XPScan publishes **Mainnet** data — its own footer states `Chain ID: 20250217` — and no XPScan testnet instance is published (`https://xpscan.io/testnet` returns 404, and `testnet.xpscan.io` does not resolve). Send Testnet readers to `xpt.tamsa.io`.

## Verifying These Values Yourself

Every number in the tables above is readable from the live RPC:

```bash
# Mainnet → 0x134fe69 (20250217)
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'

# Testnet → 0x1e808f (1998991)
curl -s -X POST https://testnet.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```

Always cross-check `eth_chainId` on the endpoint you are about to use before signing transactions in production.

## Connecting from Common Tools

### MetaMask
See the step-by-step guide: [Wallet Setup](/developers/wallet-setup).

### wallet_addEthereumChain
```ts
// Mainnet
await window.ethereum.request({
  method: "wallet_addEthereumChain",
  params: [{
    chainId: "0x134fe69", // 20250217
    chainName: "Xphere Mainnet",
    nativeCurrency: { name: "Xphere", symbol: "XP", decimals: 18 },
    rpcUrls: ["https://en-hkg.x-phere.com"],
    blockExplorerUrls: ["https://xpscan.io", "https://xp.tamsa.io"],
  }],
});

// Testnet
await window.ethereum.request({
  method: "wallet_addEthereumChain",
  params: [{
    chainId: "0x1e808f", // 1998991
    chainName: "Xphere Testnet",
    nativeCurrency: { name: "Xphere Testnet", symbol: "XPT", decimals: 18 },
    rpcUrls: ["https://testnet.x-phere.com"],
    blockExplorerUrls: ["https://xpt.tamsa.io"],
  }],
});
```

### viem / ethers.js / web3.js
```ts
// viem
import { defineChain } from "viem";

export const xphere = defineChain({
  id: 20250217,
  name: "Xphere Mainnet",
  nativeCurrency: { name: "Xphere", symbol: "XP", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://en-hkg.x-phere.com"] },
  },
  blockExplorers: {
    default: { name: "Tamsa Explorer", url: "https://xp.tamsa.io" },
  },
});

export const xphereTestnet = defineChain({
  id: 1998991,
  name: "Xphere Testnet",
  testnet: true,
  nativeCurrency: { name: "Xphere Testnet", symbol: "XPT", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.x-phere.com"] },
  },
  blockExplorers: {
    default: { name: "Tamsa Testnet Explorer", url: "https://xpt.tamsa.io" },
  },
});
```

```js
// ethers v6
import { JsonRpcProvider, Network } from "ethers";

const mainnet = new JsonRpcProvider(
  "https://en-hkg.x-phere.com",
  new Network("xphere", 20250217)
);

const testnet = new JsonRpcProvider(
  "https://testnet.x-phere.com",
  new Network("xphere-testnet", 1998991)
);
```

### curl (sanity check)
```bash
# Mainnet
curl -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'

# Testnet
curl -X POST https://testnet.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```

## Rate Limits & Reliability

Public endpoints provided by the XPHERE Foundation are best-effort and may apply per-IP rate limits without prior notice. For production workloads, run your own [Endpoint Node](/nodes/Xphere-Endpoint-Node) or use a dedicated RPC provider.

## See Also

- [Testnet Faucet](/faucet) — 10 XPT per address per 24 h
- [Wallet Setup](/developers/wallet-setup)
- [Public RPC Endpoints](./public-en)
- [JSON-RPC Reference](./json-rpc)
- [XPHERE-specific RPC (`xp_*`)](./xphere-rpc)
- [xpHash Hard Fork](/mining/xphash-fork)
