// CLI task dosyasını ekle
import "./tasks/OrderBook";
import "@fhevm/hardhat-plugin";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import type { HardhatUserConfig } from "hardhat/types";

// CLI task dosyasını ekle
import "./tasks/OrderBook";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
};

export default config;
