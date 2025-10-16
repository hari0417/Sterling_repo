import React, { useState } from "react";

const data = {
  "Used Machinery": {
    Web: ["Heatset Machinery", "Coldset Machinery", "Misc Web Machinery"],
    Sheetfed: ["1 Colour", "2 Colour", "4 Colour", "5 Colour", "6 Colour", "Misc Sheetfed"],
    "Bindery and finishing": [
      "Perfect Binders",
      "Sewing Machines",
      "Saddle Stitchers",
      "Folding Machines",
      "Guillotines and Trimmers",
    ],
  },
  Brands: {},
  "Who We Are": {},
  "Sell your machine": {},
  Contact: {},
};

export default function Sidebar({ onSelectSubcategory }) {
  const [openMain, setOpenMain] = useState(null);

  return (
    <aside className="sidebar">
      {Object.keys(data).map((main, i) => (
        <div key={i}>
          <div
            className="main-category"
            onClick={() => setOpenMain(openMain === main ? null : main)}
          >
            {main}
          </div>
          {openMain === main &&
            Object.keys(data[main]).map((sub, j) => (
              <div
                className="sub-category"
                key={j}
                onClick={() => onSelectSubcategory(main, sub, data[main][sub])}
              >
                {sub}
              </div>
            ))}
        </div>
      ))}
    </aside>
  );
}
