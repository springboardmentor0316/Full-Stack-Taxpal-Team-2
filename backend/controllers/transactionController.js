const Transaction = require("../models/Transaction")

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
