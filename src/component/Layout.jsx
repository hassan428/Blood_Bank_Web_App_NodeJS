import React from "react";
import { useSelector } from "react-redux";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const { theme } = useSelector(({ theme }) => theme);
  // console.log(theme)
  const bgColor =
    theme == "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-black";

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <Navbar />
      <Outlet />
    </div>
  );
};
