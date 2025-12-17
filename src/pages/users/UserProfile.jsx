import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { CircleUserRound } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import api from "../../api/axios";
import NotificationToast from "../../components/common/NotificationToast";


const UserProfile = () => {
  // const currentUser = useOutletContext();
  const { currentUser, setCurrentUser } = useOutletContext();

  const [editMode, setEditMode] = useState(false);
  const [toast, setToast] = useState({
  show: false,
  message: "",
  bg: "success",
});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
  });

  // Load user details into form
  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        role: currentUser.role || "user",
      });
    }
  }, [currentUser]);

  const handleSave = async () => {
    if (!form.name || !form.email || !form.phone) {  //
       setToast({
        show: true,
        message: "Please fill all fields.",
        bg: "warning",
      });
      return;
    }

    try {
      const res = await api.put("/users/update", {
        name: form.name,
        email: form.email,
        phone: form.phone,
      });

      // Update UI with latest data instantly
      setForm({
        ...form,
        name: res.data.data.name,
        email: res.data.data.email,
        phone: res.data.data.phone,  //
      });

      setToast({
        show: true,
        message: "Profile updated successfully!",
        bg: "success",
      });  
      setEditMode(false);
    } catch (error) {
      console.error("Update failed:", error);  //
      setToast({
        show: true,
        message: "Update failed!",
        bg: "danger",
      });
    }
  };

  return (
    <div className="container my-4">
       <NotificationToast show={toast.show} message={toast.message} bg={toast.bg}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}/>
      <div
        className="card mx-auto"
        style={{
          maxWidth: 650,
          background: "#0F1623",
          color: "white",
          borderRadius: 14,
          border: "1px solid #2A3A4B",
          boxShadow: "0 6px 30px rgba(0,0,0,0.45)",
        }}
      >
        {/* Profile Header */}
        <div
          className="d-flex align-items-center p-4"
          style={{ borderBottom: "1px solid #2A3A4B" }}
        >
          <div
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: 54,
              height: 54,
              background: "#1C2736",
              border: "2px solid #2A3A4B",
              marginRight: 20,
            }}
          >
            <CircleUserRound size={30} />
          </div>

          <div style={{ flex: 1 }}>
            <div className="fw-bold" style={{ fontSize: "1.25rem" }}>
              {form.name}
            </div>
            <div style={{ opacity: 0.7 }}>{form.role}</div>
          </div>

          <Button variant="primary" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Done" : "Edit"}
          </Button>
        </div>

        {/* Profile Form */}
        <Form className="p-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={form.email}
                disabled={!editMode}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                value={form.phone}
                disabled={!editMode}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={form.name}
                disabled={!editMode}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control value={form.role} disabled />
            </div>
          </div>

          {editMode && (
            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default UserProfile;
