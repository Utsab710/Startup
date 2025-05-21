// Blog.jsx - Blog List Component
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_RENDER}/api/blogs`,
          {
            withCredentials: true,
          }
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // This function simulates clicking on a blog to navigate to details
  // In a real app with React Router, you'd use Link or navigate
  const handleReadMore = (blogId) => {
    navigate(`/blog/${blogId}`); // Navigate to the blog detail page
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Our Blog</h1>
        <p className="text-gray-600 mb-8 text-lg">
          The latest insights and updates from our team
        </p>

        {blogs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">
              No blogs available at this time
            </p>
            <p className="text-gray-400 mt-2">
              Check back soon for new content
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={blog.imageUrl}
                    alt={blog.companyTitle}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {blog.companyTitle}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {blog.description}
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      {new Date(blog.date).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleReadMore(blog._id)}
                      className="text-blue-600 font-medium group-hover:text-blue-800 flex items-center hover:underline"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
