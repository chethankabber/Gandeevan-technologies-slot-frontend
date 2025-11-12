import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Package, Calendar, User } from "lucide-react";

const SlotCard = ({ slot, containerName }) => {
  const { slotNumber, item } = slot;

  // ✅ Badge rendering logic
  const getStatusBadge = () => {
    if (!item) {
      return <span className="badge bg-secondary">Empty</span>;
    }
    if (!item.isReturnable) {
      return <span className="badge bg-warning text-dark">Non-Returnable</span>;
    }
    return <span className="badge bg-success">Occupied</span>;
  };

  return (
    
    <div
      className={`card p-3 mb-3 border-1 shadow-sm ${
        !item ? "opacity-75" : ""
      }`}
      style={{
        cursor: "pointer",
        transition: "0.3s",
        borderColor: !item ? "#ccc" : "#0d6efd50",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)")}
    >
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-start mb-3" >
        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded bg-light d-flex justify-content-center align-items-center"
            style={{ width: "40px", height: "40px" }}
          >
            <Package size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-muted small mb-0">Slot {slotNumber}</p>
            {containerName && (
              <p className="fw-semibold mb-0">{containerName}</p>
            )}
          </div>
        </div>
        {getStatusBadge()}
      </div>

      {/* Body Section */}
      {item ? (
        <div >
          <p className="fw-semibold mb-1">{item.name}</p>

          {item.takenBy && (
            <div className="d-flex align-items-center gap-2 text-muted small">
              <User size={14} />
              <span>{item.takenBy}</span>
            </div>
          )}

          {item.returnDate && (
            <div className="d-flex align-items-center gap-2 text-muted small mt-1">
              <Calendar size={14} />
              <span>Return: {item.returnDate}</span>
            </div>
          )}

          {!item.isReturnable && (
            <p className="text-warning small mt-2 mb-0">
              This item is not returnable
            </p>
          )}
        </div>
      ) : (
        <p className="text-muted small mb-0">Available slot</p>
      )}
    </div>
  );
};

export default SlotCard;
