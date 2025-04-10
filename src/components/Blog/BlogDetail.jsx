// src/components/Blog/BlogDetail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function BlogDetail() {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/blogs/${id}`,
          {
            withCredentials: true,
          }
        );
        setBlog(response.data);
      } catch (error) {
        setError(
          "Error fetching blog: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">{error}</p>
        <Link to="/blog" className="text-blue-600 hover:text-blue-800">
          Back to Blogs
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500">Blog not found</p>
        <Link to="/blog" className="text-blue-600 hover:text-blue-800">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">{blog.companyTitle}</h2>
      <img
        src={blog.imageUrl}
        alt={blog.companyTitle}
        className="w-full max-w-2xl mx-auto h-auto object-cover rounded-lg mb-6"
      />
      <div className="prose max-w-2xl mx-auto">
        <p className="text-gray-700 mb-4">{blog.description}</p>
        <p className="text-sm text-gray-500">
          Date: {new Date(blog.date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500">Time: {blog.time}</p>
        <p className="text-sm text-gray-500">
          Created by: {blog.createdBy?.fullname}
        </p>
      </div>
      <Link
        to="/blog"
        className="mt-6 inline-block text-blue-600 hover:text-blue-800 font-medium"
      >
        Back to Blogs
      </Link>
    </div>
  );
}

export default BlogDetail;
