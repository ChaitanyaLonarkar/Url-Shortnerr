import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate  } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const RegisterForm = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const data = await axiosInstance.post("/api/auth/register", {
        username,
        password,
        email,
      });

      setLoading(false);
      if (data === null) {
        throw new Error("Registration failed. Please try again.");
      }
      toast.success("Registration successful! Please log in.");
      setLoading(false);
      navigate("/login");
      
    } catch (err) {
      setLoading(false);

      toast.error(
        err?.response?.data?.error || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto h-[65vh] md:h-[75vh] flex items-center justify-center">
      <div
        onSubmit={handleSubmit}
        className="bg-[#FFF8E5] border-3 shadow-[6px_6px] px-8 pt-5 pb-5 mb-4 md:w-[400px] w-[300px] "
      >
        <h2 className="text-lg md:text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="name"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
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

        <div className="mb-4">
          <label
            className="block  text-sm font-bold mb-2"
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
            minLength={6}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className={`bg-[#482307] hover:bg-[#4a2b2b] text-white font-bold py-2 px-4 rounded focus:outline-none cursor-pointer focus:shadow-outline  w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className=" text-sm ">
            Already have an account?{" "}
            <span
              onClick={() => (window.location.href = "/login")}
              className="text-[#482307] hover:text-[#A1724E] font-semibold cursor-pointer underline"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
