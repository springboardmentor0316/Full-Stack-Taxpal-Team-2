import React from "react";
import "../styles/VerifyCode.css";
import img1 from "../assets/img1.png";
import { Link } from "react-router-dom";

const VerifyCode = () => {
  return (
    <div className="verify-wrapper">
      {/* LEFT IMAGE */}
      <div className="verify-left">
        <img src={img1} alt="Verify Background" />
      </div>

      {/* RIGHT CONTENT */}
      <div className="verify-right">
        <div className="verify-card">
          <div className="icon-box">
            <span>✉️</span>
          </div>

          <h2>verify code</h2>

          <p className="description">
            An authentication code has been sent to your email
          </p>

          <div className="form-group">
            <label>Enter the code</label>
            <input type="text" placeholder="eg:778bmc327" />
          </div>

          <p className="resend-text">
            Didn’t receive a code? <span>Resend</span>
          </p>

          <button className="verify-btn">Verify</button>

          <p className="back-link">
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
