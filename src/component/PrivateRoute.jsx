import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = () => {
  const { loginSuccess, verification } = useSelector(
    ({ userLogged }) => userLogged
  );
  return loginSuccess && verification ? <Outlet /> : <Navigate to={"/login"} />;
};
