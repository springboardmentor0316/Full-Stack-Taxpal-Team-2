import React, { useState } from "react";
import { addIncome } from "../api/financeApi";
import "./comstyles/add-Inc-Exp-Form.css";

export default function AddIncomeForm({ onClose }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔴 MUST be async (this fixes "Unexpected reserved word 'await'")
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addIncome({
        description: formData.description,
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date,
        notes: formData.notes,
      });

      alert("Income saved successfully");

      setFormData({
        description: "",
        amount: "",
        category: "",
        date: "",
        notes: "",
      });

      onClose && onClose();
    } catch (error) {
      console.error("Income save error:", error);
      alert("Failed to save income");
    }
  };

  return (
    <div className="expense-card-wrapper">
      <div className="form-container">
        <div className="form-card">
          <div className="form-card-header">
            <h2 className="form-card-title">Add Income</h2>
          </div>

          <form className="form-content" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Description</label>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={onClose} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-save">
                Save
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
