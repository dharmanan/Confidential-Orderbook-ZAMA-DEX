# Usage & Demo Commands

This file documents the main CLI and automation scripts for the Confidential Orderbook DEX project.

## Hardhat Tasks

### Place Order
```
npx hardhat --network <network> order:place --side <buy|sell> --price <uint> --qty <uint>
```
Example:
```
npx hardhat --network localhost order:place --side buy --price 101 --qty 5
```

### Top-of-Book (Encrypted)
```
npx hardhat --network <network> order:tob
```

## Automation Script

### Batch Order Placement (via ENV/CLI)
```
node scripts/placeOrder.js --side <buy|sell> --price <uint> --qty <uint>
```
Or with .env file:
```
SIDE=buy
PRICE=101
QTY=5
node scripts/placeOrder.js
```

## Network Support
- Localhost (default Hardhat node)
- Sepolia (set RPC and keys in .env)

## Sepolia Testnet ile Kullanım

### Sepolia'ya Deploy ve Order Komutları
```
npx hardhat --network sepolia order:place --side buy --price 101 --qty 5
npx hardhat --network sepolia order:tob
```

### Sepolia için .env Ayarları
```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
SEPOLIA_DEPLOYER_KEY=0xYOUR_PRIVATE_KEY
```

## Notes
- All order and top-of-book data is encrypted using Zama FHEVM.
- See README.md for project details and Zama Developer Program submission info.

