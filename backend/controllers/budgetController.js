const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");

// CREATE BUDGET
exports.createBudget = async (req, res) => {
  try {
    console.log("[v0] Creating budget for user:", req.user.id);

    const { category, amount, month, description } = req.body;

    if (!category || !amount || !month) {
      return res.status(400).json({
        message: "Category, amount, and month are required",
      });
    }

    const budget = await Budget.create({
      user: req.user.id,
      category,
      amount,
      month: new Date(month),
      description,
    });

    console.log("[v0] Budget created:", budget._id);
    res.status(201).json(budget);
  } catch (error) {
    console.error("[v0] Error creating budget:", error.message);
    res.status(500).json({ message: "Failed to create budget" });
  }
};

// GET BUDGETS FOR USER
exports.getBudgets = async (req, res) => {
  try {
    console.log("[v0] Fetching budgets for user:", req.user.id);

    const budgets = await Budget.find({
      user: req.user.id,
    }).sort({ month: -1 });

    // Calculate spent amount for each budget
    const budgetsWithSpent = await Promise.all(
      budgets.map(async (budget) => {
        const startOfMonth = new Date(budget.month.getFullYear(), budget.month.getMonth(), 1);
        const endOfMonth = new Date(budget.month.getFullYear(), budget.month.getMonth() + 1, 0);

        const spent = await Transaction.aggregate([
          {
            $match: {
              user: req.user.id,
              type: "expense",
              category: budget.category,
              date: { $gte: startOfMonth, $lte: endOfMonth },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        return {
          ...budget.toObject(),
          spent: spent[0]?.total || 0,
        };
      })
    );

    res.status(200).json(budgetsWithSpent);
  } catch (error) {
    console.error("[v0] Error fetching budgets:", error.message);
    res.status(500).json({ message: "Failed to fetch budgets" });
  }
};

// UPDATE BUDGET
exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, month, description } = req.body;

    const budget = await Budget.findByIdAndUpdate(
      id,
      { category, amount, month, description },
      { new: true }
    );

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    console.log("[v0] Budget updated:", id);
    res.status(200).json(budget);
  } catch (error) {
    console.error("[v0] Error updating budget:", error.message);
    res.status(500).json({ message: "Failed to update budget" });
  }
};

// DELETE BUDGET
exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await Budget.findByIdAndDelete(id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    console.log("[v0] Budget deleted:", id);
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("[v0] Error deleting budget:", error.message);
    res.status(500).json({ message: "Failed to delete budget" });
  }
};
