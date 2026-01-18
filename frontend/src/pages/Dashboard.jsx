"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/Dashboard.css"

const Dashboard = () => {
  const { token, user: contextUser, logout } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!token) {
      navigate("/")
    } else {
      setUser(contextUser)
    }
  }, [token, contextUser, navigate])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/* HEADER */}
        <div className="dashboard-header">
          <h1>Welcome to TaxPal</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* USER PROFILE SECTION */}
        <div className="user-profile-section">
          <div className="profile-card">
            <div className="profile-image-container">
              {user.profileImage ? (
                <img src={user.profileImage || "/placeholder.svg"} alt="Profile" className="profile-image" />
              ) : (
                <div className="default-avatar">{user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}</div>
              )}
            </div>

            <div className="profile-info">
              <h2>{user.fullName || "User"}</h2>
              <p className="username">@{user.username}</p>
              <p className="email">{user.email}</p>
              {user.country && <p className="country">📍 {user.country}</p>}
              {user.incomeBracket && <p className="income">💰 {user.incomeBracket}</p>}
            </div>
          </div>
        </div>

        {/* SUCCESS MESSAGE */}
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h3>Login Successful!</h3>
          <p>You have successfully logged in to your TaxPal account.</p>
        </div>

        {/* QUICK STATS */}
        <div className="quick-stats">
          <div className="stat-card">
            <h4>Account Status</h4>
            <p className="status-active">Active</p>
          </div>
          <div className="stat-card">
            <h4>Member Since</h4>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div className="stat-card">
            <h4>Email Verified</h4>
            <p className="verified">✓ Verified</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
