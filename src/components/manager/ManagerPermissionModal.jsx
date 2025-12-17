import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../api/axios";
import NotificationToast from "../common/NotificationToast";

const ManagerPermissionModal = ({ show, onClose, request, onGiven }) => {
  const [rackId, setRackId] = useState("");
  const [slotId, setSlotId] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  if (!request) return null;

  // Format return date nicely if returnable
  const formattedReturnDate =
    request.isReturnable && request.returnDate
      ? new Date(request.returnDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : null;

  const handleGiveItem = async () => {
    if (!rackId || !slotId) {
      setToast({
        show: true,
        message: "Rack ID & Slot ID required!",
        bg: "danger",
      });
      return;
    }

    try {
      await api.post(`/manager/giveItem/${request._id}`, {
          rackName: rackId.trim(),
          slotNumber: Number(slotId.trim())
      });

      setToast({
        show: true,
        message: "Item successfully given!",
        bg: "success",
      });

      setTimeout(() => {
        onGiven();
        onClose();
      }, 1000);
    } catch (err) {
      console.error(err);
      setToast({
        show: true,
        message: "Failed to issue item!",
        bg: "danger",
      });
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header
        closeButton
        className="text-white"
        style={{ background: "hsl(215,25%,10%)" }}
      >
        <Modal.Title>Give Item To User</Modal.Title>
      </Modal.Header>

      <Modal.Body
        className="text-white"
        style={{ background: "hsl(215,25%,20%)" }}
      >
        {/* Top details */}
        <p>
          <strong>User:</strong> {request.user.name}
        </p>
        <p>
          <strong>Email:</strong> {request.user.email}
        </p>
        <hr />
        <p>
          <strong>Item:</strong> {request.itemName}
        </p>
        <p>
          <strong>Qty:</strong> {request.quantity}
        </p>

        {/* New details from backend */}
        
        <p>
          <strong>Project:</strong> {request.project}
        </p>
        
        <p>
          <strong>Returnable:</strong>{" "}
          {request.isReturnable ? "Yes" : "No (Non-returnable)"}
        </p>
        {request.isReturnable && formattedReturnDate && (
          <p>
            <strong>Return Date:</strong> {formattedReturnDate}
          </p>
          
        )} 
        <p>
          <strong>Message:</strong>{" "}
          {request.message && request.message.trim().length > 0
            ? request.message
            : "-"}
        </p>

        {/* Rack / Slot inputs */}
        <hr />
        <Form.Group className="mt-2">
          <Form.Label>Rack name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Rack Name"
            value={rackId}
            onChange={(e) => setRackId(e.target.value)}
            style={{
              background: "hsl(215,25%,12%)",
              borderColor: "hsl(215,20%,35%)",
              color: "white",
            }}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Slot number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Slot number"
            value={slotId}
            onChange={(e) => setSlotId(e.target.value)}
            style={{
              background: "hsl(215,25%,12%)",
              borderColor: "hsl(215,20%,35%)",
              color: "white",
            }}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer
        className="bg-dark"
        style={{ borderTop: "1px solid hsl(215,20%,25%)" }}
      >
        <Button variant="success" onClick={handleGiveItem}>
          Issue Item ✓
        </Button>
      </Modal.Footer>

      {/* Toast */}
      <NotificationToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        bg={toast.bg}
      />
    </Modal>
  );
};

export default ManagerPermissionModal;
