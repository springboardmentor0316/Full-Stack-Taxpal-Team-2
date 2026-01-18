import React from "react";
import "../styles/Dashboard.css";
import { logout } from "../utils/auth";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">TaxPal</h2>

        <ul className="menu">
          <li className="active">Dashboard</li>
          <li>Income</li>
          <li>Expenses</li>
          <li>Reports</li>
          <li onClick={logout} className="logout">
            Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Dashboard</h1>

        {/* Summary Cards */}
        <div className="cards">
          <div className="card">
            <h3>Total Income</h3>
            <p>₹ 50,000</p>
          </div>

          <div className="card">
            <h3>Total Expenses</h3>
            <p>₹ 20,000</p>
          </div>

          <div className="card">
            <h3>Savings</h3>
            <p>₹ 30,000</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="chart-box">
          <h3>Expense Breakdown</h3>
          <div className="chart-placeholder">
            Chart will be added later
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
