import React, { useState, useEffect } from "react";
import axios from "axios";

function Investors() {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/investors/all",
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
          `http://localhost:8000/api/investors/approve/${investorId}`,
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
        alert("Investor approved successfully!");
      } catch (err) {
        console.error("Approval error:", err.response || err.message);
        alert("Error approving investor");
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
          `http://localhost:8000/api/investors/update-logo/${investorId}`,
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
        alert("Investor logo updated successfully!");
      } catch (err) {
        console.error("Logo update error:", err.response || err.message);
        alert("Error updating investor logo");
      }
    };
    fileInput.click();
  };

  // Handle adding previous investor
  const handleAddPreviousInvestor = async (e) => {
    e.preventDefault();
    if (!companyName || !file) {
      alert("Please provide a company name and logo");
      return;
    }

    const formData = new FormData();
    formData.append("Company", companyName);
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/investors/add-previous",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setInvestors((prev) => [...prev, response.data.investor]);
      setCompanyName("");
      setFile(null);
      alert("Previous investor added successfully!");
    } catch (err) {
      console.error(
        "Add previous investor error:",
        err.response || err.message
      );
      alert("Error adding previous investor");
    }
  };

  // Handle deleting an investor
  const handleDelete = async (investorId) => {
    if (!window.confirm("Are you sure you want to delete this investor?"))
      return;

    try {
      await axios.delete(
        `http://localhost:8000/api/investors/delete/${investorId}`,
        {
          withCredentials: true,
        }
      );
      setInvestors((prev) => prev.filter((inv) => inv._id !== investorId));
      alert("Investor deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err.response || err.message);
      alert("Error deleting investor");
    }
  };

  const unapprovedInvestors = investors.filter((inv) => !inv.isApproved);
  const approvedInvestors = investors.filter((inv) => inv.isApproved);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Admin - Investors Management
      </h1>

      {/* Add Previous Investor Form */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Add Previous Investor
        </h2>
        <form
          onSubmit={handleAddPreviousInvestor}
          className="bg-white shadow-md rounded-lg p-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter company name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add Previous Investor
          </button>
        </form>
      </section>

      {/* Unapproved Investors */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Unapproved Investors
        </h2>
        {unapprovedInvestors.length === 0 ? (
          <p className="text-gray-500">No unapproved investors found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unapprovedInvestors.map((investor) => (
              <div
                key={investor._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-800">
                  {investor.InvestorName.Firstname}{" "}
                  {investor.InvestorName.Lastname}
                </h3>
                <p className="text-gray-600">Company: {investor.Company}</p>
                <p className="text-gray-600">Email: {investor.Email}</p>
                <p className="text-gray-600">Location: {investor.Location}</p>
                <p className="text-gray-600">Phone: {investor.PhoneNumber}</p>
                {investor.LinkedIn && (
                  <p className="text-gray-600">
                    LinkedIn:{" "}
                    <a
                      href={investor.LinkedIn}
                      className="text-blue-500 hover:underline"
                    >
                      {investor.LinkedIn}
                    </a>
                  </p>
                )}
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleApprove(investor._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center"
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

      {/* Approved Investors */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Approved Investors
        </h2>
        {approvedInvestors.length === 0 ? (
          <p className="text-gray-500">No approved investors found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedInvestors.map((investor) => (
              <div
                key={investor._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-3">
                  {investor.imageUrl ? (
                    <img
                      src={investor.imageUrl}
                      alt={`${investor.Company} logo`}
                      className="w-12 h-12 object-cover rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                      <span className="text-gray-500">No Logo</span>
                    </div>
                  )}
                  <h3 className="text-lg font-medium text-gray-800">
                    {investor.InvestorName.Firstname}{" "}
                    {investor.InvestorName.Lastname}
                  </h3>
                </div>
                <p className="text-gray-600">Company: {investor.Company}</p>
                <p className="text-gray-600">Email: {investor.Email}</p>
                <p className="text-gray-600">Location: {investor.Location}</p>
                <p className="text-gray-600">Phone: {investor.PhoneNumber}</p>
                {investor.LinkedIn && (
                  <p className="text-gray-600">
                    LinkedIn:{" "}
                    <a
                      href={investor.LinkedIn}
                      className="text-blue-500 hover:underline"
                    >
                      {investor.LinkedIn}
                    </a>
                  </p>
                )}
                <div className="mt-2 flex flex-wrap space-x-2">
                  <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                    Approved
                  </span>
                  <button
                    onClick={() => handleUpdateLogo(investor._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mt-2 sm:mt-0"
                  >
                    Update Logo
                  </button>
                  <button
                    onClick={() => handleDelete(investor._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors mt-2 sm:mt-0"
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
}

export default Investors;
