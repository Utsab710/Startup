// src/components/Blog/Blog.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/blogs", {
          withCredentials: true,
        });
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Blogs</h2>
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
                <h3 className="text-xl font-semibold mb-2">
                  {blog.companyTitle}
                </h3>
                <p className="text-gray-600 mb-2">
                  {blog.description.length > 50
                    ? `${blog.description.substring(0, 50)}...`
                    : blog.description}
                </p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
