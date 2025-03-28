import React from "react";

import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Getproducts from "./Components/Get sneaker";
import Payment from "./Components/Payment";
import slide1 from "./images/post1.webp"
import slide2 from "./images/post2.avif"
import slide3 from "./images/post3.jpeg"

import logo1 from "./images/x.png"
import logo2 from "./images/fb.png"
import logo3 from "./images/in.png"

import Addproducts from "./Components/Addproducts";
import AboutUs from "./Components/AboutUs";

const App = () => {
  return (
    <div className="App">
      
      <BrowserRouter>
      
        <nav className="text-end mb-4 w-100 mt-3 col-md-4  ">
          <Link to="/signup" className="links col-md-4">
            Signup
          </Link>

          <Link to="/signin" className="links col-md-4">
            Signin
          </Link>
          <Link to="/addproducts" className="links col-md-4">
            Addproducts
          </Link>

          <Link to="/getproducts" className="links col-md-4">
            Getproducts
          </Link>
          <Link to="/aboutus" className="links">AboutUs</Link>
        </nav>
        
        <header className="App-header">
          <h1 className="hhh">NIKE & JORDAN SNEAKERS</h1>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>

          
        </header>
       
        <section class="row">
  <div class="col-md-12">
    <div id="slider" class="carousel slide" data-bs-ride="carousel">
      
      
      <ol class="carousel-indicators">
        <li data-bs-target="#slider" data-bs-slide-to="0" class="active"></li>
        <li data-bs-target="#slider" data-bs-slide-to="1"></li>
        <li data-bs-target="#slider" data-bs-slide-to="2"></li>
      </ol>

      
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src={slide1} alt="Slide 1" class="d-block w-100 carousel-image" />
        </div>
        <div class="carousel-item">
          <img src={slide2} alt="Slide 2" class="d-block w-100 carousel-image" />
        </div>
        <div class="carousel-item">
          <img src={slide3} alt="Slide 3" class="d-block w-100 carousel-image" />
        </div>
      </div>

      
      <a class="carousel-control-prev" href="#slider" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </a>
      <a class="carousel-control-next" href="#slider" role="button" data-bs-slide="next">
        <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        
      </a>

    </div>
  </div>
</section>
        
        

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/addproducts" element={<Addproducts />} />
         <Route path="/aboutus" element={<AboutUs />} />

          <Route path="/getproducts" element={<Getproducts />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/" element={<Getproducts />} />
        </Routes>
      </BrowserRouter>
      <br />
      <br />
      <div className="row col-md-12 bg-success border-radius='15px'">
        <div className="col-md-4 ">
          <h5 className="">About us</h5>
          <p>Welcome to SABOMO SNEAKER SELLERS, your go-to destination for premium Nike and Jordan sneakers! We specialize in bringing you the latest releases, exclusive drops, and timeless classics from two of the most iconic sneaker brands in the world.

At SABOMO, we are passionate about sneakers and committed to providing our customers with 100% authentic footwear at competitive prices. Whether you're a collector, an athlete, or just looking for stylish everyday kicks, we’ve got you covered.

Shop with confidence and step up your sneaker game with SABOMO SNEAKER SELLERS—where every pair tells a story!</p>
        </div>
        <div className="col-md-4">
          <h5>Contact us</h5>
          <p>
            At SABOMO SNEAKER SELLERS, we value our customers and are always here to assist you. Whether you have a question about our products, need help with an order, or just want to inquire about the latest Nike and Jordan sneaker releases, feel free to reach out to us.

You can contact us through our numbers:
📞 0714585217
📞 0755355459

Our team is ready to assist you with any inquiries, orders, or concerns. We look forward to helping you step up your sneaker game!
          </p>
        </div>
        <div className="col-md-4">
          <h5 class="text-center text-dark">Stay Connected</h5>
          <p>At SABOMO SNEAKER SELLERS, we want you to stay updated on the latest Nike and Jordan sneaker releases, exclusive deals, and special offers. Stay connected with us through our platforms and never miss out on the hottest drops!

📱 Call or WhatsApp: 0714585217 / 0755355459
📩 Follow us on social media for updates, restocks, and sneaker trends (insert social media handles if available).
📧 Subscribe to our newsletter for exclusive offers and early access to new arrivals.

Join our sneaker community today and stay ahead in the game!</p>
          <img src={logo1} alt=""></img>
          <img src={logo2} alt=""></img>
          <img src={logo3} alt=""></img>
        </div>
      </div>
      

      <div class="bg-dark p-1 text-center text-light">
       <marquee> <b>Developed by SAMWEL BOSIRE, &copy; 2025.All Rights reserved</b></marquee>
      </div>
    </div>
  );
};

export default App;
