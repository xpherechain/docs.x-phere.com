# X Endpoint Node

## Intended Audience <a id="intended-audience"></a>

- Anyone who wants to send transactions or query the state of Xphere MainChain network using needs to do so via an X Endpoint Node.
- X Endpoint Nodes are the interface to the Xphere Network.

## Overview <a id="endpoint-node-overview"></a>

An X Endpoint Node has the following roles and functions.

- Synchronize the blockchain data.
- Validate the blocks newly received.
- Handles query requests.
- Transmits transaction requests to the Proxy Nodes.

The X Endpoint Node install binary comes with the following interfaces and utilities.

- JSON-RPC APIs: JSON-RPC server runs inside the node, and it exposes for Blockchain Application development. It has several node management APIs as well.
- Command-line Interface: Provides account management and node configuration functions. An interactive JavaScript console is also provided, that is attached to the node.
