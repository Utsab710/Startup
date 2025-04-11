import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";

const AdminPartners = () => {
  const { user, loading: authLoading } = useAuth();
  const [partners, setPartners] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);
  const [updatePartnerId, setUpdatePartnerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Log user data for debugging
  useEffect(() => {
    console.log("Current user:", user);
  }, [user]);

  // Fetch all partners on component mount, but only after auth is loaded
  useEffect(() => {
    if (!authLoading) {
      fetchPartners();
    }
  }, [authLoading]);

  const fetchPartners = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/partners/all",
        { withCredentials: true }
      );
      setPartners(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch partners");
      console.error(err);
    }
  };

  // Handle adding a new partner
  const handleAddPartner = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!user || user.role !== "admin") {
      setError("You are not authorized to perform this action");
      setLoading(false);
      return;
    }

    if (!name || !image) {
      setError("Partner name and logo are required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/partners/add",
        formData,
        { withCredentials: true }
      );
      setSuccess("Partner added successfully");
      setName("");
      setImage(null);
      fetchPartners();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add partner");
    } finally {
      setLoading(false);
    }
  };

  // Handle updating a partner's logo
  const handleUpdateLogo = async (partnerId) => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!user || user.role !== "admin") {
      setError("You are not authorized to perform this action");
      setLoading(false);
      return;
    }

    if (!updateImage) {
      setError("New logo is required");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", updateImage);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/partners/update-logo/${partnerId}`,
        formData,
        { withCredentials: true }
      );
      setSuccess("Partner logo updated successfully");
      setUpdateImage(null);
      setUpdatePartnerId(null);
      fetchPartners();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update logo");
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a partner
  const handleDeletePartner = async (partnerId) => {
    if (!window.confirm("Are you sure you want to delete this partner?"))
      return;

    setLoading(true);
    setError("");
    setSuccess("");

    if (!user || user.role !== "admin") {
      setError("You are not authorized to perform this action");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/partners/delete/${partnerId}`,
        { withCredentials: true }
      );
      setSuccess("Partner deleted successfully");
      fetchPartners();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete partner");
    } finally {
      setLoading(false);
    }
  };

  // Handle image preview for add partner
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle image preview for update logo
  const handleUpdateImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdateImage(file);
    }
  };

  if (authLoading) {
    return <div className="text-center p-6">Loading user data...</div>;
  }

  if (!user) {
    return (
      <div className="text-center p-6 text-red-500">
        Please log in to manage partners.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Partners</h1>

      {/* Add Partner Form */}
      {user.role === "admin" ? (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Partner</h2>
          <form onSubmit={handleAddPartner} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Partner Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter partner name"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Partner Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={loading}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Partner"}
            </button>
          </form>
        </div>
      ) : (
        <p className="text-red-500 mb-6">
          You are not authorized to add partners.
        </p>
      )}

      {/* Partner List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">All Partners</h2>
        {partners.length === 0 ? (
          <p className="text-gray-500">No partners found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner._id}
                className="border rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src={partner.imageUrl}
                  alt={partner.name}
                  className="h-24 w-24 object-contain mb-2"
                />
                <h3 className="text-lg font-medium text-gray-800">
                  {partner.name}
                </h3>
                {user.role === "admin" && (
                  <div className="mt-4 space-y-2 w-full">
                    {updatePartnerId === partner._id ? (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUpdateImageChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          disabled={loading}
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdateLogo(partner._id)}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                            disabled={loading}
                          >
                            {loading ? "Updating..." : "Save"}
                          </button>
                          <button
                            onClick={() => setUpdatePartnerId(null)}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setUpdatePartnerId(partner._id)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        disabled={loading}
                      >
                        Update Logo
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePartner(partner._id)}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPartners;
