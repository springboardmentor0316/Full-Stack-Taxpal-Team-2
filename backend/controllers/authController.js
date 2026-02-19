const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")

// Email configuration - Optional for development
let transporter = null
const emailEnabled = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD

if (emailEnabled) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  // Verify transporter connection on startup
  transporter.verify((error, success) => {
    if (error) {
      console.log("[v0] EMAIL CONFIG WARNING - Emails will not be sent:")
      console.log("[v0] EMAIL_USER:", process.env.EMAIL_USER ? "SET" : "NOT SET")
      console.log("[v0] EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD ? "SET" : "NOT SET")
      console.log("[v0] Error details:", error.message)
      console.log("[v0] For development, this is OK. Set EMAIL_USER and EMAIL_PASSWORD to enable emails.")
    } else {
      console.log("[v0] ✅ Email transporter verified - OTP emails will be sent successfully")
    }
  })
} else {
  console.log("[v0] ⚠️  Email credentials not configured. Password reset emails will NOT be sent.")
  console.log("[v0] For production, set EMAIL_USER and EMAIL_PASSWORD in .env file")
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

// Register
exports.register = async (req, res) => {
  try {
    console.log("[v0] Register request:", req.body)
    const { fullName, username, email, password, confirmPassword, country, incomeBracket } = req.body

    if (!fullName || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" })
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      country,
      incomeBracket,
    })

    await user.save()
    console.log("[v0] User registered:", user.email)

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" })

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    console.log("[v0] Register error:", error)
    res.status(500).json({ message: "Error registering user", error: error.message })
  }
}

// Login
exports.login = async (req, res) => {
  try {
    console.log("[v0] Login request:", req.body)
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" })
    }

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" })

    console.log("[v0] User logged in:", user.email)
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    })
  } catch (error) {
    console.log("[v0] Login error:", error)
    res.status(500).json({ message: "Error logging in", error: error.message })
  }
}

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    console.log("[v0] Forgot password request:", req.body)
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000)

    user.resetToken = resetToken
    user.resetTokenExpiry = resetTokenExpiry
    await user.save()

    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/VerifyCode?email=${email}&token=${resetToken}`
    const verificationCode = resetToken.slice(0, 8)

    // Try to send email if configured
    if (emailEnabled && transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Password Reset Request - TaxPal",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
              <h2>Password Reset Request</h2>
              <p>You requested a password reset for your TaxPal account.</p>
              <p>Your verification code is: <strong style="font-size: 20px; color: #007bff;">${verificationCode}</strong></p>
              <p>Enter this code on the verification page to reset your password.</p>
              <p>This code expires in 1 hour.</p>
              <p>If you didn't request this, please ignore this email.</p>
            </div>
          `,
        })
        console.log("[v0] ✅ Reset email sent successfully to:", email)
      } catch (emailError) {
        console.log("[v0] ⚠️  EMAIL SENDING FAILED:", emailError.message)
        console.log("[v0] Continuing without email (code still valid)")
      }
    } else {
      console.log("[v0] ⚠️  Email not configured. Development mode - no email sent")
      console.log("[v0] Verification code:", verificationCode)
    }

    res.json({ 
      message: emailEnabled ? "Verification code sent to your email" : "Verification code generated (check console for dev mode)", 
      success: true,
      code: process.env.NODE_ENV === "development" ? verificationCode : undefined
    })
  } catch (error) {
    console.log("[v0] Forgot password error:", error)
    res.status(500).json({ message: "Error sending reset email", error: error.message })
  }
}

