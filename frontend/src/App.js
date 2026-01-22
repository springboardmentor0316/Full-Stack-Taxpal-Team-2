import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyCode from "./pages/VerifyCode"
import SetPassword from "./pages/SetPassword"
import Dashboard from "./pages/Dashboard"
import AddExpenseForm from "./components/add-Exp"
import AddIncomeForm from "./components/add-Inc"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/VerifyCode" element={<VerifyCode />} />
          <Route path="/SetPassword" element={<SetPassword />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AddExpenseForm" element={<AddExpenseForm />} />
          <Route path="/AddIncomeForm" element={<AddIncomeForm />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
