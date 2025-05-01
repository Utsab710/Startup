import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext"; // Adjust path as needed

const AdminEvents = () => {
  const { logout } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    type: "default",
    description: "",
  });

  // Validation error state
  const [validationError, setValidationError] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);

  const API_URL = "http://localhost:8000/api/events";

  // Get today's date in YYYY-MM-DD format for min attribute
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  // API headers with credentials
  const getHeaders = () => {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
  };

  // Fetch all events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, getHeaders());
      setEvents(response.data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        await logout();
        window.location.href = "/login";
      } else {
        setError("Failed to fetch events. Please try again.");
        console.error("Error fetching events:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationError(null); // Clear validation error on input change
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      type: "default",
      description: "",
    });
    setIsEditing(false);
    setCurrentEvent(null);
    setValidationError(null);
  };

  // Open modal for creating a new event
  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  // Open modal for editing an event
  const openEditModal = (event) => {
    const formattedDate = new Date(event.date).toISOString().split("T")[0];
    setFormData({
      title: event.title,
      date: formattedDate,
      time: event.time,
      type: event.type,
      description: event.description || "",
    });
    setIsEditing(true);
    setCurrentEvent(event);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Validate date and time
  const validateDateTime = () => {
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for comparison

    // Check if date is in the past
    if (selectedDate < today) {
      return "Cannot select a past date.";
    }

    // If date is today, check if time is in the past
    if (selectedDate.getTime() === today.getTime()) {
      const [hours, minutes] = formData.time.split(":").map(Number);
      const selectedTime = new Date();
      selectedTime.setHours(hours, minutes);

      const currentTime = new Date();
      if (selectedTime <= currentTime) {
        return "Cannot select a past time for today.";
      }
    }

    return null;
  };

  // Create new event
  const createEvent = async (e) => {
    e.preventDefault();
    const validationMsg = validateDateTime();
    if (validationMsg) {
      setValidationError(validationMsg);
      return;
    }

    try {
      const response = await axios.post(API_URL, formData, getHeaders());
      setEvents([response.data, ...events]);
      closeModal();
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        await logout();
        window.location.href = "/login";
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to create event. Please try again."
        );
        console.error("Error creating event:", err);
      }
    }
  };

  // Update existing event
  const updateEvent = async (e) => {
    e.preventDefault();
    const validationMsg = validateDateTime();
    if (validationMsg) {
      setValidationError(validationMsg);
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/${currentEvent._id}`,
        formData,
        getHeaders()
      );
      setEvents(
        events.map((event) =>
          event._id === currentEvent._id ? response.data : event
        )
      );
      closeModal();
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        await logout();
        window.location.href = "/login";
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to update event. Please try again."
        );
        console.error("Error updating event:", err);
      }
    }
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this event? This will also remove all registrations for this event."
      )
    ) {
      try {
        await axios.delete(`${API_URL}/${eventId}`, getHeaders());
        setEvents(events.filter((event) => event._id !== eventId));
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          await logout();
          window.location.href = "/login";
        } else {
          setError("Failed to delete event. Please try again.");
          console.error("Error deleting event:", err);
        }
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Event type badge color
  const getEventTypeColor = (type) => {
    switch (type) {
      case "investor":
        return "bg-purple-100 text-purple-800";
      case "info":
        return "bg-blue-100 text-blue-800";
      case "pitch":
        return "bg-green-100 text-green-800";
      case "product":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add New Event
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded">
          <p className="text-gray-600">
            No events found. Create one to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {event.title}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {event.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(event.date)}
                    </div>
                    <div className="text-sm text-gray-500">{event.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEventTypeColor(
                        event.type
                      )}`}
                    >
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(event)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditing ? "Edit Event" : "Create New Event"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {validationError && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {validationError}
              </div>
            )}

            <form onSubmit={isEditing ? updateEvent : createEvent}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={getTodayDate()} // Restrict past dates
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="time"
                >
                  Time
                </label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="type"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="default">Default</option>
                  <option value="investor">Investor</option>
                  <option value="info">Information</option>
                  <option value="pitch">Pitch</option>
                  <option value="product">Product</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  placeholder="Enter event description..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                >
                  {isEditing ? "Update Event" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
