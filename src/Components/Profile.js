// src/Components/Profile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import axios from "axios";

// Dynamically handle API base URL for different environments
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://myhairapp.fly.dev",
  withCredentials: true, // This is crucial for sending cookies
});

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        // Send the token in the Authorization header
        const response = await api.get("/users/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API response:", response.data); // Log the entire response

        if (response.status !== 200) {
          throw new Error("Failed to fetch profile");
        }

        setUser(response.data.user);
      } catch (err) {
        console.error(
          "Error fetching profile:",
          err.response ? err.response.data : err.message
        );
        if (err.response && err.response.status === 401) {
          setError("Authentication failed. Please log in again.");
          navigate("/login");
        } else {
          setError("Failed to fetch profile. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]); // No need to include `user` as dependency

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-center p-6 bg-gray-800 text-white">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        {user && Object.keys(user).length > 0 && (
          <div className="p-6">
            <div className="flex justify-center mb-4">
              {user.profile_photo ? (
                <img
                  src={user.profile_photo}
                  alt="Profile"
                  className="rounded-full h-24 w-24 object-cover"
                />
              ) : (
                <UserCircle className="h-24 w-24 text-gray-400" />
              )}
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">First Name:</span>{" "}
                {user.first_name || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Last Name:</span>{" "}
                {user.last_name || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span>{" "}
                {user.email || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Gender:</span>{" "}
                {user.gender || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Date of Birth:</span>{" "}
                {user.date_of_birth
                  ? new Date(user.date_of_birth).toLocaleDateString()
                  : "Invalid Date"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Country:</span>{" "}
                {user.country || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">State:</span>{" "}
                {user.state || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">City:</span>{" "}
                {user.city || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Address:</span>{" "}
                {user.address || "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
      {success && (
        <div
          className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{success}</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
