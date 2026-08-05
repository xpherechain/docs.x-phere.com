---
title: For Partners
description: Referral integration for the XP Union Vault — one URL, on-chain attribution, no cost to users.
lang: en
sidebar_position: 5
---

# For Partners

Wallets, communities, and services can route users to the Union Vault and have those deposits **attributed on-chain**, with no integration work beyond a link.

## Integration Is One URL

```
https://stake.x-phere.com/?ref=<your-slug>
```

**No SDK. No API key. No backend.** Users who arrive through your link stake exactly as anyone else does.

## Attribution Is On-Chain

Attribution is recorded by the contracts themselves, so you can **verify it independently** — you are not dependent on a dashboard's word:

| Where | What it gives you |
|-------|-------------------|
| `partnerTVL` | The staked total attributed to your bucket |
| `Deposited` event | Carries an **indexed** `partnerId`, so deposits are filterable per partner |

Live attribution is also published at **[stake.x-phere.com/partners.html](https://stake.x-phere.com/partners.html)**.

## How Users Are Assigned

- A user's **first deposit permanently fixes** which bucket they belong to.
- **One user, one bucket** — attribution does not move afterwards.

## Users Pay Nothing Extra

Referred users earn **exactly the same as anyone staking directly**. There is **no commission taken from users** — attribution never changes a user's deposit, rewards, or withdrawal.

## Getting Registered

Partner registration and terms are **agreed individually with the Foundation**.

**[partners@x-phere.com](mailto:partners@x-phere.com)**

## See Also

- [Overview](./overview)
- [Contracts & Verification](./contracts)
- [Fees & Risks](./fees-and-risks)
