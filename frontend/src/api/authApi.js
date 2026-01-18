const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

export const authApi = {
  register: async (userData) => {
    try {
      console.log("[v0] Register API call with:", userData)
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }
      return data
    } catch (error) {
      console.log("[v0] Register error:", error.message)
      throw error
    }
  },

  login: async (credentials) => {
    try {
      console.log("[v0] Login API call")
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }
      return data
    } catch (error) {
      console.log("[v0] Login error:", error.message)
      throw error
    }
  },

  forgotPassword: async (email) => {
    try {
      console.log("[v0] Forgot password API call")
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to send verification code")
      }
      return data
    } catch (error) {
      console.log("[v0] Forgot password error:", error.message)
      throw error
    }
  },

  resendVerificationCode: async (email) => {
    try {
      console.log("[v0] Resend verification code API call")
      const response = await fetch(`${API_URL}/auth/resend-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to resend verification code")
      }
      return data
    } catch (error) {
      console.log("[v0] Resend code error:", error.message)
      throw error
    }
  },

  verifyResetToken: async (token, email) => {
    try {
      console.log("[v0] Verify token API call")
      const response = await fetch(`${API_URL}/auth/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Token verification failed")
      }
      return data
    } catch (error) {
      console.log("[v0] Verify token error:", error.message)
      throw error
    }
  },

  setPassword: async (token, email, password, confirmPassword) => {
    try {
      console.log("[v0] Set password API call")
      const response = await fetch(`${API_URL}/auth/set-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email, password, confirmPassword }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to set password")
      }
      return data
    } catch (error) {
      console.log("[v0] Set password error:", error.message)
      throw error
    }
  },
}
