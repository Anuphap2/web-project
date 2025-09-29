"use client";
import { useAddTaskForm } from "@/hooks/TaskFormAdmin";


export default function AddTaskForm() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    assignedTo,
    setAssignedTo,
    maxAssignees,
    setMaxAssignees,
    dueDate,
    setDueDate,
    departmentUsers,
    handleAddTask,
  } = useAddTaskForm();

  return (
    <div className="p-4 border rounded space-y-4">
      <h2 className="text-2xl font-semibold">Add New Task</h2>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded p-2"
      />
      <select
        value={assignedTo || ""}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="w-full rounded border p-2"
      >
        <option value="">Select user</option>
        {departmentUsers.map((u) => (
          <option key={u.username} value={u.username}>
            {u.username} ({u.level})
          </option>
        ))}
      </select>

      <input
        type="number"
        min={1}
        max={departmentUsers.length}
        value={maxAssignees}
        onChange={(e) => setMaxAssignees(Number(e.target.value))}
        className="w-full border rounded p-2"
        placeholder="Max assignees"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border rounded p-2"
        placeholder="Due date"
      />

      <button
        onClick={handleAddTask}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Task
      </button>
    </div>
  );
}
