import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPhoneNumberPrompt, setShowPhoneNumberPrompt] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control success message

  useEffect(() => {
    if (location.state?.cart) {
      setCartItems(location.state.cart);
    } else {
      console.warn("No cart data found in navigation state.");
    }
  }, [location.state]);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.product_cost),
      0
    );
    setTotalCost(total);
  }, [cartItems]);

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
  };

  const handleCheckout = () => {
    setShowPhoneNumberPrompt(true);
  };

  const handlePhoneNumberSubmit = async () => {
    if (!phoneNumber || !phoneNumber.match(/^254\d{9}$/)) {
      setPhoneError("Please enter a valid phone number starting with 254...");
      return;
    }
    setPhoneError(""); // Clear previous error

    setShowPhoneNumberPrompt(false); // Hide the prompt

    try {
      const requestData = new FormData();
      requestData.append("amount", totalCost);
      requestData.append("phone", phoneNumber);

      const response = await axios.post(
        "https://sabomo.pythonanywhere.com/api/mpesa_payment",
        requestData
      );

      if (response.status === 200 && response.data.success) {
        alert(
          "Payment request sent successfully. Check your phone for payment."
        );
        navigate("/payment", { state: { cartItems, phoneNumber } });
      } else {
        alert(
          "Failed to initiate payment: " +
            (response.data.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while initiating the payment.");
    }
  };

  // Add product to cart and show success message
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    setShowSuccessMessage(true); // Show success message when product is added to cart

    // Hide the success message after 1 second
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 1000);
  };

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>

      {/* Show success message when a product is added to the cart */}
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          Product added successfully to the cart!
        </div>
      )}

      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((product, index) => (
            <div
              key={index}
              className="border p-3 mb-3 rounded shadow-sm"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              <h5>{product.product_name}</h5>
              <p>{product.Productdescription}</p>
              <b className="text-success">{product.product_cost}</b>
              <br />
              <button
                className="btn btn-danger mt-2"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-3">
            <h4>
              Total: <b>${totalCost.toFixed(2)}</b>
            </h4>
            <button className="btn btn-primary mt-3" onClick={handleCheckout}>
              PAY NOW
            </button>
          </div>
        </div>
      ) : (
        <p className="text-muted">
          Your cart is empty or was not passed correctly.
        </p>
      )}

      {showPhoneNumberPrompt && (
        <div className="modal" style={modalStyle}>
          <div
            className="modal-content p-4 rounded bg-white shadow"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <h3 className="mb-3">Enter Your Phone Number</h3>
            <input
              type="tel"
              placeholder="Phone Number"
              className="form-control mb-3"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {phoneError && <div className="text-danger mb-3">{phoneError}</div>}
            <button
              className="btn btn-success w-100 mb-2"
              onClick={handlePhoneNumberSubmit}
            >
              Continue to Payment
            </button>
            <button
              className="btn btn-secondary w-100"
              onClick={() => setShowPhoneNumberPrompt(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Example Button to Add Item to Cart (For testing) */}
      <button
        className="btn btn-success mt-3"
        onClick={() =>
          addToCart({
            product_name: "Sample Product",
            Productdescription: "This is a sample product description.",
            product_cost: 99.99,
          })
        }
      >
        Add Sample Product to Cart
      </button>
    </div>
  );
};

// Modal styling
const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

export default Cart;
