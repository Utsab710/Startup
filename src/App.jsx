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
import ContactUs from "./components/ContactUs/ContactUs";
import Blog from "./components/Blog/Blog";
import { AuthProvider } from "./Context/AuthContext";
import AdminBlog from "./Admin/components/AdminBlog/AdminBlog";
import Corporate from "./components/Corporate/Corporate";
import BlogDetail from "./components/Blog/BlogDetail";
import About from "./components/About/About";
import AdminPartners from "./Admin/components/Partner/AdminPartners";
import AdminHome from "./Admin/Home/AdminHome";

function App() {
  return (
    <AuthProvider>
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
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/corporate" element={<Corporate />} />
              <Route path="/admin/mentors" element={<Mentors />} />
              <Route path="/admin/investors" element={<Investors />} />
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/blogs" element={<AdminBlog />} />
              <Route path="/admin/partners" element={<AdminPartners />} />
            </Routes>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
