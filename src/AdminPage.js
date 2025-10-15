// src/AdminPage.js
import React, { useState } from "react";
import "./AdminPage.css";

export default function AdminPage({ username, onLogout }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          {/* <p>{username}</p> */}
        </div>

        <ul className="menu">
          <li
            className={activeMenu === "dashboard" ? "active" : ""}
            onClick={() => setActiveMenu("dashboard")}
          >
            Dashboard
          </li>

          {/* Used Machinery */}
          <li onClick={() => toggleMenu("usedMachinery")}>
            Used Machinery
            <span>{expandedMenus["usedMachinery"] ? "▾" : "▸"}</span>
          </li>

          {expandedMenus["usedMachinery"] && (
            <ul className="submenu">
              <li>
                Web
                <ul className="submenu">
                  <li onClick={() => setActiveMenu("heatset")}>Heatset Machinery</li>
                  <li onClick={() => setActiveMenu("coldset")}>Coldset Machinery</li>
                  <li onClick={() => setActiveMenu("miscWeb")}>Misc Web Machinery</li>
                </ul>
              </li>

              <li>
                Sheetfed
                <ul className="submenu">
                  <li>1 Colour</li>
                  <li>2 Colour</li>
                  <li>4 Colour</li>
                  <li>5 Colour</li>
                  <li>6 Colour</li>
                  <li>Misc Sheetfed</li>
                </ul>
              </li>

              <li>
                Bindery and Finishing
                <ul className="submenu">
                  <li>Perfect Binders</li>
                  <li>Sewing Machines</li>
                  <li>Saddle Stitchers and Booklet Makers</li>
                  <li>Folding Machines</li>
                  <li>Guillotines and Trimmers</li>
                  <li>Film Laminators</li>
                  <li>New Banding Machines</li>
                  <li>Cutting and Creasing</li>
                  <li>Misc Finishing</li>
                </ul>
              </li>

              <li>
                Carton Converting
                <ul className="submenu">
                  <li>Die Cutters</li>
                  <li>Carton Gluers</li>
                  <li>Window Patchers</li>
                  <li>Carton Foil Blocking Machinery</li>
                  <li>Misc Carton</li>
                </ul>
              </li>

              <li>
                Additional Machinery
                <ul className="submenu">
                  <li>General</li>
                  <li>Compressors</li>
                  <li>Pumps</li>
                  <li>Blowers</li>
                </ul>
              </li>

              <li>
                Spares
                <ul className="submenu">
                  <li>Offset Spares</li>
                  <li>Folding</li>
                </ul>
              </li>
            </ul>
          )}

          {/* Other main categories */}
          <li onClick={() => setActiveMenu("brands")}>Brands</li>
          <li onClick={() => setActiveMenu("whoWeAre")}>Who We Are</li>
          <li onClick={() => setActiveMenu("sellMachine")}>Sell Your Machine</li>
          <li onClick={() => setActiveMenu("contact")}>Contact Us</li>
          <li className="logout" onClick={onLogout}>Logout</li>
        </ul>

        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Fb</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Insta</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header>
          <h1>{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}</h1>
        </header>
        <section className="content">
          <p>Main content for <strong>{activeMenu}</strong> will be displayed here.</p>
        </section>
      </main>
    </div>
  );
}
