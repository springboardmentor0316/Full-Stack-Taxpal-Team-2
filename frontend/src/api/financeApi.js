import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const addIncome = (data) => API.post("/income", data);

export const addExpense = (data) => API.post("/expense", data);

export const getIncome = (userId) => API.get(`/income/${userId}`);

export const getExpense = (userId) => API.get(`/expense/${userId}`);
