import { useState, useEffect } from "react";
import { Clock, ArrowLeft, User, Calendar, Loader2 } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const { id } = useParams(); // Get blog ID from URL params
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://a2f-backend.onrender.com/api/blogs/${id}`,
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

  // Function to handle navigation back to blog list
  const handleBackClick = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading blog content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-md max-w-2xl w-full">
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={handleBackClick}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-md max-w-2xl w-full">
          <p className="text-yellow-700 mb-4">Blog not found</p>
          <button
            onClick={handleBackClick}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Articles
        </button>

        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              {blog.companyTitle}
            </h1>

            <div className="prose max-w-none text-gray-700 mb-6">
              <p className="leading-relaxed text-lg">{blog.description}</p>
            </div>

            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                {blog.time}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-blue-500" />
                {blog.createdBy?.fullname}
              </div>
            </div>

            <img
              src={blog.imageUrl}
              alt={blog.companyTitle}
              className="w-full h-96 object-cover"
            />

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleBackClick}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Articles
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
