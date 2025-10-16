import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SubCategoryList from "./components/SubCategoryList";
import ItemDetail from "./components/ItemDetail";
import "./AdminPage.css";

export default function AdminPage({ username, onLogout }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // When a subcategory is clicked in sidebar
  const handleSelectSubcategory = (main, sub, items) => {
    setSelectedSubcategory({ main, sub, items });
    setSelectedItem(null);
  };

  // When an item is clicked in subcategory list
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  // Back button in item detail
  const handleBackToSubcategory = () => {
    setSelectedItem(null);
  };

  // Edit item
  const handleEditItem = (item) => {
    setSelectedItem(item);
  };

  // Delete item
  const handleDeleteItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedItems = selectedSubcategory.items.filter(
        (item) => item.id !== itemId
      );
      setSelectedSubcategory({ ...selectedSubcategory, items: updatedItems });
      setSelectedItem(null);
    }
  };

  return (
    <div className="dashboard">
      <Navbar username={username} onLogout={onLogout} />
      <Sidebar onSelectSubcategory={handleSelectSubcategory} />

      <main className="main-content">
        {!selectedSubcategory && !selectedItem && (
          <h2>Welcome to Admin Dashboard</h2>
        )}

        {selectedSubcategory && !selectedItem && (
          <SubCategoryList
            subcategory={selectedSubcategory}
            onSelectItem={handleSelectItem}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
          />
        )}

        {selectedItem && (
          <div>
            <button
              onClick={handleBackToSubcategory}
              style={{
                marginBottom: "15px",
                padding: "6px 12px",
                border: "none",
                borderRadius: "5px",
                background: "#3b82f6",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
            <ItemDetail
              item={selectedItem}
              onSave={(updatedItem) => {
                // Update item in list
                const updatedItems = selectedSubcategory.items.map((it) =>
                  it.id === updatedItem.id ? updatedItem : it
                );
                setSelectedSubcategory({ ...selectedSubcategory, items: updatedItems });
                setSelectedItem(updatedItem);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
