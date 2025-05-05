import React, { useState } from "react";
import { Save, Edit, Trash2, Plus, Facebook } from "lucide-react";
import { FaSquare } from "react-icons/fa6";

function A2FLink() {
  // State for links array
  const [links, setLinks] = useState([
    { id: 1, platform: "Facebook", url: "https://facebook.com/example" },
  ]);

  // State for form
  const [currentLink, setCurrentLink] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    setCurrentLink(e.target.value);
  };

  // Add new link
  const addLink = () => {
    if (currentLink.trim() !== "") {
      const newLink = {
        id:
          links.length > 0 ? Math.max(...links.map((link) => link.id)) + 1 : 1,
        platform: "Facebook",
        url: currentLink.trim(),
      };

      setLinks([...links, newLink]);
      setCurrentLink("");
    }
  };

  // Start editing a link
  const startEdit = (id) => {
    const linkToEdit = links.find((link) => link.id === id);
    if (linkToEdit) {
      setCurrentLink(linkToEdit.url);
      setEditingId(id);
      setIsEditing(true);
    }
  };

  // Update link
  const updateLink = () => {
    if (currentLink.trim() !== "" && editingId !== null) {
      const updatedLinks = links.map((link) =>
        link.id === editingId ? { ...link, url: currentLink.trim() } : link
      );

      setLinks(updatedLinks);
      setCurrentLink("");
      setEditingId(null);
      setIsEditing(false);
    }
  };

  // Delete link
  const deleteLink = (id) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    setLinks(updatedLinks);

    // Reset form if deleting the link being edited
    if (editingId === id) {
      setCurrentLink("");
      setEditingId(null);
      setIsEditing(false);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setCurrentLink("");
    setEditingId(null);
    setIsEditing(false);
  };

  // Submit handler
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (isEditing) {
      updateLink();
    } else {
      addLink();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Link Management</h1>
      </div>

      {/* Input Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label
              htmlFor="linkInput"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {isEditing ? "Update Facebook Link" : "Add Facebook Link"}
            </label>
            <input
              id="linkInput"
              type="url"
              value={currentLink}
              onChange={handleInputChange}
              placeholder="https://facebook.com/yourpage"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </div>
          <div className="flex gap-2 self-end">
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 rounded-md text-white flex items-center ${
                isEditing
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isEditing ? (
                <>
                  <Save size={18} className="mr-1" />
                  Update
                </>
              ) : (
                <>
                  <Plus size={18} className="mr-1" />
                  Add
                </>
              )}
            </button>
            {isEditing && (
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Links List */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Managed Links
        </h2>

        {links.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No links added yet. Add your first Facebook link above.
          </div>
        ) : (
          <div className="space-y-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <FaSquare size={20} className=" bg-transparent mr-3" />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate max-w-md"
                  >
                    {link.url}
                  </a>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEdit(link.id)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    aria-label="Edit link"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => deleteLink(link.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full"
                    aria-label="Delete link"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          This panel allows administrators to manage Facebook links. More
          platforms can be added in the future.
        </p>
      </div>
    </div>
  );
}

export default A2FLink;
