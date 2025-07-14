import React from "react";
import ShortenForm from "../components/ShortenForm";
import UserUrl from "../components/UserUrl";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const DashboardPage = () => {
  const navigate = useNavigate();

  const [isReLoading, setIsReLoading] = useState(false);

  const authorization = async () => {
    try {
      const res = await axiosInstance.get("/api/auth");
      // console.log("Authorization response:", res.data);
      
    } catch (error) {
      // console.error("Authorization error:", error);
      navigate("/login");
      return;
    }
  };
  useEffect(() => {
    authorization();
  }, []);


  return (
    <div className="   flex flex-col items-center justify-center p-4">
      <div className=" mb-10 rounded-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
        <ShortenForm setIsReLoading={setIsReLoading} />
        <UserUrl setIsReLoading={setIsReLoading} isReLoading={isReLoading} />
      </div>
    </div>
  );
};

export default DashboardPage;
