import React, { useState, useEffect } from "react";

const TermsAndConditions = () => {
  const [isPopupVisible, setPopupVisible] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);

  // Check if user has already accepted the terms (stored in localStorage)
  useEffect(() => {
    const accepted = localStorage.getItem("hasAcceptedTerms");
    if (accepted) {
      setHasAccepted(true);
      setPopupVisible(false);
    }
  }, []);

  // Handle acceptance of terms
  const handleAccept = () => {
    localStorage.setItem("hasAcceptedTerms", "true");
    setHasAccepted(true);
    setPopupVisible(false);
  };

  // Handle decline of terms
  const handleDecline = () => {
    alert("You must accept the terms to continue using the website.");
    window.location.href = "/"; // Redirect user to home page (or other logic)
  };

  // If accepted, render the main content of the website.
  if (hasAccepted) {
    return (
      <div>
        {/* Your main website content goes here */}
        <h1>Welcome to the Website</h1>
        <p>Enjoy your visit!</p>
      </div>
    );
  }

  // If the popup is still visible, render it
  return (
    <div
      className="terms-popup"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "9999",
      }}
    >
      <div
        className="popup-content"
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <h2>Terms and Conditions</h2>
        <p>
          By using this website, you agree to the following terms and
          conditions:
          <br />
          - You agree to our use of cookies for a better experience.
          <br />
          - You agree not to misuse the website or engage in harmful activities.
          <br />- Your personal data will be handled according to our Privacy
          Policy.
        </p>

        <h2>Cookies Policy</h2>
        <p>
          Our website uses cookies to enhance your experience. By continuing to
          use this site, you consent to the use of cookies.
        </p>

        <div>
          <button
            onClick={handleAccept}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              margin: "10px",
            }}
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              margin: "10px",
            }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
