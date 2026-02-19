const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const addTransaction = require("./routes/addtransaction");
const budgetRoutes = require("./routes/budgetRoutes");
const alertRoutes = require("./routes/alertRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("[v0] Server Configuration:");
console.log("[v0] Frontend URL:", process.env.FRONTEND_URL || "http://localhost:3000");
console.log("[v0] MongoDB URI:", process.env.MONGO_URI ? "SET" : "DEFAULT (localhost)");
console.log("[v0] JWT Secret:", process.env.JWT_SECRET ? "SET" : "DEFAULT");

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/taxpal";

mongoose
  .connect(mongoURI)
  .then(() => console.log("[v0] ✅ MongoDB connected successfully"))
  .catch((err) => {
    console.log("[v0] ❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transaction", addTransaction);
app.use("/api/budget", budgetRoutes);
app.use("/api/alerts", alertRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    message: "Server is running", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[v0] 🚀 Server running on port ${PORT}`);
  console.log(`[v0] 🌐 API Base URL: http://localhost:${PORT}/api`);
});
