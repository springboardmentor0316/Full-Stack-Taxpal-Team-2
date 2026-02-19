const Transaction = require("../models/Transaction")
const Alert = require("../models/Alert");
const Budget = require("../models/Budget");

// ADD INCOME
exports.addIncome = async (req, res) => {
  try {
    console.log("USER FROM TOKEN 👉", req.user) // 🔍 DEBUG

    const transaction = await Transaction.create({
      user: req.user.id,          // 👈 auth middleware se aata hai
      type: "income",
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
      date: req.body.date,
      notes: req.body.notes,
    })

    // create a notification for the new income
    try {
      await Alert.create({
        user: req.user.id,
        message: `New income recorded: ${req.body.description || ""} - ₹${req.body.amount}`,
        type: "info",
      });
    } catch (e) {
      console.error("[v0] Failed to create income alert", e.message);
    }

    res.status(201).json(transaction)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to add income" })
  }
}

// ADD EXPENSE
exports.addExpense = async (req, res) => {
  try {
    console.log("USER FROM TOKEN 👉", req.user) // 🔍 DEBUG

    const transaction = await Transaction.create({
      user: req.user.id,
      type: "expense",
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
      date: req.body.date,
      notes: req.body.notes,
    })

    // basic alert for every new expense
    try {
      await Alert.create({
        user: req.user.id,
        message: `New expense recorded: ${req.body.description || ""} - ₹${req.body.amount}`,
        type: "info",
      });
    } catch (e) {
      console.error("[v0] Failed to create expense alert", e.message);
    }

    // check budget thresholds for the same category/month
    try {
      const category = req.body.category;
      const amount = req.body.amount;
      const date = new Date(req.body.date);

      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const budget = await Budget.findOne({
        user: req.user.id,
        category,
        month: { $gte: startOfMonth, $lte: endOfMonth },
      });

      if (budget) {
        const spentAgg = await Transaction.aggregate([
          {
            $match: {
              user: req.user.id,
              type: "expense",
              category: category,
              date: { $gte: startOfMonth, $lte: endOfMonth },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const newSpent = spentAgg[0]?.total || 0;
        const prevSpent = newSpent - amount;
        const percentBefore = (prevSpent / budget.amount) * 100;
        const percentNow = (newSpent / budget.amount) * 100;

        if (percentBefore < 80 && percentNow >= 80 && percentNow < 100) {
          await Alert.create({
            user: req.user.id,
            message: `Budget alert: ${budget.category} budget is 80% used`,
            type: "warning",
          });
        }
        if (percentBefore < 100 && percentNow >= 100) {
          await Alert.create({
            user: req.user.id,
            message: `Budget alert: ${budget.category} budget is 100% used`,
            type: "urgent",
          });
        }
      }
    } catch (e) {
      console.error("[v0] Budget threshold check failed", e.message);
    }

    res.status(201).json(transaction)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to add expense" })
  }
}


/* Take only logged in user data */

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,   // 🔥 MOST IMPORTANT
    }).sort({ createdAt: -1 })

    res.status(200).json(transactions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch transactions" })
  }
}
