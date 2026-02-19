'use client';

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, token } = useAuth();

  console.log("[v0] ProtectedRoute check - isAuthenticated:", isAuthenticated);

  if (!isAuthenticated || !token) {
    console.log("[v0] User not authenticated, redirecting to login");
    return <Navigate to="/" replace />;
  }

  return children;
}
