"use client";
import { useState } from "react";
import { useUserStore, useUserListStore } from "@/store/userStore";
import { useTaskStore } from "@/store/Tasks/taskStore";

export default function AddTaskForm() {
  const { username, department } = useUserStore();
  const users = useUserListStore((state) => state.users);
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState<string | "">("");
  const [maxAssignees, setMaxAssignees] = useState(1); // จำนวนคนสูงสุด

  const departmentUsers = users.filter((u) => u.department === department);

  const handleAddTask = () => {
    if (!title) return alert("กรุณาใส่หัวข้อ task");

    addTask({
      id: Date.now().toString(),
      title,
      description,
      status: "No Assignee",
      createdBy: username!,
      department: department!,
      assignedTo: assignedTo || undefined,
      maxAssignees, // เพิ่ม field
      assignees: assignedTo ? [assignedTo] : [], // รายชื่อคนที่รับงาน
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    setTitle("");
    setDescription("");
    setAssignedTo("");
    setMaxAssignees(1);
  };

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

      <button
        onClick={handleAddTask}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Task
      </button>
    </div>
  );
}
