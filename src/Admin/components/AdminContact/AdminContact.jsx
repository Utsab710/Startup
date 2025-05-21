import { useState, useEffect, useRef } from "react"; // Added useRef
import { useAuth } from "../../../Context/AuthContext";
import { useTheme } from "../../../components/ThemeToggle/ThemeContext";
import {
  RefreshCw,
  Trash2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Search,
  Calendar,
  X,
  Filter,
} from "lucide-react";
import React from "react";

export default function AdminContact() {
  const { user, loading: authLoading } = useAuth();
  const { isDarkMode } = useTheme();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedRows, setExpandedRows] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  // useRef to reference the table for scrolling
  const tableRef = useRef(null);

  // Fetch contacts
  const fetchContacts = async (pageNum = 1) => {
    setFetchLoading(true);
    try {
      const response = await fetch(
        `https://a2f-backend.onrender.com/api/contact?page=${pageNum}&limit=10`,
        {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch contacts");
      const data = await response.json();
      setContacts(data.contacts);
      setFilteredContacts(data.contacts);
      setTotalPages(data.pages);
      setPage(pageNum);
    } catch (err) {
      setError(
        err.message ||
          "Error fetching contacts. Please verify your admin privileges or try again later."
      );
    } finally {
      setFetchLoading(false);
      setLoading(false);
    }
  };

  // Mark all messages as read and fetch contacts
  useEffect(() => {
    if (!authLoading && user && user.role === "admin") {
      fetchContacts();
      fetch("https://a2f-backend.onrender.com/api/contact/mark-all-read", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
        .then(() => fetchContacts())
        .catch((err) => {
          console.error("Error marking all messages as read:", err);
          setError("Failed to mark all messages as read");
        });
    } else if (!authLoading && (!user || user.role !== "admin")) {
      setError("Please log in as an admin to view contacts.");
      setLoading(false);
    }
  }, [user, authLoading]);

  // Handle delete
  const handleDelete = async (contactId) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    setFetchLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `https://a2f-backend.onrender.com/api/contact/${contactId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete message");
      }

      const updatedContacts = contacts.filter((c) => c._id !== contactId);
      setContacts(updatedContacts);
      setFilteredContacts(filteredContacts.filter((c) => c._id !== contactId));
      setSuccess("Message deleted successfully!");
      scrollToTable(); // Scroll to table after deletion
    } catch (err) {
      setError(err.message || "Error deleting message");
    } finally {
      setFetchLoading(false);
    }
  };

  // Toggle message expansion
  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Convert date to YYYY-MM-DD for input fields
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Handle search functionality
  useEffect(() => {
    if (searchTerm === "") {
      applyDateFilter();
      return;
    }

    setIsSearching(true);
    const searchTimeout = setTimeout(() => {
      const searchResults = contacts.filter((contact) => {
        const searchLower = searchTerm.toLowerCase();
        const nameMatch =
          contact.Name && contact.Name.toLowerCase().includes(searchLower);
        const emailMatch =
          contact.Email && contact.Email.toLowerCase().includes(searchLower);
        const subjectMatch =
          contact.Subject &&
          contact.Subject.toLowerCase().includes(searchLower);
        const messageMatch =
          contact.Message &&
          contact.Message.toLowerCase().includes(searchLower);

        return nameMatch || emailMatch || subjectMatch || messageMatch;
      });

      if (startDate || endDate) {
        const filteredByDate = applyDateFilterToResults(searchResults);
        setFilteredContacts(filteredByDate);
      } else {
        setFilteredContacts(searchResults);
      }

      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchTerm, contacts]);

  // Handle date filter
  const applyDateFilter = () => {
    if (!startDate && !endDate) {
      setFilteredContacts(contacts);
      return;
    }

    const filteredByDate = applyDateFilterToResults(contacts);
    setFilteredContacts(filteredByDate);
  };

  const applyDateFilterToResults = (results) => {
    return results.filter((contact) => {
      const messageDate = new Date(contact.createdAt);

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59);
        return messageDate >= start && messageDate <= end;
      } else if (startDate) {
        const start = new Date(startDate);
        return messageDate >= start;
      } else if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59);
        return messageDate <= end;
      }

      return true;
    });
  };

  // Handle date filter changes
  useEffect(() => {
    if (startDate || endDate) {
      applyDateFilter();
    }
  }, [startDate, endDate]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setFilteredContacts(contacts);
    setShowDateFilter(false);
  };

  // Clear notification messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Scroll to table top after actions
  const scrollToTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
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
          <div
            className={`w-12 h-12 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin`}
          ></div>
          <p
            className={`mt-4 text-lg font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Loading messages...
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
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className={`text-3xl font-bold tracking-tight sm:text-4xl ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Contact <span className="text-indigo-600">Messages</span>
          </h1>
          <p
            className={`mt-2 max-w-2xl mx-auto text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Review and manage incoming customer inquiries
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
                className={`bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm ${
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

        {/* Search and Filter Bar */}
        <div
          className={`bg-white rounded-lg shadow-md overflow-hidden mb-6 ${
            isDarkMode ? "bg-gray-800" : ""
          }`}
        >
          <div className="px-4 py-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-auto sm:flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search
                      size={18}
                      className={isDarkMode ? "text-gray-500" : "text-gray-400"}
                    />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, email, subject or message content..."
                    className={`block w-full pl-10 pr-12 py-2 border ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-700 placeholder-gray-400"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {searchTerm && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        onClick={() => setSearchTerm("")}
                        className={`p-1 rounded-full ${
                          isDarkMode
                            ? "hover:bg-gray-600 text-gray-400 hover:text-gray-200"
                            : "hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowDateFilter(!showDateFilter)}
                  className={`inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${
                    showDateFilter
                      ? isDarkMode
                        ? "bg-indigo-800 text-white border-indigo-700"
                        : "bg-indigo-100 text-indigo-800 border-indigo-300"
                      : isDarkMode
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600"
                      : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <Filter size={16} className="mr-2" />
                  Date Filter
                </button>
                <button
                  onClick={() => fetchContacts(page)}
                  disabled={fetchLoading}
                  className={`inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                    fetchLoading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : isDarkMode
                      ? "bg-indigo-700 hover:bg-indigo-600"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
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
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={16} className="mr-2" />
                      Refresh
                    </>
                  )}
                </button>
              </div>
            </div>
            {showDateFilter && (
              <div
                className={`mt-4 pt-4 border-t ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full sm:w-auto">
                    <label
                      htmlFor="start-date"
                      className={`block text-sm font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      From Date
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar
                          size={16}
                          className={
                            isDarkMode ? "text-gray-500" : "text-gray-400"
                          }
                        />
                      </div>
                      <input
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-200"
                            : "bg-white border-gray-300 text-gray-700"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-auto">
                    <label
                      htmlFor="end-date"
                      className={`block text-sm font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      To Date
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar
                          size={16}
                          className={
                            isDarkMode ? "text-gray-500" : "text-gray-400"
                          }
                        />
                      </div>
                      <input
                        type="date"
                        id="end-date"
                        value={endDate}
                        min={startDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={`block w-full pl-10 pr-3 py-2 border ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-200"
                            : "bg-white border-gray-300 text-gray-700"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-auto sm:self-end mb-1">
                    <button
                      onClick={resetFilters}
                      className={`w-full sm:w-auto mt-4 sm:mt-0 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                          : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={`px-4 py-2 ${
              isDarkMode ? "bg-gray-750" : "bg-gray-50"
            } border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
          >
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {isSearching ? (
                "Searching..."
              ) : (
                <>
                  {searchTerm || startDate || endDate ? (
                    <>
                      Found {filteredContacts.length} result
                      {filteredContacts.length !== 1 ? "s" : ""}
                      {searchTerm && (
                        <span>
                          {" "}
                          for "<strong>{searchTerm}</strong>"
                        </span>
                      )}
                      {(startDate || endDate) && (
                        <span>
                          {" "}
                          between{" "}
                          {startDate ? (
                            <strong>{formatDate(startDate)}</strong>
                          ) : (
                            "earliest"
                          )}{" "}
                          and{" "}
                          {endDate ? (
                            <strong>{formatDate(endDate)}</strong>
                          ) : (
                            "latest"
                          )}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      {filteredContacts.length > 0
                        ? `Showing ${filteredContacts.length} message${
                            filteredContacts.length !== 1 ? "s" : ""
                          }`
                        : "No messages found"}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Table View */}
        <div
          className={`overflow-hidden shadow-md rounded-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
          ref={tableRef}
        >
          {filteredContacts.length === 0 ? (
            <div
              className={`p-8 text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                ></path>
              </svg>
              <h3 className="mt-2 text-lg font-medium">No Messages Found</h3>
              <p className="mt-1 text-sm">
                {searchTerm || startDate || endDate
                  ? "Try adjusting your search or filter criteria."
                  : "No contact messages available at this time."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead
                  className={
                    isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-50"
                  }
                >
                  <tr>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Date
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Username
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Email
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Subject
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                {filteredContacts.map((contact) => (
                  <React.Fragment key={contact._id}>
                    <tr
                      className={`${
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      } ${contact.isRead ? "" : "font-semibold"}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-gray-900"
                          }
                        >
                          {formatDate(contact.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-gray-900"
                          }
                        >
                          {contact.Name || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <a
                          href={`mailto:${contact.Email}`}
                          className={`${
                            isDarkMode
                              ? "text-indigo-400 hover:text-indigo-300"
                              : "text-indigo-600 hover:text-indigo-900"
                          }`}
                        >
                          {contact.Email || "N/A"}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-gray-900"
                          }
                        >
                          {contact.Subject || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleExpand(contact._id)}
                            className={`p-1 rounded-full ${
                              isDarkMode
                                ? "text-gray-400 hover:bg-gray-600"
                                : "text-gray-500 hover:bg-gray-200"
                            }`}
                            title={
                              expandedRows[contact._id] ? "Collapse" : "Expand"
                            }
                          >
                            {expandedRows[contact._id] ? (
                              <ChevronUp size={20} />
                            ) : (
                              <ChevronDown size={20} />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(contact._id)}
                            disabled={fetchLoading}
                            className={`p-1 rounded-full ${
                              fetchLoading
                                ? "text-gray-400 cursor-not-allowed"
                                : isDarkMode
                                ? "text-red-400 hover:bg-gray-600"
                                : "text-red-500 hover:bg-gray-200"
                            }`}
                            title="Delete"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRows[contact._id] && (
                      <tr className={isDarkMode ? "bg-gray-700" : "bg-white"}>
                        <td colSpan={5} className="px-6 py-4 text-sm">
                          <div
                            className={`p-4 rounded-md ${
                              isDarkMode ? "bg-gray-700" : "bg-gray-50"
                            } border ${
                              isDarkMode ? "border-gray-600" : "border-gray-200"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-4">
                              <h4
                                className={`font-medium ${
                                  isDarkMode ? "text-gray-200" : "text-gray-900"
                                }`}
                              >
                                Message Details
                              </h4>
                              <button
                                onClick={() => toggleExpand(contact._id)}
                                className={`p-1 rounded-full ${
                                  isDarkMode
                                    ? "text-gray-400 hover:bg-gray-600"
                                    : "text-gray-500 hover:bg-gray-200"
                                }`}
                                title="Collapse"
                              >
                                <ChevronUp size={20} />
                              </button>
                            </div>
                            <p
                              className={`mt-2 ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {contact.Message ||
                                "No message content available."}
                            </p>
                            <div className="mt-4 flex justify-between items-center">
                              <span
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                Sent: {formatDate(contact.createdAt)} at{" "}
                                {new Date(
                                  contact.createdAt
                                ).toLocaleTimeString()}
                              </span>
                              <a
                                href={`mailto:${contact.Email}?subject=Re: ${contact.Subject}`}
                                className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm ${
                                  isDarkMode
                                    ? "bg-indigo-700 text-white hover:bg-indigo-600"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                                }`}
                              >
                                Reply
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className={`mt-6 flex justify-between items-center ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <div className="text-sm">
              Page {page} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  fetchContacts(page - 1);
                  scrollToTable();
                }}
                disabled={page === 1 || fetchLoading}
                className={`py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${
                  page === 1 || fetchLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : isDarkMode
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => {
                  fetchContacts(page + 1);
                  scrollToTable();
                }}
                disabled={page === totalPages || fetchLoading}
                className={`py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${
                  page === totalPages || fetchLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : isDarkMode
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
