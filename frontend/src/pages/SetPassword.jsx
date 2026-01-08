import React from "react";
import "../styles/SetPassword.css";
import img1 from "../assets/img1.png";
import { Link } from "react-router-dom";


const SetPassword = () => {
  return (
    <div className="set-wrapper">

      {/* LEFT IMAGE */}
      <div className="set-left">
        <img src={img1} alt="Set Password Background" />
      </div>

      {/* RIGHT FORM */}
      <div className="set-right">
        <div className="set-card">

          <h2>Set a Password</h2>

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

          <button className="set-btn">Set Password</button>

          <p className="back-link">
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
