const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/taxpal"
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("[v0] MongoDB connected successfully")
  })
  .catch((err) => {
    console.log("[v0] MongoDB connection error:", err.message)
    process.exit(1)
  })

// Routes
app.use("/api/auth", require("./routes/authRoutes"))

// Basic health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" })
})

const errorHandler = require("./middleware/errorHandler")
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`[v0] Server running on port ${PORT}`)
})
