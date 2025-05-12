import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css"; // Ensure you have this CSS file for styling

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedProfilePicture, setUpdatedProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage
        const response = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to authorization headers
          },
        });

        const userData = response.data;
        setUser(userData);
        setUpdatedName(userData.name);
        setUpdatedEmail(userData.email);
        setUpdatedProfilePicture(userData.profilePicture);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          // Detailed error response from the server
          console.error("Response error:", err.response);
          setError(
            `Failed to fetch user profile: ${
              err.response.data.message || "Unknown error"
            }`
          );
        } else if (err.request) {
          // Error when making the request (network issue)
          console.error("Request error:", err.request);
          setError("Network error, please try again.");
        } else {
          // General error
          console.error("General error:", err.message);
          setError("Failed to fetch user profile.");
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("name", updatedName);
      formData.append("email", updatedEmail);
      formData.append("profilePicture", updatedProfilePicture);

      setLoading(true); // Start loading

      // Send the updated user data to the backend using FormData
      const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage
      const response = await axios.put(
        "/https://sabomo.pythonanywhere.coma/api/user/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to authorization headers
          },
        }
      );

      setUser(response.data); // Update state with the new data
      setIsEditing(false);
      setLoading(false); // Stop loading
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
      setLoading(false); // Stop loading
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="profile-title">User Profile</h2>
      <div className="card p-4 shadow-lg rounded profile-card">
        <div className="d-flex justify-content-center">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="rounded-circle profile-img"
          />
        </div>
        <div className="mt-3">
          <label className="fw-bold">Username</label>
          {isEditing ? (
            <input
              type="text"
              className="form-control mb-3 profile-input"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>
        <div>
          <label className="fw-bold">Email</label>
          {isEditing ? (
            <input
              type="email"
              className="form-control mb-3 profile-input"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>
        <div>
          <label className="fw-bold">Profile Picture</label>
          {isEditing ? (
            <input
              type="text"
              className="form-control mb-3 profile-input"
              value={updatedProfilePicture}
              onChange={(e) => setUpdatedProfilePicture(e.target.value)}
              placeholder="Enter image URL"
            />
          ) : (
            <p>{user.profilePicture}</p>
          )}
        </div>

        <div className="d-flex justify-content-between">
          {isEditing ? (
            <button className="btn btn-success" onClick={handleSave}>
              Save Changes
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleEditToggle}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
