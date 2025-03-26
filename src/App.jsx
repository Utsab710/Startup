import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Outlet from "./components/Outlet/Outlet";
import { ThemeProvider } from "./components/ThemeToggle/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div>
        <Header />
        <Outlet />

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
