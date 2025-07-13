import { useContext, useState,useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashBoard";
import { MyContextProvider, MyContext } from "./Context/ContextApi";
import PageLoader from "./components/PageLoader";

function App() {
  const { currentUser, setCurrentUser } = useContext(MyContext);

  const isAuthenticated = () => {
    return currentUser !== null && currentUser !== undefined;
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (remove in production)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust delay as needed
  }, []);

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="App h-full flex flex-col justify-between">
          <BrowserRouter>
            <Navbar />
            <Toaster />
            <Routes>
              {/* <Route path="/" element={<Navigate to="/login" />} /> */}
              <Route
                path="/"
                element={currentUser ? <DashboardPage /> : <Home />}
              />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/dashboard"
                element={
                  currentUser ? <DashboardPage /> : <Navigate to="/login" />
                }
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      )}
    </>
  );
}

export default App;
