import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import Containers from "./pages/Containers";
import ContainerDetail from "./pages/ContainerDetail";
import History from "./pages/History";
import AllUsers from "./pages/AllUsers";
import NotFound from "./pages/NotFound";
import Login from "./auth/Login";
import Register from "./auth/Register";



function App() {
  return (
    <BrowserRouter>
  <Routes>
    {/* Redirect "/" and "/home" to login */}
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/home" element={<Navigate to="/login" replace />} />

    {/* Auth Routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Admin Routes */}
    <Route path="/admin" element={<AdminDashboard />}>
      <Route index element={<Dashboard />} />
      <Route path="racks" element={<Containers />} />
      <Route path="container/:id" element={<ContainerDetail />} />
      <Route path="history" element={<History />} />
      <Route path="users" element={<AllUsers />} />
    </Route>

    {/* 404 Page */}
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

  );
}

export default App;
