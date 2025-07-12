import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast';
import DashboardPage from './pages/DashBoard'
import { MyContextProvider } from './Context/ContextApi'
function App() {

  return (
    <div className="App h-full flex flex-col justify-between">

    <MyContextProvider>
     <BrowserRouter>
      <Navbar />
      <Toaster/>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* <Route path="/dashboard/*" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} /> */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
    </MyContextProvider>
    </div>

  )
}

export default App
