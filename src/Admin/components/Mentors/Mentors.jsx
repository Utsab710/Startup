// src/components/admin/AddMentorForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Optional: for notifications
import "react-toastify/dist/ReactToastify.css";

const Mentors = () => {
  const [formData, setFormData] = useState({
    mentorName: "",
    mentorPosition: "",
    mentorCompany: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("mentorName", formData.mentorName);
    data.append("mentorPosition", formData.mentorPosition);
    data.append("mentorCompany", formData.mentorCompany);
    data.append("image", image);

    try {
      const userString = localStorage.getItem("user"); // Assuming you store JWT token in localStorage
      const user = userString ? JSON.parse(userString) : null;
      const response = await axios.post(
        "http://localhost:8000/api/mentor",
        data,
        {
          withCredentials: true,
        }
      );

      toast.success("Mentor added successfully!");
      // Reset form
      setFormData({
        mentorName: "",
        mentorPosition: "",
        mentorCompany: "",
      });
      setImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding mentor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Mentor</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label
            htmlFor="mentorName"
            className="block text-sm font-medium text-gray-700"
          >
            Mentor Name
          </label>
          <input
            type="text"
            id="mentorName"
            name="mentorName"
            value={formData.mentorName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="mentorPosition"
            className="block text-sm font-medium text-gray-700"
          >
            Position
          </label>
          <input
            type="text"
            id="mentorPosition"
            name="mentorPosition"
            value={formData.mentorPosition}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="mentorCompany"
            className="block text-sm font-medium text-gray-700"
          >
            Company
          </label>
          <input
            type="text"
            id="mentorCompany"
            name="mentorCompany"
            value={formData.mentorCompany}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Mentor Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {loading ? "Adding Mentor..." : "Add Mentor"}
        </button>
      </form>
    </div>
  );
};

export default Mentors;
