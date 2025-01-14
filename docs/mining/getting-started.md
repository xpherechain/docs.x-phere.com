---
title: Getting Started
description: A comprehensive guide to setting up and running the Xphere miner, including download instructions, configuration steps, and platform-specific setup details for both MacOS and Windows systems.
lang: en
---

## Release

Stay up-to-date with the latest updates and improvements:

- **Latest Release Notes**: [Release v0.0.1](https://github.com/xpherechain/Xphere-miner/releases/tag/v0.0.1)

---

### 2. Download the Program

1. Visit the [latest release page](https://github.com/xpherechain/Xphere-miner/releases).
2. Download the miner binary appropriate for your operating system.
3. **Make sure to also download (or place) the `config.json` file in the same directory as the binary.**

4. Set Up the Target Miner
   To run the miner program, you need to set the targetMiner. Follow these steps
   - Visit https://about.zigap.io and create a wallet.
   - Once the wallet is created, copy the generated address and set it as the targetMiner in the configuration.
   - Select the `XPHERE 2.0 (Testnet) network` in the wallet, then copy the generated wallet address and use it as the targetMiner in your setup.

#### MacOS

1. Open the Terminal.
2. Navigate to the directory where you placed the MacOS miner binary, and also place the `config.json` file in the same directory.
3. The file to which you are granting execute permissions.

   ```bash
   chmod +x miner-darwin-amd64
   ```

4. Run the following command:

   ```bash
   ./miner-darwin-amd64 -config ./config.json -targetMiner your wallet address

   Note: If you encounter a warning about an unidentified developer, go to System Preferences → Security & Privacy → General, and allow the miner program.
   ```

##### Example

    ```bash
    ~/Downloads % ./miner-darwin-amd64 -config ./config.json -targetMiner "0x25752A3bD667E5a86cF297E74027503d48054442"
    ```

#### Windows

1. Open Command Prompt with administrator privileges.
2. Navigate to the directory where you placed the Windows miner binary, and also place the config.json file in the same directory.
3. Run the following command:

```
miner-window-amd64 -config ./config.json -targetMiner your wallet addr
```

**Make sure to use the appropriate command for your operating system and the location of the downloaded files.
For example, run the following command**

##### Example

    ```bash
    C:\Users\USER\Downloads>miner-window-amd64 -config ./config.json -targetminer 0x43ee5CDDF65F4cafA4b834e3c93108532Fe8768
    ```
