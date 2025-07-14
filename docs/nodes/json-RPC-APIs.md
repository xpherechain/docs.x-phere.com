# Xphere JSON-RPC APIs

A Xphere Node exposes JSON-RPC APIs. You can enable or disable APIs as follows.

**NOTE**: Offering an API over the HTTP (`rpc`) or WebSocket (`ws`) interfaces will give everyone
access to the APIs who can access this interface (DApps, browser tabs, etc). Be careful about which APIs
you enable. By default, Xphere enables all APIs over the IPC (`ipc`) interface but for `rpc` and `ws` required modules have to be explicitly enabled.

## Enabling APIs <a id="enabling-apis"></a>

### From Commandline <a id="from-commandline"></a>

To offer the APIs over the Xphere RPC endpoints, please specify them with the `--${interface}api`
command-line argument where `${interface}` can be `rpc` for the HTTP endpoint or `ws` for the WebSocket endpoint.

`ipc` offers all APIs over the unix socket (Unix) or named pipe (Windows) endpoint without any flag.

You can launch a Xphere node with specific APIs you want to add like the example below. But keep in mind that you can't change APIs once you launch the node.

Example) launching a Xphere node with `Xphere` and `net` modules enabled:

```shell
$ xen --rpcapi xp,net --rpc --{other options}
```

The HTTP RPC interface must be explicitly enabled using the `--rpc` flag.

### Using Configuration <a id="using-configuration"></a>

Please update the `RPC_ENABLE`, `RPC_API`, `WS_ENABLE` and `WS_API` properties in the

## Xphere JSON-RPC API Overview <a id="full-api-list"></a>

The `xp` namespace provides a wide range of JSON-RPC methods for interacting with the Xphere blockchain.

For detailed usage examples, parameters, and response formats, please refer directly to the  
[JSON-RPC API Reference](../references/json-rpc.md).

You will find comprehensive guides and examples for all available methods in the reference documentation.

To determine which APIs an interface provides, the `modules` JSON-RPC method can be invoked. For
example over an `rpc` interface:

**IPC**

```javascript
$ xen attach --datadir <DATA_DIR>
Welcome to the Xphere JavaScript console!

 instance: Xphere/vX.X.X/XXXX-XXXX/goX.X.X
  datadir: /var/xend/data
  modules: eth:1.0 net:1.0 rpc:1.0  xp:1.0

>
```

**HTTP**

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' http://en-bkk.x-phere.com
```

will give all enabled modules including the version number:

```
{
    "jsonrpc":"2.0",
    "id":1,
    "result":{
        "eth":"1.0",
        "net":"1.0",
        "rpc":"1.0",
        "xp":"1.0"
    }
}
```

<!-- ## Disabling unsafe debug APIs <a id="disabling-unsafe-debug-apis"></a>

Some debug namespace APIs are unsafe/unappropriate to be opened to public.
We recommend you to provide the debug namespace APIs to authorized users only.
However, if you want to maintain a public XEN and provide debug namespace APIs to the public,
we strongly recommend you to set the `rpc.unsafe-debug.disable` flag which will disable APIs
that are unsafe/unappropriate to be opened to the public and enable only a subset of the debug namespace APIs.

The enabled APIs are as follows:

- [VM Tracing](../../../references/json-rpc/debug/trace-bad-block) APIs, however with limited functionality (only [pre-defined tracers](../../../references/json-rpc/debug/trace-bad-block) are allowed. See params/tracingOptions)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

To set the `rpc.unsafe-debug.disable` flag, append the following line in the `xend.conf` file.

```
ADDITIONAL="$ADDITIONAL --rpc.unsafe-debug.disable"
``` -->
