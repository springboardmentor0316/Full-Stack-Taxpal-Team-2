import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  BarChart3,
  CreditCard,
  PieChart,
  FileText,
  Settings,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  LogOut,
  Bell,
  Plus,
} from "lucide-react";
import "../styles/TaxPalDashboard.css";

export default function TaxPalDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { token, user: contextUser, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      setUser(contextUser);
    }
  }, [token, contextUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNotificationClick = () => {
    console.log("Notification button clicked!");
    // Add your notification logic here
  };

  const handleAddExpance = () => {
    navigate("/AddExpenseForm");
  };

  const handleAddIncome = () => {
    navigate("/AddIncomeForm");
  };

  const stats = [
    {
      title: "monthly income",
      amount: "10000",
      color: "stat-yellow",
      icon: TrendingUp,
    },
    {
      title: "monthly expenses",
      amount: "10000",
      color: "stat-orange",
      icon: TrendingDown,
    },
    {
      title: "Estimated Tax due",
      amount: "10000",
      color: "stat-blue",
      icon: FileText,
    },
    {
      title: "Savings Rate",
      amount: "10000",
      color: "stat-green",
      icon: TrendingUp,
    },
  ];

  const navItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: CreditCard, label: "Transactions" },
    { icon: PieChart, label: "Budget" },
    { icon: FileText, label: "Tax Estimator" },
    { icon: FileText, label: "Report" },
    { icon: Settings, label: "Settings" },
  ];

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h1 className="logo">TaxPal</h1>
            <button onClick={() => setSidebarOpen(false)} className="close-btn">
              <X size={24} />
            </button>
          </div>

          <nav className="nav-menu">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`nav-item ${item.active ? "nav-item-active" : ""}`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-profile">
              <div className="user-avatar">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="user-info">
                <p className="user-name">{user.fullName || "User"}</p>
                <p className="user-role">@{user.username}</p>
              </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="header-left">
              <button onClick={() => setSidebarOpen(true)} className="menu-btn">
                <Menu size={24} />
              </button>
              <h2 className="page-title">Dashboard</h2>
            </div>

            <div className="header-right">
              {/* Notification Button */}
              <button
                className="notification-button"
                onClick={handleNotificationClick}
                title="Notifications"
              >
                <Bell size={18} />
                <span className="button-text">Alerts</span>
              </button>

              {/* Add New Income Button */}
              <button 
                className="add-new-button add-income-btn" 
                onClick={handleAddIncome}
                title="Add Income"
              >
                <Plus size={18} />
                <span className="button-text">Income</span>
              </button>

              {/* Add New Expense Button */}
              <button 
                className="add-new-button add-expense-btn" 
                onClick={handleAddExpance}
                title="Add Expense"
              >
                <Plus size={18} />
                <span className="button-text">Expense</span>
              </button>

              {/* User Info - Desktop Only */}
              <div className="header-user-section">
                <div className="header-user-info">
                  <p className="header-user-name">{user.fullName || "User"}</p>
                  <p className="header-user-role">@{user.username}</p>
                </div>
                <div className="header-avatar">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : "👤"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="content-area">
          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <p className="stat-title">{stat.title}</p>
                <div className="stat-content">
                  <span className="stat-amount">$ {stat.amount}</span>
                  <div className={`stat-icon ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="charts-grid">
            {/* Income VS Expenses Chart */}
            <div className="chart-card chart-large">
              <div className="chart-header">
                <h3 className="chart-title">Income VS Expenses</h3>
                <div className="chart-toggle">
                  <button className="toggle-btn toggle-active">Monthly</button>
                  <button className="toggle-btn">Yearly</button>
                </div>
              </div>
              <div className="chart-content">
                <div className="chart-placeholder">
                  <BarChart3 size={48} className="chart-icon" />
                  <p className="chart-text">Chart Visualization</p>
                </div>
              </div>
            </div>

            {/* Expense Breakdown */}
            <div className="chart-card">
              <h3 className="chart-title">Expense Breakdown</h3>
              <div className="breakdown-content">
                <div className="breakdown-placeholder">
                  <PieChart size={48} className="chart-icon" />
                  <p className="chart-text">Pie Chart</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="transactions-card">
            <div className="transactions-header">
              <h3 className="transactions-title">Recent Transactions</h3>
              <button className="view-all-btn">view All →</button>
            </div>
            <div className="table-wrapper">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th className="hide-mobile">Category</th>
                    <th>Amount</th>
                    <th className="hide-tablet">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5" className="empty-state">
                      <CreditCard size={48} className="empty-icon" />
                      <p className="empty-text">No transactions yet</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}