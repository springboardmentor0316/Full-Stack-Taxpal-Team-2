import React from "react";
import "../styles/SetPassword.css";
import img1 from "../assets/img1.png";
import { Link } from "react-router-dom";

const SetPassword = () => {
  return (
    <div className="login-wrapper">
      {/* LEFT IMAGE SECTION */}
      <div className="left-image-section">
        <img src={img1} alt="TaxPal" />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="right-form-section">
        <div className="form-container">
          <h1 className="brand-title">Set a Password</h1>
          <p className="subtitle">
            Your previous password has been reset. Please set a new password for your account.
          </p>

          <div className="form-group">
            <label>Create Password</label>
            <input type="password" placeholder="Enter new password" />
          </div>

          <div className="form-group">
            <label>Re-enter the password</label>
            <input type="password" placeholder="Re-enter password" />
          </div>

          <button className="submit-btn">Set Password</button>

          <p className="forgot">
            <Link to="/">
              <span>Back to Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;