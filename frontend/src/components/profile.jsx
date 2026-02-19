import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../api/authApi";
import * as budgetApi from "../api/budgetApi";
import * as transactionApi from "../api/transactionApi";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  ArrowLeft,
  Shield,
  Bell,
  Lock,
} from "lucide-react";
import "./comstyles/profile.css";

export default function ProfilePage() {
  const { token, user: contextUser } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });
  const [stats, setStats] = useState({
    budgets: 0,
    transactions: 0,
    reports: 0,
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      // Fetch fresh profile data from backend
      const fetchProfileData = async () => {
        try {
          const response = await authApi.getProfile(token);
          console.log("[v0] Profile data fetched:", response);
          // Extract user data from response - the backend returns { message, user: {...} }
          const userData = response.user || response;
          setUser(userData);
          setProfileData({
            fullName: userData?.fullName || "",
            username: userData?.username || "",
            email: userData?.email || "",
            phone: userData?.phone || "",
            location: userData?.location || "",
            bio: userData?.bio || "",
          });
          // Set joined date based on createdAt
          if (userData?.createdAt) {
            const joinDate = new Date(userData.createdAt);
            console.log("[v0] User joined date:", joinDate.toLocaleDateString("en-US", { year: "numeric", month: "long" }));
          }

          // Fetch statistics
          try {
            const budgetsResponse = await budgetApi.getBudgets(token);
            // Handle both array and object response formats
            let budgetsList = [];
            if (Array.isArray(budgetsResponse)) {
              budgetsList = budgetsResponse;
            } else if (budgetsResponse?.data && Array.isArray(budgetsResponse.data)) {
              budgetsList = budgetsResponse.data;
            } else if (budgetsResponse && typeof budgetsResponse === "object") {
              budgetsList = Array.isArray(budgetsResponse) ? budgetsResponse : [];
            }
            console.log("[v0] Budgets fetched:", budgetsList);

            const transactionsResponse = await transactionApi.getTransactions(token);
            // Handle both array and object response formats
            let transactionsList = [];
            if (Array.isArray(transactionsResponse)) {
              transactionsList = transactionsResponse;
            } else if (transactionsResponse?.data && Array.isArray(transactionsResponse.data)) {
              transactionsList = transactionsResponse.data;
            } else if (transactionsResponse && typeof transactionsResponse === "object") {
              transactionsList = Array.isArray(transactionsResponse) ? transactionsResponse : [];
            }
            console.log("[v0] Transactions fetched:", transactionsList);

            setStats({
              budgets: budgetsList.length || 0,
              transactions: transactionsList.length || 0,
              reports: 0, // Reports would be calculated separately if needed
            });
          } catch (statsError) {
            console.log("[v0] Note: Could not fetch statistics -", statsError.message);
            setStats({
              budgets: 0,
              transactions: 0,
              reports: 0,
            });
          }
        } catch (error) {
          console.error("[v0] Error fetching profile:", error);
          // Fallback to context data if fetch fails
          setUser(contextUser);
          setProfileData({
            fullName: contextUser?.fullName || "",
            username: contextUser?.username || "",
            email: contextUser?.email || "",
            phone: contextUser?.phone || "",
            location: contextUser?.location || "",
            bio: contextUser?.bio || "",
          });
        }
      };
      fetchProfileData();
    }
  }, [token, contextUser, navigate]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      // Don't send email field for updates as it should not be changed
      const updateData = {
        fullName: profileData.fullName,
        username: profileData.username,
        phone: profileData.phone,
        location: profileData.location,
        bio: profileData.bio,
      };
      console.log("[v0] Saving profile:", updateData);
      const response = await authApi.updateProfile(token, updateData);
      console.log("[v0] Profile saved successfully:", response);
      // Extract user data from response - the backend returns { message, user: {...} }
      const userData = response.user || response;
      setUser(userData);
      setProfileData({
        fullName: userData?.fullName || "",
        username: userData?.username || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        location: userData?.location || "",
        bio: userData?.bio || "",
      });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("[v0] Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    }
  };

  const handlePhotoUpload = () => {
    console.log("Photo upload clicked");
    // 🔜 Implement photo upload
  };

  // Helper function to format join date
  const getFormattedJoinDate = () => {
    if (user?.createdAt) {
      const joinDate = new Date(user.createdAt);
      return joinDate.toLocaleDateString("en-US", { year: "numeric", month: "long" });
    }
    return "January 2026";
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="profile-page-title">My Profile</h1>
        <button
          className={`edit-button ${isEditing ? "editing" : ""}`}
          onClick={handleEditToggle}
        >
          <Edit size={18} />
          <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Left Column - Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-large">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
              </div>
              <button className="avatar-upload-btn" onClick={handlePhotoUpload}>
                <Camera size={16} />
              </button>
            </div>
            <h2 className="profile-name">{user.fullName || "User"}</h2>
            <p className="profile-username">@{user.username}</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{stats.budgets}</span>
                <span className="stat-label">Budgets</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">{stats.transactions}</span>
                <span className="stat-label">Transactions</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">{stats.reports}</span>
                <span className="stat-label">Reports</span>
              </div>
            </div>
          </div>

          <div className="profile-bio-section">
            <h3 className="bio-title">About</h3>
            {isEditing ? (
              <textarea
                name="bio"
                className="bio-textarea"
                value={profileData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows="4"
              />
            ) : (
              <p className="bio-text">
                {profileData.bio || "No bio added yet. Click edit to add one."}
              </p>
            )}
          </div>

          <div className="profile-joined">
            <Calendar size={16} />
            <span>Joined {getFormattedJoinDate()}</span>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="profile-details">
          {/* Personal Information */}
          <div className="details-card">
            <div className="details-header">
              <User size={20} />
              <h3>Personal Information</h3>
            </div>
            <div className="details-content">
              <div className="detail-group">
                <label className="detail-label">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    className="detail-input"
                    value={profileData.fullName}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="detail-value">{profileData.fullName || "Not set"}</p>
                )}
              </div>

              <div className="detail-group">
                <label className="detail-label">Username</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    className="detail-input"
                    value={profileData.username}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="detail-value">@{profileData.username}</p>
                )}
              </div>

              <div className="detail-group">
                <label className="detail-label">
                  <Mail size={16} />
                  Email Address
                </label>
                <p className="detail-value">{profileData.email || "Not set"}</p>
                <p style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>Email cannot be changed for security reasons</p>
              </div>

              <div className="detail-group">
                <label className="detail-label">
                  <Phone size={16} />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    className="detail-input"
                    value={profileData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                ) : (
                  <p className="detail-value">{profileData.phone || "Not set"}</p>
                )}
              </div>

              <div className="detail-group">
                <label className="detail-label">
                  <MapPin size={16} />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    className="detail-input"
                    value={profileData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                ) : (
                  <p className="detail-value">{profileData.location || "Not set"}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="details-actions">
                <button className="btn-cancel" onClick={handleEditToggle}>
                  Cancel
                </button>
                <button className="btn-save" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Security Settings */}
          <div className="details-card">
            <div className="details-header">
              <Shield size={20} />
              <h3>Security & Privacy</h3>
            </div>
            <div className="details-content">
              <div className="security-item">
                <div className="security-info">
                  <Lock size={18} />
                  <div>
                    <h4>Password</h4>
                    <p>Last changed 2 months ago</p>
                  </div>
                </div>
                <button className="security-btn">Change</button>
              </div>

              <div className="security-item">
                <div className="security-info">
                  <Bell size={18} />
                  <div>
                    <h4>Email Notifications</h4>
                    <p>Manage your notification preferences</p>
                  </div>
                </div>
                <button className="security-btn">Manage</button>
              </div>

              <div className="security-item">
                <div className="security-info">
                  <Shield size={18} />
                  <div>
                    <h4>Two-Factor Authentication</h4>
                    <p>Add an extra layer of security</p>
                  </div>
                </div>
                <button className="security-btn">Enable</button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="details-card">
            <div className="details-header">
              <User size={20} />
              <h3>Preferences</h3>
            </div>
            <div className="details-content">
              <div className="preference-item">
                <div className="preference-info">
                  <h4>Currency</h4>
                  <p>USD - United States Dollar</p>
                </div>
                <button className="security-btn">Change</button>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <h4>Language</h4>
                  <p>English (US)</p>
                </div>
                <button className="security-btn">Change</button>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <h4>Time Zone</h4>
                  <p>UTC-5 (Eastern Time)</p>
                </div>
                <button className="security-btn">Change</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
