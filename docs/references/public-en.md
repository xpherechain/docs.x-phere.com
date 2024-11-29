# Public JSON-RPC Endpoints

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

| Service Provider | Endpoints                          | Namespaces      | Type    |
|------------------|------------------------------------|-----------------|---------|
| Xphere Foundation| `https://public-en.x-phere.com`    | xphere,eth,net  | Full    |

**WebSocket**

| Service Provider | Endpoints                          | Namespaces      | Type    |
|------------------|------------------------------------|-----------------|---------|
| Xphere Foundation| `wss://public-en.x-phere.com/ws`   | xphere,eth,net  | Full    |

### Testnet Public JSON-RPC Endpoints

**HTTPS**

| Service Provider | Endpoints                          | Namespaces      | Type    |
|------------------|------------------------------------|-----------------|---------|
| Xphere Foundation| `https://public-en-testnet.x-phere.com` | xphere,eth,net | Full    |

**WebSocket**

| Service Provider | Endpoints                          | Namespaces      | Type    |
|------------------|------------------------------------|-----------------|---------|
| Xphere Foundation| `wss://public-en-testnet.x-phere.com/ws` | xphere,eth,net | Full    |

## RPC Service Providers

Below is a list of Xphere’s Public Node Providers.