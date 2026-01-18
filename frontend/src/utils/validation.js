export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validateUsername = (username) => {
  return username.length >= 3 && /^[a-zA-Z0-9_-]+$/.test(username)
}

export const validateForm = (formData, formType) => {
  const errors = {}

  if (formType === "register") {
    if (!formData.fullName?.trim()) {
      errors.fullName = "Full name is required"
    }
    if (!formData.email?.trim()) {
      errors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format"
    }
    if (!formData.username?.trim()) {
      errors.username = "Username is required"
    } else if (!validateUsername(formData.username)) {
      errors.username = "Username must be at least 3 characters with letters, numbers, dash, or underscore"
    }
    if (!formData.password) {
      errors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      errors.password = "Password must be at least 6 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }
  }

  if (formType === "login") {
    if (!formData.username?.trim()) {
      errors.username = "Username is required"
    }
    if (!formData.password) {
      errors.password = "Password is required"
    }
  }

  if (formType === "setPassword") {
    if (!formData.password) {
      errors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      errors.password = "Password must be at least 6 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }
  }

  return errors
}
