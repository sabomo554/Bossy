import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaDownload, FaHeart } from "react-icons/fa"; // Download and Wishlist icons

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [cart, setCart] = useState([]); // Cart state to hold selected products
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const img_url = "https://sabomo.pythonanywhere.com/static/images/";
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from API
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

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setSuccessMessage("Product added successfully to cart!"); // Set the success message
    setTimeout(() => {
      setSuccessMessage(""); // Clear the message after 3 seconds
    }, 3000); // Message disappears after 3 seconds
  };

  // Handle image click (show popup)
  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true); // Open popup/modal
  };

  // Handle image download
  const handleDownload = (productPhoto) => {
    const imageUrl = img_url + productPhoto;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = productPhoto; // Set the name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the link element after clicking
    setIsPopupOpen(false); // Close popup after action
  };

  // Navigate to the wishlist page
  const goToWishlist = () => {
    navigate("/wishlist"); // Navigate to the wishlist page
  };

  // Navigate to the cart page
  const goToCart = () => {
    navigate("/cart", { state: { cart } }); // Pass cart items to Cart component
  };

  return (
    <div className="container-fluid row">
      <h1 className="bg">EXPLORE OUR NEW BRAND SNEAKERS</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading}
      {error && <p className="text-danger">{error}</p>}

      {/* Render the list of products */}
      {filteredProducts.map((product, index) => (
        <div className="col-md-3 mt-4" key={index}>
          <div className="card shadow">
            <div
              className="image-container"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => handleImageClick(product)} // Trigger image click
            >
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                className="mac"
                style={{ width: "100%" }}
              />
              <div
                className="download-icon"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  padding: "10px",
                  borderRadius: "50%",
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent popup from opening when clicking download icon
                  handleDownload(product.product_photo);
                }}
              >
                <FaDownload size={20} />
              </div>
              <div
                className="wishlist-icon"
                style={{
                  position: "absolute",
                  top: "45px", // Increase space between download and wishlist icon
                  right: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  padding: "10px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent popup from opening when clicking wishlist icon
                  goToWishlist(); // Navigate to wishlist page when clicked
                }}
              >
                <FaHeart size={20} />
              </div>
            </div>
            <div className="card-body">
              <h5 className="mt-2">{product.product_name}</h5>
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
              <br />
              <button
                className="btn btn-primary mt-2"
                onClick={() => addToCart(product)} // Add product to cart
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Cart button */}
      <button className="btn btn-success mt-3" onClick={goToCart}>
        Go to Cart ({cart.length})
      </button>

      {/* Success Message Popup */}
      {successMessage && (
        <div
          className="popup-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="popup-content"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              width: "300px",
            }}
          >
            <h5>{successMessage}</h5>
          </div>
        </div>
      )}

      {/* Modal/Popup for download and save to favorites */}
      {isPopupOpen && selectedProduct && (
        <div
          className="popup-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="popup-content"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              width: "300px",
            }}
          >
            <h5>What would you like to do with this product?</h5>
            <button
              className="btn btn-success"
              onClick={() => handleDownload(selectedProduct.product_photo)}
              style={{ margin: "10px" }}
            >
              Download
            </button>
            <button
              className="btn btn-warning"
              onClick={() => goToWishlist()} // Navigate to Wishlist
              style={{ margin: "10px" }}
            >
              Add to Wishlist
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsPopupOpen(false)} // Close popup
              style={{ margin: "10px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Getproducts;
