# XEN Install Guide

## Download <a id="download"></a>

You can download the latest version of the XEN on the [Download page](./downloads/Downloads.md).

## Installation

### Linux Archive Distribution <a id="linux-archive-distribution"></a>

The archive file consists of the executable binary and the configuration file structured as follows.

**Note**: Do NOT alter the file structure or file name. If you change it, the node may not function correctly.

```text
- bin
  |- xen
  |- xend
- conf
  |- xend.conf
  |- genesis.json
```

| File Name         | File Description                  |
| :---------------- | :-------------------------------- |
| bin/xen           | XEN executable file               |
| bin/xend          | XEN start/termination script file |
| conf/xend.conf    | XEN configuration file            |
| conf/genesis.json | XEN genesis.json file             |

The installation is the uncompression of the downloaded package where you want to install the package.

```text
$ tar zxf xen-vX.X.X-linux-amd64.tar.gz
```

The other sections assume that the path is added to the variable.

### Installed Location <a id="installed-location"></a>

The installed files are located as follows.

| File Name | Location                    |
| :-------- | :-------------------------- |
| xen       | /usr/bin/xen                |
| xend.conf | /etc/xend/conf/xend.conf    |
| xend.conf | /etc/xend/conf/genesis.json |

## Configuration <a id="configuration"></a>

The EN configuration is to create a data directory and to set up the environment variables on the configuration file `xend.conf`.

1. Create the EN data directory.
2. Configure the XEN with `xend.conf`.

### XEN Data Directory Creation <a id="en-data-directory-creation"></a>

Considering the fact that the size of Xphere blockchain data keeps increasing, it is recommended to use a big enough storage. You need to create the directory on your desired path.

```text
$ sudo mkdir -p ~/xen_data
```

### Then, initialize the blockchain data using xen init

```text
$ ./xen init --datadir ~/xen_data/ ../conf/genesis.json
```

### Update the Configuration File <a id="update-the-configuration-file"></a>

Configuration File Location:

- For the archive distribution, the config directory location defaults to `$INSTALL_PATH/xen-linux-amd64/conf/`.
- For the package distribution, the config directory defaults to `/etc/xend/conf/`.

#### Add Data Directory <a id="add-data-directory"></a>

You should update the the data directory environment variable `$DATA_DIR` on the configuration file `xend.conf`.

```text
DATA_DIR=~/xen_data
```

## Startup the Xend <a id="startup-the-en"></a>

You can start or stop the Endpoint Node using the following commands.

**start**

```bash
$ xend start
Starting xend: OK
```

**stop**

```bash
$ xend stop
Shutting down xend: Killed
```

**status**

```bash
$ xend status
xend is running
```

## Testing the Installation <a id="testing-the-installation"></a>

It is time to check that X Endpoint Node is successfully installed and it is working as expected after installation.

### Process Status <a id="process-status"></a>

It is possible to check the status of XEN's process using the status commands `systemctl` and `xend`.

#### systemctl <a id="systemctl"></a>

`systemctl` is installed along with the RPM, and the status of XEN can be checked as follows.

```bash
$ systemctl status xend.service
● xend.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/xend; bad; vendor preset: disabled)
   Active: active (running) since Wed 2025-03-05 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/xend start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (xen)
   CGroup: /system.slice/xend.service
           └─29641 /usr/local/bin/xen --networkid 20250217 --datadir /xend_home --port 44322 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

systemd[1]: Starting (null)...
xend[29636]: Starting xend: [  OK  ]
systemd[1]: Started (null).
```

You can check the current status such as `Active: active (running)` in the example above.

#### xend <a id="xend"></a>

`xend` is installed along with the package, and the status of EN can be checked as follows.

```bash
$ xend status
xend is running
```

### Logs <a id="logs"></a>

The log is stored in `xend.out` file located in the path defined in the `LOG_DIR` field of the `xend.conf` file. When the node works properly, you can see that each block is imported per second as follows.

Example:

```bash
$ tail xend.out
INFO[03/05,11:52:58 +09] [5] Inserted a new block                      number=208163 hash=09d12c…7e2b27 txs=0 gas=0 elapsed=1.862ms      processTxs=250ns     finalize=231.833µs validateState=38.583µs  totalWrite=977.25µs     trieWrite=240.25µs
INFO[03/05,11:52:59 +09] [51] Commit new mining work                    number=208164 hash=df58fa…94e3c4 txs=0 elapsed=355µs        commitTime=217.917µs finalizeTime=130.875µs
INFO[03/05,11:52:59 +09] [25] received a quorum of the messages and change state to prepared  msgType=1 prepareMsgNum=3 commitMsgNum=0 valSet=4
INFO[03/05,11:52:59 +09] [24] Committed                                 number=208164 hash=612653…bfd9ba address=0xB54da36969A54362D0EDbA4E8c38eE199471eB9F
INFO[03/05,11:52:59 +09] [51] Successfully sealed new block             number=208164 hash=612653…bfd9ba
INFO[03/05,11:52:59 +09] [51] Successfully wrote mined block            num=208164 hash=612653…bfd9ba txs=0 elapsed=597.416µs
INFO[03/05,11:53:00 +09] [51] Commit new mining work                    number=208165 hash=105c7a…ecf460 txs=0 elapsed=2.503ms      commitTime=496.125µs finalizeTime=1.987ms
INFO[03/05,11:53:00 +09] [25] received a quorum of the messages and change state to prepared  msgType=2 valSet=4
INFO[03/05,11:53:00 +09] [24] Committed                                 number=208165 hash=be0cc2…80878c
```

### Queries <a id="queries"></a>

#### xen console <a id="xen-console"></a>

Xphere provides a CLI client: `xen console`. Another way of using the client is to connect to the process via IPC (inter-process communication). The IPC file `xphere.ipc` is located in the `DATA_DIR` path on an XEN.

Please execute the following command and check out the result.

```text
$ xen attach --datadir /var/xend/data
Welcome to the Xphere JavaScript console!

instance: Xphere/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: root/xen_data
 modules: eth:1.0 net:1.0 rpc:1.0  xp:1.0
 >
```

You can check the usable commands

The useful APIs to check the status of XEN:

- `xp.blockNumber` (to get the latest block number)
- `net.peerCount` (to get the number of the connected Xphere nodes currently)

#### xp.blockNumber <a id="xphere-blocknumber"></a>

You can get the latest block number to see if blocks are propagated properly.

```text
> xp.blockNumber
1
```

#### net.peerCount <a id="net-peercount"></a>

```text
> net.peerCount
6
```

The above command line returns the number of nodes that the XEN connects to.
