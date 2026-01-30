import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id; // must match backend token payload
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

export default getUserIdFromToken;
