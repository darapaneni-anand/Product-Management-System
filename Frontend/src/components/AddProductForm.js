import React, { useState, useEffect } from "react";

const AddProductForm = ({ onAdd, onUpdate, editProduct, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  // Populate form if editing
  useEffect(() => {
    if (editProduct) {
      setFormData(editProduct);
    }
  }, [editProduct]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const priceNum = parseFloat(formData.price);
    if (!formData.name || isNaN(priceNum) || priceNum <= 0) {
      return alert("Enter valid name and price.");
    }

    if (editProduct) {
      onUpdate({ ...formData, price: priceNum });
    } else {
      onAdd({ ...formData, price: priceNum });
    }

    // Clear form after submit
    setFormData({ name: "", price: "", description: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>{editProduct ? "Edit Product" : "Add New Product"}</h3>

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        style={styles.input}
        min="0.01"
        step="0.01"
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        style={styles.input}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        style={{ ...styles.input, height: "80px" }}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit" style={styles.button}>
          {editProduct ? "Update Product" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{ ...styles.button, backgroundColor: "#e74c3c" }}
        >
          Close
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "320px",
    margin: "20px auto",
    backgroundColor: "#f9f9f9",
  },
  input: { padding: "10px", borderRadius: "4px", border: "1px solid #ccc" },
  button: {
    padding: "10px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
  },
};

export default AddProductForm;
