import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa"; // Heart icon for wishlist
import axios from "axios"; // For fetching products from the API

// Styled-components for styling
const WishlistContainer = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const WishlistHeader = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
`;

const WishlistItem = styled.div`
  border: 2px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  padding: 15px;
  width: 200px;
  text-align: center;
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 15px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const AddToWishlistButton = styled.button`
  background-color: #ff4081;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 25px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e53946;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

const Wishlist = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [wishlist, setWishlist] = useState([]); // State to store wishlist items

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://sabomo.pythonanywhere.com/api/get_products_details"
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Add item to wishlist
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <WishlistContainer>
      <WishlistHeader>Your Wishlist</WishlistHeader>

      <h3>Products Available for Wishlist:</h3>
      <ProductList>
        {products.map((product) => (
          <WishlistItem key={product.id}>
            <img
              src={`https://sabomo.pythonanywhere.com/static/images/${product.product_photo}`}
              alt={product.product_name}
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
            <h4>{product.product_name}</h4>
            <p>{product.Productdescription}</p>
            <p>
              <b>{product.product_cost}</b>
            </p>
            <AddToWishlistButton onClick={() => addToWishlist(product)}>
              Add to Wishlist <FaHeart />
            </AddToWishlistButton>
          </WishlistItem>
        ))}
      </ProductList>

      <div>
        <h3>Your Wishlist:</h3>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <ul>
            {wishlist.map((item, index) => (
              <li key={index}>
                <span>{item.product_name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </WishlistContainer>
  );
};

export default Wishlist;
