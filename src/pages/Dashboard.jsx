import React, { useState } from "react";
import UserApproval from "../components/admin/UserApproval";
import PermissionRequests from "../components/admin/PermissionRequests";
import ContainerSummaryCard from "../components/admin/ContainerSummaryCard";
import RecentActivity from "../components/admin/RecentActivity";
import {mockContainers, mockPendingUsers, mockPermissionRequests,} from "../data/Mockdata";

const Dashboard = () => {
  const [pendingUsers, setPendingUsers] = useState(mockPendingUsers);
  const [permissionRequests, setPermissionRequests] = useState(mockPermissionRequests);

  // Handlers for user approval
  const handleUserApprove = (userId) => {
    setPendingUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleUserReject = (userId) => {
    setPendingUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  // Handlers for permission requests
  const handlePermissionApprove = (reqId) => {
    setPermissionRequests((prev) => prev.filter((r) => r.id !== reqId));
  };

  const handlePermissionReject = (reqId) => {
    setPermissionRequests((prev) => prev.filter((r) => r.id !== reqId));
  };

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Dashboard</h2>
        <p className="text-muted"> Overview of your container management system</p>
      </div>

      {/*  User Approval Section */}
      {pendingUsers.length > 0 && (
        <div className="mb-4">
          <UserApproval pendingUsers={pendingUsers} onApprove={handleUserApprove} onReject={handleUserReject}/>
        </div>
      )}

      {/* Permission Requests Section */}
      {permissionRequests.length > 0 && (
        <div className="mb-4">
          <PermissionRequests
            permissionRequests={permissionRequests}
            onApprove={handlePermissionApprove}
            onReject={handlePermissionReject}
          />
        </div>
      )}

      {/* Container Summary Cards */}
      <div className="row g-4 mb-4">
        {mockContainers.map((container) => (
          <div key={container.id} className="col-12 col-sm-6 col-lg-4">
            <ContainerSummaryCard container={container} />
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <RecentActivity containers={mockContainers} />
    </div>
  );
};

export default Dashboard;
