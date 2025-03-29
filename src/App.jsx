import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { ThemeProvider } from "./components/ThemeToggle/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Investor from "./components/Investor/Investor";
import Home from "./components/Home/Home";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/investor" element={<Investor />} />
            {/* Add other routes here as you create the components */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
