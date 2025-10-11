# Confidential Orderbook DEX (Zama FHEVM)

## Project Overview
This project is a minimal confidential DEX prototype built with Zama FHEVM. It demonstrates fully encrypted on-chain orderbook management, where all order and top-of-book data is stored as encrypted bytes32 handles. Only authorized parties can decrypt and access the data, ensuring privacy and security.

## Key Features
- Fully confidential orderbook and top-of-book state using Zama FHEVM
- Hardhat-based smart contract and CLI automation
- Live frontend displaying encrypted orderbook state and event history
- Event stream and order history fetched directly from the blockchain
- Support for local Hardhat node and Sepolia testnet

## Technologies
- Zama FHEVM, @fhevm/hardhat-plugin, @fhevm/solidity
- Hardhat, TypeScript, Node.js
- Next.js (React) frontend

## Setup & Usage
1. Install dependencies:
	```bash
	npm install
	cd frontend && npm install
	```
2. Start local Hardhat node:
	```bash
	npx hardhat node
	```
3. Deploy contract:
	```bash
	npx hardhat deploy --network localhost
	```
4. Start frontend:
	```bash
	cd frontend && npm run dev
	```
5. Place orders and view live orderbook/events via CLI or frontend.

## Demo & Testing
- Use CLI tasks to place orders and view top-of-book:
  ```bash
  npx hardhat --network localhost order:place --side buy --price 101 --qty 5
  npx hardhat --network localhost order:tob
  npx hardhat --network localhost order:events
  ```
- Frontend displays live encrypted orderbook and event history from the contract.

## Technical Innovation
- All order and state data is encrypted on-chain using Zama FHEVM, providing true privacy for DEX operations.
- Event stream and order history are fetched live from the blockchain, demonstrating practical FHEVM usage.
- Minimal, clean codebase with English documentation and UI.

## Submission Summary
This project is submitted for the Zama Developer Program competition. It showcases practical, privacy-preserving DEX design using FHEVM, with a focus on encrypted state, event streaming, and open-source best practices.

---

See SCRIPTS.md for CLI usage and automation details.
