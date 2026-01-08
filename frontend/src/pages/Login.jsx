import React from "react";
import "../styles/Login.css";
import img1 from "../assets/img1.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-wrapper">
      {/* LEFT IMAGE SECTION */}
      <div className="left-image-section">
        <img src={img1} alt="Taxpal" />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="right-form-section">
        <div className="form-container">
          <h1 className="brand-title">TaxPal</h1>
          <p className="subtitle">Sign in your TaxPal account</p>

          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Enter a username" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button className="submit-btn">Login now</button>

          <p className="forgot">
            <Link to="/ForgotPassword">Forgot password?</Link>
          </p>

          <p className="signup">
            Don’t have an account?{" "}
            <Link to="/register">
              <span>Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
