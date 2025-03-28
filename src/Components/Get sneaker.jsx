import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const img_url = "https://sabomo.pythonanywhere.com/static/images/";
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate("");
  const [searchTerm, setSearchTerm] = useState('');

  const getproducts = async () => {
    setLoading("please wait...");
    try {
      const response = await axios.get(
        "https://sabomo.pythonanywhere.com/api/get_products_details"
      );
      setLoading("");
      setProducts(response.data.products);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    getproducts();
  }, []);
   // Function to handle search
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid row">
      <h1 className="bg">EXPROLE OUR NEW BRAND SNEAKERS</h1>
       <input
        type='text'
        className='form-control mb-3'
        placeholder='Search for a product...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading}
      {error}
      {error}
      {filteredProducts.map((product, index) => (
        <div className="col-md-3 mt-4 " key={index}>
          <div className="card shadow">
            <img
              src={img_url + product.product_photo}
              alt={product.product_photo}
              className="mac"
            />
            <div className="card-body">
              <h5 className="mt-2 ">{product.product_name}</h5>
              <p className="text-muted">{product.Productdescription}</p>
              <b className="text-warning">{product.product_cost}</b>
              <br />
              <button
                className="btn btn-dark mt-2 w-0 mb-4"
                onClick={() => {
                  navigate("/payment", { state: { product } });
                }}
              >
                Show details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Getproducts;
