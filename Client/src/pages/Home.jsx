import React from "react";
import ShortenForm from "../components/ShortenForm";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
        
        <div className=" flex flex-col items-center justify-center md:h-[73vh] h-[66vh]  ">
          <h1 className="md:text-4xl text-3xl font-bold mb-3 md:mb-6">URL Shortener</h1>
          <p className="md:text-lg mb-4 md:w-2xl text-center">
            Welcome to the URL Shortener service. 
            <br />Here you can shorten your long
            URLs and share them easily.
          </p>
          <ShortenForm/>
          
        </div>
    </>
  );
}

export default Home;
