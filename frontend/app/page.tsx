"use client";


import { useState } from "react";
import { ethers } from "ethers";
import "./custom-theme.css";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Home() {
  const [side, setSide] = useState("buy");
  const [price, setPrice] = useState(101);
  const [qty, setQty] = useState(5);
  const [status, setStatus] = useState("");

  async function placeOrder() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const abi = require("../abi/ConfidentialOrderBook.json");
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.placeOrder(side, price, qty);
      await tx.wait();
      setStatus("Order sent! Tx: " + tx.hash);
    } catch (err: any) {
      setStatus("Error: " + err.message);
    }
  }

  return (
    <div className="dex-container">
      <div className="dex-title">Confidential Orderbook DEX</div>
      <div className="dex-desc">Zama FHEVM ile tam gizlilikli, şifreli on-chain orderbook.<br />Demo işlemler local node üzerinde çalışır.</div>
      <form className="order-form" onSubmit={e => {e.preventDefault(); placeOrder();}}>
        <label htmlFor="side">Side:</label>
        <select id="side" value={side} onChange={e => setSide(e.target.value)}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <label htmlFor="price">Price:</label>
        <input id="price" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
        <label htmlFor="qty">Qty:</label>
        <input id="qty" type="number" value={qty} onChange={e => setQty(Number(e.target.value))} />
        <button type="submit">Place Order</button>
        <div className="status">{status}</div>
      </form>
      <div className="orderbook-demo">
        <h2>Orderbook (Demo)</h2>
        <img src="https://raw.githubusercontent.com/zama-ai/fhevm/main/docs/assets/orderbook-demo-ui.png" alt="Orderbook Demo UI" />
        <p>Şifreli orderbook ve top-of-book state örneği.</p>
      </div>
      <div className="dex-footer">Confidential Orderbook DEX &copy; 2025 | Powered by Zama FHEVM</div>
    </div>
  );
}
