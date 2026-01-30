const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date, // ✅ NEW
    },
    notes: {
      type: String, // ✅ NEW
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);
