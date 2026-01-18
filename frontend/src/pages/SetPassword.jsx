"use client"

import { useState, useEffect } from "react"
import "../styles/SetPassword.css"
import img1 from "../assets/img1.png"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { authApi } from "../api/authApi"

const SetPassword = () => {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [token, setToken] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const tokenParam = searchParams.get("token")
    const emailParam = searchParams.get("email")
    if (tokenParam) setToken(tokenParam)
    if (emailParam) setEmail(decodeURIComponent(emailParam))
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log("[v0] Setting new password")
      await authApi.setPassword(token, email, formData.password, formData.confirmPassword)
      console.log("[v0] Password set successfully, redirecting to login")
      setTimeout(() => {
        navigate("/")
      }, 1500)
    } catch (err) {
      setError(err.message || "Failed to set password. Please try again.")
      console.log("[v0] Set password error:", err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      {/* LEFT IMAGE SECTION */}
      <div className="left-image-section">
        <img src={img1 || "/placeholder.svg"} alt="TaxPal" />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="right-form-section">
        <div className="form-container">
          <h1 className="brand-title">Set a Password</h1>
          <p className="subtitle">Your previous password has been reset. Please set a new password for your account.</p>

          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Create Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Re-enter the password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Setting Password..." : "Set Password"}
            </button>
          </form>

          <p className="forgot">
            <Link to="/">
              <span>Back to Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SetPassword
