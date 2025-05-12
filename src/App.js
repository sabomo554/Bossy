import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Getproducts from "./Components/Getproducts";
import Payment from "./Components/Payment";
import slide1 from "./images/post1.webp";
import slide2 from "./images/post2.avif";
import slide3 from "./images/post3.jpeg";
import logo1 from "./images/x.png";
import logo2 from "./images/fb.png";
import logo3 from "./images/in.png";
import Addproducts from "./Components/Addproducts";
import AboutUs from "./Components/AboutUs";
import Cart from "./Components/Cart";
import Chatbot from "./Components/Chatbot";
import {
  FaSignInAlt,
  FaPlus,
  FaBoxOpen,
  FaInfoCircle,
  FaShoppingCart,
  FaUserPlus,
  FaHeart,
  FaUserCircle,
} from "react-icons/fa";
import Wishlist from "./Components/Wishlist";
import Profile from './Components/Profile';

const App = () => {
  const [showTermsModal, setShowTermsModal] = useState(true); // Modal initially shown

  useEffect(() => {
    // Check if terms are already accepted from localStorage
    const accepted = localStorage.getItem("hasAcceptedTerms");
    if (accepted === "true") {
      setShowTermsModal(false); // If accepted, don't show the modal
    }
  }, []);

  const handleTermsAccept = () => {
    localStorage.setItem("hasAcceptedTerms", "true");
    setShowTermsModal(false); // Hide the modal after accepting
  };

  const handleTermsDecline = () => {
    alert("You must accept the terms to use the site.");
    // Optionally, you can redirect or add logic if terms are declined
    // window.location.href = '/exit';
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation Bar */}
        <nav className="text-end mb-4 w-100 mt-3 col-md-4">
  <Link to="/signup" className="links col-md-4">
    <FaUserPlus style={{ marginRight: "8px" }} />
    Signup
  </Link>
  <Link to="/signin" className="links col-md-4">
    <FaSignInAlt style={{ marginRight: "8px" }} />
    Signin
  </Link>

  <Link to="/addproducts" className="links col-md-4">
    <FaPlus style={{ marginRight: "8px" }} />
    Add Products
  </Link>

  <Link to="/getproducts" className="links col-md-4">
    <FaBoxOpen style={{ marginRight: "8px" }} />
    Get Products
  </Link>

  <Link to="/aboutus" className="links col-md-4">
    <FaInfoCircle style={{ marginRight: "8px" }} />
    About Us
  </Link>

  <Link to="/cart" className="links col-md-4">
    <FaShoppingCart style={{ marginRight: "8px" }} />
    Cart
  </Link>
  <Link to="/wishlist" className="links col-md-4">
    <FaHeart style={{ marginRight: "8px" }} />
    Wishlist
  </Link>

  {/* Add Profile Link */}
  <Link to="/profile" className="links col-md-4">
    <FaUserCircle style={{ marginRight: "8px" }} />
    Profile
  </Link>
</nav>


        {/* Header */}
        <header className="App-header">
          <h1 className="hhh">NIKE & JORDAN SNEAKERS</h1>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
          ></link>
        </header>

        {/* Image Slider */}
        <section className="row">
          <div className="col-md-12">
            <div id="slider" className="carousel slide" data-bs-ride="carousel">
              <ol className="carousel-indicators">
                <li
                  data-bs-target="#slider"
                  data-bs-slide-to="0"
                  className="active"
                ></li>
                <li data-bs-target="#slider" data-bs-slide-to="1"></li>
                <li data-bs-target="#slider" data-bs-slide-to="2"></li>
              </ol>

              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={slide1}
                    alt="Slide 1"
                    className="d-block w-100 carousel-image"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={slide2}
                    alt="Slide 2"
                    className="d-block w-100 carousel-image"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={slide3}
                    alt="Slide 3"
                    className="d-block w-100 carousel-image"
                  />
                </div>
              </div>

              <a
                className="carousel-control-prev"
                href="#slider"
                role="button"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon bg-dark"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#slider"
                role="button"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon bg-dark"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </a>
            </div>
          </div>
        </section>

        {/* Routes */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/addproducts" element={<Addproducts />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/getproducts" element={<Getproducts />} />
         
          <Route path="/payment" element={<Payment />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Getproducts />} />
          <Route path="/profile" element={<Profile />} /> {/* Profile route */}
        </Routes>
      </BrowserRouter>

      <br />
      <br />

      {/* About Us and Contact Sections */}
      <div className="container-fluid bg-success text-white py-5 rounded-4">
        <div className="row g-4">
          {/* About Us Section */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">About Us</h5>
            <p className="small">
              Welcome to <strong>SABOMO SNEAKER SELLERS</strong>, your go-to
              destination for premium Nike and Jordan sneakers! We specialize in
              the latest releases, exclusive drops, and timeless classics from
              two of the most iconic brands.
              <br />
              <br />
              We're passionate about sneakers and committed to 100% authentic
              footwear at competitive prices. Whether you're a collector,
              athlete, or just love stylish kicks—we’ve got you covered.
              <br />
              <br />
              Shop with confidence and step up your sneaker game with
              SABOMO—where every pair tells a story!
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p className="small">
              At <strong>SABOMO</strong>, we value our customers. Have questions
              or need help with an order? Contact us anytime!
              <br />
              <br />
              <strong>📞 Phone/WhatsApp:</strong>
              <br />
              0714 585 217
              <br />
              0755 355 459
              <br />
              <br />
              Our support team is ready to assist with any inquiries or
              concerns. We’re here to help you step up your sneaker game.
            </p>
            <textarea
              id="myTextarea"
              rows="5"
              cols="25"
              maxLength="200"
              required
              placeholder="Leave your comment here..."
            ></textarea>
            <br />
            <input type="submit" value="Submit" className="submit-button" />
          </div>

          {/* Stay Connected Section */}
          <div className="col-md-4 text-center">
            <h5 className="fw-bold text-dark mb-3">Stay Connected</h5>
            <p className="small text-light">
              Stay updated on Nike and Jordan sneaker drops, exclusive deals,
              and new arrivals.
              <br />
              <br />
              📱 Call or WhatsApp: <br />
              0714 585 217 / 0755 355 459
              <br />
              📩 Follow us on social media (insert handles)
              <br />
              📧 Subscribe for early access and offers.
              <br />
              <br />
              Join our community and stay ahead in the sneaker game!
            </p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <img
                src={logo1}
                alt="Logo 1"
                className="img-fluid"
                style={{ maxWidth: "40px" }}
              />
              <img
                src={logo2}
                alt="Logo 2"
                className="img-fluid"
                style={{ maxWidth: "40px" }}
              />
              <img
                src={logo3}
                alt="Logo 3"
                className="img-fluid"
                style={{ maxWidth: "40px" }}
              />
            </div>
            <div>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>{" "}
              |
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>{" "}
              |
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-dark p-1 text-center text-light">
        <b>Developed by SAMWEL BOSIRE, &copy; 2025. All Rights reserved</b>
      </div>

      {/* Chatbot Component */}
      <Chatbot />

      {/* Terms and Conditions Modal at the bottom */}
      {showTermsModal && (
        <div className="terms-modal">
          <p>
            Please accept our terms and conditions to continue using the site.
          </p>
          <button onClick={handleTermsAccept}>Accept</button>
          <button className="decline-button" onClick={handleTermsDecline}>
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
