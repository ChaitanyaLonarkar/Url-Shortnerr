import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { use } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const UserUrl = ({isReLoading, setIsReLoading}) => {
  const [urls, setUrls] = useState({ urls: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

  const fetchUrls = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await axiosInstance.get("/api/urls");
      setUrls(res.data);
      // console.log("Fetched URLs:", res.data);
    } catch (error) {
      setIsError(true);
      // console.error("Error fetching URLs:", error);
    } finally {
      setIsLoading(false);
      setIsReLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/url/delete/${id}`);
      // fetchUrls();
      setIsReLoading(true);
      toast.success("URL deleted successfully!");
      fetchUrls();
    } catch (error) {
      console.error("Error deleting URL:", error);
      toast.error("Failed to delete URL. Please try again.");
    }
    finally{
      setIsReLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [isReLoading]);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }


  if (isLoading ||isReLoading) {
    return (
      <div className="flex justify-center my-8 h-56 items-center">
        <div className="animate-pulse ">
          <svg
          className="w-14 h-12 mx-auto text-[#482307] mb-3"
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
          <p className="text-gray-500 ">Loading URLs...</p>
        </div>
      </div>
    );
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-gray-500 my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <svg
          className="w-12 h-12 mx-auto text-gray-400 mb-3"
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
        <p className="text-lg font-medium">No URLs found</p>
        <p className="mt-1">You haven't created any shortened URLs yet.</p>
      </div>
    );
  }

  return (
    <div className=" w-[fit-content] mx-auto border-3 p-3 md:p-5 mt-12 shadow-[8px_8px] overflow-hidden">
      <h2 className="text-lg md:text-2xl font-bold mb-4">Your URLs</h2>
      <div className="overflow-x-auto h-56">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-[#F8EEDB]">
            <tr>
              <th
                scope="col"
                className="px-2 py-2 md:px-6 md:py-4 text-left text-xs font-medium  uppercase tracking-wider"
              >
                Original URL
              </th>
              <th
                scope="col"
                className="px-2 py-2 md:px-6 md:py-4 text-left text-xs font-medium uppercase tracking-wider"
              >
                Short URL
              </th>
             
              <th
                scope="col"
                className="px-2 py-2 md:px-6 md:py-4 text-left text-xs font-medium  uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {urls.urls.reverse().map((url) => (
              <tr key={url._id} className="hover:bg-[#f3efe6]">
                <td className="w-[200px] px-2 py-2 md:px-6 md:py-4">
                  <div className="text-sm  truncate max-w-xs">
                    {url.longUrl}
                  </div>
                </td>
                <td className="px-2 py-2 md:px-6 md:py-4">
                  <div className="text-sm">
                    <a
                      href={`http://localhost:3000/${url.shortUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900 hover:underline"
                    >
                      {`localhost:3000/${url.shortUrl}`}
                    </a>
                  </div>
                </td>
                
                <td className="px-2 py-2 md:px-6 md:py-4 text-sm font-medium flex">
                  <button
                    onClick={() =>
                      handleCopy(
                        `http://localhost:3000/${url.shortUrl}`,
                        url._id
                      )
                    }
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm cursor-pointer ${
                      copiedId === url._id
                        ? "bg-[#E15549] text-white hover:bg-[#f0958d]"
                        : "bg-[#482307] text-white hover:bg-[#674831]"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#482307] transition-colors duration-200 w-[100px] `} 
                  >
                    {copiedId === url._id ? (
                      <>
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          ></path>
                        </svg>
                        Copy URL
                      </>
                    )}
                  </button>

                  <button
                  className="px-3 py-1 cursor-pointer" onClick={() => handleDelete(url._id)}>
                    ❌ URL
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserUrl;
