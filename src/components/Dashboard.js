// App.js
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SubCategoryList from "./components/SubCategoryList";
import ItemDetail from "./components/ItemDetail";
import "./App.css";


export default function App() {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectSubcategory = (main, sub, items) => {
    setSelectedSubcategory({ main, sub, items });
    setSelectedItem(null);
  };

  return (
    <div className="app">
      <Navbar />
      <Sidebar onSelectSubcategory={handleSelectSubcategory} />
      <div className="main-content">
        {selectedItem ? (
          <ItemDetail item={selectedItem} />
        ) : selectedSubcategory ? (
          <SubCategoryList
            subcategory={selectedSubcategory}
            onSelectItem={setSelectedItem}
          />
        ) : (
          <h2>Welcome to Admin Dashboard</h2>
        )}
      </div>
    </div>
  );
}