exports.resendCode = async (req, res) => {
  try {
    console.log("[v0] Resend code request:", req.body)
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Generate new reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000)

    user.resetToken = resetToken
    user.resetTokenExpiry = resetTokenExpiry
    await user.save()

    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/VerifyCode?email=${email}&token=${resetToken}`
    const verificationCode = resetToken.slice(0, 8)

    // Try to send email if configured
    if (emailEnabled && transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Password Reset Code - TaxPal",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
              <h2>Password Reset Code</h2>
              <p>Here is your new verification code:</p>
              <p style="font-size: 24px; font-weight: bold; color: #007bff;">${verificationCode}</p>
              <p>Enter this code on the verification page.</p>
              <p>This code expires in 1 hour.</p>
            </div>
          `,
        })
        console.log("[v0] ✅ Resend email sent successfully to:", email)
      } catch (emailError) {
        console.log("[v0] ⚠️  EMAIL SENDING FAILED:", emailError.message)
        console.log("[v0] Continuing without email (code still valid)")
      }
    } else {
      console.log("[v0] ⚠️  Email not configured. Development mode - no email sent")
      console.log("[v0] Verification code:", verificationCode)
    }

    res.json({ 
      message: emailEnabled ? "Verification code resent to your email" : "Verification code generated (check console for dev mode)", 
      success: true,
      code: process.env.NODE_ENV === "development" ? verificationCode : undefined
    })
  } catch (error) {
    console.log("[v0] Resend code error:", error)
    res.status(500).json({ message: "Error resending code", error: error.message })
  }
}

// Verify Reset Token
exports.verifyResetToken = async (req, res) => {
  try {
    const { token, email } = req.body

    if (!token || !email) {
      return res.status(400).json({ message: "Token and email are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if token matches the first 8 characters of resetToken or full token
    const tokenMatches = user.resetToken.startsWith(token) || user.resetToken === token
    const isExpired = new Date() > user.resetTokenExpiry

    console.log("[v0] Token verification - Email:", email)
    console.log("[v0] Stored token prefix:", user.resetToken.slice(0, 8))
    console.log("[v0] Provided token:", token)
    console.log("[v0] Token matches:", tokenMatches)
    console.log("[v0] Is expired:", isExpired)

    if (!tokenMatches || isExpired) {
      return res.status(401).json({ message: "Invalid or expired token" })
    }

    res.json({ message: "Token verified successfully" })
  } catch (error) {
    console.log("[v0] Verify token error:", error)
    res.status(500).json({ message: "Error verifying token", error: error.message })
  }
}

// Set New Password
exports.setPassword = async (req, res) => {
  try {
    console.log("[v0] Set password request")
    const { token, email, password, confirmPassword } = req.body

    if (!token || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if token matches the first 8 characters of resetToken or full token
    const tokenMatches = user.resetToken.startsWith(token) || user.resetToken === token
    const isExpired = new Date() > user.resetTokenExpiry

    if (!tokenMatches || isExpired) {
      return res.status(401).json({ message: "Invalid or expired token" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
    user.resetToken = undefined
    user.resetTokenExpiry = undefined
    await user.save()

    console.log("[v0] Password updated for:", email)
    res.json({ message: "Password reset successfully" })
  } catch (error) {
    console.log("[v0] Set password error:", error)
    res.status(500).json({ message: "Error setting password", error: error.message })
  }
}

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId
    console.log("[v0] Get profile request for user:", userId)

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({
      message: "Profile retrieved successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        location: user.location,
        bio: user.bio,
        profileImage: user.profileImage,
        country: user.country,
        incomeBracket: user.incomeBracket,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.log("[v0] Get profile error:", error)
    res.status(500).json({ message: "Error retrieving profile", error: error.message })
  }
}

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId
    const { fullName, username, phone, location, bio, profileImage } = req.body

    console.log("[v0] Update profile request for user:", userId)

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update fields if provided
    if (fullName) user.fullName = fullName
    if (username) {
      // Check if new username is already taken
      const existingUser = await User.findOne({ username, _id: { $ne: userId } })
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" })
      }
      user.username = username
    }
    if (profileImage) user.profileImage = profileImage
    if (bio) user.bio = bio
    if (phone) user.phone = phone
    if (location) user.location = location

    await user.save()

    console.log("[v0] Profile updated for:", user.email)
    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        location: user.location,
        bio: user.bio,
        profileImage: user.profileImage,
        country: user.country,
        incomeBracket: user.incomeBracket,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.log("[v0] Update profile error:", error)
    res.status(500).json({ message: "Error updating profile", error: error.message })
  }
}
