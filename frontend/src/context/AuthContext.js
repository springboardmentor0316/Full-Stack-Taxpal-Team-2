"use client"

import { createContext, useContext, useState, useCallback } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("authToken"))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const setAuth = useCallback((token, userData) => {
    console.log("[v0] Setting auth:", userData?.email)
    setToken(token)
    setUser(userData)
    if (token) {
      localStorage.setItem("authToken", token)
    }
  }, [])

  const logout = useCallback(() => {
    console.log("[v0] Logging out user")
    setUser(null)
    setToken(null)
    localStorage.removeItem("authToken")
  }, [])

  const value = {
    user,
    token,
    loading,
    error,
    setAuth,
    logout,
    setLoading,
    setError,
    isAuthenticated: !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
