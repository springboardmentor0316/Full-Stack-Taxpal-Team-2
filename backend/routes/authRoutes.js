const express = require("express")
const authController = require("../controllers/authController")
const { validateRegister, validateLogin, validateEmail } = require("../middleware/validation")

const router = express.Router()

router.post("/register", validateRegister, authController.register)
router.post("/login", validateLogin, authController.login)
router.post("/forgot-password", validateEmail, authController.forgotPassword)
router.post("/resend-code", validateEmail, authController.resendCode)
router.post("/verify-token", authController.verifyResetToken)
router.post("/set-password", authController.setPassword)

module.exports = router
