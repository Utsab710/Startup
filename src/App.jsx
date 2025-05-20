import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "./components/ThemeToggle/ThemeContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import { AuthProvider } from "./context/AuthContext";
import AdminBlog from "./Admin/components/AdminBlog/AdminBlog";
import Corporate from "./components/Corporate/Corporate";
import BlogDetail from "./components/Blog/BlogDetail";
import About from "./components/About/About";
import AdminPartners from "./Admin/components/Partner/AdminPartners";
import AdminHome from "./Admin/Home/AdminHome";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AdminClient from "./Admin/components/AdminClient/AdminClient";
import AdminHeader from "./Admin/Header/AdminHeader";
import ReorderHeader from "./Admin/components/ReorderHeader/ReorderHeader";
import TopBar from "./components/TopBar/TopBar";
import Government from "./components/Government/Government";
import Internship from "./components/Internship/Internship";
import Events from "./components/Events/Events";
import Team from "./components/Team/Team";
import AdminEvents from "./Admin/components/Events/AdminEvents";
import AdminQuotes from "./Admin/components/AdminQuotes/AdminQuotes";
import Mentor from "./components/Mentor/Mentor";
import A2FLink from "./Admin/components/Link/A2FLink/A2FLink";
import AdminContact from "./Admin/components/AdminContact/AdminContact";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/investor" element={<Investor />} />
        <Route path="/startup" element={<Startup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/government" element={<Government />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/event" element={<Events />} />
        <Route path="/about/team" element={<Team />} />
        <Route path="/mentor" element={<Mentor />} />
        {/* Protect admin routes */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/mentors"
          element={
            <ProtectedRoute requireAdmin={true}>
              <Mentors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/investors"
          element={
            <ProtectedRoute requireAdmin={true}>
              <Investors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/link"
          element={
            <ProtectedRoute requireAdmin={true}>
              <A2FLink />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/partners"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPartners />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/clients"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminClient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reorderheader"
          element={
            <ProtectedRoute requireAdmin={true}>
              <ReorderHeader />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/quotes"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminQuotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminContact />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
