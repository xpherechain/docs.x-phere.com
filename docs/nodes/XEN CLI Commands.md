# XEN CLI Commands

```bash
USAGE:
   xen [options] command [command options] [arguments...]
```

## Commands

`xen`has the following commands.

```bash
COMMANDS:
   account     Manage accounts
   attach      Start an interactive JavaScript environment (connect to node)
   console     Start an interactive JavaScript environment
   init        Bootstrap and initialize a new genesis block
   snapshot    A set of commands based on the snapshot
   version     Show version number
   help, h     Shows a list of commands or help for one command
```

To get a detailed usage guideline for each command, give -h option.

```bash
$ xen account -h
Manage accounts, list all existing accounts, import a private key into a new
account, create a new account or update an existing account.
 ...
Keys are stored under <DATADIR>/keystore.
It is safe to transfer the entire directory or the individual keys therein
between xphere nodes by simply copying.

Make sure you backup your keys regularly.

USAGE:
   xen account command [command options] [arguments...]

COMMANDS:
     list    Print summary of existing accounts
     new     Create a new account
     update  Update an existing account
     import  Import a private key into a new account
```

```bash
$ xen init -h
init [command options] [arguments...]

The init command initializes a new genesis block and definition for the network.
This is a destructive action and changes the network in which you will be
participating.
 ...
```

## JavaScript Console

Xphere Endpoint Node comes with JavaScript console. From the console command line, you can initiate part of Xphere API calls to your EN. To attach to the JavaScript console, execute the following command.

```bash
$ xen attach --datadir ~/xend_home
Welcome to the Xphere JavaScript console

!instance: Xphere/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/xend_home
 modules: ...

 >
```

attach command connects to the running node, while console command launches a node and connects to it.

```bash
   attach      Start an interactive JavaScript environment (connect to node)
   console     Start an interactive JavaScript environment
```

### Module APIs

If you type the module name on the console prompt, you will see the available properties and functions of the module.

```javascript
> xp
{
  getBlock: function(),
  getBlockNumber: function(callback),
  getBlockReceipts: function(),
  getBlockTransactionCount: function(),
  getBlockWithConsensusInfo: function(),
  getBlockWithConsensusInfoRange: function(),
  getChainConfig: function(),
  ...
  getCode: function(),
  getCommittee: function(),
  getCommitteeSize: function(),
  getCouncil: function(),
  getCouncilSize: function(),
  ...
}

> xp.getCommittee
["0x4....", "0x5....", "0x9....", "0xf...."]
>
```
