import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const API_URL = `${API_BASE_URL}/budget`;

console.log("[v0] Budget API URL:", API_URL);

const budgetAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createBudget = (data, token) => {
  try {
    console.log("[v0] Creating budget:", data);
    return budgetAxios.post("/", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("[v0] Create budget error:", error.message);
    throw error;
  }
};

export const getBudgets = (token) => {
  try {
    console.log("[v0] Fetching budgets...");
    return budgetAxios.get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("[v0] Get budgets error:", error.message);
    throw error;
  }
};

export const updateBudget = (id, data, token) => {
  try {
    console.log("[v0] Updating budget:", id);
    return budgetAxios.put(`/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("[v0] Update budget error:", error.message);
    throw error;
  }
};

export const deleteBudget = (id, token) => {
  try {
    console.log("[v0] Deleting budget:", id);
    return budgetAxios.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("[v0] Delete budget error:", error.message);
    throw error;
  }
};
