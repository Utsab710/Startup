import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "./components/ThemeToggle/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Investor from "./components/Investor/Investor";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Mentors from "./Admin/components/Mentors/Mentors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Investors from "./Admin/components/Investors/Investors";
import Startup from "./components/Startup/Startup";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/investor" element={<Investor />} />
            <Route path="/startup" element={<Startup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin/mentors" element={<Mentors />} />
            <Route path="/admin/investors" element={<Investors />} />
          </Routes>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
