import React from "react";
import logo from "./logo (2).png"; 
import "./Header.css"; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        
        <div className="logo-container">
          <img src={logo} alt="Product Management Logo" className="logo-image" />
          <h1 className="logo-text">Product Management System</h1>
        </div>

        <nav className="nav">
          <a href="#products" className="link">Products</a>
          <a href="#about" className="link">About</a>
          <a href="#contact" className="link">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
