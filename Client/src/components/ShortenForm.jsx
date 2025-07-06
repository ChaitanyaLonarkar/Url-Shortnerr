import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


function ShortenForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const shortenUrl = async (longUrl) => {
    try {
      const response = await axios.post("http://localhost:3000/api/create", {
        longUrl        });
        // const response = await axios.post(process.env.REACT_APP_API_URL + "/api/create", {
        // longUrl        });

        console.log("Response:", response);
      if (!response) {
        throw new Error("Failed to shorten URL");
      }
      const data =response.data;
      setShortenedUrl("http://localhost:3000/"+data.shortUrl);
    } catch (error) {
      console.error("Error:", error);
      alert("Error shortening URL. Please try again.");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    shortenUrl(longUrl);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    alert("Shortened URL copied to clipboard!");
  };

  //   useEffect(() => {}, [shortenedUrl]);

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border-2 rounded-md ">
      <h2 className="text-xl font-bold mb-4">Shorten Your URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter your long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2
          cursor-pointer loader rounded hover:bg-blue-600"
        >
          Shorten
        </button>
      </form>
      {shortenedUrl && (
        <div className="mt-4">
          <p className="font-semibold">Shortened URL:</p>
          <div className="flex items-center">
            <input
              type="text"
              value={shortenedUrl}
              readOnly
              className="w-full p-2 border rounded mr-2"
            />
            <button
              onClick={copyToClipboard}
              className="bg-green-500 text-white p-2 rounded cursor-pointer hover:bg-green-600"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShortenForm;
