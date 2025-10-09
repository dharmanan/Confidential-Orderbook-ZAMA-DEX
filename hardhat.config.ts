import "@fhevm/hardhat-plugin";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import type { HardhatUserConfig } from "hardhat/config";
import { vars } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${vars.get("INFURA_API_KEY")}`,
      accounts: { mnemonic: vars.get("MNEMONIC") },
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
};

export default config;
