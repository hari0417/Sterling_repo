import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SubCategoryList from "./components/SubCategoryList";
import ItemDetail from "./components/ItemDetail";
import "./AdminPage.css";

export default function AdminPage({ username, onLogout }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);

  // When a subcategory is clicked in sidebar, fetch its items from the backend
  const handleSelectSubcategory = (main, sub) => {
    setSelectedItem(null);
    setIsAddingItem(false);

    const fetchItems = async (category) => {
      try {
        const response = await fetch(`http://localhost:8000/get_items.php?category=${category}`);
        const data = await response.json();

        if (data.status === "success") {
          setSelectedSubcategory({ main, sub, items: data.items });
        } else {
          console.error("Failed to fetch items:", data.message);
          setSelectedSubcategory({ main, sub, items: [] });
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setSelectedSubcategory({ main, sub, items: [] });
      }
    };

    fetchItems(sub); // Use the 'sub' as the category key
  };

  // When an item is clicked in subcategory list
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsAddingItem(false);
  };

  // When the Add New Item button is clicked
  const handleAddItem = () => {
    setSelectedItem(null);
    setIsAddingItem(true);
  };

  // Back button in item detail
  const handleBackToSubcategory = () => {
    setSelectedItem(null);
    setIsAddingItem(false);
  };

  // This function is called when an item is saved (either new or edited)
  const handleSaveItem = (savedItem) => {
    setIsAddingItem(false);
    setSelectedItem(savedItem);
    // Refetch the list to show the new/updated item
    if (selectedSubcategory) {
      handleSelectSubcategory(selectedSubcategory.main, selectedSubcategory.sub);
    }
  };

  // Delete item
  const handleDeleteItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      // Here you would ideally call a backend endpoint to delete the item
      // For now, we'll just filter it from the UI
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
        {!selectedSubcategory && !selectedItem && !isAddingItem && (
          <h2>Welcome to Admin Dashboard</h2>
        )}

        {selectedSubcategory && !selectedItem && !isAddingItem && (
          <SubCategoryList
            subcategory={selectedSubcategory}
            onSelectItem={handleSelectItem}
            onEditItem={handleSelectItem} // Clicking Edit should also just select the item
            onDeleteItem={handleDeleteItem}
            onAddItem={handleAddItem} // Wire up the new add button
          />
        )}

        {(selectedItem || isAddingItem) && (
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
              onSave={handleSaveItem}
              category={selectedSubcategory.sub} // Pass the category down
            />
          </div>
        )}
      </main>
    </div>
  );
}
