import React, { useState, useEffect, useCallback } from "react";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import AddProductForm from "./components/AddProductForm";
import "./App.css"; // CSS for products-container grid & toast

const API_URL = "http://localhost:5000/api/products";

const App = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null); // message text
  const [messageType, setMessageType] = useState("success"); // success, info, error
  const [showToast, setShowToast] = useState(false);

  const fetchProducts = useCallback(async (order = sortOrder) => {
    try {
      const url = order === "none" ? API_URL : `${API_URL}?sort=${order}`;
      const res = await fetch(url);
      const result = await res.json();
      setProducts(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  }, [sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const showTempMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000); // toast visible for 3 seconds
  };

  const handleAdd = async (product) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      fetchProducts();
      setShowForm(false);
      showTempMessage("Product added successfully!", "success");
    } catch (err) {
      console.error(err);
      showTempMessage("Failed to add product!", "error");
    }
  };

  const handleUpdate = async (product) => {
    try {
      await fetch(`${API_URL}/${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      setEditProduct(null);
      setShowForm(false);
      fetchProducts();
      showTempMessage("Product updated successfully!", "info");
    } catch (err) {
      console.error(err);
      showTempMessage("Failed to update product!", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchProducts();
      showTempMessage("Product deleted successfully!", "success");
    } catch (err) {
      console.error(err);
      showTempMessage("Failed to delete product!", "error");
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditProduct(null);
    setShowForm(false);
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  // Select icon based on message type
  const getIcon = () => {
    if (messageType === "success") return <FaCheckCircle style={{ marginRight: "8px" }} />;
    if (messageType === "info") return <FaInfoCircle style={{ marginRight: "8px" }} />;
    if (messageType === "error") return <FaTimesCircle style={{ marginRight: "8px" }} />;
    return null;
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <Header />

      {/* Toast Message */}
      <div className={`toast ${showToast ? "toast-show" : ""} ${messageType}`}>
        {getIcon()} {message}
      </div>

      {/* Controls */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "15px",
        flexWrap: "wrap",
        margin: "25px 0",
        padding: "0 20px",
      }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 5, padding: "10px", borderRadius: "6px", border: "1px solid #ccc", minWidth: "150px" }}
        />
        <select
          value={sortOrder}
          onChange={(e) => { setSortOrder(e.target.value); fetchProducts(e.target.value); }}
          style={{ flex: 3, padding: "10px", borderRadius: "6px", border: "1px solid #ccc", minWidth: "120px" }}
        >
          <option value="none">Sort: None</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
        <button
          onClick={() => { setShowForm(!showForm); setEditProduct(null); }}
          style={{ flex: 2, padding: "10px 20px", borderRadius: "6px", backgroundColor: "#2980b9", color: "white", border: "none", cursor: "pointer", minWidth: "120px" }}
        >
          {showForm ? "Close Form ✖" : " + Add Product"}
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            width: "400px",
            maxWidth: "90%",
          }}>
            <AddProductForm
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              editProduct={editProduct}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}

      {/* Product List */}
      <h2 id="products" style={{ textAlign: "center", marginTop: "30px" }}>
        Product List ({filteredProducts.length})
      </h2>
      <div className="products-container">
        {filteredProducts.map(p => (
          <ProductCard
            key={p._id}
            product={p}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
      {filteredProducts.length === 0 && <p style={{ textAlign: "center" }}>No products found.</p>}

      {/* About Section */}
      <section id="about" style={{
        margin: "50px auto",
        maxWidth: "800px",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h3>About</h3>
        <p>This is a full-stack product management app built using React for frontend and Node.js/Express for backend. It demonstrates CRUD operations, search & sort functionality, and responsive UI.</p>
      </section>

      <Footer />
    </div>
  );
};

export default App;
