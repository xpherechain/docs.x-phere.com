---
title: Explorer API
description: XPScan's REST API for indexed XPHERE data — blocks, transactions, addresses, tokens, supply, and contract verification.
lang: en
---

# Explorer API

[XPScan](https://xpscan.io) exposes a REST API over **indexed** Mainnet data. It answers questions a
node cannot answer cheaply — "which addresses hold the most XP", "how many transactions per day",
"how much of the supply has been minted" — because the explorer has already aggregated them.

## Which API do I want?

| You need | Use |
|----------|-----|
| Current chain state, sending transactions, calling contracts | [JSON-RPC](./json-rpc) on a [node endpoint](./public-en) |
| XPHERE-specific chain data — council, committee, rewards, chain config | [`xp_*` RPC](./xphere-rpc) |
| Indexed and aggregated data — rankings, daily totals, token lists, search | **Explorer API** (this page) |
| Verifying contract source from the CLI | [Smart Contracts → Verifying Contracts](/developers/smart-contracts#verifying-contracts) |

A node answers *what is true right now*. The explorer answers *what has happened over time*.

## Basics

| Field | Value |
|-------|-------|
| Base URL | `https://xpscan.io` |
| Network | Mainnet only — Chain ID `20250217` |
| Format | JSON |
| Auth | None required |
| Rate limit | XPScan states 100 req/min (Free), 1000 req/min (Pro) |

No testnet instance is published, so this API covers Mainnet only. For testnet, use the
[Tamsa testnet explorer](https://xpt.tamsa.io).

## Endpoints worth knowing

The full endpoint list is maintained by XPScan at **[xpscan.io/api-docs](https://xpscan.io/api-docs)**.
The ones below are the ones most often needed from documentation, and each response shown here was
captured from the live endpoint.

### Supply and emission — `/api/supply`

Useful because it makes the emission model in [Tokenomics](/resources/tokenomics) checkable rather
than something you take on trust.

```bash
curl -s https://xpscan.io/api/supply
```

```json
{
  "totalSupply": 5500000000,
  "totalMinted": 1386009700.8,
  "mintedPercent": 25.2,
  "halvingBlock": 31536000,
  "breakdown": {
    "miners":     { "share": 0.4, "total": 554403880.32 },
    "union":      { "share": 0.4, "total": 554403880.32 },
    "foundation": { "share": 0.2, "total": 277201940.16 }
  },
  "preHalving":  { "blocks": 31536000, "rewardPerCycle": 2000,   "totalMinted": 1051200000 },
  "postHalving": { "blocks": 13624960, "rewardPerCycle": 1474.4, "totalMinted": 334809700.8 }
}
```

The `breakdown` shares are the 40 / 40 / 20 minted-reward split, and `rewardPerCycle` shows the
reduction from 2,000 XP to 1,474.4 XP per 60-block cycle after the first reduction.

### Network status — `/api/network`

Block height, gas price, TPS, and the latest block header including its `miner` and `proposer`.

```bash
curl -s https://xpscan.io/api/network
```

```json
{
  "blockNumber": 45160854,
  "gasPrice": "27500000000",
  "gasPriceGwei": "27.5",
  "tps": 0.55,
  "latestBlock": {
    "number": 45160854,
    "miner": "0x0e73...cb31",
    "proposer": "0x6499...751c",
    "gasUsed": "564340",
    "gasLimit": "999999999999",
    "baseFeePerGas": "25000000000",
    "transactionCount": 2
  }
}
```

`miner` is the Proof Chain miner; `proposer` is the [Union](/union) member whose turn it was.

### Union members — `/api/unions`

The registered Union slots with stake, rewards, and APR, plus halving context.

```bash
curl -s https://xpscan.io/api/unions
```

Returns `members[]` (each with `name`, `address`, `totalStaked`, `totalReward`,
`estimatedAnnualReward`, `halvingAwareAPR`, `startBlockNumber`), `totalCnt`, and a `halving` block.
See [Union Members](/union/members) for what these mean.

### Price — `/api/price`

An aggregated XP/USDT price with its on-chain oracle round and the exchanges it was sourced from.

```bash
curl -s https://xpscan.io/api/price
```

```json
{
  "price": 0.014987,
  "pair": "XP/USDT",
  "roundId": 520,
  "oracle": "0x6e32Ea5aa2bFcf7ce089940558b25192dEd1d4E6",
  "sources": 3,
  "exchanges": [
    { "name": "MEXC",   "price": 0.01498 },
    { "name": "XT.com", "price": 0.015 },
    { "name": "LBank",  "price": 0.014987 }
  ]
}
```

:::caution
Price data is informational. It reflects third-party exchange quotes at the time of the request and
is not a Foundation valuation.
:::

### Mining — `/api/mining`

A large aggregate: `topMiners`, `recentBlocks`, `networkStats` (total miners, average block time),
`distribution`, `hourlyProduction`, `blockTimeDist`, `dailyMiners`, `hashrateTrend`, and
`rewardEstimates`.

### Listings and lookup

| Endpoint | Returns |
|----------|---------|
| `/api/blocks?limit=&offset=` | Recent blocks |
| `/api/blocks/{number}` | One block |
| `/api/transactions?limit=&offset=&txType=&from=&to=` | Recent transactions |
| `/api/transactions/{hash}` | One transaction |
| `/api/addresses/{address}` | Balance, transaction count, contract flag |
| `/api/tokens?limit=&offset=` | Tokens, ordered by transfer count |
| `/api/tokens/{address}` | Token metadata and holders |
| `/api/top-accounts?limit=` | Accounts ranked by transaction count |
| `/api/stats` | Daily transaction counts, gas, and volume |
| `/api/search?q=` | Autocomplete over tokens and address labels |

### Contract verification

Verification has its own Etherscan-compatible surface under `/api?module=contract&action=…`, which is
what `hardhat verify` and `forge verify-contract` use. That flow is documented with a worked example
in [Smart Contracts → Verifying Contracts](/developers/smart-contracts#verifying-contracts).

XPScan also exposes a REST form of the same data:

```bash
curl -s https://xpscan.io/api/contracts/{address}/verify   # verification status
```

## Checking an endpoint before relying on it

Every endpoint here returns JSON on success, so a quick sanity check is enough:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://xpscan.io/api/network   # 200
```

XPScan is operated as the XPHERE block explorer; treat availability and response shapes as subject
to change, and read [xpscan.io/api-docs](https://xpscan.io/api-docs) for the authoritative and
current list.

## See Also

- [JSON-RPC Reference](./json-rpc) — node RPC, `eth_*` / `net_*` / `web3_*`
- [XPHERE-specific RPC](./xphere-rpc) — the `xp_*` namespace
- [Public JSON-RPC Endpoints](./public-en) — node endpoints and providers
- [Verifying Contracts](/developers/smart-contracts#verifying-contracts) — CLI and manual verification
- [Tokenomics](/resources/tokenomics) — the emission model `/api/supply` reports
