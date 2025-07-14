import React from "react";
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axiosInstance from "../utils/axiosInstance"; 
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { MyContext } from "../Context/ContextApi.jsx"; // 

const LoginForm =()=>{
  const [email, setEmail] = useState("che@123");
  const [password, setPassword] = useState("che@123");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {currentUser,setCurrentUser} = useContext(MyContext);

  const handleSubmit = async (e) => {  
    try{
      e.preventDefault();
      setLoading(true);
      const data = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      console.log("Login data:", data);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      setLoading(false);
      
      if (data === null) {
        throw new Error("Login failed. Please try again.");
      }
      toast.success("Login successful! Redirecting to dashboard...");
      setLoading(false);
    
      navigate("/dashboard");
      window.location.reload(); // Reload the page to reflect changes
    }
    catch (error) {
      console.error("Error during login:", error);
      setLoading(false);
      toast.error(
        error?.response?.data?.error || "Login failed. Please try again." 
      );
    }
   }

  return (
    <div>
      <div className="w-full max-w-md mx-auto h-[65vh] md:h-[75vh] flex items-center justify-center">
        <div className="bg-[#FFF8E5] border-3 shadow-[6px_6px] px-8 pt-6 pb-8 mb-4 md:w-[400px] w-[300px] ">
          <h2 className="text-lg md:text-2xl font-bold text-center mb-6">Login</h2>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 "
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className={`bg-[#482307] hover:bg-[#4a2b2b] text-white font-bold py-2 px-4 rounded focus:outline-none cursor-pointer focus:shadow-outline w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm">
              Don't have an account?{" "}
              <span
                onClick={() => window.location.href="/register"}
                className="text-[#482307] hover:text-[#A1724E] font-semibold cursor-pointer underline"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;