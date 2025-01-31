import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo on the left */}
      <Link to="/" className="logo">
        <img
          src="https://vitelytech.com/wp-content/uploads/2024/05/VT-2.svg"
          alt="Logo"
        />
      </Link>

      {/* Hamburger Menu Button (for mobile) */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      {/* Navbar Links */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/showevent" className="show-events-btn" onClick={() => setIsOpen(false)}>
          Show Events
        </Link>
        <Link to="/" className="show-events-btn" onClick={() => setIsOpen(false)}>
         Create Events
        </Link>

      </div>
    </nav>
  );
}
