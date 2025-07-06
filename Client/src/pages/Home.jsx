import React from "react";
import ShortenForm from "../components/ShortenForm";

function Home() {
  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl font-bold mb-6">URL Shortener</h1>
          <p className="text-lg mb-4">
            Welcome to the URL Shortener service. Here you can shorten your long
            URLs and share them easily.
          </p>
          <ShortenForm/>
          <p className="mt-6 text-sm text-gray-600">
            © 2023 URL Shortener Service. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
