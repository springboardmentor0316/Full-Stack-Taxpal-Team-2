const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

console.log("[v0] Auth API URL:", API_URL);

// Helper function for fetch with error handling
const fetchApi = async (endpoint, options = {}) => {
  try {
    const url = `${API_URL}${endpoint}`;
    console.log("[v0] API Call:", options.method || "GET", url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error("[v0] API Error:", error.message);
    throw error;
  }
};

export const authApi = {
  register: async (userData) => {
    console.log("[v0] Register API call with:", userData);
    return fetchApi("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    console.log("[v0] Login API call");
    return fetchApi("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  forgotPassword: async (email) => {
    console.log("[v0] Forgot password API call");
    return fetchApi("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  resendVerificationCode: async (email) => {
    console.log("[v0] Resend verification code API call");
    return fetchApi("/auth/resend-code", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  verifyResetToken: async (token, email) => {
    console.log("[v0] Verify token API call");
    return fetchApi("/auth/verify-token", {
      method: "POST",
      body: JSON.stringify({ token, email }),
    });
  },

  setPassword: async (token, email, password, confirmPassword) => {
    console.log("[v0] Set password API call");
    return fetchApi("/auth/set-password", {
      method: "POST",
      body: JSON.stringify({ token, email, password, confirmPassword }),
    });
  },

  getProfile: async (token) => {
    console.log("[v0] Get profile API call");
    return fetchApi("/auth/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  },

  updateProfile: async (token, profileData) => {
    console.log("[v0] Update profile API call with:", profileData);
    return fetchApi("/auth/profile", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
  },
};
