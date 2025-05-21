import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import { useTheme } from "../../../components/ThemeToggle/ThemeContext";
import { Calendar, Trash2, Edit, AlertTriangle, Plus } from "lucide-react";

const AdminEvents = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const { isDarkMode } = useTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("manage");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    type: "default",
    description: "",
  });
  const [validationError, setValidationError] = useState("");

  const API_URL = `${process.env.RENDER}/api/events`;

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // API headers
  const getHeaders = () => ({
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  // Fetch events
  const fetchEvents = async () => {
    setFetchLoading(true);
    try {
      const response = await axios.get(API_URL, getHeaders());
      setEvents(response.data);
      setError("");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        await logout();
        window.location.href = "/login";
      } else {
        setError(err.response?.data?.message || "Failed to fetch events.");
      }
    } finally {
      setFetchLoading(false);
      setLoading(false);
    }
  };

  // Initial fetch and auth check
  useEffect(() => {
    if (!authLoading && user && user.role === "admin") {
      fetchEvents();
    } else if (!authLoading && (!user || user.role !== "admin")) {
      setError("Please log in as an admin to view events.");
      setLoading(false);
    }
  }, [user, authLoading]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationError("");
  };

  // Reset form
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
    setValidationError("");
  };

  // Open modal
  const openModal = (event = null) => {
    if (event) {
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
    } else {
      resetForm();
    }
    setShowModal(true);
    setActiveTab("create");
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    resetForm();
    setActiveTab("manage");
  };

  // Validate date and time
  const validateDateTime = () => {
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return "Cannot select a past date.";
    }

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationMsg = validateDateTime();
    if (validationMsg) {
      setValidationError(validationMsg);
      return;
    }

    setFetchLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isEditing) {
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
        setSuccess("Event updated successfully!");
      } else {
        const response = await axios.post(API_URL, formData, getHeaders());
        setEvents([response.data, ...events]);
        setSuccess("Event created successfully!");
      }
      closeModal();
    } catch (err) {
      if ([401, 403].some((status) => err.response?.status === status)) {
        setError("Session expired or unauthorized. Please log in again.");
        await logout();
        window.location.href = "/login";
      } else {
        setError(err.response?.data?.message || "Failed to save event.");
      }
    } finally {
      setFetchLoading(false);
    }
  };

  // Delete event
  const handleDelete = async (eventId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this event? This will also remove all registrations."
      )
    )
      return;

    setFetchLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.delete(`${API_URL}/${eventId}`, getHeaders());
      setEvents(events.filter((event) => event._id !== eventId));
      setSuccess("Event deleted successfully!");
    } catch (err) {
      if ([401, 403].some((status) => err.response?.status === status)) {
        setError("Session expired or unauthorized. Please log in again.");
        await logout();
        window.location.href = "/login";
      } else {
        setError(err.response?.data?.message || "Failed to delete event.");
      }
    } finally {
      setFetchLoading(false);
    }
  };

  // Clear notifications after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Format date for display
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Event type badge color
  const getEventTypeColor = (type) => {
    switch (type) {
      case "investor":
        return isDarkMode
          ? "bg-purple-900 text-purple-300"
          : "bg-purple-100 text-purple-800";
      case "info":
        return isDarkMode
          ? "bg-blue-900 text-blue-300"
          : "bg-blue-100 text-blue-800";
      case "pitch":
        return isDarkMode
          ? "bg-green-900 text-green-300"
          : "bg-green-100 text-green-800";
      case "product":
        return isDarkMode
          ? "bg-yellow-900 text-yellow-300"
          : "bg-yellow-100 text-yellow-800";
      default:
        return isDarkMode
          ? "bg-gray-700 text-gray-300"
          : "bg-gray-100 text-gray-800";
    }
  };

  if (authLoading || loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
          <p
            className={`mt-4 text-lg font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Loading events...
          </p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`text-center p-8 rounded-lg shadow-lg ${
            isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"
          }`}
        >
          <AlertTriangle
            className="mx-auto h-12 w-12 text-red-500"
            aria-hidden="true"
          />
          <h3 className="mt-2 text-lg font-medium">Unauthorized Access</h3>
          <p className="mt-1 text-sm text-gray-500">
            You don't have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Event <span className="text-indigo-600">Management</span>
          </h1>
          <p
            className={`mt-3 max-w-2xl mx-auto text-xl ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            } sm:mt-4`}
          >
            Create and manage events for your platform
          </p>
        </div>

        {/* Notification Alerts */}
        {(success || error) && (
          <div className="mb-6">
            {success && (
              <div
                className={`bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-sm ${
                  isDarkMode ? "bg-green-900/50" : ""
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-green-300" : "text-green-700"
                      }`}
                    >
                      {success}
                    </p>
                  </div>
                  <div className="ml-auto pl-3">
                    <button
                      type="button"
                      className={`inline-flex ${
                        isDarkMode
                          ? "text-green-400 hover:text-green-300"
                          : "text-green-500 hover:text-green-600"
                      }`}
                      onClick={() => setSuccess("")}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div
                className={`bg-red-50 border-l-4 border-green-500 p-4 rounded-md shadow-sm ${
                  isDarkMode ? "bg-red-900/50" : ""
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-red-300" : "text-red-700"
                      }`}
                    >
                      {error}
                    </p>
                  </div>
                  <div className="ml-auto pl-3">
                    <button
                      type="button"
                      className={`inline-flex ${
                        isDarkMode
                          ? "text-red-400 hover:text-red-300"
                          : "text-red-500 hover:text-red-600"
                      }`}
                      onClick={() => setError("")}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Navigation */}
        <div
          className={`bg-white rounded-2xl shadow-xl overflow-hidden mb-8 ${
            isDarkMode ? "bg-gray-800" : ""
          }`}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => {
                  setActiveTab("create");
                  openModal();
                }}
                className={`py-3 px-6 font-medium text-lg ${
                  activeTab === "create"
                    ? isDarkMode
                      ? "text-indigo-400 border-b-2 border-indigo-400"
                      : "text-indigo-600 border-b-2 border-indigo-600"
                    : isDarkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                } focus:outline-none`}
              >
                Create New Event
              </button>
              <button
                onClick={() => setActiveTab("manage")}
                className={`py-3 px-6 font-medium text-lg ${
                  activeTab === "manage"
                    ? isDarkMode
                      ? "text-indigo-400 border-b-2 border-indigo-400"
                      : "text-indigo-600 border-b-2 border-indigo-600"
                    : isDarkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                } focus:outline-none`}
              >
                Manage Events {events.length > 0 && `(${events.length})`}
              </button>
            </div>
          </div>
        </div>

        {/* Create Event Modal */}
        {showModal && activeTab === "create" && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
            <div
              className={`rounded-2xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 scale-95 sm:scale-100 ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300"
                  : "bg-white text-gray-900"
              }`}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-extrabold flex items-center">
                  <Plus
                    size={28}
                    className={`mr-3 ${
                      isDarkMode ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  />
                  {isEditing ? "Edit Event" : "Create New Event"}
                </h2>
                <button
                  onClick={closeModal}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode
                      ? "text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                {validationError && (
                  <div
                    className={`mb-6 p-4 rounded-md flex items-center ${
                      isDarkMode
                        ? "bg-red-900/50 text-red-300"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {validationError}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium"
                      >
                        Event Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter event title"
                        className={`mt-1 block w-full sm:text-sm border rounded-md py-2 px-3 transition-all duration-200 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-300 focus:ring-indigo-400 focus:border-indigo-400 hover:border-gray-500"
                            : "bg-white border-gray-300 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400"
                        } disabled:opacity-50`}
                        disabled={fetchLoading}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium"
                        >
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={getTodayDate()}
                          required
                          className={`mt-1 block w-full sm:text-sm border rounded-md py-2 px-3 transition-all duration-200 ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 text-gray-300 focus:ring-indigo-400 focus:border-indigo-400 hover:border-gray-500"
                              : "bg-white border-gray-300 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400"
                          } disabled:opacity-50`}
                          disabled={fetchLoading}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="time"
                          className="block text-sm font-medium"
                        >
                          Time
                        </label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className={`mt-1 block w-full sm:text-sm border rounded-md py-2 px-3 transition-all duration-200 ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 text-gray-300 focus:ring-indigo-400 focus:border-indigo-400 hover:border-gray-500"
                              : "bg-white border-gray-300 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400"
                          } disabled:opacity-50`}
                          disabled={fetchLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium"
                      >
                        Event Type
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className={`mt-1 block w-full sm:text-sm border rounded-md py-2 px-3 transition-all duration-200 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-300 focus:ring-indigo-400 focus:border-indigo-400 hover:border-gray-500"
                            : "bg-white border-gray-300 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400"
                        } disabled:opacity-50`}
                        disabled={fetchLoading}
                      >
                        <option value="default">Default</option>
                        <option value="investor">Investor</option>
                        <option value="info">Information</option>
                        <option value="pitch">Pitch</option>
                        <option value="product">Product</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter event description..."
                        className={`mt-1 block w-full sm:text-sm border rounded-md py-2 px-3 h-36 transition-all duration-200 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-300 focus:ring-indigo-400 focus:border-indigo-400 hover:border-gray-500"
                            : "bg-white border-gray-300 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400"
                        } disabled:opacity-50`}
                        disabled={fetchLoading}
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={closeModal}
                        className={`py-2 px-6 border shadow-sm text-sm font-medium rounded-md transition-all duration-200 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500"
                            : "bg-gray-200 border-gray-300 text-gray-800 hover:bg-gray-300 hover:border-gray-400"
                        } focus:outline-none disabled:opacity-50`}
                        disabled={fetchLoading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={fetchLoading}
                        className={`inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white transition-all duration-200 ${
                          fetchLoading
                            ? "bg-indigo-400 cursor-not-allowed"
                            : isDarkMode
                            ? "bg-indigo-700 hover:bg-indigo-600"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50`}
                      >
                        {fetchLoading ? (
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
                            {isEditing ? "Updating..." : "Creating..."}
                          </>
                        ) : isEditing ? (
                          "Update Event"
                        ) : (
                          "Create Event"
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Preview Panel */}
                  <div
                    className={`p-6 rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-700"
                        : "bg-gray-50 border-gray-200"
                    } hidden lg:block`}
                  >
                    <h3
                      className={`text-lg font-semibold ${
                        isDarkMode ? "text-gray-200" : "text-gray-800"
                      } mb-4`}
                    >
                      Preview
                    </h3>
                    <div
                      className={`rounded-lg shadow overflow-hidden ${
                        isDarkMode ? "bg-gray-800" : "bg-white"
                      }`}
                    >
                      <div
                        className={`h-32 ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-200"
                        } flex items-center justify-center`}
                      >
                        <svg
                          className={`h-12 w-12 ${
                            isDarkMode ? "text-gray-500" : "text-gray-400"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="p-4">
                        <h4
                          className={`text-lg font-semibold ${
                            isDarkMode ? "text-gray-200" : "text-gray-800"
                          } mb-2`}
                        >
                          {formData.title || "Event Title"}
                        </h4>
                        <div className="flex items-center text-sm mb-2">
                          <Calendar
                            size={16}
                            className={`mr-2 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <span
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }
                          >
                            {formData.date
                              ? new Date(formData.date).toLocaleDateString(
                                  undefined,
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )
                              : "Event Date"}{" "}
                            {formData.time ? `at ${formData.time}` : ""}
                          </span>
                        </div>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          } mb-3 line-clamp-3`}
                        >
                          {formData.description ||
                            "Your event description will appear here."}
                        </p>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            formData.type === "investor"
                              ? isDarkMode
                                ? "bg-purple-900 text-purple-300"
                                : "bg-purple-100 text-purple-800"
                              : formData.type === "info"
                              ? isDarkMode
                                ? "bg-blue-900 text-blue-300"
                                : "bg-blue-100 text-blue-800"
                              : formData.type === "pitch"
                              ? isDarkMode
                                ? "bg-green-900 text-green-300"
                                : "bg-green-100 text-green-800"
                              : formData.type === "product"
                              ? isDarkMode
                                ? "bg-yellow-900 text-yellow-300"
                                : "bg-yellow-100 text-yellow-800"
                              : isDarkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {formData.type.charAt(0).toUpperCase() +
                            formData.type.slice(1) || "Default"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manage Events */}
        {activeTab === "manage" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Events Directory
              </h2>
              <div className="text-right">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    isDarkMode
                      ? "bg-indigo-900 text-indigo-300"
                      : "bg-indigo-100 text-indigo-800"
                  }`}
                >
                  {events.length} {events.length === 1 ? "Event" : "Events"}
                </span>
              </div>
            </div>

            {events.length === 0 ? (
              <div
                className={`bg-white shadow rounded-2xl p-10 text-center ${
                  isDarkMode ? "bg-gray-800 text-gray-400" : "text-gray-600"
                }`}
              >
                <Calendar className="mx-auto h-12 w-12" aria-hidden="true" />
                <h3 className="mt-2 text-lg font-medium">No Events</h3>
                <p className="mt-1 text-sm">
                  Get started by creating a new event.
                </p>
                <button
                  onClick={() => {
                    setActiveTab("create");
                    openModal();
                  }}
                  className={`mt-4 px-4 py-2 text-white rounded-md ${
                    isDarkMode
                      ? "bg-indigo-700 hover:bg-indigo-600"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  Create New Event
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className={`rounded-xl shadow-md overflow-hidden transition-shadow duration-300 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-750"
                        : "bg-white hover:shadow-lg"
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h4
                          className={`text-lg font-semibold ${
                            isDarkMode ? "text-gray-200" : "text-gray-900"
                          }`}
                        >
                          {event.title}
                        </h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal(event)}
                            className={`p-2 rounded-full ${
                              isDarkMode
                                ? "bg-indigo-900 text-indigo-300 hover:bg-indigo-800"
                                : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                            }`}
                            title="Edit event"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(event._id)}
                            disabled={fetchLoading}
                            className={`p-2 rounded-full ${
                              isDarkMode
                                ? "bg-red-900 text-red-300 hover:bg-red-800"
                                : "bg-red-100 text-red-600 hover:bg-red-200"
                            } ${
                              fetchLoading
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            title="Delete event"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Calendar
                            size={16}
                            className={`mr-2 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {formatDate(event.date)} at {event.time}
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${getEventTypeColor(
                            event.type
                          )}`}
                        >
                          {event.type.charAt(0).toUpperCase() +
                            event.type.slice(1)}
                        </span>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          } line-clamp-3`}
                        >
                          {event.description || "No description provided."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
