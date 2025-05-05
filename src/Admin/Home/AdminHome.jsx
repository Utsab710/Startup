import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Users,
  Search,
  ChevronDown,
  ChevronUp,
  Edit,
  X,
  Check,
  UserPlus,
} from "lucide-react";

function AdminHome() {
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    role: "",
  });
  const [showAdmins, setShowAdmins] = useState(true);
  const [actionFeedback, setActionFeedback] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    if (authLoading) return;

    if (!user || user.role !== "admin") {
      setError("You don't have admin privileges");
      setLoading(false);
      return;
    }

    fetchUsers();
  }, [user, authLoading]);

  const fetchUsers = () => {
    fetch("http://localhost:8000/api/users/all-users", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(
              "Unauthorized: Authentication failed. Please login again."
            );
          } else if (response.status === 403) {
            throw new Error("Forbidden: You don't have admin privileges");
          } else {
            throw new Error("Failed to fetch users");
          }
        }
        return response.json();
      })
      .then((data) => {
        // Now include all users, not just regular users
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError(err.message);
        setLoading(false);
      });
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const filteredUsers = sortedUsers.filter((user) => {
    // Filter by search term and admin visibility
    const matchesSearch = Object.values(user).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchesSearch && (showAdmins || user.role !== "admin");
  });

  const handleEditClick = (userToEdit) => {
    setEditingUser(userToEdit._id);
    // Only set the role for editing, as that's the only field we're allowing to be changed
    setEditFormData({
      role: userToEdit.role,
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEdit = (userId) => {
    // If only changing the role, use the dedicated role-change endpoints
    if (Object.keys(editFormData).length === 1 && editFormData.role) {
      const endpoint =
        editFormData.role === "admin"
          ? `http://localhost:8000/api/users/promote/${userId}`
          : `http://localhost:8000/api/users/demote/${userId}`;

      fetch(endpoint, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok)
            throw new Error(
              `Failed to ${
                editFormData.role === "admin" ? "promote" : "demote"
              } user`
            );
          return response.json();
        })
        .then((data) => {
          // Update the users list with the edited user
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u._id === userId ? { ...u, role: editFormData.role } : u
            )
          );
          setEditingUser(null);
          showFeedback(
            `User ${
              editFormData.role === "admin"
                ? "promoted to admin"
                : "demoted to user"
            } successfully!`,
            "success"
          );
        })
        .catch((err) => {
          console.error(
            `Error ${
              editFormData.role === "admin" ? "promoting" : "demoting"
            } user:`,
            err
          );
          showFeedback(`Error: ${err.message}`, "error");
        });
    } else {
      // If updating multiple fields, use the general update endpoint
      // Note: This part requires the update endpoint to be implemented on the backend
      fetch(`http://localhost:8000/api/users/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(editFormData),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to update user");
          return response.json();
        })
        .then((data) => {
          // Update the users list with the edited user
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u._id === userId ? { ...u, ...editFormData } : u
            )
          );
          setEditingUser(null);
          showFeedback("User updated successfully!", "success");
        })
        .catch((err) => {
          console.error("Error updating user:", err);
          showFeedback(`Error: ${err.message}`, "error");
        });
    }
  };

  const showFeedback = (message, type) => {
    setActionFeedback({ message, type });
    setTimeout(() => {
      setActionFeedback({ message: "", type: "" });
    }, 3000);
  };

  const getSortIcon = (name) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === "ascending" ? (
        <ChevronUp size={16} className="inline" />
      ) : (
        <ChevronDown size={16} className="inline" />
      );
    }
    return null;
  };

  const toggleAdminView = () => {
    setShowAdmins(!showAdmins);
  };

  const countUsersByRole = (role) => {
    return users.filter((user) => user.role === role).length;
  };

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {actionFeedback.message && (
        <div
          className={`mb-4 px-4 py-3 rounded ${
            actionFeedback.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          {actionFeedback.message}
        </div>
      )}

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <>
          {/* Dashboard Card Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Regular User Count Card */}
              <div className="bg-white rounded-lg shadow-md p-6 flex items-center transition-transform hover:scale-105">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <Users className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">
                    Regular Users
                  </h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">
                      {countUsersByRole("user")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Admin Count Card */}
              <div className="bg-white rounded-lg shadow-md p-6 flex items-center transition-transform hover:scale-105">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <UserPlus className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">
                    Admin Users
                  </h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">
                      {countUsersByRole("admin")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Total Users Card */}
              <div className="bg-white rounded-lg shadow-md p-6 flex items-center transition-transform hover:scale-105">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <Users className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">
                    Total Users
                  </h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">{users.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">
                User Management
              </h2>
              <div className="flex flex-col md:flex-row gap-3 items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600 h-5 w-5"
                      checked={showAdmins}
                      onChange={toggleAdminView}
                    />
                    <span className="ml-2 text-gray-700">Show Admin Users</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("username")}
                    >
                      Username {getSortIcon("username")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("fullname")}
                    >
                      Full Name {getSortIcon("fullname")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("email")}
                    >
                      Email {getSortIcon("email")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("role")}
                    >
                      Role {getSortIcon("role")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((userItem) => (
                      <tr
                        key={userItem._id}
                        className={`hover:bg-gray-50 transition-colors ${
                          userItem.role === "admin" ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {userItem.username}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {userItem.fullname}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {userItem.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingUser === userItem._id ? (
                            <select
                              name="role"
                              value={editFormData.role}
                              onChange={handleEditFormChange}
                              className="text-sm border rounded px-2 py-1 w-full"
                            >
                              <option value="user">user</option>
                              <option value="admin">admin</option>
                            </select>
                          ) : (
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                userItem.role === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {userItem.role}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingUser === userItem._id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleSubmitEdit(userItem._id)}
                                className="text-white bg-green-500 hover:bg-green-600 p-1 rounded"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="text-white bg-red-500 hover:bg-red-600 p-1 rounded"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEditClick(userItem)}
                              className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 p-1 rounded"
                            >
                              <Edit size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        {searchTerm
                          ? "No users matching your search"
                          : "No users found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{filteredUsers.length}</span> out
                of <span className="font-medium">{users.length}</span> users
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminHome;
