const express = require("express");
const authController = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const { validateRegister, validateLogin, validateEmail } = require("../middleware/validation");

const router = express.Router();

// Public routes
router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.post("/forgot-password", validateEmail, authController.forgotPassword);
router.post("/resend-code", validateEmail, authController.resendCode);
router.post("/verify-token", authController.verifyResetToken);
router.post("/set-password", authController.setPassword);

// Protected routes
router.get("/profile", protect, authController.getProfile);
router.put("/profile", protect, authController.updateProfile);

module.exports = router; 
