import { task } from "hardhat/config";

// OrderPlaced eventlerini ve şifreli state akışını gösteren task
task("order:events", "Show OrderPlaced events (encrypted handles)")
  .setAction(async (_, hre: HardhatRuntimeEnvironment) => {
    await hre.fhevm.initializeCLIApi();
    const deployments = await hre.deployments.get("ConfidentialOrderBook");
  // @ts-ignore
  const contract = await hre.ethers.getContractAt("ConfidentialOrderBook", deployments.address) as any;
    const filter = contract.filters.OrderPlaced();
    const logs = await contract.queryFilter(filter);
    console.log("OrderPlaced events:");
    logs.forEach((log: any, idx: number) => {
      console.log(`#${idx+1}: isBuy=${log.args.isBuy} priceHandle=${log.args.priceHandle} qtyHandle=${log.args.qtyHandle}`);
    });
  });
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import "@nomicfoundation/hardhat-ethers";
// @ts-ignore
import { FhevmType } from "@fhevm/mock-utils";
import type { TaskArguments } from "hardhat/types";

// Top-of-book sorgulama
task("order:tob", "Show top-of-book (encrypted)")
  .setAction(async (_, hre: HardhatRuntimeEnvironment) => {
    await hre.fhevm.initializeCLIApi();
    const deployments = await hre.deployments.get("ConfidentialOrderBook");
  // @ts-ignore
  const contract = await hre.ethers.getContractAt("ConfidentialOrderBook", deployments.address) as any;
    const tob = await contract.getTopOfBook();
    console.log("Top-of-book (encrypted handles):");
    console.log(`Bid: price=${tob.bidPrice} qty=${tob.bidQty}`);
    console.log(`Ask: price=${tob.askPrice} qty=${tob.askQty}`);
  });


task("order:place", "Place an order (buy/sell)")
  .addParam("isbuy", "true for buy, false for sell")
  .addParam("pricehandle", "Encrypted price handle (bytes32)")
  .addParam("qtyhandle", "Encrypted quantity handle (bytes32)")
  .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) => {
    await hre.fhevm.initializeCLIApi();
  // @ts-ignore
  const [signer] = await hre.ethers.getSigners();
    const deployments = await hre.deployments.get("ConfidentialOrderBook");
  // @ts-ignore
  const contract = await hre.ethers.getContractAt("ConfidentialOrderBook", deployments.address) as any;
    const isBuy = taskArgs.isbuy === "true" || taskArgs.isbuy === true;
    const priceEnc = taskArgs.pricehandle;
    const qtyEnc = taskArgs.qtyhandle;
    const tx = await contract.connect(signer).placeOrder(isBuy, priceEnc, qtyEnc);
    await tx.wait();
    console.log(`Order placed: isBuy=${isBuy} priceHandle=${priceEnc} qtyHandle=${qtyEnc}`);
  });
