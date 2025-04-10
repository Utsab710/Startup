// src/Admin/components/AdminBlog.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminBlog() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyTitle: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/blogs", {
          withCredentials: true,
        });
        setBlogs(response.data);
      } catch (error) {
        setError(
          "Error fetching blogs: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        setFetchLoading(false);
      }
    };

    if (user && user.role === "admin") {
      fetchBlogs();
    }
  }, [user]);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    console.log("User state:", user);
    if (!authLoading && !user) {
      navigate("/login");
    } else if (!authLoading && user && user.role !== "admin") {
      setError("Access denied. Admins only.");
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "admin") return;

    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("companyTitle", formData.companyTitle);
      data.append("description", formData.description);
      data.append("image", image);

      const response = await axios.post(
        "http://localhost:8000/api/blogs",
        data,
        {
          withCredentials: true,
        }
      );

      setFormData({ companyTitle: "", description: "" });
      setImage(null);
      setBlogs([response.data, ...blogs]); // Add new blog to the list
      alert("Blog created successfully!");
    } catch (error) {
      if (error.response?.status === 403) {
        setError("Access denied. Admins only.");
      } else {
        setError(
          "Error creating blog: " +
            (error.response?.data?.message || error.message)
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    if (!user || user.role !== "admin") return;

    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    setLoading(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:8000/api/blogs/${blogId}`, {
        withCredentials: true,
      });

      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      alert("Blog deleted successfully!");
    } catch (error) {
      if (error.response?.status === 403) {
        setError("Access denied. Admins only.");
      } else {
        setError(
          "Error deleting blog: " +
            (error.response?.data?.message || error.message)
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || fetchLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Manage Blogs</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Blog Creation Form */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Create New Blog</h3>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Title
            </label>
            <input
              type="text"
              name="companyTitle"
              value={formData.companyTitle}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required
              className="mt-1 block w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !user || user.role !== "admin"}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </form>
      </div>

      {/* Blog List with Delete Option */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Existing Blogs</h3>
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={blog.imageUrl}
                  alt={blog.companyTitle}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">
                    {blog.companyTitle}
                  </h4>
                  <p className="text-gray-600 mb-2">{blog.description}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(blog.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">Time: {blog.time}</p>
                  <p className="text-sm text-gray-500">
                    Created by: {blog.createdBy?.fullname}
                  </p>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    disabled={loading}
                    className="mt-2 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 disabled:bg-red-300"
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBlog;
