import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

// npx hardhat --network localhost order:place --side buy --price 101 --qty 5
// npx hardhat --network sepolia  order:place --side sell --price 102 --qty 1

task("order:place", "Place an order (buy/sell)")
  .addParam("side", "buy or sell")
  .addParam("price", "Order price")
  .addParam("qty", "Order quantity")
  .setAction(async (args: TaskArguments, hre) => {
    const [signer] = await hre.ethers.getSigners();
  const deployments = await hre.deployments.get("ConfidentialOrderBook");
  const contract = await hre.ethers.getContractAt("ConfidentialOrderBook", deployments.address);
    const isBuy = args.side === "buy";
  const tx = await (contract as any).connect(signer).placeOrder(isBuy, args.price, args.qty);
    await tx.wait();
    console.log(`Order placed: ${args.side} price=${args.price} qty=${args.qty}`);
  });
