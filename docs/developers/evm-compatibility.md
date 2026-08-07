---
title: EVM Compatibility
description: Detailed matrix of opcodes, precompiles, and EIPs supported by XPHERE relative to Ethereum mainnet.
lang: en
sidebar_position: 4
---

# EVM Compatibility

XPHERE targets **Ethereum Cancun-level EVM compatibility**. The intent is bytecode equivalence — contracts deployed on Ethereum mainnet should compile, deploy, and execute identically on XPHERE.

## Hard Fork Equivalence

| Ethereum Upgrade | Status on XPHERE |
|------------------|------------------|
| Homestead | ✅ |
| Byzantium | ✅ |
| Constantinople | ✅ |
| Istanbul | ✅ |
| Berlin | ✅ |
| London (EIP-1559) | ✅ |
| Shanghai (PUSH0) | ✅ |
| Cancun (EIP-4844 blobs, transient storage) | ✅ EVM features<br/>⚠️ EIP-4844 blob carry: not applicable |
| Prague / Pectra | 🛠 Planned |

## Opcodes

All opcodes through Cancun are supported, including:

- `PUSH0` (Shanghai)
- `TLOAD` / `TSTORE` (transient storage, Cancun)
- `MCOPY` (memory copy, Cancun)
- `BLOBHASH` returns `0x0` (blobs not used by XPHERE data layer)
- `BLOBBASEFEE` returns `0x0` (Ethereum returns a non-zero minimum; XPHERE has no blob market)

## Precompiles

| Address | Function | Supported |
|---------|----------|-----------|
| `0x01` | ecRecover | ✅ |
| `0x02` | sha256 | ✅ |
| `0x03` | ripemd160 | ✅ |
| `0x04` | identity | ✅ |
| `0x05` | modExp | ✅ |
| `0x06` | bn256Add | ✅ |
| `0x07` | bn256ScalarMul | ✅ |
| `0x08` | bn256Pairing | ✅ |
| `0x09` | blake2f | ✅ |
| `0x0a` | point_evaluation (KZG) | ✅ (returns zero proof) |

## Differences from Ethereum

| Area | Ethereum | XPHERE |
|------|----------|--------|
| Block time | ~12 s | ~1 s |
| Finality | Probabilistic (PoS slots) | Instant (PBFT) on Main Chain |
| Native token | ETH | `XP` (Mainnet) / `XPT` (Testnet) |
| Chain ID | 1 (mainnet) | `20250217` (Mainnet), `1998991` (Testnet) |
| Base fee floor | none | `25 gwei` on both networks (`lowerboundbasefee`), capped at `750 gwei` |
| Priority fee | market-driven | `eth_maxPriorityFeePerGas` returns `0x0` on both networks |
| Blob carry (EIP-4844) | Yes | No (op present, no data layer) |

The fee figures come from the chain's own governance config and are readable live:

```bash
curl -s -X POST https://rpc.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"xp_getChainConfig","params":[],"id":1}'
# governance.dgp.lowerboundbasefee = 25000000000, upperboundbasefee = 750000000000
```

Both networks report the same values; the same call against `https://testnet.x-phere.com` returns the same `dgp` block with `chainId: 1998991`.

## Caveats for Ported Contracts

1. **Block time assumptions** — Many DeFi protocols hard-code `block.timestamp` checks assuming 12 s blocks. Audit any `block.timestamp + N` arithmetic for the 1 s cadence.
2. **Reorg assumptions** — XPHERE Main Chain finalizes within 1 block via PBFT. Some bridge code waits `N` confirmations for probabilistic finality; you can safely shorten this.
3. **Gas price** — Use EIP-1559 fields (`maxFeePerGas`, `maxPriorityFeePerGas`), and read the current suggestion from `eth_gasPrice` rather than hard-coding a floor. At the time of writing both networks report `0x66720b300` (27.5 gwei) against a base fee of 25 gwei.
4. **Test on Testnet first** — Chain ID `1998991`, native symbol `XPT`, funded from the [Faucet](/faucet). The EVM surface is the same as Mainnet, so a contract that behaves correctly there behaves the same way on Chain ID `20250217`. Note that Testnet transactions appear on [xpt.tamsa.io](https://xpt.tamsa.io), not on XPScan.

## Verifying Equivalence

```bash
# Compile the same source against both targets
solc --evm-version cancun --bin contracts/MyContract.sol
```

Bytecode output should be byte-identical between Ethereum and XPHERE targets when both use `--evm-version cancun`.

## See Also

- [Smart Contracts](./smart-contracts)
- [Network Information](/references/network-info) — Chain IDs, symbols, RPC endpoints, explorers
- [Testnet Faucet](/faucet)
- [JSON-RPC Reference](/references/json-rpc)
- [Whitepaper §6 — Ethereum Compatibility](/whitepaper#6-ethereum-compatibility-in-xphere)
