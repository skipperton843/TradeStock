const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow the application to process form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the website files
app.use(express.static(path.join(__dirname, "public")));

// Test the application
app.get("/api/status", (req, res) => {
  res.json({
    application: "TradeStock",
    status: "Running",
    message: "Welcome to TradeStock!"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`TradeStock running at http://localhost:${PORT}`);
});