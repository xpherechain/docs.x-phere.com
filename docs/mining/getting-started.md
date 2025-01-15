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
2. Select the `XPHERE 2.0 (Testnet)` network
3. Copy your wallet address - you'll need this for miner configuration

### 2. Download the Miner

Download the latest version of the Xphere miner:

1. Visit the [releases page](https://github.com/xpherechain/Xphere-miner/releases)
2. Download the appropriate binary for your operating system
3. Make sure to also download (or place) the config.json file in the same directory as the binary.

Latest version: [Release v0.0.1](https://github.com/xpherechain/Xphere-miner/releases/tag/v0.0.1)

### 3. Installation Steps

#### For MacOS Users

1. Open Terminal
2. Navigate to your download directory
3. Make the binary executable:
   ```bash
   chmod +x miner-darwin-amd64
   ```
4. Run the miner:
   ```bash
   ./miner-darwin-amd64 -config ./config.json -targetMiner YOUR_WALLET_ADDRESS
   ```

> **Note**: If you see a security warning, go to System Preferences → Security & Privacy → General and allow the application to run.

#### For Windows Users

1. Open Command Prompt as administrator
2. Navigate to your download directory
3. Run the miner:
   ```bash
   miner-windows-amd64 -config ./config.json -targetMiner YOUR_WALLET_ADDRESS
   ```

## Configuration

The miner requires two main parameters:

- `config.json`: Contains basic configuration settings
- `targetMiner`: Your Zigap wallet address

### Example Commands

MacOS:

```bash
./miner-darwin-amd64 -config ./config.json -targetMiner 0x25752A3bD667E5a86cF297E74027503d48054442
```

Windows:

```bash
miner-windows-amd64 -config ./config.json -targetMiner 0x43ee5CDDF65F4cafA4b834e3c93108532Fe8768
```
