import React, { useState } from "react";
import "./comstyles/add-Inc-Exp-Form.css";

export default function AddExpenseForm({ onClose, onSave }) {
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

  const handleSubmit = () => {
    onSave && onSave(formData);
    onClose && onClose(); // ✅ close popup after save
  };

  const handleCancel = () => {
    setFormData({
      description: "",
      amount: "",
      category: "",
      date: "",
      notes: "",
    });
    onClose && onClose(); // ✅ close popup
  };

  return (
    // 🔥 POPUP OVERLAY
    <div className="popup-overlay" onClick={onClose}>
      {/* 🔥 STOP closing when clicking inside form */}
      <div className="expense-card-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="form-container">
          <div className="form-card">
            <div className="form-card-header">
              <h2 className="form-card-title">Add Expense</h2>
            </div>

            <div className="form-content">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-input"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Groceries, Rent..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    className="form-input"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="₹"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    name="category"
                    className="form-input"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Food, Travel..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-input"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  className="form-textarea"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Optional notes..."
                />
              </div>

              <div className="form-actions">
                <button className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn-save" onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
