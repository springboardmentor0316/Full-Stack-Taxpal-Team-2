import React, { useState } from "react";
import "../styles/Login.css";
import img1 from "../assets/img1.png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { emailOrUsername, password } = formData;

    if (!emailOrUsername || !password) {
      setError("All fields are required");
      return;
    }

    // 🔥 IMPORTANT FIX HERE
    const payload = {
      password,
    };

    // detect email or username
    if (emailOrUsername.includes("@")) {
      payload.email = emailOrUsername;
    } else {
      payload.username = emailOrUsername;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="left-image-section">
        <img src={img1} alt="Taxpal" />
      </div>

      <div className="right-form-section">
        <div className="form-container">
          <h2>Login</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="form-group">
            <label>Email or Username</label>
            <input
              type="text"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              placeholder="Enter email or username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Login
          </button>

          <p className="register-link">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
