const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} = require("../controllers/budgetController");

// Create budget
router.post("/", protect, createBudget);

// Get all budgets for user
router.get("/", protect, getBudgets);

// Update budget
router.put("/:id", protect, updateBudget);

// Delete budget
router.delete("/:id", protect, deleteBudget);

module.exports = router;
