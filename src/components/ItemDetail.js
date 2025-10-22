import React, { useState, useEffect } from "react";

export default function ItemDetail({ item, onSave, category }) {
  const [itemName, setItemName] = useState("");
  const [manufactureYear, setManufactureYear] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  const isEditMode = !!item;

  useEffect(() => {
    if (item) {
      setItemName(item.name || "");
      setManufactureYear(item.manufacture_year || "");
      setPreview(item.image_path ? `http://localhost:8000/uploads/${item.image_path}` : "");
    } else {
      setItemName("");
      setManufactureYear("");
      setPreview("");
      setImageFile(null);
    }
  }, [item]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!itemName || !manufactureYear) {
      alert("Please fill all fields before saving!");
      return;
    }

    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("manufacture_year", manufactureYear);
    formData.append("category", category);
    if (imageFile) formData.append("image", imageFile);

    let url = "http://localhost:8000/add_item.php";
    if (isEditMode) {
      formData.append("id", item.id);
      url = "http://localhost:8000/update_item.php";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.status === "success") {
        setMessage(`✅ Item ${isEditMode ? "updated" : "saved"} successfully!`);
        onSave({ ...item, name: itemName, manufacture_year: manufactureYear, image_path: data.fileName });
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`❌ Failed: ${data.message}`);
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

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: "10px" }}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "100%", borderRadius: "6px", marginBottom: "10px" }}
        />
      )}

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

      {message && (
        <p style={{ marginTop: "15px", fontWeight: "bold", color: "#2563eb" }}>
          {message}
        </p>
      )}
    </div>
  );
}
