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
        const response = await axios.get(
          `${import.meta.env.VITE_RENDER}/api/mentor/`,
          {
            withCredentials: true,
          }
        );
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
          `${import.meta.env.VITE_RENDER}/api/mentor/update/${editId}`,
          data,
          { withCredentials: true }
        );
        setMentors((prev) =>
          prev.map((mentor) => (mentor._id === editId ? response.data : mentor))
        );
        toast.success("Mentor updated successfully!");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_RENDER}/api/mentor/`,
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
        `${import.meta.env.VITE_RENDER}/api/mentor/delete/${mentorId}`,
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
      linkedinUrl: "",
    });
    setImage(null);
    setEditId(null);
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Loading mentors...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            <span className="text-indigo-600">Mentors</span> Management
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Add, edit and manage your platform's mentors
          </p>
        </div>

        {/* Form Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      editId
                        ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        : "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    }
                  />
                </svg>
                {editId ? "Update Existing Mentor" : "Add New Mentor"}
              </h2>

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-8"
              >
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {/* Mentor Name */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="mentorName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="mentorName"
                        name="mentorName"
                        value={formData.mentorName}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Utsab Shrestha"
                        required
                      />
                    </div>
                  </div>

                  {/* LinkedIn URL */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="linkedinUrl"
                      className="block text-sm font-medium text-gray-700"
                    >
                      LinkedIn URL{" "}
                      <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="linkedinUrl"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                    </div>
                  </div>

                  {/* Position */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="mentorPosition"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Position
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="mentorPosition"
                        name="mentorPosition"
                        value={formData.mentorPosition}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Senior Developer"
                        required
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="mentorCompany"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="mentorCompany"
                        name="mentorCompany"
                        value={formData.mentorCompany}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Tech Company Inc."
                        required
                      />
                    </div>
                  </div>

                  {/* Mentor Image */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Profile Image{" "}
                      {editId && (
                        <span className="text-gray-400 text-xs">
                          (Optional if updating)
                        </span>
                      )}
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        <svg
                          className="h-8 w-8 text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <div className="ml-5 flex-1">
                        <input
                          type="file"
                          id="image"
                          name="image"
                          onChange={handleImageChange}
                          accept="image/*"
                          className="py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          required={!editId}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  {editId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                      loading
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {editId ? "Updating..." : "Adding..."}
                      </>
                    ) : (
                      <>{editId ? "Update Mentor" : "Add Mentor"}</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Mentors List Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Mentors Directory
            </h2>
            <div className="text-right">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {mentors.length} {mentors.length === 1 ? "Mentor" : "Mentors"}
              </span>
            </div>
          </div>

          {mentors.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-10 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No mentors
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding a new mentor.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mentors.map((mentor) => (
                <div
                  key={mentor._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {mentor.imageUrl ? (
                        <img
                          src={mentor.imageUrl}
                          alt={`${mentor.mentorName}`}
                          className="h-16 w-16 rounded-full object-cover border-2 border-indigo-100"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-2xl font-medium text-indigo-600">
                            {mentor.mentorName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {mentor.mentorName}
                        </h3>
                        <p className="text-indigo-600 font-medium">
                          {mentor.mentorPosition}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <span>{mentor.mentorCompany}</span>
                      </div>
                      {mentor.linkedinUrl && (
                        <div className="flex items-center text-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          <a
                            href={mentor.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <button
                        onClick={() => handleEdit(mentor)}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(mentor._id)}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mentors;
