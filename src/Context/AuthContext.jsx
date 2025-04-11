// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start as true for initial fetch

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/profile",
          { withCredentials: true }
        );
        console.log("Fetched user:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login response:", response.data);
      const userData = response.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8000/api/users/logout", // Updated to match user routes
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
