import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";

const AdminQuotes = () => {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [formData, setFormData] = useState({
    quotes: "",
    person: "",
    companyName: "",
    image: null,
  });
  const [editingQuote, setEditingQuote] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all quotes on mount
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/quotes");
        setQuotes(response.data);
      } catch (err) {
        setError("Failed to fetch quotes");
      }
    };
    fetchQuotes();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const data = new FormData();
    data.append("quotes", formData.quotes);
    data.append("person", formData.person);
    data.append("companyName", formData.companyName);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingQuote) {
        // Update quote
        const response = await axios.put(
          `http://localhost:8000/api/quotes/${editingQuote._id}`,
          data,
          { withCredentials: true }
        );
        setQuotes(
          quotes.map((q) => (q._id === editingQuote._id ? response.data : q))
        );
        setSuccess("Quote updated successfully");
        setEditingQuote(null);
      } else {
        // Create quote
        const response = await axios.post(
          "http://localhost:8000/api/quotes",
          data,
          { withCredentials: true }
        );
        setQuotes([response.data, ...quotes]);
        setSuccess("Quote created successfully");
      }
      // Reset form
      setFormData({ quotes: "", person: "", companyName: "", image: null });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save quote");
    }
  };

  // Handle edit button click
  const handleEdit = (quote) => {
    setEditingQuote(quote);
    setFormData({
      quotes: quote.quotes,
      person: quote.person,
      companyName: quote.companyName,
      image: null,
    });
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quote?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/quotes/${id}`, {
        withCredentials: true,
      });
      setQuotes(quotes.filter((q) => q._id !== id));
      setSuccess("Quote deleted successfully");
    } catch (err) {
      setError("Failed to delete quote");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingQuote(null);
    setFormData({ quotes: "", person: "", companyName: "", image: null });
  };

  if (!user || user.role !== "admin") {
    return <div>Unauthorized access</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Quotes Management</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingQuote ? "Update Quote" : "Create New Quote"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quote
            </label>
            <textarea
              name="quotes"
              value={formData.quotes}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Person
            </label>
            <input
              type="text"
              name="person"
              value={formData.person}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              required={!editingQuote}
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              {editingQuote ? "Update" : "Create"}
            </button>
            {editingQuote && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Quotes List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Quotes</h2>
        {quotes.length === 0 ? (
          <p>No quotes available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((quote) => (
              <div
                key={quote._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={quote.imageUrl}
                  alt={quote.person}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <p className="text-gray-700 italic">"{quote.quotes}"</p>
                <p className="text-gray-900 font-medium mt-2">
                  - {quote.person}
                </p>
                <p className="text-gray-600">{quote.companyName}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(quote)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(quote._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminQuotes;
