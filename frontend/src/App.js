import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyCode from "./pages/VerifyCode"
import SetPassword from "./pages/SetPassword"
import Dashboard from "./pages/Dashboard"
import AddExpenseForm from "./components/add-Exp"
import AddIncomeForm from "./components/add-Inc"
import ProfilePage from "./components/profile"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/VerifyCode" element={<VerifyCode />} />
          <Route path="/SetPassword" element={<SetPassword />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />


          {/* Protected Routes - User must be logged in */}
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddExpenseForm"
            element={
              <ProtectedRoute>
                <AddExpenseForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddIncomeForm"
            element={
              <ProtectedRoute>
                <AddIncomeForm />
              </ProtectedRoute>
            }
          />

          {/* Catch-all - redirect to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
