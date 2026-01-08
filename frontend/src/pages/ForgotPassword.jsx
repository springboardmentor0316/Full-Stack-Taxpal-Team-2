import React from "react";
import "../styles/ForgotPassword.css";
import img1 from "../assets/img1.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="forgot-wrapper">
      {/* LEFT IMAGE SECTION */}
      <div className="left-image-section">
        <img src={img1} alt="Taxpal" />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="right-form-section">
        <div className="form-container">
          <div className="icon-box">✉️</div>

          <h2>Forgot Password</h2>

          <p className="description">
            Enter your email address and we'll send you verification code to
            reset your password
          </p>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <button className="submit-btn">Send Verification Code</button>

          <p className="back-link">
            Back to {" "}
            <Link to="/">
              <span>Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
