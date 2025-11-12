import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SlotCard from "./SlotCard";
import { Modal, Button, Form } from "react-bootstrap";

const ContainerGrid = ({ container }) => {
  const occupiedSlots = container.slots.filter((s) => s.item !== null).length;
  const totalSlots = container.slots.length;

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    takenBy: "",
    status: "occupied",
    returnDate: "",
  });

  const handleSlotClick = (slotNumber) => {
    const slot = container.slots.find((s) => s.slotNumber === slotNumber);
    setSelectedSlot(slotNumber);

    if (slot?.item) setIsDetailModalOpen(true);
    else setIsAddModalOpen(true);
  };

  const handleAddItem = () => {
    alert(`${newItem.name} added to Slot ${selectedSlot}`);
    setIsAddModalOpen(false);
    setNewItem({ name: "", takenBy: "", status: "occupied", returnDate: "" });
  };

  const selectedSlotData = container.slots.find(
    (s) => s.slotNumber === selectedSlot
  );

  return (
    <>
      {/* Main Container Card */}
      <div
        className="card shadow-sm my-3"
        style={{
          background:
            "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
          color: "hsl(210, 40%, 98%)",
          border: "1px solid hsl(215, 20%, 25%)",
          borderRadius: "10px",
        }}
      >
        {/* Header */}
        <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-2">
          <h5 className="mb-0 text-light">{container.name}</h5>
          <span className="text-muted small">
            {occupiedSlots}/{totalSlots} occupied
          </span>
        </div>

        {/* Body */}
        <div className="card-body">
          <div className="row g-3">
            {container.slots.map((slot) => (
              <div
                key={`${container.id}-slot-${slot.slotNumber}`}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                onClick={() => handleSlotClick(slot.slotNumber)}
                style={{ cursor: "pointer" }}
              >
                <SlotCard slot={slot} containerName={container.name} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Item Details Modal */}
      <Modal
        show={isDetailModalOpen}
        onHide={() => setIsDetailModalOpen(false)}
        centered
        size="md"
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "hsl(215, 25%, 12%)",
            color: "hsl(210, 40%, 98%)",
          }}
        >
          <Modal.Title>Slot {selectedSlot} - Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "hsl(215, 25%, 14%)",
            color: "hsl(210, 40%, 98%)",
          }}
        >
          {selectedSlotData?.item ? (
            <>
              <div className="mb-3">
                <Form.Label>Item Name</Form.Label>
                <p className="fw-semibold mb-0">{selectedSlotData.item.name}</p>
              </div>
              <div className="mb-3">
                <Form.Label>Status</Form.Label>
                <p className="text-capitalize mb-0">
                  {selectedSlotData.item.status.replace("-", " ")}
                </p>
              </div>
              <div className="mb-3">
                <Form.Label>Taken By</Form.Label>
                <p className="mb-0">{selectedSlotData.item.takenBy}</p>
              </div>
              {selectedSlotData.item.takenDate && (
                <div className="mb-3">
                  <Form.Label>Taken Date</Form.Label>
                  <p className="mb-0">
                    {new Date(
                      selectedSlotData.item.takenDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}
              {selectedSlotData.item.returnDate && (
                <div className="mb-3">
                  <Form.Label>Expected Return</Form.Label>
                  <p className="mb-0">
                    {new Date(
                      selectedSlotData.item.returnDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted">No item found in this slot.</p>
          )}
        </Modal.Body>
      </Modal>

      {/* Add Item Modal */}
      <Modal
        show={isAddModalOpen}
        onHide={() => setIsAddModalOpen(false)}
        centered
        size="md"
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "hsl(215, 25%, 12%)",
            color: "hsl(210, 40%, 98%)",
          }}
        >
          <Modal.Title>Add Item to Slot {selectedSlot}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "hsl(215, 25%, 14%)",
            color: "hsl(210, 40%, 98%)",
          }}
        >
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                placeholder="Enter item name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Taken By</Form.Label>
              <Form.Control
                type="text"
                value={newItem.takenBy}
                onChange={(e) =>
                  setNewItem({ ...newItem, takenBy: e.target.value })
                }
                placeholder="Enter user name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newItem.status}
                onChange={(e) =>
                  setNewItem({ ...newItem, status: e.target.value })
                }
              >
                <option value="occupied">Returnable</option>
                <option value="non-returnable">Non-Returnable</option>
              </Form.Select>
            </Form.Group>

            {newItem.status === "occupied" && (
              <Form.Group className="mb-3">
                <Form.Label>Return Date</Form.Label>
                <Form.Control
                  type="date"
                  value={newItem.returnDate}
                  onChange={(e) =>
                    setNewItem({ ...newItem, returnDate: e.target.value })
                  }
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "hsl(215, 25%, 12%)",
            borderTop: "1px solid hsl(215, 20%, 25%)",
          }}
        >
          <Button
            variant="secondary"
            onClick={() => setIsAddModalOpen(false)}
            style={{
              backgroundColor: "hsl(215, 25%, 18%)",
              border: "none",
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContainerGrid;
