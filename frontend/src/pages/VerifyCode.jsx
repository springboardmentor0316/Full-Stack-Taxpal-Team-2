import React from "react";
import "../styles/VerifyCode.css";
import img1 from "../assets/img1.png";
import { Link } from "react-router-dom";

const VerifyCode = () => {
  return (
    <div className="login-wrapper">
      {/* LEFT IMAGE SECTION */}
      <div className="left-image-section">
        <img src={img1} alt="TaxPal" />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="right-form-section">
        <div className="form-container">
          <div className="icon-box">
            <span>✉️</span>
          </div>

          <h1 className="brand-title">Verify Code</h1>

          <p className="subtitle">
            An authentication code has been sent to your email
          </p>

          <div className="form-group">
            <label>Enter the code</label>
            <input type="text" placeholder="eg:778bmc327" />
          </div>

          <p className="resend-text">
            Didn't receive a code? <span>Resend</span>
          </p>

          <button className="submit-btn">Verify</button>

          <p className="forgot">
            Back to{" "}
            <Link to="/">
              <span>Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;