"use client"

import { useState, useEffect } from "react"
import "../styles/VerifyCode.css"
// SVG image - using placeholder fallback
// import img1 from "../assets/img1.svg"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { authApi } from "../api/authApi"

const VerifyCode = () => {
  const [searchParams] = useSearchParams()
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [resending, setResending] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log("[v0] Verifying reset token")
      await authApi.verifyResetToken(code, email)
      console.log("[v0] Token verified, redirecting to set password")
      navigate(`/SetPassword?token=${code}&email=${encodeURIComponent(email)}`)
    } catch (err) {
      setError(err.message || "Invalid or expired code. Please try again.")
      console.log("[v0] Verify token error:", err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    setError("")
    try {
      console.log("[v0] Resending verification code to:", email)
      await authApi.resendVerificationCode(email)
      alert("Verification code resent! Check your email.")
    } catch (err) {
      setError(err.message || "Failed to resend code. Please try again.")
      console.log("[v0] Resend error:", err.message)
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="login-wrapper">
      {/* LEFT IMAGE SECTION */}
      <div className="left-image-section">
        <img src="/placeholder.svg" alt="TaxPal" />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="right-form-section">
        <div className="form-container">
          <div className="icon-box">
            <span>✉️</span>
          </div>

          <h1 className="brand-title">Verify Code</h1>

          <p className="subtitle">An authentication code has been sent to your email</p>

          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter the code</label>
              <input
                type="text"
                placeholder="eg:778bmc327"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value)
                  setError("")
                }}
                disabled={loading}
              />
            </div>

            <p className="resend-text">
              Didn't receive a code?{" "}
              <span
                onClick={handleResend}
                style={{
                  cursor: resending ? "not-allowed" : "pointer",
                  opacity: resending ? 0.5 : 1,
                }}
                disabled={resending}
              >
                {resending ? "Resending..." : "Resend"}
              </span>
            </p>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>

          <p className="forgot">
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

export default VerifyCode
