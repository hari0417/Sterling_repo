import React from "react";

export default function AdminPage({ username }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {username}!</p>

      {/* Example Dashboard cards */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ flex: 1, padding: "20px", background: "#f2f2f2", borderRadius: "10px" }}>
          <h3>Users</h3>
          <p>Manage users here</p>
        </div>
        <div style={{ flex: 1, padding: "20px", background: "#f2f2f2", borderRadius: "10px" }}>
          <h3>Products</h3>
          <p>Manage products here</p>
        </div>
        <div style={{ flex: 1, padding: "20px", background: "#f2f2f2", borderRadius: "10px" }}>
          <h3>Orders</h3>
          <p>View orders here</p>
        </div>
      </div>
    </div>
  );
}
