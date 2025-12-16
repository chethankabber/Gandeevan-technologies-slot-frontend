// Slot Detail + Add Item Modal + Return Item
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../../api/axios";
import NotificationToast from "../../common/NotificationToast";


const SlotDetailModal = ({
  show,
  onClose,
  slot,
  containerId,
  onAddItem,
  refresh,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
  });

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnContext, setReturnContext] = useState(null);
  const [returnQty, setReturnQty] = useState(1);
  const [selectedBorrower, setSelectedBorrower] = useState("");
  const [toast, setToast] = useState({
  show: false,
  message: "",
  bg: "success",
   });
  useEffect(() => {
  console.log("SLOT RECEIVED (frontend):", slot);
}, [slot]);

  useEffect(() => {
    if (!show) {
      setShowAddForm(false);
      setNewItem({ name: "", quantity: 1 });
      setShowReturnModal(false);
      setReturnContext(null);
      setReturnQty(1);
      setSelectedBorrower("");
    }
  }, [show]); 
  useEffect(() => {
  console.log("🔥 SLOT LOADED:", slot);
}, [slot]);

  if (!slot) return null;

  const items =
    Array.isArray(slot.items) && slot.items.length > 0
      ? slot.items
      : slot.item
      ? [
          {
            id: slot.item.itemId,
            name: slot.item.itemName,
            quantity: slot.item.total,
            remaining: slot.item.remaining,
            takenHistory: slot.item.takenHistory || [],
          },
        ]
      : [];

  const remainingQty = (it) =>
    Number(
      it.remaining !== undefined && it.remaining !== null
        ? it.remaining
        : it.quantity !== undefined
        ? it.quantity
        : it.total !== undefined
        ? it.total
        : 0
    );

  const totalQty = (it) =>
    Number(
      it.quantity !== undefined
        ? it.quantity
        : it.total !== undefined
        ? it.total
        : remainingQty(it)
    );

  const submitAddItem = () => {
    if (!newItem.name.trim()) return;
    if (!slot.slotId) return;

    onAddItem(containerId, slot.slotId, {
      name: newItem.name.trim(),
      quantity: Number(newItem.quantity),
    });
    refresh();
    setShowAddForm(false);
    onClose();
  };

  // ------------------------
  // OPEN RETURN MODAL
  // ------------------------
const openReturnModal = (item) => {
  const itemHistory = item.takenHistory || [];

  if (itemHistory.length === 0) {
  setToast({
    show: true,
    message: "No borrow history found for this item.",
    bg: "warning",
  });
  return;
  }

  setReturnContext({
    item,
    historyList: itemHistory
  });

  setShowReturnModal(true);
};

  
   
  // ------------------------
  // CONFIRM RETURN
  // ------------------------
  const confirmReturn = async () => {
    if (!returnContext) return;

    const borrower = returnContext.historyList.find(
      (h) => h.borrowId === selectedBorrower
    );

    if (!borrower) {
      setToast({
       show: true,
       message: "Select a borrower first.",
       bg: "warning",
      });
      return;
    }

    const qty = Number(returnQty);

    if (qty < 1 || qty > borrower.quantity) {
      setToast({
        show: true,
        message: `Enter valid quantity (1 .. ${borrower.quantity})`,
        bg: "danger",
      });
      return;
    } 
    const payload = { 
      rackId: slot.rackId,
      rackName: slot.rackName,      
      slotNumber: slot.slotNumber,
      returnQuantity: qty
    };
console.log("SENDING RETURN PAYLOAD:", payload);

    try {
      await api.post(`/manager/returnItem/${borrower.borrowId}`, { 
          rackId: slot.rackId,
          rackName: slot.rackName,
          slotNumber: slot.slotNumber,
           returnQuantity: qty,
        });
  
     
      setToast({
        show: true,
        message: "Item returned successfully!",
        bg: "success",
      });
      refresh();
      setShowReturnModal(false);
      setReturnContext(null);
      setReturnQty(1);
      setSelectedBorrower("");  //
      onClose();
    } catch (err) {
      console.error("Return failed:", err);
      setToast({
        show: true,
        message: "Failed to return item.",
        bg: "danger",
      });
    } 
    
  }; 
  

  return (  
    <>
     <NotificationToast
      show={toast.show}
      message={toast.message}
      bg={toast.bg}
      onClose={() => setToast((prev) => ({ ...prev, show: false }))}
    />
      {/* MAIN MODAL */}
      <Modal show={show} onHide={onClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Slot {slot.slotNumber} <strong className="text-muted">-Details</strong>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            backgroundColor: "hsl(215, 25%, 12%)",
            color: "white",
          }}
        >
          {items.length === 0 && !showAddForm && (
            <p className="text-muted">This slot is empty.</p>
          )}

          {!showAddForm &&
            items.map((it) => (
              <div
                key={it.id || it.itemId}
                className="p-3 mb-3 rounded"
                style={{
                  backgroundColor: "hsl(215, 25%, 16%)",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              >
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>{it.name || it.itemName}</strong>
                    <div className="small text-muted">Total: {totalQty(it)}</div>
                  </div>

                  <div className="text-end small">
                    <div>Remaining: {remainingQty(it)}</div>
                  </div>
                </div>

                {it.takenHistory?.length > 0 && (
                  <div className="mt-3 small">
                    <strong>Taken History:</strong>

                    {[...it.takenHistory]
                      .slice(-10)
                      .reverse()
                      .map((t, idx) => (
                        <div key={idx} className="text-muted">
                          • {t.userName} — Qty {t.quantity} —{" "}
                          {new Date(t.takenDate).toLocaleDateString("en-GB")}{" "}
                          {t.returnDate
                            ? `→ Return: ${new Date(
                                t.returnDate
                              ).toLocaleDateString("en-GB")}`
                            : "(Not returned)"}
                        </div>
                      ))}
                  </div>
                )}

                {remainingQty(it) < totalQty(it) && (
                  <div className="d-flex justify-content-end mt-2 gap-2">
                    <Button variant="warning" onClick={() => openReturnModal(it)}>
                      Return
                    </Button> 
                    
                  </div>
                )}
              </div>
            ))}

          {showAddForm && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  placeholder="Enter item name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          {!showAddForm && (
            <Button variant="primary" onClick={() => setShowAddForm(true)}>
              + Add Item
            </Button>
          )}

          {showAddForm && (
            <>
              <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                Back
              </Button>
              <Button variant="primary" onClick={submitAddItem}>
                Save Item
              </Button>
            </>
          )}

          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* RETURN MODAL */}
      <Modal
        show={showReturnModal}
        onHide={() => setShowReturnModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Return Item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {returnContext && (
            <>
              <p>
                <strong>Item:</strong>{" "}
                {returnContext.item.itemName || returnContext.item.name}
              </p>

              {/* DROPDOWN LIST OF BORROWERS */}
              <Form.Group className="mb-3">
                <Form.Label>Select Borrower</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedBorrower}
                  onChange={(e) => {
                    setSelectedBorrower(e.target.value);

                    const userRec = returnContext.historyList.find(
                      (r) => r.borrowId === e.target.value
                    );
                    if (userRec) setReturnQty(userRec.quantity);
                  }}
                >
                  <option value="">-- Select User --</option>
                  {returnContext.historyList.map((h, idx) => (
                    <option key={idx} value={h.borrowId}>
                      {h.userName} (Borrowed: {h.quantity})
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity to Return</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={returnQty}
                  onChange={(e) => setReturnQty(Number(e.target.value))}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReturnModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={confirmReturn}>
            Confirm Return
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SlotDetailModal;
