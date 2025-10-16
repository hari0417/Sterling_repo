import React, { useState } from "react";

export default function ItemDetail() {
  const [showForm, setShowForm] = useState(false);
  const [itemName, setItemName] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [manufactureYear, setManufactureYear] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost/reactive_api/add_item.php"; // Update if your PHP folder name is different

  const handleSave = async () => {
    if (!itemName || !manufactureDate || !manufactureYear) {
      alert("Please fill all fields before saving!");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: itemName,
          manufacture_date: manufactureDate,
          manufacture_year: manufactureYear,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("✅ Item saved successfully!");
        setShowForm(false);
        setItemName("");
        setManufactureDate("");
        setManufactureYear("");

        // Hide message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("❌ Failed to save item.");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("⚠️ Error connecting to server.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "8px 14px",
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + Add Item
        </button>
      ) : (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            maxWidth: "300px",
            background: "#f9fafb",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Add New Item</h3>

          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            style={{
              padding: "6px",
              width: "100%",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="date"
            value={manufactureDate}
            onChange={(e) => setManufactureDate(e.target.value)}
            style={{
              padding: "6px",
              width: "100%",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="number"
            placeholder="Manufacture Year"
            value={manufactureYear}
            onChange={(e) => setManufactureYear(e.target.value)}
            style={{
              padding: "6px",
              width: "100%",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handleSave}
              style={{
                padding: "6px 12px",
                background: "#10b981",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save
            </button>

            <button
              onClick={() => setShowForm(false)}
              style={{
                padding: "6px 12px",
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {message && (
        <p style={{ marginTop: "15px", fontWeight: "bold", color: "#2563eb" }}>
          {message}
        </p>
      )}
    </div>
  );
}
