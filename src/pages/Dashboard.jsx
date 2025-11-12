import React, { useState } from "react";
import UserApproval from "../components/admin/UserApproval";
import ContainerSummaryCard from "../components/admin/ContainerSummaryCard";
import RecentActivity from "../components/admin/RecentActivity";
import { mockContainers, mockPendingUsers } from "../data/Mockdata";


const Dashboard = () => {
  const [pendingUsers, setPendingUsers] = useState(mockPendingUsers);
  const [searchResult, setSearchResult] = useState("");

  const handleApprove = (userId) => {
    setPendingUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleReject = (userId) => {
    setPendingUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Dashboard</h2>
        <p className="text-muted">
          Overview of your container management system
        </p>
      </div>

      {/* Search Section */}
      

      {/* User Approval */}
      {pendingUsers.length > 0 && (
        <div className="mb-4">
          <UserApproval
            pendingUsers={pendingUsers}
            onApprove={handleApprove}
            onReject={handleReject}
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
