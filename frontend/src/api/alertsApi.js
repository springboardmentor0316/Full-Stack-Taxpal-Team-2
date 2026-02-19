const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

console.log("[v0] Alerts API URL:", API_URL);

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

export const alertsApi = {
  // Get all alerts for user
  getAlerts: async (token) => {
    console.log("[v0] Get alerts API call");
    return fetchApi("/alerts", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  },

  // Mark alert as read
  markAsRead: async (token, alertId) => {
    console.log("[v0] Mark alert as read API call:", alertId);
    return fetchApi(`/alerts/${alertId}/read`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  },

  // Mark all alerts as read
  markAllAsRead: async (token) => {
    console.log("[v0] Mark all alerts as read API call");
    return fetchApi("/alerts/read-all", {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  },

  // Delete alert
  deleteAlert: async (token, alertId) => {
    console.log("[v0] Delete alert API call:", alertId);
    return fetchApi(`/alerts/${alertId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  },

  // create a new alert (optional - backend may auto-create for transactions)
  createAlert: async (token, message, type = "info") => {
    console.log("[v0] Create alert API call:", message, type);
    return fetchApi(`/alerts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ message, type }),
    });
  },
};
