import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContainerSummaryCard = ({ container }) => {
  const navigate = useNavigate();

  const occupiedSlots = container.slots.filter((s) => s.item !== null).length;
  const totalSlots = container.slots.length;
  const availableSlots = totalSlots - occupiedSlots;
  const occupancyRate = Math.round((occupiedSlots / totalSlots) * 100);

  return (
    <div
      className="card shadow-sm bg-secondary border-0 mb-3" 
      
      onClick={() => navigate(`/admin/container/${container.id}`)}
      style={{
        cursor: "pointer",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)")}
    >
      {/* Header */}
      <div className="card-header bg-dark d-flex align-items-center gap-2">
        <Package size={18} className="text-primary" />
        <h6 className="mb-0 fw-bold text-white">{container.name}</h6>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted small">Occupied</span>
          <span className="fw-semibold text-primary">
            {occupiedSlots}/{totalSlots}
          </span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted small">Available</span>
          <span className="fw-semibold text-success">{availableSlots}</span>
        </div>

        {/* Progress Bar */}
        <div className="progress mb-2" style={{ height: "6px" }}>
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: `${occupancyRate}%` }}
            aria-valuenow={occupancyRate}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <p className="text-center text-muted small mb-0">
          {occupancyRate}% Capacity
        </p>
      </div>
    </div>
  );
};

export default ContainerSummaryCard;
