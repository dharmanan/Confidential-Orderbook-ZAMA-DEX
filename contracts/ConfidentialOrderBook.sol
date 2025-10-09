// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// FHEVM v0.7 importlarını sürümüne göre AYARLAYACAĞIZ.
// import "fhevm/lib/FHE.sol";

contract ConfidentialOrderBook {
    struct Order {
        // bytes encryptedPrice; // FHE ile şifreli
        // bytes encryptedQty;   // FHE ile şifreli
        uint256 price;
        uint256 qty;
        bool isBuy;
    }

    Order public bestBid;
    Order public bestAsk;

    event OrderPlaced(bool isBuy, uint256 price, uint256 qty);

    function placeOrder(bool isBuy, uint256 price, uint256 qty) external {
        // Şifreli karşılaştırma ve güncelleme satırları şimdilik yorumda
        // if (isBuy && FHE.gt(price, bestBid.price)) { ... }
        // if (!isBuy && FHE.lt(price, bestAsk.price)) { ... }
        if (isBuy) {
            if (price > bestBid.price) {
                bestBid = Order(price, qty, true);
            }
        } else {
            if (bestAsk.price == 0 || price < bestAsk.price) {
                bestAsk = Order(price, qty, false);
            }
        }
        emit OrderPlaced(isBuy, price, qty);
    }
}
