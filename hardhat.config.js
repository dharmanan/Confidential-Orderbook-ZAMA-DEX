require("@fhevm/hardhat-plugin");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-gas-reporter");
// CLI task dosyasını ekle
require("./tasks/OrderBook.js");

module.exports = {
  solidity: "0.8.24",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
