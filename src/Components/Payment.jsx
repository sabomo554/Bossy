import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const { product } = useLocation().state || {}; // Ensure `product` is received correctly from the location state
  const navigate = useNavigate();
  const img_url = "http://sabomo.pythonanywhere.com/static/images/";
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(""); // State for handling error messages

  // Ensure the product exists, otherwise show an error message
  if (!product) {
    return <div>No product found for this payment!</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation of the phone number
    if (!phone.match(/^254\d{9}$/)) {
      setError("Please enter a valid phone number starting with 254...");
      return;
    }

    setError(""); // Clear any previous errors

    try {
      const formData = new FormData();
      formData.append("amount", product.product_cost);
      formData.append("phone", phone);

      // Sending the payment request to the API
      const response = await axios.post(
        "https://sabomo.pythonanywhere.com/api/mpesa_payment",
        formData
      );

      // Assuming you want to do something with the response, you can log it or navigate
      if (response.status === 200) {
        alert("Payment request was successful!");
        navigate("/"); // Redirect to the home page or another success page
      } else {
        alert("Payment request failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment request:", error);
      setError(
        "An error occurred while processing the payment. Please try again."
      );
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <h1 className="m-2">Make Mpesa Payment - LIPA NA M-PESA</h1>
      <div className="card shadow col-md-6 p-2">
        <h1 className="text-success">LIPA NA M-PESA</h1>
        <img src={img_url + product.product_photo} alt={product.product_name} />
        <h3 className="text-secondary">{product.product_name}</h3>
        <p className="text-danger">{product.product_cost}</p>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Enter 254***********"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="btn btn-dark mt-2">
            Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
