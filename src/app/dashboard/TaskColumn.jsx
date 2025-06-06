"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import DraggableTask from "./components/DraggableTask";
import { v4 as uuidv4 } from "uuid";

export default function TaskColumn({ state, tasks, setTasks, allTasks }) {
  const { setNodeRef } = useDroppable({ id: state });

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [confirmId, setConfirmId] = useState(null);

  // Add Task
  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const id = uuidv4();

    const newTask = {
      id,
      title: newTitle.trim(),
      description: newDesc.trim(),
      state,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => ({
      ...prev,
      [state]: {
        ...prev[state],
        [id]: newTask,
      },
    }));

    setNewTitle("");
    setNewDesc("");
    setShowForm(false);
  };

  // Edit Task
  const onEdit = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleEditSubmit = (id) => {
    const updated = {
      ...allTasks[state],
      [id]: {
        ...allTasks[state][id],
        title: editTitle.trim(),
        description: editDescription.trim(),
      },
    };

    setTasks((prev) => ({
      ...prev,
      [state]: updated,
    }));

    setEditingTask(null);
  };

  // Delete Task
  const handleDelete = (id) => {
    const updated = { ...allTasks[state] };
    delete updated[id];

    setTasks((prev) => ({
      ...prev,
      [state]: updated,
    }));

    setConfirmId(null);
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-lg shadow-md p-4 w-full min-w-[250px] flex flex-col relative"
    >
      <h2 className="text-lg font-semibold mb-3">{state}</h2>

      <div className="flex flex-col gap-2 mb-4 z-10">
        {Object.values(tasks).map((task, index) => {
          const taskKey = task?.id || `fallback-${index}`;
          return (
            <div key={taskKey}>
              <DraggableTask task={task}>
                <div className="relative bg-gray-100 p-3 rounded-md shadow group">
                  {/* Edit / Delete Icons */}
                  <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTask(task);
                        setEditTitle(task.title);
                        setEditDescription(task.description);
                        setConfirmId(null);
                      }}
                      data-no-drag="true"
                      className="text-blue-600 hover:text-blue-800 text-xs cursor-pointer"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => {
                        setConfirmId(task.id);
                        setEditingTask(null); // close edit if open
                      }}
                      data-no-drag="true"
                      className="text-red-600 hover:text-red-800 text-xs"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>

                  {/* Delete confirmation */}
                  {confirmId === task.id && (
                    <div className="absolute top-8 right-2 bg-white border border-gray-300 shadow p-2 rounded z-50">
                      <p className="text-xs mb-2">Delete this task?</p>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          className="border text-xs px-2 py-1 rounded"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Editing Mode */}
                  {editingTask?.id === task.id ? (
                    <div className="mt-2 space-y-1">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full p-1 text-sm border rounded"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full p-1 text-sm border rounded"
                      />
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => handleEditSubmit(task.id)}
                          className="text-white bg-green-600 px-2 py-1 text-sm rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTask(null)}
                          className="text-gray-600 border px-2 py-1 text-sm rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-gray-600">
                        {task.description}
                      </p>
                    </>
                  )}
                </div>
              </DraggableTask>
            </div>
          );
        })}
      </div>

      {/* Add Task Form */}
      {showForm && (
        <div className="mb-4">
          <input
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full border p-2 text-sm rounded mb-2"
          />
          <textarea
            placeholder="Description"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full border p-2 text-sm rounded mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 text-sm rounded"
            >
              Add
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-600 border px-4 py-2 text-sm rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => setShowForm(true)}
        className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-blue-700"
        title="Add task"
      >
        +
      </button>
    </div>
  );
}
