import React, { useState, useEffect } from "react";

export default function ItemDetail({ item, onSave, category }) {
  const [itemName, setItemName] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [manufactureYear, setManufactureYear] = useState("");
  const [message, setMessage] = useState("");

  const isEditMode = !!item;

  useEffect(() => {
    if (item) {
      setItemName(item.name || "");
      // The date needs to be in YYYY-MM-DD format for the input
      const formattedDate = item.manufacture_date ? new Date(item.manufacture_date).toISOString().split('T')[0] : "";
      setManufactureDate(formattedDate);
      setManufactureYear(item.manufacture_year || "");
    } else {
      // Reset form when there's no item (for adding)
      setItemName("");
      setManufactureDate("");
      setManufactureYear("");
    }
  }, [item]);

  const handleSave = async () => {
    if (!itemName || !manufactureDate || !manufactureYear) {
      alert("Please fill all fields before saving!");
      return;
    }

    const itemData = {
      name: itemName,
      manufacture_date: manufactureDate,
      manufacture_year: manufactureYear,
      category: category, // Add category to the saved data
    };

    let url = "http://localhost:8000/add_item.php";
    if (isEditMode) {
      itemData.id = item.id; // Include ID for update
      url = "http://localhost:8000/update_item.php";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      const data = await response.json();
      if (data.status === "success") {
        setMessage(`✅ Item ${isEditMode ? 'updated' : 'saved'} successfully!`);
        onSave({ ...item, ...itemData }); // Notify parent to refresh
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`❌ Failed to ${isEditMode ? 'update' : 'save'} item: ${data.message}`);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("⚠️ Error connecting to server.");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "300px",
        background: "#f9fafb",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{isEditMode ? "Edit Item" : "Add New Item"}</h3>

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

      <div style={{ display: "flex", justifyContent: "flex-start" }}>
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
      </div>

      {message && (
        <p style={{ marginTop: "15px", fontWeight: "bold", color: "#2563eb" }}>
          {message}
        </p>
      )}
    </div>
  );
}
