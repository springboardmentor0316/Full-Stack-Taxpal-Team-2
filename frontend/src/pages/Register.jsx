import React, { useState } from "react";
import "../styles/Register.css";
import img1 from "../assets/img1.png";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // 1️⃣ State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // 2️⃣ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3️⃣ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, username, password, confirmPassword } = formData;

    // Basic validation
    if (!name || !email || !username || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert("Registration successful");
      navigate("/"); // go to login
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="left-image-section">
        <img src={img1} alt="Taxpal" />
      </div>

      <div className="right-form-section">
        <div className="form-container">
          <h2>Create an account</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter a username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Create Account
          </button>

          <p className="login-link">
            Already Have An Account?{" "}
            <Link to="/">
              <span>Log in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
