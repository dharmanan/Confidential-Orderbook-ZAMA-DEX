# Confidential Orderbook DEX ZAMA PROJECT (FHEVM)

## Project Purpose
This project is a minimal DEX prototype that uses Zama FHEVM technology to keep on-chain orderbook data fully confidential. The goal is to store orders and top of book data as encrypted (bytes32 handle) on-chain, so only authorized parties can decrypt and access them.

## What We Did
- Built a FHEVM ready Hardhat project.
- Developed ConfidentialOrderBook.sol: a minimal contract that stores encrypted orders and top of book state.
- Solved TypeScript, plugin, and type errors.
- Implemented Hardhat tasks for buy/sell/top of book operations via CLI.
- Added ENV/CLI-powered automation scripts and batch demo infrastructure.
- Provided support for both Sepolia and local networks.

## Technologies Used
- [Zama FHEVM](https://github.com/zama-ai/fhevm): Main technology for encrypted EVM operations.
- @fhevm/hardhat-plugin, @fhevm/solidity
- Hardhat, hardhat deploy, hardhat gas reporter
- TypeScript, Node.js, dotenv, concurrently, wait-on

## FHE & Zama Integration
- Contract state and events are stored as encrypted bytes32 handles using Zama FHEVM.
- Orders are encrypted and written to the chain via the Hardhat plugin and FHEVM API.
- Demo and test flows are fully FHEVM-compatible using ENV/CLI and automation scripts.

## Sepolia Testnet
Sepolia ağı için .env dosyasına aşağıdaki satırları ekleyin:
```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
SEPOLIA_DEPLOYER_KEY=0xYOUR_PRIVATE_KEY
```
Sepolia üzerinde deploy ve order işlemleri için:
```
npx hardhat --network sepolia order:place --side buy --price 101 --qty 5
npx hardhat --network sepolia order:tob
```

## Zama Developer Program Submission
This project is submitted for the Zama Developer Program monthly project competition. The aim is to demonstrate practical usage of FHEVM for on-chain privacy and encrypted orderbook applications, and to provide an open example for the community.

---

See SCRIPTS.md for usage and demo commands.
