import React from "react";

export default function ItemDetail({ item }) {
  return (
    <div>
      <h3>{item}</h3>
      <p>Here you can add more details about {item}.</p>
    </div>
    
  );
}
