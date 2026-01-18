const validateRegister = (req, res, next) => {
  const { fullName, username, email, password, confirmPassword } = req.body

  if (!fullName || !username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" })
  }

  next()
}

const validateLogin = (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" })
  }

  next()
}

const validateEmail = (req, res, next) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: "Email is required" })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" })
  }

  next()
}

module.exports = {
  validateRegister,
  validateLogin,
  validateEmail,
}
