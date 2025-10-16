import React from "react";
// import "./SubCategoryList.css"; // optional for styling

export default function SubCategoryList({ subcategory, onSelectItem }) {
  return (
    <div>
      <h3>{subcategory.sub}</h3>
      <div className="item-grid">
        {subcategory.items.map((item, i) => (
          <div
            key={i}
            className="item-card"
            onClick={() => onSelectItem(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
