#!/usr/bin/env node
/* eslint-disable no-console */
const { spawnSync } = require("node:child_process");
const path = require("node:path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

function parseArg(name, def) {
  const val = process.argv.find(a => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!val) return def;
  if (val.includes("=")) return val.split("=").slice(1).join("="); // support --k=v
  const idx = process.argv.indexOf(val);
  const next = process.argv[idx + 1];
  if (next && !next.startsWith("--")) return next;
  return def;
}

function envNumber(keys, def) {
  for (const k of keys) {
    const v = process.env[k];
    if (v != null && v !== "") return v;
  }
  return def;
}

// Inputs
const side = String(parseArg("side", "buy")).toLowerCase(); // buy|sell
const network = parseArg("network", "localhost");

// CLI overrides
const cliPrice = parseArg("price", null);
const cliQty = parseArg("qty", null);

// Env fallbacks
// For buy: BUY_PRICE/PRICE; for sell: SELL_PRICE/PRICE
let price, qty;
if (side === "buy") {
  price = cliPrice ?? envNumber(["BUY_PRICE", "PRICE"], "101");
  qty = cliQty ?? envNumber(["BUY_QTY", "QTY"], "5");
} else if (side === "sell") {
  price = cliPrice ?? envNumber(["SELL_PRICE", "PRICE"], "102");
  qty = cliQty ?? envNumber(["SELL_QTY", "QTY"], "1");
} else {
  console.error(`Invalid --side: ${side}. Use "buy" or "sell".`);
  process.exit(1);
}

console.log(`[placeOrder] Network=${network} Side=${side} Price=${price} Qty=${qty}`);

// Compose hardhat command
const cmd = process.platform === "win32" ? "npx.cmd" : "npx";
const args = [
  "hardhat",
  "--network",
  network,
  "order:place",
  "--side",
  side,
  "--price",
  String(price),
  "--qty",
  String(qty),
];

const res = spawnSync(cmd, args, { stdio: "inherit" });
if (typeof res.status === "number") process.exit(res.status);
if (res.error) {
  console.error(res.error);
  process.exit(1);
}
