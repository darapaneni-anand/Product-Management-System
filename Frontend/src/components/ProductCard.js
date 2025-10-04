import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import edit and delete icons
import "./ProductCard.css";

const ProductCard = ({ product, onDelete, onEdit }) => {
  return (
    <div className="product-card">
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">₹{product.price.toFixed(2)}</p>
      <span className="product-category">{product.category || "Uncategorized"}</span>
      <p className="product-description">{product.description || "No description available."}</p>

      <div className="button-container">
        <button className="btn edit-btn" onClick={() => onEdit(product)}>
          <FaEdit style={{ marginRight: "6px" }} /> Edit
        </button>
        <button className="btn delete-btn" onClick={() => onDelete(product._id)}>
          <FaTrash style={{ marginRight: "6px" }} /> Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
