---
title: JavaScript API libraries
description: Using ethers.js, viem, and web3.js to read XPHERE state, sign transactions, and call contracts from JavaScript.
lang: en
---

# JavaScript API libraries

A web app talks to XPHERE the same way it talks to Ethereum: over [JSON-RPC](./json-rpc). You can
send those requests by hand with `fetch`, but the mainstream libraries handle encoding, nonce
management, gas estimation, and ABI decoding for you.

XPHERE is EVM-compatible, so **ethers.js, viem, and web3.js all work unmodified** — they only need
to be pointed at an XPHERE endpoint and given the right chain ID.

| Library | Install | Notes |
|---------|---------|-------|
| [ethers.js](https://docs.ethers.org/v6/) | `npm i ethers` | v6 is current; v5 syntax differs, see below |
| [viem](https://viem.sh) | `npm i viem` | TypeScript-first, used by wagmi |
| [web3.js](https://docs.web3js.org) | `npm i web3` | v4 is current |

## Connecting

The full chain definitions for all three libraries are in
[Network Information](./network-info#viem--ethersjs--web3js). The short version:

| | Mainnet | Testnet |
|---|---|---|
| Chain ID | `20250217` (`0x134fe69`) | `1998991` (`0x1e808f`) |
| Native token | `XP` | `XPT` |
| Public endpoint | `https://en-hkg.x-phere.com` | `https://testnet.x-phere.com` |

**ethers v6**

```js
import { JsonRpcProvider, BrowserProvider, Network } from "ethers";

// Read-only, straight to a public endpoint
const provider = new JsonRpcProvider(
  "https://en-hkg.x-phere.com",
  new Network("xphere", 20250217)
);

// Or through an injected wallet, when you need the user to sign
const browserProvider = new BrowserProvider(window.ethereum);
const signer = await browserProvider.getSigner();
```

**viem**

```ts
import { createPublicClient, http } from "viem";
import { xphere } from "./chains"; // defineChain block from Network Information

const client = createPublicClient({
  chain: xphere,
  transport: http(),
});
```

**web3.js**

```js
import { Web3 } from "web3";

const web3 = new Web3("https://en-hkg.x-phere.com");
```

### Connecting to your own node

If you run an [Endpoint Node](/nodes/Xphere-Endpoint-Node), the shipped `conf/xend.conf` serves
HTTP-RPC on **28551** and WebSocket on **28552**:

```js
import { JsonRpcProvider, WebSocketProvider } from "ethers";

const local = new JsonRpcProvider("http://127.0.0.1:28551");
const localWs = new WebSocketProvider("ws://127.0.0.1:28552");
```

The IPC socket sits at `<DATA_DIR>/xphere.ipc` — with the shipped `DATA_DIR=~/xen_data`, that is
`~/xen_data/xphere.ipc`.

:::caution IPC has no namespace whitelist
Every namespace is exposed over IPC, including `personal` and `admin`. Filesystem access to the
socket is equivalent to full control of the node. See [JSON-RPC APIs](/nodes/json-RPC-APIs).
:::

## Reading chain state

```js
await provider.getBlockNumber();
// 45160854

await provider.getBalance("0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1");
// 0n  (a BigInt, in wei)

await provider.getTransactionCount(address);
```

:::note XPHERE has no name service
There is no ENS on XPHERE. Every address argument must be a literal `0x…` address — passing a
`.eth` name will fail.
:::

## Wallets and signing

```js
import { Wallet, parseEther } from "ethers";

// Load a key from the environment — never hardcode one
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

wallet.address;

await wallet.signMessage("Hello XPHERE");

const tx = await wallet.sendTransaction({
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: parseEther("1.0"), // 1 XP
});
await tx.wait();
```

:::danger Never use a key from documentation
Any private key or mnemonic printed in a document — here or anywhere else — is known to everyone
who has read that document. Funds sent to such an address can be taken by anyone. Generate your own,
and keep it out of source control.
:::

## Calling contracts

Point the library at a deployed address with its ABI, and the contract behaves like a normal
JavaScript object:

```js
import { Contract } from "ethers";

const abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];

const token = new Contract(tokenAddress, abi, wallet);

// A view call costs no gas
const balance = await token.balanceOf(wallet.address);

// A state change is a transaction
const tx = await token.transfer(recipient, 1_000n);
await tx.wait();

// Events
token.on("Transfer", (from, to, value) => {
  console.log(from, "→", to, value);
});
```

If the contract's source is verified on XPScan you can fetch its ABI rather than pasting one:

```bash
curl -s "https://xpscan.io/api?module=contract&action=getabi&address=0x…"
```

See [Verifying Contracts](/developers/smart-contracts#verifying-contracts).

## Units

Balances and values are in **wei**. 1 XP = 10<sup>18</sup> wei, so you will almost always convert at
the edges of your application:

```js
import { parseEther, formatEther, parseUnits, formatUnits } from "ethers";

parseEther("1.5"); // 1500000000000000000n
formatEther(1500000000000000000n); // '1.5'

// Tokens with other decimals
parseUnits("1.5", 6); // 1500000n  (a 6-decimal token)
formatUnits(balance, 18);
```

ethers v5 exposes these under `ethers.utils.*` (`ethers.utils.parseEther`). In v6 they are top-level
imports, as above. Mixing the two is the most common upgrade error.

## Gas

XPHERE uses EIP-1559 style fees. The base fee is set by the network and the **priority fee is
`0`** — `eth_maxPriorityFeePerGas` returns `0x0`. Letting the library estimate is correct in almost
all cases:

```js
const fee = await provider.getFeeData();
// { gasPrice, maxFeePerGas, maxPriorityFeePerGas }
```

Full parameters and current values are in [Network Information](./network-info).

## See Also

- [Network Information](./network-info) — chain IDs, endpoints, and ready-to-paste chain definitions
- [JSON-RPC Reference](./json-rpc) — the methods these libraries call underneath
- [XPHERE-specific RPC](./xphere-rpc) — the `xp_*` namespace
- [Wallet Setup](/developers/wallet-setup) — adding XPHERE to MetaMask
- [Smart Contracts](/developers/smart-contracts) — deploying and verifying with Hardhat or Foundry
