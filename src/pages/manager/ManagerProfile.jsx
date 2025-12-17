import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { CircleUserRound } from "lucide-react";
import api from "../../api/axios";
import NotificationToast from "../../components/common/NotificationToast";

const ManagerProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Manager",
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });


  // Fetch manager data from backend on page load
  const fetchProfile = async () => {
    try {
      const res = await api.get("/manager/profile");
      setForm({
        name: res.data.data.name,
        email: res.data.data.email,
        phone: res.data.data.phone,
        role: res.data.data.role,
      });
    } catch (error) {
      console.error("Failed to load manager profile", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone
      };

      await api.put("/manager/updateProfile", payload); //

      setToast({show: true, message: "Profile updated successfully!",bg: "success",});
      setEditMode(false);

      // refresh from backend
      fetchProfile();

    } catch (error) {
      console.error("Update failed:", error);  //
      setToast({show: true,message: "Update failed!",bg: "danger",});
    }
  };

  return (
    <div className="container my-4">
      
      <NotificationToast show={toast.show} message={toast.message} bg={toast.bg}
       onClose={() => setToast((prev) => ({ ...prev, show: false }))}/>

      <div
        className="card mx-auto"
        style={{
          maxWidth: 660,
          background: "hsl(215, 25%, 12%)",
          color: "white",
          borderRadius: 14,
          border: "1px solid hsl(215, 20%, 25%)",
          boxShadow: "0 6px 30px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
      >
        {/* Top Bar: Avatar Section */}
        <div
          className="d-flex align-items-center p-4"
          style={{ borderBottom: "1px solid hsl(215,20%,22%)" }}
        >
          <div
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: 54,
              height: 54,
              background: "hsl(215, 25%, 16%)",
              border: "2px solid hsl(215, 20%, 25%)",
              marginRight: 20,
            }}
          >
            <CircleUserRound size={30} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="fw-bold" style={{ fontSize: "1.2rem", marginBottom: "2px" }}>
              {form.name || "Your Name"}
            </div>
            <div style={{ color: "hsl(215,15%,75%)", fontWeight: 500 }}>
              {form.role}
            </div>
          </div>
          <Button variant="primary" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Done" : "Edit"}
          </Button>
        </div>

        {/* Form Section */}
        <Form className="p-4">
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.email}
                disabled={!editMode}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{
                  backgroundColor: "hsl(215, 25%, 10%)",
                  color: "white",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              />
            </div>

            <div className="col-12 col-md-6 mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={form.phone}
                disabled={!editMode}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                style={{
                  backgroundColor: "hsl(215, 25%, 10%)",
                  color: "white",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              />
            </div>

            <div className="col-12 col-md-6 mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                disabled={!editMode}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{
                  backgroundColor: "hsl(215, 25%, 10%)",
                  color: "white",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              />
            </div>

            <div className="col-12 col-md-6 mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                value={form.role}
                disabled
                style={{
                  backgroundColor: "hsl(215, 25%, 10%)",
                  color: "white",
                  border: "1px solid hsl(215, 20%, 25%)",
                  opacity: 0.7,
                }}
              />
            </div>
          </div>

          {editMode && (
            <div className="d-flex justify-content-end gap-2 mt-3">
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

export default ManagerProfile;
