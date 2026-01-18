const errorHandler = (err, req, res, next) => {
  console.log("[v0] Error:", err.message)

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Validation error", error: err.message })
  }

  if (err.name === "MongooseError") {
    return res.status(400).json({ message: "Database error", error: err.message })
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? err : undefined,
  })
}

module.exports = errorHandler
