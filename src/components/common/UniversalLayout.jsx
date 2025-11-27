// src/components/common/UniversalLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { mockAdmin, mockManager, mockUser } from "../../data/Mockdata";

const UniversalLayout = ({ role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getUserData = () => {
    if (role === "admin") return mockAdmin;
    if (role === "manager") return mockManager; 
    if (role === "user")  return mockUser;
    return null;
  };

  return (
    <div
      className="d-flex position-relative"
      style={{
        minHeight: "100vh",
        backgroundColor: "hsl(215, 30%, 10%)",
        color: "hsl(210, 40%, 98%)",
        overflow: "hidden",
      }}
    >
      <Sidebar role={role} isOpen={sidebarOpen} onClose={toggleSidebar} />

      <div
        className="d-flex flex-column flex-grow-1"
        style={{
          transition: "margin-left 0.3s ease",
          marginLeft: isMobile ? 0 : sidebarOpen ? "240px" : "70px",
          width: "100%",
        }}
      >
        <Navbar role={role} data={getUserData()} onMenuClick={toggleSidebar} isMobile={isMobile} />

        <main
          className="flex-grow-1 p-4"
          style={{
            backgroundColor: "hsl(215, 25%, 14%)",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UniversalLayout;
