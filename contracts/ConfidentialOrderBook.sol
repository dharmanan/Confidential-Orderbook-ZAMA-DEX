// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@fhevm/solidity/lib/FHE.sol";
import {FheType} from "@fhevm/solidity/lib/FheType.sol";

contract ConfidentialOrderBook {
    bytes32 bestBidPrice;
    bytes32 bestBidQty;
    bytes32 bestAskPrice;
    bytes32 bestAskQty;

    event OrderPlaced(bool isBuy, bytes32 priceHandle, bytes32 qtyHandle);
    event TopOfBookUpdated(bool isBuy, bytes32 priceHandle, bytes32 qtyHandle);

    constructor() {}

    function placeOrder(
        bool isBuy,
        bytes32 priceHandle,
        bytes32 qtyHandle
    ) external {
        if (isBuy) {
            bestBidPrice = priceHandle;
            bestBidQty = qtyHandle;
            emit TopOfBookUpdated(true, priceHandle, qtyHandle);
        } else {
            bestAskPrice = priceHandle;
            bestAskQty = qtyHandle;
            emit TopOfBookUpdated(false, priceHandle, qtyHandle);
        }
        emit OrderPlaced(isBuy, priceHandle, qtyHandle);
    }

    function getTopOfBook() external view returns (bytes32 bidPrice, bytes32 bidQty, bytes32 askPrice, bytes32 askQty) {
        bidPrice = bestBidPrice;
        bidQty = bestBidQty;
        askPrice = bestAskPrice;
        askQty = bestAskQty;
    }
}
