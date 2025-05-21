import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import {
  DndContext,
  closestCenter,
  useSensor,
  PointerSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  FaGripVertical,
  FaEdit,
  FaSave,
  FaTimes,
  FaTrash,
  FaPlus,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

function ReorderHeader() {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState({});
  const [newItem, setNewItem] = useState({ text: "", url: "", parentId: "" });
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_RENDER}/api/header`,
        {
          withCredentials: true,
        }
      );

      setMenuItems(response.data);
      setLoading(false);
    } catch (error) {
      setError(`Failed to load menu items: ${error.message}`);
      setLoading(false);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = (event) => {
    setDraggedItem(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setDraggedItem(null);
    if (!over || active.id === over.id) return;

    try {
      // Extract item ID
      const getItemId = (sortableId) => {
        if (sortableId.startsWith("dropzone-")) {
          return sortableId.replace("dropzone-", "");
        }
        const parts = sortableId.split("-");
        // Take the last part as the ID, preserving hyphens within the ID
        return parts[parts.length - 1];
      };

      const activeId = getItemId(active.id);
      const overId = getItemId(over.id);
      const isDropZone = over.id.startsWith("dropzone");
      const newParentId = isDropZone ? (overId === "top" ? "" : overId) : "";

      // Find the active item
      const activeItem = findItem(menuItems, activeId);
      if (!activeItem) {
        throw new Error(`Active item not found for ID: ${activeId}`);
      }

      const parentId = activeItem.parent ? activeItem.parent.id : "";
      let newOrder = activeItem.item.order;
      let updatedMenuItems = [...menuItems];

      // Remove from old location
      if (parentId) {
        const parent = findItem(updatedMenuItems, parentId);
        if (!parent) {
          console.warn(
            `Parent not found for ID: ${parentId}, proceeding anyway`
          );
        } else {
          parent.item.dropdownItems = parent.item.dropdownItems.filter(
            (item) => String(item.id) !== String(activeId)
          );
          parent.item.hasDropdown = parent.item.dropdownItems.length > 0;
        }
      } else {
        updatedMenuItems = updatedMenuItems.filter(
          (item) => String(item.id) !== String(activeId)
        );
      }

      // Add to new location
      if (newParentId) {
        const parent = findItem(updatedMenuItems, newParentId);
        if (!parent) {
          throw new Error(`Parent not found for ID: ${newParentId}`);
        }
        parent.item.dropdownItems.push(activeItem.item);
        parent.item.hasDropdown = true;
        newOrder = parent.item.dropdownItems.length;
        activeItem.item.order = newOrder;
      } else {
        if (over.id === "dropzone-top") {
          newOrder = updatedMenuItems.length + 1;
          updatedMenuItems.push(activeItem.item);
        } else {
          const overItem = findItem(updatedMenuItems, overId);
          if (!overItem) {
            throw new Error(`Over item not found for ID: ${overId}`);
          }
          newOrder = overItem.item.order;
          updatedMenuItems.splice(newOrder - 1, 0, activeItem.item);
        }
        updatedMenuItems.forEach((item, index) => {
          item.order = index + 1;
        });
      }

      setMenuItems(updatedMenuItems);

      const response = await axios.put(
        `${import.meta.env.VITE_RENDER}/api/header/${activeId}`,
        {
          order: newOrder,
          parentId,
          newParentId,
        },
        { withCredentials: true }
      );
      await fetchMenu();
    } catch (error) {
      console.error("Drag error:", error);
      setError(
        `Failed to reorder menu items: ${
          error.response?.data?.message || error.message
        }`
      );
      await fetchMenu();
    }
  };

  const findItem = (items, id, parent = null) => {
    for (const item of items) {
      if (String(item.id) === String(id)) {
        return { item, parent };
      }
      if (item.dropdownItems?.length > 0) {
        const found = findItem(item.dropdownItems, id, item);
        if (found) return found;
      }
    }
    console.warn(`Item not found for ID: ${id}`);
    return null;
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.text) {
      setError("Item text is required.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_RENDER}/api/header`, newItem, {
        withCredentials: true,
      });
      setNewItem({ text: "", url: "", parentId: "" });
      await fetchMenu();
    } catch (error) {
      setError(
        `Failed to add item: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleEditItem = async (id) => {
    if (!isEditing[id]?.text) {
      setError("Item text cannot be empty.");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_RENDER}/api/header/${id}`,
        { text: isEditing[id].text, url: isEditing[id].url },
        { withCredentials: true }
      );
      setIsEditing((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
      await fetchMenu();
    } catch (error) {
      setError(
        `Failed to edit item: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleDeleteItem = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this item and its sub-items?"
      )
    ) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_RENDER}/api/header/${id}`, {
        withCredentials: true,
      });
      await fetchMenu();
    } catch (error) {
      setError(
        `Failed to delete item: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleMoveToTop = async (id, parentId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_RENDER}/api/header/${id}`,
        { parentId, newParentId: "", order: menuItems.length + 1 },
        { withCredentials: true }
      );
      await fetchMenu();
    } catch (error) {
      setError(
        `Failed to move item to top level: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const SortableItem = ({ id, children }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition:
        transition ||
        "transform 200ms ease, opacity 200ms ease, box-shadow 200ms ease",
      opacity: isDragging ? 0.6 : 1,
      boxShadow: isDragging ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "none",
      zIndex: isDragging ? 10 : 1,
    };
    return (
      <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </li>
    );
  };

  const DropZone = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isOver } =
      useSortable({ id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition:
        transition || "transform 200ms ease, background-color 200ms ease",
      backgroundColor: isOver ? "#e6f3ff" : "#f9fafb",
    };
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`py-1 px-2 my-1 rounded-lg border border-dashed ${
          isOver ? "border-blue-500" : "border-gray-300"
        }`}
        {...attributes}
        {...listeners}
      >
        {children}
      </div>
    );
  };

  const renderMenuItems = (items, parentId = "top", level = 0) => (
    <ul className={`space-y-2 ${level > 0 ? "ml-6" : ""}`}>
      {items.map((item) => {
        const itemId = `${parentId}-${item.id}`;
        return (
          <React.Fragment key={itemId}>
            <SortableItem id={itemId}>
              <div
                className={`p-3 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                  draggedItem === itemId ? "bg-blue-50" : "bg-gray-100"
                }`}
              >
                <FaGripVertical className="text-gray-500 cursor-grab" />
                {isEditing[item.id] ? (
                  <div className="flex-1 flex space-x-2">
                    <input
                      type="text"
                      value={isEditing[item.id].text}
                      onChange={(e) =>
                        setIsEditing({
                          ...isEditing,
                          [item.id]: {
                            ...isEditing[item.id],
                            text: e.target.value,
                          },
                        })
                      }
                      className="p-1 border rounded flex-1"
                      placeholder="Item Text"
                    />
                    <input
                      type="text"
                      value={isEditing[item.id].url}
                      onChange={(e) =>
                        setIsEditing({
                          ...isEditing,
                          [item.id]: {
                            ...isEditing[item.id],
                            url: e.target.value,
                          },
                        })
                      }
                      className="p-1 border rounded flex-1"
                      placeholder="URL"
                    />
                    <button
                      onClick={() => handleEditItem(item.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={() =>
                        setIsEditing((prev) => {
                          const updated = { ...prev };
                          delete updated[item.id];
                          return updated;
                        })
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1 font-medium">
                      {item.text}
                      <span className="text-gray-500 text-sm ml-2">
                        {item.url && `(${item.url})`}
                      </span>
                    </span>
                    <div className="flex space-x-2">
                      {parentId !== "top" && (
                        <button
                          title="Move to top level"
                          onClick={() =>
                            handleMoveToTop(
                              item.id,
                              parentId.replace("top-", "").replace("sub-", "")
                            )
                          }
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaArrowLeft />
                        </button>
                      )}
                      <button
                        title="Edit item"
                        onClick={() =>
                          setIsEditing({
                            ...isEditing,
                            [item.id]: {
                              text: item.text,
                              url: item.url || "",
                            },
                          })
                        }
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        title="Delete item"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </SortableItem>
            <DropZone id={`dropzone-${item.id}`}>
              <div className="flex items-center text-sm text-gray-500">
                <FaArrowRight className="mr-2" />
                Drop here to make a sub-item
              </div>
            </DropZone>
            {item.dropdownItems?.length > 0 && (
              <li className="mt-1">
                {renderMenuItems(
                  item.dropdownItems,
                  `sub-${item.id}`,
                  level + 1
                )}
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );

  const getAllItems = (items) => {
    const result = [];
    items.forEach((item) => {
      result.push({ id: item.id, text: item.text });
      if (item.dropdownItems?.length > 0) {
        result.push(...getAllItems(item.dropdownItems));
      }
    });
    return result;
  };

  const getAllSortableIds = (items, parentId = "top") => {
    let ids = [];
    items.forEach((item) => {
      const itemId = `${parentId}-${item.id}`;
      ids.push(itemId);
      ids.push(`dropzone-${item.id}`);
      if (item.dropdownItems?.length > 0) {
        ids = ids.concat(
          getAllSortableIds(item.dropdownItems, `sub-${item.id}`)
        );
      }
    });
    return ids;
  };

  if (loading) {
    return <div className="p-6 text-center">Loading header menu items...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Manage Header Menu</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex justify-between">
          {error}
          <button onClick={() => setError(null)} className="font-bold">
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleAddItem} className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Item Text *"
          value={newItem.text}
          onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
          className="p-2 border rounded flex-1"
          required
        />
        <input
          type="text"
          placeholder="URL (optional)"
          value={newItem.url}
          onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
          className="p-2 border rounded flex-1"
        />
        <select
          value={newItem.parentId}
          onChange={(e) => setNewItem({ ...newItem, parentId: e.target.value })}
          className="p-2 border rounded flex-1"
        >
          <option value="">Top Level</option>
          {getAllItems(menuItems).map((item) => (
            <option key={item.id} value={item.id}>
              {item.text}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded flex items-center hover:bg-blue-600 transition-colors duration-200"
        >
          <FaPlus className="mr-1" /> Add Item
        </button>
      </form>

      <div className="bg-gray-50 p-4 mb-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Instructions:</h2>
        <ul className="list-disc ml-5 text-sm text-gray-600">
          <li>
            Drag items to reorder or drop into a drop zone to make sub-items.
          </li>
          <li>Use the left arrow to move a sub-item to top level.</li>
          <li>Edit or delete items using the respective buttons.</li>
          <li>Select a parent from the dropdown to add sub-items.</li>
        </ul>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={[...getAllSortableIds(menuItems), "dropzone-top"]}
          strategy={verticalListSortingStrategy}
        >
          {renderMenuItems(menuItems)}
          <div className="mt-4">
            <DropZone id="dropzone-top">
              <div className="flex items-center text-sm text-gray-500">
                <FaArrowRight className="mr-2" />
                Drop here to add to top level
              </div>
            </DropZone>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default ReorderHeader;
