const stocks = {
  AAPL: { name: "Apple", price: 185.50 },
  MSFT: { name: "Microsoft", price: 420.25 },
  TSLA: { name: "Tesla", price: 245.75 }
};

// Temporary demonstration account
let cash = 10000;
let portfolio = {};
let transactions = [];

function demoTrade(symbol) {
  const stock = stocks[symbol];

  if (!stock) {
    alert("Stock not found.");
    return;
  }

  const action = prompt(
    `Would you like to BUY or SELL ${symbol}?`
  );

  if (!action) return;

  const type = action.trim().toUpperCase();

  if (type !== "BUY" && type !== "SELL") {
    alert("Please enter BUY or SELL.");
    return;
  }

  const input = prompt("How many shares?");
  if (input === null) return;

  const quantity = Number(input);

  if (!Number.isSafeInteger(quantity) || quantity <= 0) {
    alert("Enter a valid whole number of shares.");
    return;
  }

  const total = Math.round(stock.price * quantity * 100) / 100;

  if (type === "BUY" && total > cash) {
    alert("Insufficient funds.");
    return;
  }

  if (type === "SELL" &&
      (portfolio[symbol] || 0) < quantity) {
    alert("You do not own enough shares.");
    return;
  }

  if (!confirm(
    `${type} ${quantity} shares of ${symbol} for $${total.toFixed(2)}?`
  )) return;

  if (type === "BUY") {
    cash = Math.round((cash - total) * 100) / 100;
    portfolio[symbol] = (portfolio[symbol] || 0) + quantity;
  } else {
    cash = Math.round((cash + total) * 100) / 100;
    portfolio[symbol] -= quantity;
  }

  transactions.push({
    type,
    symbol,
    quantity,
    total,
    date: new Date().toLocaleString()
  });

  updateDashboard();
  alert(`${type} transaction completed!`);
}

function updateDashboard() {
  let holdingsValue = 0;
  let sharesOwned = 0;
  let holdingsHTML = "";

  for (const [symbol, quantity] of Object.entries(portfolio)) {
    if (quantity <= 0) continue;

    holdingsValue += stocks[symbol].price * quantity;
    sharesOwned += quantity;

    holdingsHTML += `
      <p>${symbol}: ${quantity} shares —
      $${(stocks[symbol].price * quantity).toFixed(2)}</p>
    `;
  }

  document.querySelector("#portfolioValue").textContent =
    `$${(cash + holdingsValue).toFixed(2)}`;

  document.querySelector("#cashBalance").textContent =
    `$${cash.toFixed(2)}`;

  document.querySelector("#stocksOwned").textContent =
    sharesOwned;

  document.querySelector("#holdings").innerHTML =
    holdingsHTML || "You currently have no stock holdings.";

  document.querySelector("#history").innerHTML =
    transactions.map(t => `
      <p>${t.date}: ${t.type} ${t.quantity}
      ${t.symbol} — $${t.total.toFixed(2)}</p>
    `).join("") || "No transactions yet.";
}

document.addEventListener("DOMContentLoaded", updateDashboard);
