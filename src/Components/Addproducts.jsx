import axios from "axios";
import React, { useState } from "react";

const Addproducts = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  const [adminPassword, setAdminPassword] = useState("");

  // Feedback states
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const correctAdminPassword = "@ajcsbest$"; // Hardcoded admin password

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (adminPassword !== correctAdminPassword) {
      setError("Access denied: Incorrect admin password.");
      return;
    }

    setLoading("Connecting...");

    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_cost", product_cost);
      formData.append("product_photo", product_photo);

      const response = await axios.post(
        "https://sabomo.pythonanywhere.com/api/add_product",
        formData
      );

      if (response.data.message) {
        setSuccess("✅ " + response.data.message);
        setLoading("");
        setProductName("");
        setProductDescription("");
        setProductCost("");
        setProductPhoto("");
        setAdminPassword("");
      }
    } catch (err) {
      setError("❌ " + err.message);
      setLoading("");
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4 bg-light">
        <h2 className="mb-3">🔒 Admin: Add New Product</h2>
        {loading && <div className="text-info">{loading}</div>}
        {success && <div className="text-success">{success}</div>}
        {error && <div className="text-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter admin password"
            className="form-control mb-3"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Product name"
            className="form-control mb-3"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
          />
          <textarea
            placeholder="Product description"
            className="form-control mb-3"
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Product cost"
            className="form-control mb-3"
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
          />
          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setProductPhoto(e.target.files[0])}
          />
          <button type="submit" className="btn btn-dark w-100">
            ➕ Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproducts;
