import React from "react";

export default function Navbar({ username, onLogout }) {
  return (
    <div className="navbar">
      <div className="logo">Admin Panel</div>
      <div className="nav-right">
        <span>{username}</span>
        <button
          onClick={onLogout}
          style={{
            marginLeft: "15px",
            padding: "6px 12px",
            border: "none",
            borderRadius: "5px",
            background: "#ef4444",
            color: "#fff",
            cursor: "pointer",
            transition: "0.2s"
          }}
          onMouseOver={(e) => (e.target.style.background = "#dc2626")}
          onMouseOut={(e) => (e.target.style.background = "#ef4444")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
