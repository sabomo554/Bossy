import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const { product } = useLocation().state || {};
  const img_url = "http://sabomo.pythonanywhere.com/static/images/";
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("amount", product.product_cost);
      formData.append("phone", phone);

      const response = await axios.post(
        "https://sabomo.pythonanywhere.com/api/mpesa_payment",
        formData
      );
    } catch {}
  };

  return (
    <div className="row justify-content-center mt-5">
      <h1 className="m-2">Make Mpesa payment-LIPA NA M-PESA</h1>
      <div className="card shadow col-md-6 p-2">
        <h1 className="text-success">LIPA NA M-PESA</h1>
        <img src={img_url + product.product_photo} alt="" />
        <h3 className="text-secondary">{product.product_name}</h3>

        <p className="text-danger">{product.product_cost}</p>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Enter 254***********"
            className="form-control"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
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
