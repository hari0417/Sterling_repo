import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SubCategoryList from "./components/SubCategoryList";
import ItemDetail from "./components/ItemDetail";
import "./AdminPage.css";

export default function AdminPage({ username, onLogout }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectSubcategory = (main, sub, items) => {
    setSelectedSubcategory({ main, sub, items });
    setSelectedItem(null); // reset selected item
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleBackToSubcategory = () => {
    setSelectedItem(null);
  };

  return (
    <div className="dashboard">
      <Navbar username={username} onLogout={onLogout} />
      <Sidebar onSelectSubcategory={handleSelectSubcategory} />

      <main className="main-content">
        {/* Welcome message */}
        {!selectedSubcategory && !selectedItem && (
          <h2>Welcome to Admin Dashboard</h2>
        )}

        {/* SubCategory List */}
        {selectedSubcategory && !selectedItem && (
          <SubCategoryList
            subcategory={selectedSubcategory}
            onSelectItem={handleSelectItem}
          />
        )}

        {/* Item Detail */}
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
            <ItemDetail item={selectedItem} />
          </div>
        )}
      </main>
    </div>
  );
}
