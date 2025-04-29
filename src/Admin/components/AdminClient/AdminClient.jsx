import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";

function AdminClient() {
  const { user, loading: authLoading } = useAuth();
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);
  const [updateClientId, setUpdateClientId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!authLoading) {
      fetchClients();
    }
  }, [authLoading]);

  const fetchClients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/clients/allClient",
        {
          withCredentials: true,
        }
      );
      setClients(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch clients");
      console.error(error);
    }
  };

  const handleAddClients = async (e) => {
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
      setError("Client name and logo are required");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/clients/addClient",
        formData,
        { withCredentials: true }
      );
      setSuccess("Client added successfully");
      setName("");
      setImage(null);
      fetchClients();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add client");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLogo = async (clientId) => {
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
        `http://localhost:8000/api/client/update-Clientlogo/${clientIdId}`,
        formData,
        { withCredentials: true }
      );
      setSuccess("Client logo updated successfully");
      setUpdateImage(null);
      setUpdateClientId(null);
      fetchClients();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update logo");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePartner = async (clientId) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

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
        `http://localhost:8000/api/client/deleteClient/${clientId}`,
        { withCredentials: true }
      );
      setSuccess("Client deleted successfully");
      fetchClients();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete client");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Clients</h1>

      {/* Add Partner Form */}
      {user.role === "admin" ? (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Client</h2>
          <form onSubmit={handleAddClients} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter client name"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client Logo
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
              {loading ? "Adding..." : "Add Client"}
            </button>
          </form>
        </div>
      ) : (
        <p className="text-red-500 mb-6">
          You are not authorized to add clients.
        </p>
      )}

      {/* Client List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">All Clients</h2>
        {clients.length === 0 ? (
          <p className="text-gray-500">No clients found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div
                key={client._id}
                className="border rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src={client.imageUrl}
                  alt={client.name}
                  className="h-24 w-24 object-contain mb-2"
                />
                <h3 className="text-lg font-medium text-gray-800">
                  {client.name}
                </h3>
                {user.role === "admin" && (
                  <div className="mt-4 space-y-2 w-full">
                    {updateClientId === client._id ? (
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
                            onClick={() => handleUpdateLogo(client._id)}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                            disabled={loading}
                          >
                            {loading ? "Updating..." : "Save"}
                          </button>
                          <button
                            onClick={() => setUpdateClientId(null)}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setUpdateClientId(client._id)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        disabled={loading}
                      >
                        Update Logo
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteClient(client._id)}
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
}
export default AdminClient;
