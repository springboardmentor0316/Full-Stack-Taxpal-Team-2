"use client"

import { useState } from "react"
import "../styles/ForgotPassword.css"
// SVG image - using placeholder fallback
// import img1 from "../assets/img1.svg"
import { Link, useNavigate } from "react-router-dom"
import { authApi } from "../api/authApi"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      console.log("[v0] Sending forgot password request")
      await authApi.forgotPassword(email)
      setSuccess(true)
      console.log("[v0] Verification code sent, redirecting")
      setTimeout(() => {
        navigate(`/VerifyCode?email=${encodeURIComponent(email)}`)
      }, 1500)
    } catch (err) {
      setError(err.message || "Failed to send verification code. Please try again.")
      console.log("[v0] Forgot password error:", err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="forgot-wrapper">
      {/* LEFT IMAGE SECTION */}
      <div className="left-image-section">
        <img src="/placeholder.svg" alt="Taxpal" />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="right-form-section">
        <div className="form-container">
          <div className="icon-box">✉️</div>

          <h2>Forgot Password</h2>

          <p className="description">
            Enter your email address and we'll send you verification code to reset your password
          </p>

          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
          {success && (
            <div style={{ color: "green", marginBottom: "10px" }}>Verification code sent! Redirecting...</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                disabled={loading}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>

          <p className="back-link">
            Back to{" "}
            <Link to="/">
              <span>Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
