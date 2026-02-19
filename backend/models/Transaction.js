const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String, // "income" | "expense"
    required: true,
  },
  description: String,
  amount: Number,
  category: String,
  date: Date,
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
