import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, Calendar, User } from "lucide-react";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Example history data
  const historyData = [
    {
      id: 1,
      action: "New User Added",
      details: "Alice was added as a new user.",
      user: "Admin",
      date: "2025-01-10",
    },
    {
      id: 2,
      action: "Item Taken",
      details: "Hammer taken by Bob.",
      user: "Bob",
      date: "2025-01-11",
    },
    {
      id: 3,
      action: "Item Added",
      details: "Wrench added to Container A.",
      user: "Admin",
      date: "2025-01-12",
    },
    {
      id: 4,
      action: "Item Returned",
      details: "Bob returned the Hammer.",
      user: "Bob",
      date: "2025-01-13",
    },
    {
      id: 5,
      action: "Item Taken",
      details: "Charlie took Screwdriver.",
      user: "Charlie",
      date: "2025-01-14",
    },
    {
      id: 6,
      action: "New User Added",
      details: "David was added as a new user.",
      user: "Admin",
      date: "2025-01-15",
    },
  ];

  // ✅ Filter logic (by search term and filter type)
  const filteredHistory = historyData.filter((item) => {
    const matchesSearch =
      item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" || item.action.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesType;
  });

  return (
    <div className="container my-4">
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">History</h2>
        <p className="text-muted">View all recent activities and actions</p>
      </div>

      {/* Search + Filter Bar */}
      <div className="card mb-4 p-3"
        style={{
          background:
            "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
          color: "hsl(210, 40%, 98%)",
          border: "1px solid hsl(215, 20%, 25%)",
        }}
      >
        <div className="row g-3 align-items-center">
          <div className="col-md-6 d-flex align-items-center">
            <Search size={18} className="text-muted me-2" />
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Actions</option>
              <option value="new user added">New User Added</option>
              <option value="item taken">Item Taken</option>
              <option value="item added">Item Added</option>
              <option value="item returned">Item Returned</option>
            </select>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="d-flex flex-column gap-3">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="card p-3 shadow-sm"
              style={{
                background:
                  "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
                color: "hsl(210, 40%, 98%)",
                border: "1px solid hsl(215, 20%, 25%)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold mb-1">{item.action}</h6>
                  <p className="text-muted small mb-1">{item.details}</p>
                  <div className="d-flex align-items-center text-muted small gap-2">
                    <User size={14} />
                    <span>{item.user}</span>
                    <Calendar size={14} className="ms-3" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-4">No records found.</div>
        )}
      </div>
    </div>
  );
};

export default History;
