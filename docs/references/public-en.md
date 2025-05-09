---
title: Public JSON-RPC Endpoints
description: A comprehensive guide to publicly accessible JSON-RPC endpoints for interacting with the Xphere network, including mainnet and testnet endpoints, service providers, and important considerations for usage.
lang: en
---

Publicly accessible JSON-RPC endpoints enable you to test and operate your blockchain applications by interacting with the Xphere network without the need to run your own node.

Operating your own Xphere Endpoint Node (EN) requires technical expertise, continuous monitoring, and computing resources. This entails costs for maintaining storage, network bandwidth, and dedicating engineering time; nodes must be regularly updated and health-checked.

Utilizing existing public ENs allows you to focus solely on developing and testing your blockchain applications without the burden of maintaining the infrastructure necessary to connect and interact with the Xphere network.

## Considerations

- Node providers are not liable for any damages or losses resulting from traffic or interactions with the nodes.
- High traffic concentration on certain nodes may lead to service delays.
- To prevent excessive requests, rate limits may be applied on a per-node basis and are subject to change without prior notice.

## Public JSON-RPC Endpoints

Below is a list of network domains offered by Xphere’s public node providers.

### Mainnet Public JSON-RPC Endpoints

Please note that these endpoints are provided to the community for testing and development purposes. As uptime and stability cannot be guaranteed, they should not be used for commercial purposes.

**HTTPS**

| Service Provider  | Endpoints                                                      | Namespaces | Type | status  |
| ----------------- | -------------------------------------------------------------- | ---------- | ---- | ------- |
| Xphere Foundation | `https://en-hkg.x-phere.com`<br />`https://en-bkk.x-phere.com` | xp,eth,net | Full | pending |

**WebSocket**

| Service Provider  | Endpoints                                                        | Namespaces | Type | status  |
| ----------------- | ---------------------------------------------------------------- | ---------- | ---- | ------- |
| Xphere Foundation | `wss://en-hkg.x-phere.com/ws`<br />`wss://en-bkk.x-phere.com/ws` | xp,eth,net | Full | pending |

### Testnet Public JSON-RPC Endpoints

**HTTPS**

| Service Provider  | Endpoints                     | Namespaces | Type |
| ----------------- | ----------------------------- | ---------- | ---- |
| Xphere Foundation | `https://testnet.x-phere.com` | eth,net    | Full |

**WebSocket**

| Service Provider  | Endpoints                      | Namespaces   | Type |
| ----------------- | ------------------------------ | ------------ | ---- |
| Xphere Foundation | `wss://testnet.x-phere.com/ws` | eth,net,web3 | Full |

## RPC Service Providers

Below is a list of Xphere’s Public Node Providers.
