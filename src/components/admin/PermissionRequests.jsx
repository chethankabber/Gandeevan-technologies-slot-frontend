import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Check, X, Mail, Calendar, FileText } from "lucide-react";
import { Modal, Button } from "react-bootstrap";

const PermissionRequests = ({ permissionRequests, onApprove, onReject }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (req) => {
    setSelectedRequest(req);
    setShowModal(true);
  };

  const handleApprove = () => {
    onApprove(selectedRequest.id);
    alert(`Request from ${selectedRequest.userName} has been approved.`);
    setShowModal(false);
  };

  const handleReject = () => {
    onReject(selectedRequest.id);
    alert(`Request from ${selectedRequest.userName} has been rejected.`);
    setShowModal(false);
  };

  // When no requests exist
  if (!permissionRequests || permissionRequests.length === 0) {
    return (
      <div
        className="card shadow-sm my-3"
        style={{
          backgroundColor: "hsl(215, 25%, 14%)",
          color: "hsl(210, 40%, 98%)",
          border: "1px solid hsl(215, 20%, 25%)",
        }}
      >
        <div
          className="card-header"
          style={{
            backgroundColor: "hsl(215, 25%, 12%)",
            borderBottom: "1px solid hsl(215, 20%, 25%)",
          }}
        >
          <h5 className="mb-0 text-light">Permission Requests</h5>
        </div>
        <div className="card-body text-center text-secondary py-4">
          No permission requests found.
        </div>
      </div>
    );
  }

  // Requests List
  return (
    <>
      <div
        className="card shadow-sm my-3"
        style={{
          backgroundColor: "hsl(215, 25%, 14%)",
          color: "hsl(210, 40%, 98%)",
          border: "1px solid hsl(215, 20%, 25%)",
        }}
      >
        {/* Header */}
        <div
          className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2"
          style={{
            backgroundColor: "hsl(215, 25%, 12%)",
            borderBottom: "1px solid hsl(215, 20%, 25%)",
          }}
        >
          <h5 className="mb-0">Permission Requests</h5>
          <span
            className="badge"
            style={{
              backgroundColor: "hsl(215, 20%, 20%)",
              color: "hsl(210, 40%, 98%)",
              border: "1px solid hsl(215, 20%, 25%)",
            }}
          >
            {permissionRequests.length} pending
          </span>
        </div>

        {/* Cards */}
        <div className="card-body">
          {permissionRequests.map((req) => (
            <div
              key={req.id}
              className="d-flex justify-content-between align-items-center border rounded p-3 mb-3 shadow-sm"
              style={{
                backgroundColor: "hsl(215, 25%, 12%)",
                borderColor: "hsl(215, 20%, 25%)",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "hsl(215, 25%, 16%)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "hsl(215, 25%, 12%)")
              }
              onClick={() => handleCardClick(req)}
            >
              <div>
                <p className="fw-semibold mb-1 text-light d-flex align-items-center gap-2">
                  <FileText size={16} /> {req.requestType}
                </p>
                <div className="d-flex flex-wrap gap-3 small text-secondary">
                  <span className="d-flex align-items-center gap-1">
                    <Mail size={14} /> {req.userEmail}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <Calendar size={14} /> {req.dateRequested}
                  </span>
                </div>
              </div>
              <div className="text-end small text-muted">Click for details →</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        className="text-light"
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "hsl(215, 25%, 12%)",
            borderBottom: "1px solid hsl(215, 20%, 25%)",
          }}
        >
          <Modal.Title>Permission Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "hsl(215, 25%, 14%)",
            color: "hsl(210, 40%, 98%)",
          }}
        >
          {selectedRequest && (
            <>
              <div className="mb-3">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary"
                  value={selectedRequest.userName}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary"
                  value={selectedRequest.userEmail}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Request Type</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary"
                  value={selectedRequest.requestType}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  rows={3}
                  className="form-control bg-dark text-light border-secondary"
                  value={selectedRequest.message}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Date Requested</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary"
                  value={selectedRequest.dateRequested}
                  disabled
                />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "hsl(215, 25%, 12%)",
            borderTop: "1px solid hsl(215, 20%, 25%)",
          }}
        >
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            className="px-3"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleReject}
            className="px-3"
          >
            <X size={16} className="me-1" /> Reject
          </Button>
          <Button
            variant="primary"
            onClick={handleApprove}
            className="px-3"
          >
            <Check size={16} className="me-1" /> Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PermissionRequests;
