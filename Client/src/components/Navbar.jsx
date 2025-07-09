
import React from 'react'

export default function Navbar() {
  return (
    <div>
        <nav className="text-black py-4 px-28 m-5 rounded-4xl shadow-lg border-3 border-black-700">
            <div className="container mx-auto flex justify-between items-center">
            <a href="/" className=" text-lg font-bold">URL Shortener</a>
            <div>
                <a href="/" className=" hover:text-white px-3 py-2">Home</a>
                <a href="/dashboard" className=" hover:text-white px-3 py-2">Dashboard</a>
                <a href="/login" className=" hover:text-white px-3 py-2">Login</a>
            </div>
            </div>
        </nav>
    </div>
  )
}
