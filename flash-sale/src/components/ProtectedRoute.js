import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getTokenFromLocalStorage } from "../utils/HelperFunctions";

const ProtectedRoute = () => {
  const token = getTokenFromLocalStorage();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
