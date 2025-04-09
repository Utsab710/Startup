import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user info from localStorage to check admin status
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user || user.role !== "admin") {
      setError("You don't have admin privileges");
      setLoading(false);
      return;
    }

    // Make the request with credentials to include the HTTP-only cookie
    axios
      .get("http://localhost:8000/api/users/all-users", {
        withCredentials: true, // This sends the "token" cookie automatically
      })
      .then((res) => {
        // Filter out users with admin role
        const regularUsers = res.data.filter((user) => user.role !== "admin");
        setUsers(regularUsers);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError(
          err.response?.status === 401
            ? "Unauthorized: Authentication failed. Please login again."
            : err.response?.status === 403
            ? "Forbidden: You don't have admin privileges"
            : "Failed to fetch users"
        );
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome back Admin</h1>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">List of regular users:</h2>
          {users.length > 0 ? (
            <ul className="border rounded divide-y">
              {users.map((user, index) => (
                <li key={index} className="p-3 hover:bg-gray-100">
                  <span className="font-medium">{user.name}</span> -{" "}
                  {user.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>No regular users found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default AdminHome;
