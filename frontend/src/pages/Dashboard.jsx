"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  CreditCard,
  Plus,
  Bell,
  LogOut,
  FileText,
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  Shield,
  Lock,
  Check,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/TaxPalDashboard.css";
import AddExpenseForm from "../components/add-Exp";
import AddIncomeForm from "../components/add-Inc";
import { addIncome, addExpense } from "../api/transactionApi";
import { getTransactions } from "../api/transactionApi";
import { createBudget, getBudgets } from "../api/budgetApi";
import { authApi } from "../api/authApi";

export default function TaxPalDashboard() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showExpensePopup, setShowExpensePopup] = useState(false);
  const [showIncomePopup, setShowIncomePopup] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);
  
  // Profile states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });

  const [budgetForm, setBudgetForm] = useState({
    category: "",
    amount: "",
    month: "",
    description: "",
  });

  const [taxForm, setTaxForm] = useState({
    quarter: "Q1",
    grossIncome: "",
    businessExpenses: "",
    retirementContributions: "",
    healthInsurance: "",
    homeOfficeDeduction: "",
  });
  
  const [taxSummary, setTaxSummary] = useState(null);
  
  const [reportForm, setReportForm] = useState({
    reportType: "Income Statement",
    period: "Current Month",
    format: "PDF",
  });
  
  const [reportData, setReportData] = useState(null);

  const { token, user: contextUser, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      setUser(contextUser);
      // Initialize profile data
      setProfileData({
        fullName: contextUser?.fullName || "",
        username: contextUser?.username || "",
        email: contextUser?.email || "",
        phone: contextUser?.phone || "",
        location: contextUser?.location || "",
        bio: contextUser?.bio || "",
      });
    }
  }, [token, contextUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNotificationClick = () => {
    console.log("[v0] Notification button clicked!");
    setShowAlerts(!showAlerts);
    if (!showAlerts) {
      fetchAlerts();
    }
  };

  const fetchAlerts = async () => {
    try {
      console.log("[v0] Fetching alerts from backend");
      // Get mock alerts for now - update endpoint when backend is ready
      const mockAlerts = [
        { id: 1, message: "Budget alert: Groceries budget is 80% used", type: "warning", read: false, date: new Date() },
        { id: 2, message: "New expense recorded: Office supplies - ₹5,000", type: "info", read: false, date: new Date(Date.now() - 3600000) },
        { id: 3, message: "Tax deadline reminder: Q1 tax due next week", type: "urgent", read: true, date: new Date(Date.now() - 86400000) },
      ];
      setAlerts(mockAlerts);
    } catch (error) {
      console.error("[v0] Error fetching alerts:", error);
    }
  };

  const markAlertAsRead = async (alertId) => {
    try {
      console.log("[v0] Marking alert as read:", alertId);
      setAlerts((prevAlerts) =>
        prevAlerts.map((alert) =>
          alert.id === alertId ? { ...alert, read: true } : alert
        )
      );
    } catch (error) {
      console.error("[v0] Error marking alert as read:", error);
    }
  };

  const handleAddExpance = () => {
    setShowExpensePopup(true);
  };

  const handleCloseExpensePopup = () => {
    setShowExpensePopup(false);
  };

  const handleSaveExpense = async (expenseData) => {
    try {
      const res = await addExpense(expenseData, token);
      console.log("Expense Saved:", res.data);
      setTransactions((prev) => [res.data, ...prev]);
      alert("Expense added successfully ✅");
      setShowExpensePopup(false);
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense ❌");
    }
  };

  const handleAddIncome = () => {
    setShowIncomePopup(true);
  };

  const handleCloseIncomePopup = () => {
    setShowIncomePopup(false);
  };

  const handleSaveIncome = async (incomeData) => {
    try {
      const res = await addIncome(incomeData, token);
      console.log("Income Saved:", res.data);
      setTransactions((prev) => [res.data, ...prev]);
      alert("Income added successfully ✅");
      setShowIncomePopup(false);
    } catch (error) {
      console.error("Error adding income:", error);
      alert("Failed to add income ❌");
    }
  };

  // Profile handlers
  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      console.log("[v0] Saving profile:", profileData);
      const response = await authApi.updateProfile(token, profileData);
      console.log("[v0] Profile updated:", response);
      // Extract user data from response - the backend returns { message, user: {...} }
      const userData = response.user || response;
      setUser(userData);
      setProfileData({
        fullName: userData?.fullName || "",
        username: userData?.username || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        location: userData?.location || "",
        bio: userData?.bio || "",
      });
      setIsEditingProfile(false);
      alert("Profile updated successfully! ✅");
    } catch (error) {
      console.error("[v0] Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handlePhotoUpload = () => {
    console.log("Photo upload clicked");
    // 🔜 Implement photo upload
    alert("Photo upload feature coming soon!");
  };

  const handleBudgetChange = (e) => {
    const { name, value } = e.target;
    setBudgetForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveBudget = async (e) => {
    e.preventDefault();

    if (!budgetForm.category || !budgetForm.amount || !budgetForm.month) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const res = await createBudget(
        {
          category: budgetForm.category,
          amount: budgetForm.amount,
          month: budgetForm.month,
          description: budgetForm.description,
        },
        token,
      );

      console.log("[v0] Budget created:", res.data);
      setBudgets((prev) => [res.data, ...prev]);
      setBudgetForm({
        category: "",
        amount: "",
        month: "",
        description: "",
      });
      alert("Budget created successfully ✅");
    } catch (error) {
      console.error("[v0] Error creating budget:", error);
      alert("Failed to create budget ❌");
    }
  };

  const handleBudgetCancel = () => {
    setBudgetForm({
      category: "",
      amount: "",
      month: "",
      description: "",
    });
  };

  const getChartData = () => {
    const monthlyData = {};

    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const monthKey = date.toLocaleString("default", { month: "short" });

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { name: monthKey, income: 0, expenses: 0 };
      }

      if (tx.type === "income") {
        monthlyData[monthKey].income += tx.amount || 0;
      } else {
        monthlyData[monthKey].expenses += tx.amount || 0;
      }
    });

    return Object.values(monthlyData).slice(-12);
  };

  const getExpenseBreakdown = () => {
    const breakdown = {};

    transactions
      .filter((tx) => tx.type === "expense")
      .forEach((tx) => {
        const category = tx.category || "Other";
        breakdown[category] = (breakdown[category] || 0) + (tx.amount || 0);
      });

    return Object.entries(breakdown).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    }));
  };

  const handleTaxChange = (e) => {
    const { name, value } = e.target;
    setTaxForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTax = (e) => {
    e.preventDefault();

    const grossIncome = parseFloat(taxForm.grossIncome) || 0;
    const businessExpenses = parseFloat(taxForm.businessExpenses) || 0;
    const retirementContributions =
      parseFloat(taxForm.retirementContributions) || 0;
    const healthInsurance = parseFloat(taxForm.healthInsurance) || 0;
    const homeOfficeDeduction = parseFloat(taxForm.homeOfficeDeduction) || 0;

    const totalDeductions =
      businessExpenses +
      retirementContributions +
      healthInsurance +
      homeOfficeDeduction;

    const taxableIncome = Math.max(0, grossIncome - totalDeductions);

    const federalTax = taxableIncome * 0.22;
    const stateTax = taxableIncome * 0.05;
    const selfEmploymentTax = grossIncome * 0.153;

    const totalTax = federalTax + stateTax + selfEmploymentTax;
    const estimatedQuarterlyPayment = totalTax / 4;

    setTaxSummary({
      grossIncome,
      totalDeductions,
      taxableIncome,
      federalTax: federalTax.toFixed(2),
      stateTax: stateTax.toFixed(2),
      selfEmploymentTax: selfEmploymentTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      estimatedQuarterlyPayment: estimatedQuarterlyPayment.toFixed(2),
    });

    console.log("[v0] Tax calculated:", {
      grossIncome,
      totalDeductions,
      totalTax,
    });
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReportForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateReport = () => {
    const now = new Date();
    const currentMonth = now.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const monthlyTransactions = transactions.filter((tx) => {
      const txDate = new Date(tx.date);
      return (
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      );
    });

    const totalIncome = monthlyTransactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + (tx.amount || 0), 0);

    const totalExpenses = monthlyTransactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + (tx.amount || 0), 0);

    const netIncome = totalIncome - totalExpenses;

    const report = {
      type: reportForm.reportType,
      period: currentMonth,
      format: reportForm.format,
      totalIncome: totalIncome.toFixed(2),
      totalExpenses: totalExpenses.toFixed(2),
      netIncome: netIncome.toFixed(2),
      transactionCount: monthlyTransactions.length,
      generatedDate: new Date().toLocaleDateString(),
    };

    setReportData(report);
    console.log("[v0] Report generated:", report);
  };

  const downloadReport = () => {
    if (!reportData) return;

    const reportText = `
TaxPal Financial Report
========================
Report Type: ${reportData.type}
Period: ${reportData.period}
Generated: ${reportData.generatedDate}

SUMMARY
-------
Total Income: ₹${reportData.totalIncome}
Total Expenses: ₹${reportData.totalExpenses}
Net Income: ₹${reportData.netIncome}
Transactions: ${reportData.transactionCount}

========================
End of Report
    `;

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      `data:text/plain;charset=utf-8,${encodeURIComponent(reportText)}`,
    );
    element.setAttribute(
      "download",
      `TaxPal_Report_${reportData.period.replace(/\s+/g, "_")}.txt`,
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    alert("Report downloaded successfully!");
  };

  useEffect(() => {
    if (!token) return;

    setLoading(true);

    Promise.all([getTransactions(token), getBudgets(token)])
      .then(([txRes, budgetRes]) => {
        console.log("[v0] Transactions loaded:", txRes.data);
        console.log("[v0] Budgets loaded:", budgetRes.data);
        setTransactions(txRes.data || []);
        setBudgets(budgetRes.data || []);
      })
      .catch((err) => {
        console.error("[v0] Failed to load data", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const calculateStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyTransactions = transactions.filter((tx) => {
      const txDate = new Date(tx.date);
      return (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    });

    const monthlyIncome = monthlyTransactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + (tx.amount || 0), 0);

    const monthlyExpenses = monthlyTransactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + (tx.amount || 0), 0);

    const estimatedTax = monthlyIncome * 0.25;
    const savingsRate = monthlyIncome - monthlyExpenses;

    console.log("[v0] Stats calculated:", {
      monthlyIncome,
      monthlyExpenses,
      estimatedTax,
      savingsRate,
    });

    return [
      {
        title: "monthly income",
        amount: monthlyIncome.toFixed(2),
        color: "stat-yellow",
        icon: TrendingUp,
      },
      {
        title: "monthly expenses",
        amount: monthlyExpenses.toFixed(2),
        color: "stat-orange",
        icon: TrendingDown,
      },
      {
        title: "Estimated Tax due",
        amount: estimatedTax.toFixed(2),
        color: "stat-blue",
        icon: FileText,
      },
      {
        title: "Savings Rate",
        amount: savingsRate.toFixed(2),
        color: "stat-green",
        icon: TrendingUp,
      },
    ];
  };

  const stats = calculateStats();

  const navItems = [
    { icon: BarChart3, label: "Dashboard", id: "dashboard" },
    { icon: CreditCard, label: "Transactions", id: "transactions" },
    { icon: PieChart, label: "Budget", id: "budget" },
    { icon: FileText, label: "Tax Estimator", id: "tax" },
    { icon: FileText, label: "Report", id: "report" },
    // { icon: User, label: "Profile", id: "profile" },
  ];

  const handleNavClick = (id) => {
    setActiveNav(id);
    if (id === "profile") {
      setIsEditingProfile(false); // Reset edit mode when navigating to profile
    }
  };

  const renderMainContent = () => {
    switch (activeNav) {
      case "dashboard":
        return (
          <>
            {/* Stats */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <p className="stat-title">{stat.title}</p>
                  <div className="stat-content">
                    <span className="stat-amount">₹ {stat.amount}</span>
                    <div className={`stat-icon ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="charts-grid">
              <div className="chart-card chart-large">
                <div className="chart-header">
                  <h3 className="chart-title">Income VS Expenses</h3>
                  <div className="chart-toggle">
                    <button className="toggle-btn toggle-active">Monthly</button>
                    <button className="toggle-btn">Yearly</button>
                  </div>
                </div>
                <div className="chart-content">
                  {getChartData().length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="income" fill="#8884d8" name="Income" />
                        <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="chart-placeholder">
                      <BarChart3 size={48} className="chart-icon" />
                      <p className="chart-text">Add transactions to see charts</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="chart-card">
                <h3 className="chart-title">Expense Breakdown</h3>
                <div className="breakdown-content">
                  {getExpenseBreakdown().length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={getExpenseBreakdown()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ₹${value}`}
                          outerRadius={100}
                          fill="#8884D8"
                          dataKey="value"
                        >
                          {getExpenseBreakdown().map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"][
                                index % 5
                              ]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="breakdown-placeholder">
                      <PieChart size={48} className="chart-icon" />
                      <p className="chart-text">Add expenses to see breakdown</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        );

      case "transactions":
        return (
          <div className="transactions-card">
            <div className="transactions-header">
              <h3 className="transactions-title">Recent Transactions</h3>
              <button
                className="view-all-btn"
                onClick={() => setShowAllTransactions((prev) => !prev)}
              >
                {showAllTransactions ? "Show Less ←" : "View All →"}
              </button>
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
                  {loading && (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        <p className="empty-text">Loading transactions...</p>
                      </td>
                    </tr>
                  )}

                  {!loading && transactions.length === 0 && (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        <CreditCard size={48} className="empty-icon" />
                        <p className="empty-text">No transactions yet</p>
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    displayedTransactions.map((tx) => (
                      <tr key={tx._id}>
                        <td>{new Date(tx.date).toLocaleDateString()}</td>
                        <td>{tx.description}</td>
                        <td className="hide-mobile">{tx.category}</td>
                        <td
                          style={{
                            color: tx.type === "income" ? "green" : "red",
                            fontWeight: 600,
                          }}
                        >
                          ₹{tx.amount}
                        </td>
                        <td className="hide-tablet">{tx.type}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "budget":
        return (
          <div className="budget-card">
            <div className="budget-header">
              <h3 className="budget-title">Create New Budget</h3>
            </div>
            <form className="budget-form" onSubmit={handleSaveBudget}>
              <div className="budget-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={budgetForm.category}
                    onChange={handleBudgetChange}
                  >
                    <option value="">Select a category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Rent">Rent</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Budget Amount</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="₹ 0.00"
                    value={budgetForm.amount}
                    onChange={handleBudgetChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Month</label>
                <input
                  type="month"
                  name="month"
                  value={budgetForm.month}
                  onChange={handleBudgetChange}
                />
              </div>

              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea
                  name="description"
                  placeholder="Add any additional details..."
                  value={budgetForm.description}
                  onChange={handleBudgetChange}
                />
              </div>

              <div className="budget-actions">
                <button type="button" className="btn-cancel" onClick={handleBudgetCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Budget
                </button>
              </div>
            </form>

            {budgets.length > 0 && (
              <div className="budgets-list">
                <h4 className="budgets-list-title">Your Budgets</h4>
                <div className="budgets-grid">
                  {budgets.map((budget) => (
                    <div key={budget._id} className="budget-item">
                      <div className="budget-item-content">
                        <div className="budget-item-info">
                          <p className="budget-item-category">{budget.category}</p>
                          <p className="budget-item-amounts">
                            Budget: ₹{budget.amount.toFixed(2)} | Spent: ₹{budget.spent?.toFixed(2) || "0.00"}
                          </p>
                          {budget.description && (
                            <p className="budget-item-description">{budget.description}</p>
                          )}
                        </div>
                        <div className="budget-item-progress">
                          <div className="budget-progress-circle">
                            <p className="budget-progress-percentage">
                              {Math.round(((budget.spent || 0) / budget.amount) * 100)}%
                            </p>
                            <p className="budget-progress-label">Used</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "tax":
        return (
          <div className="tax-estimator-grid">
            <div className="tax-card">
              <div className="tax-header">
                <h3 className="tax-title">Tax Estimator</h3>
                <p className="tax-subtitle">Calculate your estimated tax obligations</p>
              </div>

              <form className="tax-form" onSubmit={calculateTax}>
                <div className="tax-row">
                  <div className="form-group">
                    <label>Tax Quarter</label>
                    <select name="quarter" value={taxForm.quarter} onChange={handleTaxChange}>
                      <option value="Q1">Q1 (Jan–Mar)</option>
                      <option value="Q2">Q2 (Apr–Jun)</option>
                      <option value="Q3">Q3 (Jul–Sep)</option>
                      <option value="Q4">Q4 (Oct–Dec)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Gross Income for Quarter</label>
                  <input
                    type="number"
                    name="grossIncome"
                    placeholder="₹ 0.00"
                    value={taxForm.grossIncome}
                    onChange={handleTaxChange}
                  />
                </div>

                <h4 className="section-title">Deductions</h4>

                <div className="tax-row">
                  <div className="form-group">
                    <label>Business Expenses</label>
                    <input
                      type="number"
                      name="businessExpenses"
                      placeholder="₹ 0.00"
                      value={taxForm.businessExpenses}
                      onChange={handleTaxChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Retirement Contributions</label>
                    <input
                      type="number"
                      name="retirementContributions"
                      placeholder="₹ 0.00"
                      value={taxForm.retirementContributions}
                      onChange={handleTaxChange}
                    />
                  </div>
                </div>

                <div className="tax-row">
                  <div className="form-group">
                    <label>Health Insurance Premiums</label>
                    <input
                      type="number"
                      name="healthInsurance"
                      placeholder="₹ 0.00"
                      value={taxForm.healthInsurance}
                      onChange={handleTaxChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Home Office Deduction</label>
                    <input
                      type="number"
                      name="homeOfficeDeduction"
                      placeholder="₹ 0.00"
                      value={taxForm.homeOfficeDeduction}
                      onChange={handleTaxChange}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary full-width">
                  Calculate Estimated Tax
                </button>
              </form>
            </div>

            <div className="tax-summary-card">
              <h3 className="tax-title">Tax Summary</h3>
              {taxSummary ? (
                <div className="tax-summary-content">
                  <div className="tax-summary-section">
                    <p className="tax-summary-item">
                      <strong>Gross Income:</strong> ₹{taxSummary.grossIncome.toFixed(2)}
                    </p>
                    <p className="tax-summary-item">
                      <strong>Total Deductions:</strong> ₹{taxSummary.totalDeductions.toFixed(2)}
                    </p>
                    <p className="tax-summary-item">
                      <strong>Taxable Income:</strong> ₹{taxSummary.taxableIncome.toFixed(2)}
                    </p>
                  </div>

                  <hr className="tax-summary-divider" />

                  <div className="tax-summary-section">
                    <p className="tax-summary-item">
                      <strong>Federal Tax (22%):</strong> ₹{taxSummary.federalTax}
                    </p>
                    <p className="tax-summary-item">
                      <strong>State Tax (5%):</strong> ₹{taxSummary.stateTax}
                    </p>
                    <p className="tax-summary-item">
                      <strong>Self-Employment Tax (15.3%):</strong> ₹{taxSummary.selfEmploymentTax}
                    </p>
                  </div>

                  <hr className="tax-summary-divider" />

                  <div className="tax-summary-highlight">
                    <p className="tax-summary-total">Total Tax: ₹{taxSummary.totalTax}</p>
                    <p className="tax-summary-quarterly">Quarterly Payment: ₹{taxSummary.estimatedQuarterlyPayment}</p>
                  </div>
                </div>
              ) : (
                <div className="tax-summary-empty">
                  <div className="summary-icon">🧾</div>
                  <p className="summary-text">
                    Enter your income and deduction details to calculate your estimated quarterly tax.
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case "report":
        return (
          <>
            <div className="card">
              <h3 className="card-title">Financial Reports</h3>
              <p className="card-subtitle">Generate and download your financial reports</p>

              <div className="form-grid">
                <div className="form-group">
                  <label>Report Type</label>
                  <select
                    name="reportType"
                    value={reportForm.reportType}
                    onChange={handleReportChange}
                  >
                    <option value="Income Statement">Income Statement</option>
                    <option value="Expense Report">Expense Report</option>
                    <option value="Summary Report">Summary Report</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Period</label>
                  <select
                    name="period"
                    value={reportForm.period}
                    onChange={handleReportChange}
                  >
                    <option value="Current Month">Current Month</option>
                    <option value="Last 3 Months">Last 3 Months</option>
                    <option value="Last 6 Months">Last 6 Months</option>
                    <option value="This Year">This Year</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Format</label>
                  <select
                    name="format"
                    value={reportForm.format}
                    onChange={handleReportChange}
                  >
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel</option>
                    <option value="CSV">CSV</option>
                  </select>
                </div>
              </div>

              <div className="card-actions">
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => {
                    setReportData(null);
                    setReportForm({
                      reportType: "Income Statement",
                      period: "Current Month",
                      format: "PDF",
                    });
                  }}
                >
                  Reset
                </button>
                <button type="button" className="btn-primary" onClick={generateReport}>
                  Generate Report
                </button>
              </div>
            </div>

            {reportData && (
              <div className="card report-preview">
                <div className="preview-header">
                  <h4>Report Preview</h4>
                  <div className="preview-actions">
                    <button className="toggle-btn" onClick={() => window.print()}>
                      Print
                    </button>
                    <button className="btn-primary" onClick={downloadReport}>
                      Download
                    </button>
                  </div>
                </div>

                <div className="preview-body">
                  <p><strong>Report Type:</strong> {reportData.type}</p>
                  <p><strong>Period:</strong> {reportData.period}</p>
                  <p><strong>Generated Date:</strong> {reportData.generatedDate}</p>
                  <p><strong>Total Income:</strong> ₹{reportData.totalIncome}</p>
                  <p><strong>Total Expenses:</strong> ₹{reportData.totalExpenses}</p>
                  <p><strong>Net Income:</strong> ₹{reportData.netIncome}</p>
                  <p><strong>Transaction Count:</strong> {reportData.transactionCount}</p>
                </div>
              </div>
            )}
          </>
        );

      case "profile":
        return (
          <div className="profile-section-wrapper">
            {/* Profile Banner */}
            <div className="profile-banner">
              <div className="banner-gradient"></div>
              <div className="profile-banner-content">
                <div className="profile-main-info">
                  <div className="profile-avatar-container">
                    <div className="profile-avatar-xl">
                      {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                    </div>
                    <button className="avatar-change-btn" onClick={handlePhotoUpload}>
                      <Camera size={20} />
                      <span>Change Photo</span>
                    </button>
                  </div>
                  <div className="profile-user-details">
                    <h1 className="profile-display-name">{user?.fullName || "User"}</h1>
                    <p className="profile-handle">@{user?.username}</p>
                    <div className="profile-meta-info">
                      <div className="meta-item">
                        <Calendar size={16} />
                        <span>Joined January 2026</span>
                      </div>
                      <div className="meta-item">
                        <MapPin size={16} />
                        <span>{profileData.location || "Location not set"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stats Cards in Banner */}
                <div className="profile-stats-banner">
                  <div className="stat-banner-item">
                    <div className="stat-banner-icon">
                      <PieChart size={24} />
                    </div>
                    <div className="stat-banner-info">
                      <span className="stat-banner-number">{budgets.length}</span>
                      <span className="stat-banner-label">Active Budgets</span>
                    </div>
                  </div>
                  <div className="stat-banner-item">
                    <div className="stat-banner-icon">
                      <CreditCard size={24} />
                    </div>
                    <div className="stat-banner-info">
                      <span className="stat-banner-number">{transactions.length}</span>
                      <span className="stat-banner-label">Transactions</span>
                    </div>
                  </div>
                  <div className="stat-banner-item">
                    <div className="stat-banner-icon">
                      <FileText size={24} />
                    </div>
                    <div className="stat-banner-info">
                      <span className="stat-banner-number">5</span>
                      <span className="stat-banner-label">Reports Generated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Content Grid */}
            <div className="profile-main-grid">
              {/* Left Column - About & Quick Info */}
              <div className="profile-sidebar-column">
                {/* About Section */}
                <div className="profile-info-card">
                  <div className="profile-card-header">
                    <h3 className="profile-card-title">About</h3>
                    {!isEditingProfile && (
                      <button 
                        className="edit-section-btn"
                        onClick={() => setIsEditingProfile(true)}
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                    )}
                  </div>
                  <div className="profile-card-body">
                    {isEditingProfile ? (
                      <textarea
                        name="bio"
                        className="profile-bio-input"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        placeholder="Write a short bio about yourself..."
                        rows="5"
                      />
                    ) : (
                      <p className="profile-bio-display">
                        {profileData.bio || "No bio added yet. Share something about yourself!"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick Info Card */}
                <div className="profile-info-card">
                  <div className="profile-card-header">
                    <h3 className="profile-card-title">Quick Info</h3>
                  </div>
                  <div className="profile-card-body">
                    <div className="quick-info-list">
                      <div className="quick-info-item">
                        <Mail size={18} className="quick-info-icon" />
                        <div className="quick-info-content">
                          <span className="quick-info-label">Email</span>
                          <span className="quick-info-value">{profileData.email || "Not set"}</span>
                        </div>
                      </div>
                      <div className="quick-info-item">
                        <Phone size={18} className="quick-info-icon" />
                        <div className="quick-info-content">
                          <span className="quick-info-label">Phone</span>
                          <span className="quick-info-value">{profileData.phone || "Not set"}</span>
                        </div>
                      </div>
                      <div className="quick-info-item">
                        <MapPin size={18} className="quick-info-icon" />
                        <div className="quick-info-content">
                          <span className="quick-info-label">Location</span>
                          <span className="quick-info-value">{profileData.location || "Not set"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Detailed Information */}
              <div className="profile-content-column">
                {/* Personal Information */}
                <div className="profile-info-card">
                  <div className="profile-card-header">
                    <div className="header-with-icon">
                      <User size={20} className="header-icon" />
                      <h3 className="profile-card-title">Personal Information</h3>
                    </div>
                  </div>
                  <div className="profile-card-body">
                    <div className="profile-form-grid">
                      <div className="profile-form-field">
                        <label className="profile-field-label">Full Name</label>
                        {isEditingProfile ? (
                          <input
                            type="text"
                            name="fullName"
                            className="profile-field-input"
                            value={profileData.fullName}
                            onChange={handleProfileChange}
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <div className="profile-field-display">{profileData.fullName || "Not set"}</div>
                        )}
                      </div>

                      <div className="profile-form-field">
                        <label className="profile-field-label">Username</label>
                        {isEditingProfile ? (
                          <input
                            type="text"
                            name="username"
                            className="profile-field-input"
                            value={profileData.username}
                            onChange={handleProfileChange}
                            placeholder="Choose a username"
                          />
                        ) : (
                          <div className="profile-field-display">@{profileData.username}</div>
                        )}
                      </div>

                      <div className="profile-form-field">
                        <label className="profile-field-label">Email Address</label>
                        {isEditingProfile ? (
                          <input
                            type="email"
                            name="email"
                            className="profile-field-input"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            placeholder="your.email@example.com"
                          />
                        ) : (
                          <div className="profile-field-display">{profileData.email || "Not set"}</div>
                        )}
                      </div>

                      <div className="profile-form-field">
                        <label className="profile-field-label">Phone Number</label>
                        {isEditingProfile ? (
                          <input
                            type="tel"
                            name="phone"
                            className="profile-field-input"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            placeholder="+91 (xxx) xxx-xxxx"
                          />
                        ) : (
                          <div className="profile-field-display">{profileData.phone || "Not set"}</div>
                        )}
                      </div>

                      <div className="profile-form-field full-width">
                        <label className="profile-field-label">Location</label>
                        {isEditingProfile ? (
                          <input
                            type="text"
                            name="location"
                            className="profile-field-input"
                            value={profileData.location}
                            onChange={handleProfileChange}
                            placeholder="City, State, Country"
                          />
                        ) : (
                          <div className="profile-field-display">{profileData.location || "Not set"}</div>
                        )}
                      </div>
                    </div>

                    {isEditingProfile && (
                      <div className="profile-form-actions">
                        <button 
                          className="profile-btn profile-btn-secondary" 
                          onClick={() => setIsEditingProfile(false)}
                        >
                          Cancel
                        </button>
                        <button 
                          className="profile-btn profile-btn-primary" 
                          onClick={handleSaveProfile}
                        >
                          <Check size={18} />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Security & Privacy */}
                <div className="profile-info-card">
                  <div className="profile-card-header">
                    <div className="header-with-icon">
                      <Shield size={20} className="header-icon" />
                      <h3 className="profile-card-title">Security & Privacy</h3>
                    </div>
                  </div>
                  <div className="profile-card-body">
                    <div className="settings-list">
                      <div className="setting-item">
                        <div className="setting-item-left">
                          <div className="setting-icon-wrapper">
                            <Lock size={20} />
                          </div>
                          <div className="setting-item-info">
                            <h4 className="setting-item-title">Password</h4>
                            <p className="setting-item-desc">Last changed 2 months ago</p>
                          </div>
                        </div>
                        <button className="setting-action-btn">
                          Change
                        </button>
                      </div>

                      <div className="setting-item">
                        <div className="setting-item-left">
                          <div className="setting-icon-wrapper">
                            <Bell size={20} />
                          </div>
                          <div className="setting-item-info">
                            <h4 className="setting-item-title">Email Notifications</h4>
                            <p className="setting-item-desc">Manage your notification preferences</p>
                          </div>
                        </div>
                        <button className="setting-action-btn">
                          Manage
                        </button>
                      </div>

                      <div className="setting-item">
                        <div className="setting-item-left">
                          <div className="setting-icon-wrapper">
                            <Shield size={20} />
                          </div>
                          <div className="setting-item-info">
                            <h4 className="setting-item-title">Two-Factor Authentication</h4>
                            <p className="setting-item-desc">Add an extra layer of security</p>
                          </div>
                        </div>
                        <button className="setting-action-btn">
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="profile-info-card">
                  <div className="profile-card-header">
                    <div className="header-with-icon">
                      <Settings size={20} className="header-icon" />
                      <h3 className="profile-card-title">Preferences</h3>
                    </div>
                  </div>
                  <div className="profile-card-body">
                    <div className="settings-list">
                      <div className="setting-item">
                        <div className="setting-item-left">
                          <div className="setting-item-info">
                            <h4 className="setting-item-title">Currency</h4>
                            <p className="setting-item-desc">INR - Indian Rupee (₹)</p>
                          </div>
                        </div>
                        <button className="setting-action-btn">
                          Change
                        </button>
                      </div>

                      <div className="setting-item">
                        <div className="setting-item-left">
                          <div className="setting-item-info">
                            <h4 className="setting-item-title">Language</h4>
                            <p className="setting-item-desc">English (US)</p>
                          </div>
                        </div>
                        <button className="setting-action-btn">
                          Change
                        </button>
                      </div>

                      <div className="setting-item">
                        <div className="setting-item-left">
                          <div className="setting-item-info">
                            <h4 className="setting-item-title">Time Zone</h4>
                            <p className="setting-item-desc">IST (Indian Standard Time)</p>
                          </div>
                        </div>
                        <button className="setting-action-btn">
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const displayedTransactions = showAllTransactions
    ? transactions
    : transactions.slice(0, 5);

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
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}

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
                className={`nav-item ${
                  activeNav === item.id ? "nav-item-active" : ""
                }`}
                onClick={() => handleNavClick(item.id)}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div
              className="user-profile"
              onClick={() => handleNavClick("profile")}
              style={{ cursor: "pointer" }}
            >
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

      <div className="main-content">
        <div className="header">
          <div className="header-content">
            <div className="header-left">
              <button onClick={() => setSidebarOpen(true)} className="menu-btn">
                <Menu size={24} />
              </button>
              <h2 className="page-title">
                {navItems.find((n) => n.id === activeNav)?.label}
              </h2>
            </div>

            <div className="header-right">
              {activeNav === "profile" && (
                <button
                  className={`edit-profile-button ${isEditingProfile ? "editing" : ""}`}
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  title={isEditingProfile ? "Cancel" : "Edit Profile"}
                >
                  <Edit size={18} />
                  <span className="button-text">{isEditingProfile ? "Cancel" : "Edit"}</span>
                </button>
              )}

              <div style={{ position: "relative" }}>
                <button
                  className="notification-button"
                  onClick={handleNotificationClick}
                  title="Notifications"
                >
                  <Bell size={18} />
                  <span className="button-text">Alerts</span>
                  {alerts.filter((a) => !a.read).length > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        backgroundColor: "#ef4444",
                        color: "white",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {alerts.filter((a) => !a.read).length}
                    </span>
                  )}
                </button>

                {showAlerts && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: "0",
                      marginTop: "8px",
                      width: "350px",
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      zIndex: 1000,
                      maxHeight: "400px",
                      overflowY: "auto",
                    }}
                  >
                    <div
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid #e5e7eb",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      Alerts ({alerts.length})
                    </div>
                    {alerts.length === 0 ? (
                      <div
                        style={{
                          padding: "20px",
                          textAlign: "center",
                          color: "#6b7280",
                          fontSize: "14px",
                        }}
                      >
                        No alerts
                      </div>
                    ) : (
                      alerts.map((alert) => (
                        <div
                          key={alert.id}
                          onClick={() => markAlertAsRead(alert.id)}
                          style={{
                            padding: "12px 16px",
                            borderBottom: "1px solid #f3f4f6",
                            cursor: "pointer",
                            backgroundColor: alert.read ? "white" : "#fef2f2",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = alert.read ? "#f9fafb" : "#fee2e2";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = alert.read ? "white" : "#fef2f2";
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              gap: "8px",
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <p
                                style={{
                                  margin: "0 0 4px 0",
                                  fontSize: "13px",
                                  color: "#1f2937",
                                  fontWeight: alert.read ? "400" : "500",
                                }}
                              >
                                {alert.message}
                              </p>
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#9ca3af",
                                }}
                              >
                                {new Date(alert.date).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            {!alert.read && (
                              <div
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  backgroundColor: "#3b82f6",
                                  marginTop: "4px",
                                  flexShrink: 0,
                                }}
                              />
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <button
                className="add-new-button add-income-btn"
                onClick={handleAddIncome}
                title="Add Income"
              >
                <Plus size={18} />
                <span className="button-text">Income</span>
              </button>

              <button
                className="add-new-button add-expense-btn"
                onClick={handleAddExpance}
                title="Add Expense"
              >
                <Plus size={18} />
                <span className="button-text">Expense</span>
              </button>
            </div>
          </div>

          <div className="content-area">
            <div className="page-wrapper">
              {renderMainContent()}
            </div>
            {showExpensePopup && (
              <AddExpenseForm
                onClose={handleCloseExpensePopup}
                onSave={handleSaveExpense}
              />
            )}

            {showIncomePopup && (
              <AddIncomeForm
                onClose={handleCloseIncomePopup}
                onSave={handleSaveIncome}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
