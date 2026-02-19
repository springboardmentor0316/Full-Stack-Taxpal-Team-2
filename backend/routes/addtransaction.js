const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  addIncome,
  addExpense,
} = require("../controllers/transactionController");
const { getTransactions } = require("../controllers/transactionController")


/* Add Income */
router.post("/add-income", protect, addIncome);

/* Add Expense */
router.post("/add-expense", protect, addExpense);

/* get all transaction */
router.get("/", protect, getTransactions)


module.exports = router;
