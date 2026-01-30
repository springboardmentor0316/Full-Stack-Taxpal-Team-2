const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// -------------------- MIDDLEWARE --------------------
app.use(cors())
app.use(express.json())

// -------------------- MONGODB CONNECTION --------------------
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/taxpal"

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("[v0] MongoDB connected successfully")
  })
  .catch((err) => {
    console.error("[v0] MongoDB connection error:", err.message)
    process.exit(1)
  })

// -------------------- ROUTES --------------------
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api", require("./routes/financeRoutes"))

// -------------------- HEALTH CHECK --------------------
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" })
})

// -------------------- GLOBAL ERROR HANDLER --------------------
const errorHandler = require("./middleware/errorHandler")
app.use(errorHandler)

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`[v0] Server running on port ${PORT}`)
})
