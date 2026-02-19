const errorHandler = (err, req, res, next) => {
  console.log("[v0] ❌ Error:", err.message);
  console.log("[v0] Stack:", err.stack);

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors)
      .map(e => e.message)
      .join(", ");
    return res.status(400).json({ 
      message: "Validation error", 
      details: messages 
    });
  }

  // Mongoose Cast Error
  if (err.name === "CastError") {
    return res.status(400).json({ 
      message: "Invalid ID format" 
    });
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({ 
      message: `${field} already exists` 
    });
  }

  // MongoDB Error
  if (err.name === "MongooseError" || err.name === "MongoError") {
    return res.status(500).json({ 
      message: "Database error", 
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ 
      message: "Invalid token" 
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ 
      message: "Token expired" 
    });
  }

  // Default error response
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { 
      error: err.toString(),
      stack: err.stack 
    }),
  });
};

module.exports = errorHandler;
