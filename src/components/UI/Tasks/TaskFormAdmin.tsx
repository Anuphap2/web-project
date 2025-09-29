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
    <div className="p-6 bg-base-100 rounded-xl shadow-md max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Add New Task</h2>

      {/* Task Title */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold">Task Title</span>
        </label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {/* Description */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold">Description</span>
        </label>
        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full h-24"
        />
      </div>

      {/* Assigned To */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold">Assign To</span>
        </label>
        <select
          value={assignedTo || ""}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">Select user</option>
          {departmentUsers.map((u) => (
            <option key={u.username} value={u.username}>
              {u.username} ({u.level})
            </option>
          ))}
        </select>
      </div>

      {/* Max Assignees */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold">Max Assignees</span>
        </label>
        <input
          type="number"
          min={1}
          max={departmentUsers.length}
          value={maxAssignees}
          onChange={(e) => setMaxAssignees(Number(e.target.value))}
          className="input input-bordered w-full"
          placeholder="Max number of assignees"
        />
      </div>

      {/* Due Date */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold">Due Date</span>
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {/* Submit Button */}
      <div className="form-control w-full mt-4">
        <button
          onClick={handleAddTask}
          className="btn btn-primary w-full"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
