"use client";
import TaskForm from "@/components/UI/TaskForm";
import TaskCard from "@/components/UI/TaskCard";
import TaskSummary from "@/components/UI/TaskSummary";
import ExportButton from "@/components/UI/ExportButton";
import { useTaskStore } from "@/store/taskStore";

export default function App() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <main className="container mx-auto px-4 space-y-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Task Management
      </h1>

      {/* Summary */}
      <TaskSummary />

      {/* Add Task + Export */}
      <div className="flex gap-2 items-center">
        <TaskForm />
      </div>
      <ExportButton />

      {/* Tasks List */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Tasks
      </h2>
      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p>ยังไม่มีงาน</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </main>
  );
}
