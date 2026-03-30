import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">

      {/* Sidebar */}
      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="ml-64 w-full">

        <Navbar />

        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>

      </div>

    </div>
  );
};

export default MainLayout;