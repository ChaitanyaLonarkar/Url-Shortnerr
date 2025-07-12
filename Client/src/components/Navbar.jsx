import React from "react";
import { useContext } from "react";
import { MyContext } from "../Context/ContextApi.jsx"; // Importing the context
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { currentUser } = useContext(MyContext);
   const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      const res= await axiosInstance.post("/api/auth/logout");
      if (res.data.message === "Logout successful") {
        // Clear user data from localStorage
        localStorage.removeItem("user");
        toast.success("Logout successful");
        navigate("/login"); // Redirect to login page
        window.location.reload(); // Reload the page to reflect changes
      } else {
        throw new Error;
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
    
  }
  return (
    <div>
      <nav className="text-black py-4 px-28 m-5 rounded-4xl shadow-lg border-3 border-black-700">
        <div className="container mx-auto flex justify-between items-center">
          <a className=" text-lg font-bold">URL Shortener</a>
          <div>
            {!currentUser && (
              <a href="/" className=" hover:text-white px-3 py-2">
                Home
              </a>
            )}
            <a href="/dashboard" className=" hover:text-white px-3 py-2">
              Dashboard
            </a>
            {currentUser ? (
             
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">

                Logout
                </button>
            ) : (
              <a href="/login" className=" hover:text-white px-3 py-2">
                Login
              </a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
