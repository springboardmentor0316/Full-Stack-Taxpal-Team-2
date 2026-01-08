import React from "react";
import "../styles/Register.css";
import img1 from "../assets/img1.png";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register-wrapper">
      <div className="left-image-section">
        <img src={img1} alt="Taxpal" />
      </div>

      <div className="right-form-section">
        <div className="form-container">
          <h2>Create an account</h2>

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Enter a username" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Re-enter your password" />
          </div>

          <div className="form-group">
            <label>Country</label>
            <select>
              <option>Select your country</option>
            </select>
          </div>

          <div className="form-group">
            <label>Income Bracket (Optional)</label>
            <select>
              <option>Select your income bracket</option>
            </select>
          </div>

          <button className="submit-btn">Create Account</button>

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
