import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");

  //feedback states
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("please wait....");
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);

      const response = await axios.post(
        "https://sabomo.pythonanywhere.com/api/signup",
        formData
      );
      setLoading("");
      setSuccess(response.data.success);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="row justify-content-center mt-4 ">
      <div className="col-md-6 card shadow p-4 bg-secondary ">
        <h1> SIGNUP FORM</h1>
        {loading}
        {success}
        {error}
        <form onSubmit={handleSubmit} action="" className="frr">
          {/**Username input */}
          <input
            type="text"
            placeholder=" Enter Username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          {/**email input */}
          <input
            type="email"
            placeholder=" Enter Email"
            className="form-control"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <br />
          {/** phone input*/}
          <input
            type="tel"
            placeholder="Enter phone "
            className="form-control"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
          <br />
          {/** password input*/}
          <input
            type="password"
            placeholder=" Enter Password"
            className="form-control"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <br />
          {/**submit button */}
          <button type="" className=" btn btn-dark">
            Signup
          </button>
          <p>
            Already have an account?<Link to="/signin">signin</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
