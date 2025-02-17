---
title: Getting Started
description: A comprehensive guide for setting up and running the Xphere miner
lang: en
---

This guide walks you through the complete process of setting up and running an Xphere miner.

## Prerequisites

Before you begin mining, ensure you have:

- Checked the [system requirements](/mining/requirements)
- A Zigap wallet account
- The latest Xphere miner binary

## Installation Guide

### 1. Wallet Setup

1. Create a new wallet at [Zigap](https://about.zigap.io)
2. Select the `XPHERE 2.0` network
3. Copy your wallet address - you'll need this for miner configuration

### 2. Download the Miner

Download the latest version of the Xphere miner:

1. Visit the [releases page](https://github.com/xpherechain/Xphere-miner/releases)
2. Download the appropriate binary for your operating system
3. Make sure to also download (or place) the config.json file in the same directory as the binary.

### 3. Installation Steps

#### For MacOS Users

1. Open Terminal
2. Navigate to your download directory
3. Make the binary executable:
   ```bash
   chmod +x miner-darwin-amd64
   ```
4. Run the miner:
   - 4-1: Using config.json

```bash
./miner-darwin-amd64 -config ./config.json
```

**🛠 Example `config.json` File**

If you prefer to use a configuration file instead of manually entering parameters, create a `config.json` file with the following structure:

```json
{
  "targetMiner": "your address",
  "domain": [
    "https://sgp-mining.x-phere.com",
    "https://bkk-mining.x-phere.com",
    "https://hkg-mining.x-phere.com",
    "https://idn-mining.x-phere.com"
  ]
}
```

- 4-2: Running without config.json (Manually specify all parameters)

```bash
./miner-darwin-amd64 -targetMiner "your address" -domain https://sgp-mining.x-phere.com,https://bkk-mining.x-phere.com,https://hkg-mining.x-phere.com,https://idn-mining.x-phere.com]
```

> **Note**: If you see a security warning, go to System Preferences → Security & Privacy → General and allow the application to run.

#### For Windows Users

1. Open Command Prompt as administrator
2. Navigate to your download directory

```bash
cd %USERPROFILE%\Downloads
```

3.Run the miner:

- 3-1: Using config.json

```bash
./miner-windows-amd64 -config ./config.json
```

**🛠 Example `config.json` File**

If you prefer to use a configuration file instead of manually entering parameters, create a `config.json` file with the following structure:

```json
{
  "targetMiner": "your address",
  "domain": [
    "https://sgp-mining.x-phere.com",
    "https://bkk-mining.x-phere.com",
    "https://hkg-mining.x-phere.com",
    "https://idn-mining.x-phere.com"
  ]
}
```

- Option 2: Running without config.json (Manually specify all parameters)

```bash
miner-windows-amd64 -targetMiner "your address" -domain https://sgp-mining.x-phere.com,https://bkk-mining.x-phere.com,https://hkg-mining.x-phere.com,https://idn-mining.x-phere.com
```

## Configuration

The miner requires two main parameters:

- `config.json`: Contains basic configuration settings
- `targetMiner`: Your Zigap wallet address

### Example Commands

MacOS:

- Using config.json

```json
{
  "targetMiner": "0xcf52d7D7Ffb9Fe4De4fa218d14BbF7Af04603B3",
  "domain": [
    "https://sgp-mining.x-phere.com",
    "https://bkk-mining.x-phere.com",
    "https://hkg-mining.x-phere.com",
    "https://idn-mining.x-phere.com"
  ]
}
```

```bash
./miner-darwin-amd64 -config ./config.json
```

- Running without config.json (Manually specify all parameters)

```bash
./miner-darwin-amd64 -targetMiner 0xcf52d7D7Ffb9Fe4De4fa218d14BbF7Af04603B3 -domain https://sgp-mining.x-phere.com,https://bkk-mining.x-phere.com,https://hkg-mining.x-phere.com,https://idn-mining.x-phere.com
```

Windows:

- Using config.json

```json
{
  "targetMiner": "0xcf52d7D7Ffb9Fe4De4fa218d14BbF7Af04603B3",
  "domain": [
    "https://sgp-mining.x-phere.com",
    "https://bkk-mining.x-phere.com",
    "https://hkg-mining.x-phere.com",
    "https://idn-mining.x-phere.com"
  ]
}
```

- Running without config.json (Manually specify all parameters)

```bash
miner-windows-amd64 -targetMiner 0xcf52d7D7Ffb9Fe4De4fa218d14BbF7Af04603B3 -domain https://sgp-mining.x-phere.com,https://bkk-mining.x-phere.com,https://hkg-mining.x-phere.com,https://idn-mining.x-phere.com
```
