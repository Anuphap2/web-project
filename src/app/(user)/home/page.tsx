"use client";
import { useUserStore } from "@/store/userStore";
import { useTaskStore } from "@/store/Tasks/taskStore";
import TaskCard from "@/components/UI/Tasks/TaskCard";

export default function HomePage() {
  const { username, level, department } = useUserStore();
  const tasks = useTaskStore((state) => state.tasks);

  const departmentTasks = tasks.filter((t) => t.department === department);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Welcome, {username}</h1>
        <p>Level: {level}</p>
        <p>Department: {department}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Tasks in your department
        </h2>
        <TaskCard tasks={departmentTasks} />
      </div>
    </div>
  );
}
