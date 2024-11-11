import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
