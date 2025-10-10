import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "hardhat";
import { FhevmType } from "@fhevm/mock-utils";
import type { TaskArguments } from "hardhat/types";

// Top-of-book sorgulama
task("order:tob", "Show top-of-book (encrypted)")
  .setAction(async (_, hre: HardhatRuntimeEnvironment) => {
    await hre.fhevm.initializeCLIApi();
    const deployments = await hre.deployments.get("ConfidentialOrderBook");
    const contract = await hre.ethers.getContractAt("ConfidentialOrderBook", deployments.address) as any;
    const tob = await contract.getTopOfBook();
    console.log("Top-of-book (encrypted handles):");
    console.log(`Bid: price=${tob.bidPrice} qty=${tob.bidQty}`);
    console.log(`Ask: price=${tob.askPrice} qty=${tob.askQty}`);
  });


task("order:place", "Place an order (buy/sell)")
  .addParam("side", "buy or sell")
  .addParam("price", "Order price")
  .addParam("qty", "Order quantity")
    .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) => {
  await hre.fhevm.initializeCLIApi();
  const [signer] = await hre.ethers.getSigners();
    const deployments = await hre.deployments.get("ConfidentialOrderBook");
  const contract = await hre.ethers.getContractAt("ConfidentialOrderBook", deployments.address) as any;
    const isBuy = taskArgs.side === "buy";
  // FHEVM ile price ve qty'yi bytes32 handle'a çevir
  const userAddress = await signer.getAddress();
  const priceEnc = await hre.fhevm.encryptUint(FhevmType.euint256, Number(taskArgs.price), deployments.address, userAddress);
  const qtyEnc = await hre.fhevm.encryptUint(FhevmType.euint256, Number(taskArgs.qty), deployments.address, userAddress);
  const tx = await contract.connect(signer).placeOrder(isBuy, priceEnc.externalEuint, qtyEnc.externalEuint);
    await tx.wait();
    console.log(`Order placed: ${taskArgs.side} price=${taskArgs.price} qty=${taskArgs.qty}`);
  });
