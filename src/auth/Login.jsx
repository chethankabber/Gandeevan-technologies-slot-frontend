// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com") {
      navigate("/admin");
    } else if (email === "manager@gmail.com") {
      navigate("/manager");
    } else if (email === "user@gmail.com") {
      navigate("/users");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "hsl(215, 30%, 10%)",
        color: "hsl(210, 40%, 98%)",
        padding: "20px",
      }}
    >
      <div
        className="d-flex flex-column flex-md-row align-items-center justify-content-between p-4 rounded"
        style={{
          backgroundColor: "hsl(215, 25%, 14%)",
          border: "1px solid hsl(215, 20%, 25%)",
          width: "100%",
          maxWidth: "800px",
          minHeight: "450px",
        }}
      >
        {/* LEFT SIDE LOGO SECTION */}
        <div
          className="d-flex flex-column align-items-center justify-content-center text-center mb-4 mb-md-0"
          style={{ width: "100%", maxWidth: "350px" }}
        >
          <img
            src="/GTLogos.png"
            alt="Logo"
            style={{
              height: "110px",
              objectFit: "contain",
              marginBottom: "15px",
            }}
          />
        </div>

        {/* VERTICAL LINE */}
        <div
          className="d-none d-md-block"
          style={{
            width: "2px",
            backgroundColor: "hsl(215, 25%, 18%)",
            height: "300px",
            margin: "0 20px",
          }}
        ></div>

        {/* RIGHT SIDE LOGIN FORM */}
        <div
          className="p-3"
          style={{ width: "100%", maxWidth: "350px" }}
        >
          <h2 className="text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: "hsl(215, 25%, 12%)",
                  color: "hsl(210, 40%, 98%)",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                style={{
                  backgroundColor: "hsl(215, 25%, 12%)",
                  color: "hsl(210, 40%, 98%)",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 mt-3"
              style={{
                backgroundColor: "hsl(210, 40%, 50%)",
                color: "hsl(215, 25%, 12%)",
                border: "1px solid hsl(215, 20%, 25%)",
                fontWeight: "600",
                padding: "10px",
              }}
            >
              Login
            </button>
          </form>

          {/* <div
            className="text-center mt-3"
            style={{
              cursor: "pointer",
              color: "hsl(210, 40%, 80%)",
            }}
          >
            <p>
              Don’t have an account?{" "}
              <span
                className="text-info"
                onClick={() => navigate("/register")}
              >
                REGISTER
              </span>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
