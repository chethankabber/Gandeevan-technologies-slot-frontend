import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Clock } from "lucide-react";
import { format } from "date-fns";

const RecentActivity = ({ containers }) => {
  // ✅ Extract and sort recent items
  const recentItems = containers
    .flatMap((container) =>
      container.slots
        .filter((slot) => slot.item && slot.item.takenDate)
        .map((slot) => ({
          ...slot.item,
          containerName: container.name,
          slotNumber: slot.slotNumber,
        }))
    )
    .sort(
      (a, b) =>
        new Date(b.takenDate).getTime() - new Date(a.takenDate).getTime()
    )
    .slice(0, 5);

  return (
    <div
      className="card shadow-sm border-0 my-3"
      style={{
        backgroundColor: "hsl(215, 25%, 14%)",
        color: "hsl(210, 40%, 98%)",
        border: "1px solid hsl(215, 20%, 25%)",
      }}
    >
      {/* Header */}
      <div
        className="card-header d-flex align-items-center gap-2"
        style={{
          backgroundColor: "hsl(215, 25%, 12%)",
          color: "hsl(210, 40%, 98%)",
          borderBottom: "1px solid hsl(215, 20%, 25%)",
        }}
      >
        <Clock className="text-primary" size={18} />
        <h5 className="mb-0">Recent Activity</h5>
      </div>

      {/* Content */}
      <div className="card-body">
        {recentItems.length === 0 ? (
          <p className="text-center text-secondary py-4 mb-0">
            No recent activity
          </p>
        ) : (
          recentItems.map((item, idx) => (
            <div
              key={idx}
              className="d-flex justify-content-between align-items-center p-3 mb-2 border rounded shadow-sm"
              style={{
                backgroundColor: "hsl(215, 25%, 12%)",
                borderColor: "hsl(215, 20%, 25%)",
                transition: "background-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(215, 25%, 16%)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(215, 25%, 12%)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Left Info */}
              <div>
                <p className="fw-semibold mb-1 small text-light">
                  {item.name}
                </p>
                <p className="text-secondary small mb-0">
                  {item.containerName} - Slot {item.slotNumber}
                </p>
              </div>

              {/* Right Info */}
              <div className="text-end">
                <span
                  className={`badge ${
                    item.status === "non-returnable"
                      ? "bg-danger"
                      : "bg-primary"
                  }`}
                >
                  {item.status === "non-returnable"
                    ? "Non-Returnable"
                    : "Borrowed"}
                </span>
                <p className="text-secondary small mb-0 mt-1">
                  {item.takenBy}
                </p>
                <p className="text-secondary small mb-0">
                  {format(new Date(item.takenDate), "MMM dd, HH:mm")}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
