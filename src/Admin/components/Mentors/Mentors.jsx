// src/components/admin/Mentors.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [formData, setFormData] = useState({
    mentorName: "",
    mentorPosition: "",
    mentorCompany: "",
    linkedinUrl: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/mentor/", {
          withCredentials: true,
        });
        setMentors(response.data || []);
        setFetchLoading(false);
      } catch (error) {
        toast.error("Failed to fetch mentors");
        setFetchLoading(false);
      }
    };
    fetchMentors();
  }, []);

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

    if (!image && !editId) {
      toast.error("Please select an image");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("mentorName", formData.mentorName);
    data.append("mentorPosition", formData.mentorPosition);
    data.append("mentorCompany", formData.mentorCompany);
    data.append("linkedinUrl", formData.linkedinUrl);
    if (image) data.append("image", image);

    try {
      if (editId) {
        const response = await axios.put(
          `http://localhost:8000/api/mentor/update/${editId}`,
          data,
          { withCredentials: true }
        );
        setMentors((prev) =>
          prev.map((mentor) => (mentor._id === editId ? response.data : mentor))
        );
        toast.success("Mentor updated successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/mentor/",
          data,
          { withCredentials: true }
        );
        setMentors((prev) => [...prev, response.data]);
        toast.success("Mentor added successfully!");
      }

      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error processing mentor");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mentor) => {
    setEditId(mentor._id);
    setFormData({
      mentorName: mentor.mentorName,
      mentorPosition: mentor.mentorPosition,
      mentorCompany: mentor.mentorCompany,
      linkedinUrl: mentor.linkedinUrl || "",
    });
    setImage(null);
  };

  const handleDelete = async (mentorId) => {
    if (!window.confirm("Are you sure you want to delete this mentor?")) return;

    try {
      await axios.delete(
        `http://localhost:8000/api/mentor/delete/${mentorId}`,
        {
          withCredentials: true,
        }
      );
      setMentors((prev) => prev.filter((mentor) => mentor._id !== mentorId));
      toast.success("Mentor deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting mentor");
    }
  };

  const resetForm = () => {
    setFormData({
      mentorName: "",
      mentorPosition: "",
      mentorCompany: "",
    });
    setImage(null);
    setEditId(null);
  };

  if (fetchLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Admin - Mentors Management
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {editId ? "Update Mentor" : "Add New Mentor"}
        </h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="max-w-md bg-white shadow-md rounded-lg p-6"
        >
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
              Mentor Image {editId && "(Optional)"}
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
              required={!editId}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="linkedinUrl"
              className="block text-sm font-medium text-gray-700"
            >
              LinkedIn URL (Optional)
            </label>
            <input
              type="text"
              id="linkedinUrl"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          ;
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading
                ? editId
                  ? "Updating Mentor..."
                  : "Adding Mentor..."
                : editId
                ? "Update Mentor"
                : "Add Mentor"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Mentors List
        </h2>
        {mentors.length === 0 ? (
          <p className="text-gray-500">No mentors found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-3">
                  {mentor.imageUrl ? (
                    <img
                      src={mentor.imageUrl}
                      alt={`${mentor.mentorName} image`}
                      className="w-12 h-12 object-cover rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <h3 className="text-lg font-medium text-gray-800">
                    {mentor.mentorName}
                  </h3>
                </div>
                <p className="text-gray-600">
                  Position: {mentor.mentorPosition}
                </p>
                <p className="text-gray-600">Company: {mentor.mentorCompany}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(mentor)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mentor._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Mentors;
