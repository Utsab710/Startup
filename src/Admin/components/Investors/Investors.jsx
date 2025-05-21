import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Investors() {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [activeTab, setActiveTab] = useState("unapproved");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_RENDER}/api/investors/all`,
          {
            withCredentials: true,
          }
        );
        setInvestors(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err.response || err.message);
        setError("Failed to fetch investors");
        setLoading(false);
      }
    };
    fetchInvestors();
  }, []);

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle approval for new investors
  const handleApprove = async (investorId) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        await axios.put(
          `${import.meta.env.VITE_RENDER}/api/investors/approve/${investorId}`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setInvestors((prev) =>
          prev.map((inv) =>
            inv._id === investorId
              ? { ...inv, isApproved: true, imageUrl: "Uploaded" }
              : inv
          )
        );
        showNotification("Investor approved successfully!", "success");
      } catch (err) {
        console.error("Approval error:", err.response || err.message);
        showNotification("Error approving investor", "error");
      }
    };
    fileInput.click();
  };

  // Handle logo update for existing investors
  const handleUpdateLogo = async (investorId) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.put(
          `${
            import.meta.env.VITE_RENDER
          }/api/investors/update-logo/${investorId}`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setInvestors((prev) =>
          prev.map((inv) =>
            inv._id === investorId
              ? { ...inv, imageUrl: response.data.investor.imageUrl }
              : inv
          )
        );
        showNotification("Investor logo updated successfully!", "success");
      } catch (err) {
        console.error("Logo update error:", err.response || err.message);
        showNotification("Error updating investor logo", "error");
      }
    };
    fileInput.click();
  };

  // Handle adding previous investor
  const handleAddPreviousInvestor = async (e) => {
    e.preventDefault();
    if (!companyName || !file) {
      showNotification("Please provide a company name and logo", "error");
      return;
    }

    const formData = new FormData();
    formData.append("Company", companyName);
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_RENDER}/api/investors/add-previous`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setInvestors((prev) => [...prev, response.data.investor]);
      setCompanyName("");
      setFile(null);
      setFilePreview(null);
      showNotification("Previous investor added successfully!", "success");
    } catch (err) {
      console.error(
        "Add previous investor error:",
        err.response || err.message
      );
      showNotification("Error adding previous investor", "error");
    }
  };

  // Handle deleting an investor
  const handleDelete = async (investorId) => {
    if (!window.confirm("Are you sure you want to delete this investor?"))
      return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_RENDER}/api/investors/delete/${investorId}`,
        {
          withCredentials: true,
        }
      );
      setInvestors((prev) => prev.filter((inv) => inv._id !== investorId));
      showNotification("Investor deleted successfully!", "success");
    } catch (err) {
      console.error("Delete error:", err.response || err.message);
      showNotification("Error deleting investor", "error");
    }
  };

  const unapprovedInvestors = investors.filter((inv) => !inv.isApproved);
  const approvedInvestors = investors.filter((inv) => inv.isApproved);

  // Filter investors based on search term
  const filteredUnapproved = unapprovedInvestors.filter(
    (inv) =>
      inv.InvestorName.Firstname.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      inv.InvestorName.Lastname.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      inv.Company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.Email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApproved = approvedInvestors.filter(
    (inv) =>
      inv.InvestorName.Firstname.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      inv.InvestorName.Lastname.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      inv.Company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.Email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading investors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } animate-fadeIn`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            {notification.message}
          </div>
        </div>
      )}

      <div className="container mx-auto p-6">
        <header className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Investor Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage investor applications and partnerships
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search investors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Add Previous Investor Form */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add Previous Investor
          </h2>
          <form
            onSubmit={handleAddPreviousInvestor}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Company Logo
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="space-y-2">
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-500">
                      {file ? file.name : "Click to upload company logo"}
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Previous Investor
              </button>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Preview
              </h3>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    {filePreview ? (
                      <img
                        src={filePreview}
                        alt="Company logo preview"
                        className="w-16 h-16 object-cover rounded-full mr-4 border border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        {companyName || "Company Name"}
                      </h4>
                      <p className="text-gray-500">Previous Investor</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-gray-600">
                    <p>This is a manually added previous investor entry.</p>
                    <p>
                      Once added, it will appear in the approved investors list.
                    </p>
                  </div>

                  <div className="mt-4 flex">
                    <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                      Pre-approved
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>

        {/* Tabs for investor lists */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab("unapproved")}
              className={`py-3 px-6 font-medium text-lg transition ${
                activeTab === "unapproved"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Unapproved
              {unapprovedInvestors.length > 0 && (
                <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  {unapprovedInvestors.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`py-3 px-6 font-medium text-lg transition ${
                activeTab === "approved"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Approved
              {approvedInvestors.length > 0 && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {approvedInvestors.length}
                </span>
              )}
            </button>
          </div>

          {/* Unapproved Investors Tab */}
          {activeTab === "unapproved" && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Pending Approval Requests
              </h2>
              {filteredUnapproved.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="mt-4 text-lg text-gray-600">
                    {searchTerm
                      ? "No matching unapproved investors found."
                      : "No investors waiting for approval."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUnapproved.map((investor) => (
                    <div
                      key={investor._id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      <div className="bg-yellow-50 px-4 py-2 border-b border-yellow-100">
                        <span className="text-yellow-700 font-medium flex items-center">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Pending Approval
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {investor.InvestorName.Firstname}{" "}
                          {investor.InvestorName.Lastname}
                        </h3>
                        <div className="space-y-2 text-gray-600 mb-4">
                          <p className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                            {investor.Company}
                          </p>
                          <p className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            {investor.Email}
                          </p>
                          <p className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {investor.Location}
                          </p>
                          <p className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            {investor.PhoneNumber}
                          </p>
                          {investor.LinkedIn && (
                            <p className="flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 11-5.656 5.656l-1.102-1.101"
                                />
                              </svg>
                              <a
                                href={investor.LinkedIn}
                                className="text-blue-500 hover:underline truncate"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                LinkedIn Profile
                              </a>
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(investor._id)}
                            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Approve
                          </button>
                          <button
                            onClick={() => handleDelete(investor._id)}
                            className="bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
                            title="Delete investor"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 4v12m4-12v12M3 7h18"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Approved Investors Tab */}
          {activeTab === "approved" && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Approved Investors
              </h2>
              {filteredApproved.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="mt-4 text-lg text-gray-600">
                    {searchTerm
                      ? "No matching approved investors found."
                      : "No approved investors yet."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredApproved.map((investor) => (
                    <div
                      key={investor._id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      <div className="bg-green-50 px-4 py-2 border-b border-green-100">
                        <span className="text-green-700 font-medium flex items-center">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Approved
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center mb-4">
                          {investor.imageUrl ? (
                            <img
                              src={investor.imageUrl}
                              alt={`${investor.Company} logo`}
                              className="w-16 h-16 object-cover rounded-full mr-4 border border-gray-200"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              {investor.InvestorName
                                ? `${investor.InvestorName.Firstname} ${investor.InvestorName.Lastname}`
                                : investor.Company}
                            </h3>
                            <p className="text-gray-500">{investor.Company}</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-gray-600 mb-4">
                          {investor.Email && (
                            <p className="flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              {investor.Email}
                            </p>
                          )}
                          {investor.Location && (
                            <p className="flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              {investor.Location}
                            </p>
                          )}
                          {investor.PhoneNumber && (
                            <p className="flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              {investor.PhoneNumber}
                            </p>
                          )}
                          {investor.LinkedIn && (
                            <p className="flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 11-5.656 5.656l-1.102-1.101"
                                />
                              </svg>
                              <a
                                href={investor.LinkedIn}
                                className="text-blue-500 hover:underline truncate"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                LinkedIn Profile
                              </a>
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdateLogo(investor._id)}
                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            Update Logo
                          </button>
                          <button
                            onClick={() => handleDelete(investor._id)}
                            className="bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
                            title="Delete investor"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 4v12m4-12v12M3 7h18"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Investors;
