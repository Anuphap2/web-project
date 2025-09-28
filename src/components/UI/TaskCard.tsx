"use client";
import { Task } from "@/types/task";
import { useTaskStore } from "@/store/taskStore";
import Card from "@/components/UI/Card";
import { useState } from "react";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);

  const handleSave = () => {
    updateTask({ ...task, title, description, status });
    setIsEditing(false);
  };

  return (
    <Card title={isEditing ? "แก้ไขงาน" : task.title}>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            className="border p-1 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border p-1 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="border p-1 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              บันทึก
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {description && <p>{description}</p>}
          <p>สถานะ: {status}</p>
          <p className="text-xs text-gray-400">
            สร้างเมื่อ: {new Date(task.createdAt).toLocaleString()}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 cursor-pointer text-white px-3 py-1 rounded"
            >
              แก้ไข
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded"
            >
              ลบงาน
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
