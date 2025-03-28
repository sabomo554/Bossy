import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //feedbackstate
   const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

 const navigate= useNavigate();
  const handleSubmit= async (e)=>{
    e.preventDefault();

    setLoading('connecting...')
    try{
   const formData= new FormData();
    formData.append("email", email);
    formData.append("password", password);
     const response= await axios.post("https://sabomo.pythonanywhere.com/api/signin",formData);
     setLoading('')
     
     if (response.data.user){
      setSuccess(response.data.message)
      setError('')
      navigate("/")

     }else{
       setSuccess(response.data.message)

     }


    }catch (error){
      setError(error.message)

    }

  }
  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-2 bg-secondary ">
        <h1>SIGNIN FORM</h1>
        {loading}
        {success}
        {error}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button type="submit" className="btn btn-dark">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
