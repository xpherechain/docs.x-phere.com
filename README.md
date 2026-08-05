# XPHERE Documentation

Source for the official XPHERE documentation at **[docs.x-phere.com](https://docs.x-phere.com)**.

XPHERE is an EVM-compatible Layer 1 with a dual-chain architecture: a PBFT Main Chain for fast
finality and an xpHash Proof-of-Work Proof Chain for validator selection and security.

## What's here

| Section | Covers |
|---------|--------|
| [Developers](https://docs.x-phere.com/developers/quickstart) | Quickstart, wallet setup, smart contracts, token standards, EVM compatibility |
| [References](https://docs.x-phere.com/references) | Network parameters, public RPC endpoints, JSON-RPC and `xp_*` method reference |
| [Nodes](https://docs.x-phere.com/nodes) | Running an Endpoint Node (XEN), CLI, chaindata snapshots, validator requirements |
| [Mining](https://docs.x-phere.com/mining) | xpHash mining and rewards |
| [Staking](https://docs.x-phere.com/staking/overview) | XP Union Vault — settlement model, fees, risks, contracts |
| [Union](https://docs.x-phere.com/union) | The validator group: role, requirements, members |
| [Ecosystem](https://docs.x-phere.com/ecosystem/grants) | Grant program and ecosystem directory |
| [Resources](https://docs.x-phere.com/resources/faq) | FAQ, glossary, tokenomics, security, network upgrades |

The [whitepaper](https://docs.x-phere.com/whitepaper) covers the architecture, consensus, and
economic model.

## Node downloads

The XEN node package is published from this repository and served at
[docs.x-phere.com/nodes/downloads](https://docs.x-phere.com/nodes/downloads), with a SHA256 checksum
alongside it.

## Running locally

Requires Node.js ≥ 18.

```bash
npm install
npm start          # dev server with live reload at http://localhost:3000
npm run build      # production build into build/
npm run serve      # serve the production build locally
```

The build fails on broken internal links (`onBrokenLinks: "throw"`), so a successful build means
every internal link and anchor resolves.

## Contributing

Corrections are welcome — accuracy matters more here than completeness.

**Everything must be verifiable.** Network values, RPC responses, contract addresses, and command
output should be checked against the live network or the client source before being documented. If
a fact cannot be verified, the docs say so rather than guessing. For example:

```bash
# Confirm a chain ID before documenting it
curl -s -X POST https://en-hkg.x-phere.com \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```

Open an issue or a pull request. For anything security-related, do **not** open a public issue —
email `security@x-phere.com` (see [Security](https://docs.x-phere.com/resources/security)).

## Links

- Website — [x-phere.com](https://x-phere.com)
- Explorer — [xpscan.io](https://xpscan.io) · [xp.tamsa.io](https://xp.tamsa.io)
- Staking — [stake.x-phere.com](https://stake.x-phere.com)
- Testnet faucet — [faucet.x-phere.com](https://faucet.x-phere.com)

---

© XPHERE Foundation
