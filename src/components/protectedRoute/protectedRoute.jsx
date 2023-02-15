import React, { children } from "react";
import { Navigate } from "react-router-dom";
import { AuthStore } from "../../store/Auth";

const protectedRoute = ({ children }) => {
  const { user } = AuthStore();
  if (user !== null) {
    return <Navigate to="/" />;
  }
  return children;
};

export default protectedRoute;
