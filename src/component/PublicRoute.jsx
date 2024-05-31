import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const store = useSelector((store) => store.userLogged);
  const { loginSuccess, verification } = store;

  return loginSuccess && verification ? <Navigate to={"/"} /> : <Outlet />;
};
