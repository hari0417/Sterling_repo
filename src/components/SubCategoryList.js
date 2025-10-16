import React from "react";

export default function SubCategoryList({ subcategory, onSelectItem, onEditItem, onDeleteItem, onAddItem }) {
  return (
    <div>
      <h3>{subcategory.main} / {subcategory.sub}</h3>
      <button 
        onClick={onAddItem}
        style={{
          marginBottom: "15px",
          padding: "8px 14px",
          background: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        + Add New Item
      </button>
      <ul>
        {subcategory.items.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span
              style={{ cursor: "pointer" }}
              onClick={() => onSelectItem(item)}
            >
              {item.name}
            </span>
            <div>
              <button
                onClick={() => onEditItem(item)}
                style={{
                  marginRight: "5px",
                  padding: "4px 8px",
                  background: "#fbbf24",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                Edit
              </button>
             
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
