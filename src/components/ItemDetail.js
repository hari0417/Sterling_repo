import React, { useState } from "react";

export default function ItemDetail({ item, onSave }) {
  const [name, setName] = useState(item.name);

  return (
    <div>
      <h2>Edit Item</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "6px", width: "250px", marginBottom: "10px" }}
      />
      <br />
      <button
        onClick={() => onSave({ ...item, name })}
        style={{
          padding: "6px 12px",
          background: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Save
      </button>
    </div>
  );
}
