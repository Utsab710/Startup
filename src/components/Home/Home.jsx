import React, { useEffect, useState } from "react";

import Outlet from "../Outlet/Outlet";
import AdminHome from "../../Admin/Home/AdminHome";

function Home() {
  const [userRole, setUserRole] = useState("");
  console.log(import.meta.env.VITE_RENDER, "RENDER");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUserRole(user.role || "user");
    }
  }, []);
  return userRole === "admin" ? (
    <AdminHome />
  ) : (
    <div>
      <Outlet />
    </div>
  );
}

export default Home;
