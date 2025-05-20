import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/profile",
          { withCredentials: true }
        );
        console.log("Fetched user:", response.data);
        if (response.data.status === "deactivated") {
          console.log("User is deactivated, logging out...");
          await logout();
        } else {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        if (
          error.response?.status === 401 ||
          error.response?.status === 403 ||
          error.response?.data?.message === "Account is deactivated"
        ) {
          console.log("Clearing cookies due to auth error...");
          await logout();
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login response:", response.data);
      if (response.data.status === "deactivated") {
        throw new Error("Account is deactivated");
      }
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
