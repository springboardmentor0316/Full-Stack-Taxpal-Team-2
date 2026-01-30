const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Income = require("../models/Income");
const Expense = require("../models/Expense");

/* ADD INCOME */
router.post("/income", auth, async (req, res) => {
  try {
    const income = new Income({
      userId: req.user.id,
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
      date: req.body.date,
      notes: req.body.notes,
    });

    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res.status(500).json({ message: "Failed to save income" });
  }
});

/* ADD EXPENSE */
router.post("/expense", auth, async (req, res) => {
  try {
    const expense = new Expense({
      userId: req.user.id,
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
      date: req.body.date,
      notes: req.body.notes,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Failed to save expense" });
  }
});

module.exports = router;
