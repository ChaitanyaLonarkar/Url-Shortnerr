import React from "react";
import { useContext } from "react";
import { MyContext } from "../Context/ContextApi.jsx"; // Importing the context
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { currentUser } = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/api/auth/logout");
      if (res.data.message === "Logout successful") {
        // Clear user data from localStorage
        localStorage.removeItem("user");
        toast.success("Logout successful");
        navigate("/login"); // Redirect to login page
        window.location.reload(); // Reload the page to reflect changes
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };
  return (
    <div>
      <nav className=" p-2.5 md:px-4 md:py-4 lg:px-28 m-4 lg:m-5 rounded-4xl shadow-[6px_6px] border-3 border-black-700 ">
        <div className="container mx-auto flex justify-between items-center">
          <div className=" flex items-center gap-2">
            <svg
              className="animate-pulse w-8 mx-auto text-[#482307] "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          <a className=" text-xl font-bold">URL Shortener</a>
          </div>
          <div className="font-semibold text-lg text-[#482307]">
            {!currentUser && (
              <a href="/" className=" hover:text-[#A1724E] px-3 py-2">
                Home
              </a>

            )}
           
            
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="bg-[#E15549] text-white px-3 py-1 rounded-lg hover:bg-[#482307] cursor-pointer text-base"
              >
                Logout
              </button>
            ) : (
              <a href="/login" className=" bg-[#E15549] text-white px-3 hover:bg-[#482307] py-1 rounded-lg ">
                Login
              </a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
