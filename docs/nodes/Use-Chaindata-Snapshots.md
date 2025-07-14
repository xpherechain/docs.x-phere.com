# Use Chaindata Snapshots

You can start a node from an already-synced database called a chaindata snapshot. A chaindata snapshot is a compressed Xphere data directory.

## Download the fullsync File

Download a compressed file to the new directory. URLs can be found at the bottom of this page.

- Option 1. curl

  ```sh
  curl -O https://storage.googleapis.com/xphere-mainnet/xphere-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
  ```

## Decompress the File

- Option 1. tar
  ```sh
  tar -xvf Xphere-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
  ```

## Apply the Chaindata Snapshot

:::note
The "original data directory" means the `DATA_DIR` you have configured for your node.
:::

Follow these steps to safely replace your node's data with a chaindata snapshot:

**First step:** Stop your node completely.

**Second step:** Delete the existing `chaindata` directory in your DATA_DIR.

```sh
rm -rf /DATA_DIR/chaindata
```

- Replace `/DATA_DIR` with the actual path you use for your node's data directory.

**Third step:** Move the extracted chaindata to your DATA_DIR.

```sh
mv /path/to/extracted/chaindata /DATA_DIR/xphere/chaindata
```

- Replace `/path/to/extracted/chaindata` with the path where you extracted the tar.gz file.

**Fourth step (optional):** Delete the tar.gz file and any old data.

```sh
rm Xphere-mainnet-chaindata-xxxxxxxxxxxxxx.tar.gz
# Remove old data if needed
```

**Final step:** Restart your node.

```sh
./xend start
```

> By following these steps, you can quickly start your node with the latest chaindata snapshot, safely replacing the old data in your configured DATA_DIR.

## Downloads

| network | sync options | download                            |
| ------- | ------------ | ----------------------------------- |
| mainnet | Full Sync    | https://package.x-phere.com/mainnet |
| testnet | Full Sync    | https://package.x-phere.com/testnet |
