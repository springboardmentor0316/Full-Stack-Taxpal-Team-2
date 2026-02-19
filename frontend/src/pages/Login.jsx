"use client"

import { useState } from "react"
import "../styles/Login.css"
//SVG image - using placeholder fallback
import img1 from "../assets/img1.svg"
import { Link, useNavigate } from "react-router-dom"
import { authApi } from "../api/authApi"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { setAuth } = useAuth()

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
      console.log("[v0] Logging in user")
      const response = await authApi.login(formData)
      setAuth(response.token, response.user)
      console.log("[v0] Login successful, redirecting to dashboard")
      navigate("/Dashboard")
    } catch (err) {
      setError(err.message || "Login failed. Please try again.")
      console.log("[v0] Login error:", err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      {/* LEFT IMAGE SECTION */}
      <div className="left-image-section">
         <img src={img1 || "/placeholder.svg"}  alt="Taxpal" />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="right-form-section">
        <div className="form-container">
          <h1 className="brand-title">TaxPal</h1>
          <p className="subtitle">Sign in your TaxPal account</p>

          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter a username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login now"}
            </button>
          </form>

          <p className="forgot">
            <Link to="/ForgotPassword">Forgot password?</Link>
          </p>

          <p className="signup">
            Don't have an account?{" "}
            <Link to="/register">
              <span>Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
