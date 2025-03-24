import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Outlet from "./components/Outlet/Outlet";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
