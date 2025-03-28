import axios from "axios";
import React, { useState } from "react";

const Addproducts = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  //feedback states
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("connecting...");
    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_cost", product_cost);
      formData.append("product_photo", product_photo);

      const response = await axios.post(
        "https://sabomo.pythonanywhere.com/api/add_product",
        formData
      );      if (response.data.message) {
        setSuccess(response.data.message);
        setLoading("");
        setProductName("");
        setProductPhoto("");
        setProductDescription("");
        setProductCost("");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="row justify-content-center mt-4 ">
      <div className="col-md-6 card shadow p-2  bg-secondary">
        <h1>WELCOME TO ADD PRODUCTS</h1>
        {success}
        {loading}
        {error}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="product name"
            className="form-control"
            value={product_name}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          <br />
          <textarea
            name=""
            id=""
            placeholder="product description"
            className="form-control"
            value={product_description}
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
          ></textarea> <br />
          <input
            type="number"
            placeholder="product cost"
            className="form-control" value={product_cost}
            onChange={(e) => {
              setProductCost(e.target.value);
            }}
          />
          <br />
          <input
            type="file"
            placeholder="product photo"
            className="form-control"
            onChange={(e) => {
              setProductPhoto(e.target.files[0]);
            }}
          />
          <br />
          <button type="submit" className="btn btn-dark">
            Add product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproducts;
