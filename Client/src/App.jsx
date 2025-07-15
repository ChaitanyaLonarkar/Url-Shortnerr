import { useContext, useState,useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Navigate, isCookie } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashBoard";
import { MyContextProvider, MyContext } from "./Context/ContextApi";
import PageLoader from "./components/PageLoader";

function App() {
  const { currentUser, setCurrentUser } = useContext(MyContext);

  // const isAuthenticated = () => {
  //   const user = localStorage.getItem("user");
  //   const cookie = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("access_token="));
  //   console.log("Cookie:", cookie);

  //   if (user) {
  //     setCurrentUser(JSON.parse(user));
  //     return true;
  //   }
  //   return false;
  // };
  const [isLoading, setIsLoading] = useState(true);

  // console.log("Current User:", currentUser);
  useEffect(() => {
    // Simulate loading time (remove in production)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust delay as needed
   
  }, [isLoading]);

  return (
    <>
      {/* {isLoading ? (
        <PageLoader />
      ) : ( */}
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
      {/* )}  */}
    </>
  );
}

export default App;
