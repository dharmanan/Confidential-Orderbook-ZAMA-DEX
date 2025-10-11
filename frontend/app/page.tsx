"use client";


import { useState, useEffect } from "react";

type OrderEvent = {
  isBuy: boolean;
  priceHandle: string;
  qtyHandle: string;
};
import { ethers, BrowserProvider } from "ethers";
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
  const [orderbook, setOrderbook] = useState({ bidPrice: "-", bidQty: "-", askPrice: "-", askQty: "-" });
  const [events, setEvents] = useState<OrderEvent[]>([]);
  const [wallet, setWallet] = useState<string | null>(null);

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWallet(address);
        setStatus("Wallet connected: " + address);
      } catch (err: any) {
        setStatus("Wallet connection error: " + err.message);
      }
    } else {
      setStatus("No Ethereum wallet detected.");
    }
  }

  useEffect(() => {
    async function fetchOrderbook() {
      try {
        const provider = new ethers.JsonRpcProvider("http://localhost:8545");
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const abi = require("../abi/ConfidentialOrderBook.json");
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const tob = await contract.getTopOfBook();
        setOrderbook({
          bidPrice: tob.bidPrice,
          bidQty: tob.bidQty,
          askPrice: tob.askPrice,
          askQty: tob.askQty,
        });
        const filter = contract.filters.OrderPlaced();
        const logs = await contract.queryFilter(filter);
        setEvents(logs.map((log: any) => ({
          isBuy: log.args.isBuy,
          priceHandle: log.args.priceHandle,
          qtyHandle: log.args.qtyHandle,
        })));
      } catch (err) {
        setStatus("Error fetching orderbook: " + (err as any).message);
      }
    }
    fetchOrderbook();
  }, []);

  async function placeOrder() {
    try {
      const provider = new BrowserProvider(window.ethereum);
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
    <div className="dex-main-bg">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button className="dex-btn" onClick={connectWallet} style={{ minWidth: 140 }}>
          {wallet ? "Wallet Connected" : "Connect Wallet"}
        </button>
        {wallet && (
          <span style={{ color: "#00b894", marginLeft: 12, fontWeight: 600, fontSize: "0.95rem" }}>{wallet}</span>
        )}
      </div>
      <div className="dex-grid">
        <div className="dex-card dex-form-card">
          <div className="dex-title">Confidential Orderbook DEX</div>
          <div className="dex-desc">Fully confidential, encrypted on-chain orderbook powered by Zama FHEVM.<br />Demo transactions run on local node.</div>
          <form className="order-form" onSubmit={e => {e.preventDefault(); placeOrder();}}>
            <div className="form-row">
              <label htmlFor="side">Order Side:</label>
              <select id="side" value={side} onChange={e => setSide(e.target.value)}>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="price">Price:</label>
              <input id="price" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
            </div>
            <div className="form-row">
              <label htmlFor="qty">Quantity:</label>
              <input id="qty" type="number" value={qty} onChange={e => setQty(Number(e.target.value))} />
            </div>
            <button className="dex-btn" type="submit">Place Order</button>
            <div className="status">{status}</div>
          </form>
        </div>
        <div className="dex-card dex-orderbook-card">
          <h2 className="orderbook-title">Live Orderbook State</h2>
          <table className="orderbook-table">
            <thead>
              <tr>
                <th>Bid Price</th>
                <th>Bid Quantity</th>
                <th>Ask Price</th>
                <th>Ask Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{orderbook.bidPrice}</td>
                <td>{orderbook.bidQty}</td>
                <td>{orderbook.askPrice}</td>
                <td>{orderbook.askQty}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="orderbook-title">Order History (Events)</h2>
          <table className="orderbook-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Price Handle</th>
                <th>Quantity Handle</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev, idx) => (
                <tr key={idx}>
                  <td>{ev.isBuy ? "Buy" : "Sell"}</td>
                  <td>{ev.priceHandle}</td>
                  <td>{ev.qtyHandle}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="orderbook-desc">Encrypted orderbook and top-of-book state are fetched live from the smart contract.</p>
        </div>
      </div>
      <div className="dex-footer">Confidential Orderbook DEX &copy; 2025 | Powered by Zama FHEVM</div>
    </div>
  );
}
