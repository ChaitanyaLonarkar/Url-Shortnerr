import React from "react";
import ShortenForm from "../components/ShortenForm";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
        
        <div className="flex flex-col items-center justify-center h-[80vh] ">
          <h1 className="text-4xl font-bold mb-6">URL Shortener</h1>
          <p className="text-lg mb-4 w-2xl text-center">
            Welcome to the URL Shortener service. 
            <br />Here you can shorten your long
            URLs and share them easily.
          </p>
          <ShortenForm/>
          <p className="mt-6 text-sm text-[#482307]">
            ©2025 URL Shortener Service. Build with love.
          </p>
        </div>
    </>
  );
}

export default Home;
