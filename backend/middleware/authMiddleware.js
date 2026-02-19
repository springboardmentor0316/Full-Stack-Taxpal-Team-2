const jwt = require("jsonwebtoken")

const protect = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
      console.log("[v0] No authorization header provided")
      return res.status(401).json({ message: "Not authorized - missing token" })
    }

    // Extract token from "Bearer <token>" format
    const tokenParts = authHeader.split(" ")
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      console.log("[v0] Invalid token format:", authHeader.substring(0, 20))
      return res.status(401).json({ message: "Not authorized - invalid token format" })
    }

    const token = tokenParts[1]

    // Verify token
    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"
    const decoded = jwt.verify(token, JWT_SECRET)

    // Accept multiple token shapes: { userId }, { id }, or {_id}
    const userId = decoded.userId || decoded.id || decoded._id

    if (!userId) {
      console.log("[v0] Invalid token payload - no userId found")
      return res.status(401).json({ message: "Invalid token payload" })
    }

    // Attach user info to request
    req.user = { id: userId }
    req.userId = userId
    console.log("[v0] Token verified for user:", userId)

    next()
  } catch (err) {
    console.log("[v0] Token verification failed:", err.message)
    
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" })
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" })
    }
    
    return res.status(401).json({ message: "Authentication failed" })
  }
}

module.exports = protect
