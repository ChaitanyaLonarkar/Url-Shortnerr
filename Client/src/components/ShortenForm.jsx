import React, { useContext, useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { MyContext } from "../Context/ContextApi.jsx"; // Importing the contex
const ShortenForm = ({ setIsReLoading }) => {
  const [longUrl, setLongUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const { currentUser } = useContext(MyContext);

  const shortenUrl = async (longUrl) => {
    try {
      const response = await axiosInstance.post("api/create", {
        longUrl,
        customUrl,
      });

      // console.log("Response:", response);

      if (!response.data.shortUrl) {
        throw new Error("Failed to shorten URL");
      }
      const data = response.data;
      setShortenedUrl("http://localhost:3000/" + data.shortUrl);

      currentUser && setIsReLoading(true);

      toast.success("URL shortened successfully!");
    } catch (error) {
      // console.error("Error:", error);
      toast.error("Error shortening URL. Please try again.");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    shortenUrl(longUrl);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    toast.success("Shortened URL copied to clipboard!");
  };

  return (
    <div className="md:w-[400px] w-[300px] mx-auto mt-5 p-5 border-3 font-mono shadow-[8px_8px_0_0_#482307]  ">
      <h2 className="md:text-xl font-bold mb-4">Shorten Your URL</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-sm md:text-base "
      >
        <input
          type="url"
          placeholder="Enter your long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:#482307"
          required
        />

        {currentUser && (
          <div className="">
            <label
              htmlFor="customSlug"
              className="block md:text-lg font-bold mb-3  "
            >
              Custom Slug (optional)
            </label>
            <input
              type="text"
              id="customSlug"
              value={customUrl}
              onChange={(event) => setCustomUrl(event.target.value)}
              placeholder="Enter custom slug"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:#482307"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#482307] text-white p-2
          cursor-pointer loader rounded hover:[#482307] "
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
};

export default ShortenForm;
