import React, { useState } from "react";
import { Link } from "react-router-dom";  // ✅ Add this import
import "../assets/style.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="logo">🌊 HYDROS-C</h1>

        {/* Desktop Nav */}
        <ul className="nav-links desktop-nav">
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="../pages/About" onClick={closeMenu}>About Us</Link></li>
          <li><Link to="/projects" onClick={closeMenu}>Projects</Link></li>
          <li><Link to="../pages/Weather" onClick={closeMenu}>Weather</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
        </ul>

        <Link to="/involve">
          <button className="cta-btn desktop-btn">Become Involved</button>
        </Link>

        {/* Hamburger Button */}
        <button className="hamburger" onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="../pages/About" onClick={closeMenu}>About Us</Link>
        <Link to="/projects" onClick={closeMenu}>Projects</Link>
        <Link to="./pages/Weather" onClick={closeMenu}>Weather</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
        <Link to="./pages/involve" onClick={closeMenu}>
          <button className="cta-btn mobile-btn">
            Become Involved
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;