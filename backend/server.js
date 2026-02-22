// backend/server.js
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

// IMPORTANT: Body parsers must be before routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    message: "Server is running", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "TaxPal API Server", 
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      transactions: "/api/transaction",
      budgets: "/api/budget",
      alerts: "/api/alerts",
      health: "/api/health"
    }
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    message: "Route not found",
    path: req.originalUrl 
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[v0] 🚀 Server running on port ${PORT}`);
  console.log(`[v0] 🌐 API Base URL: http://localhost:${PORT}/api`);
  console.log(`[v0] 📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});