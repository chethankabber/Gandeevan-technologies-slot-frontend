import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { User, Mail, Shield, Calendar, Trash2 } from "lucide-react";

const AllUsers = () => {
  // ✅ Example user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      role: "Manager",
      joinDate: "2025-01-10",
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      role: "User",
      joinDate: "2025-01-11",
    },
    {
      id: 3,
      name: "Charlie",
      email: "charlie@example.com",
      role: "User",
      joinDate: "2025-01-12",
    },
    {
      id: 4,
      name: "David",
      email: "david@example.com",
      role: "Manager",
      joinDate: "2025-01-13",
    },
    {
      id: 5,
      name: "Eve",
      email: "eve@example.com",
      role: "User",
      joinDate: "2025-01-14",
    },
  ]);

  // Example: assume current user is admin
  const currentUserRole = "Admin";

  //  Remove user function
  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="container my-4">
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">All Users</h2>
        <p className="text-muted">
          View all registered users and manage access permissions
        </p>
      </div>

      {/* User List */}
      <div className="d-flex flex-column gap-3">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="card p-3 shadow-sm"
              style={{
                background:
                  "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
                color: "hsl(210, 40%, 98%)",
                border: "1px solid hsl(215, 20%, 25%)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                {/* User Info */}
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "45px",
                      height: "45px",
                      backgroundColor: "hsl(215, 25%, 15%)",
                    }}
                  >
                    <User size={20} className="text-primary" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">{user.name}</h6>
                    <div className="text-muted small d-flex align-items-center gap-2">
                      <Mail size={14} />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>

                {/* Role and Join Info */}
                <div className="text-end mt-2 mt-md-0">
                  <div className="d-flex align-items-center justify-content-end gap-2 mb-1">
                    <Shield size={14} />
                    <span className="small">{user.role}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-end gap-2 text-muted small">
                    <Calendar size={14} />
                    <span>Joined: {user.joinDate}</span>
                  </div>
                </div>

                {/* Remove Button (Admin only) */}
                {currentUserRole === "Admin" && (
                  <button
                    className="btn btn-danger btn-sm mt-2 mt-md-0"
                    onClick={() => handleRemove(user.id)}
                  >
                    <Trash2 size={14} className="me-1" />
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-4">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
