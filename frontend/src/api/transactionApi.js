import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const API_URL = `${API_BASE_URL}/transaction`;

console.log("[v0] Transaction API URL:", API_URL);

// Create axios instance with default headers
const transactionAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addIncome = (data, token) => {
  try {
    const payload = {
      ...data,
      amount: data.amount !== undefined ? Number(data.amount) : data.amount,
    };

    console.log("[v0] Adding income:", payload);

    return transactionAxios.post("/add-income", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("[v0] Add income error:", error.message);
    throw error;
  }
};

export const addExpense = (data, token) => {
  try {
    const payload = {
      ...data,
      amount: data.amount !== undefined ? Number(data.amount) : data.amount,
    };

    console.log("[v0] Adding expense:", payload);

    return transactionAxios.post("/add-expense", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("[v0] Add expense error:", error.message);
    throw error;
  }
};

export const getTransactions = (token) => {
  try {
    console.log("[v0] Fetching transactions...");

    return transactionAxios.get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("[v0] Get transactions error:", error.message);
    throw error;
  }
};
