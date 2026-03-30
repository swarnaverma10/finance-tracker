const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load env variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL 
      ? [process.env.CLIENT_URL, "http://localhost:3000", "http://localhost:3001"] 
      : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

// 🔥 ROUTES
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔥 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err.message);
  });