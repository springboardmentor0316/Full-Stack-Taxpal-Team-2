export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
