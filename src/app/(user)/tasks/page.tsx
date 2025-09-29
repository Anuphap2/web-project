"use client";
import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import EmployeeTaskTable from "@/components/UI/Tasks/TaskItem";
import TaskSummary from "@/components/UI/Tasks/TaskSumUser";

export default function MyTasksPage() {
  const username = useUserStore((state) => state.username);
  const tasks = useTaskStore((state) => state.tasks);

  if (!username) return <p>กรุณา login ก่อน</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">งานของฉัน</h1>
      <TaskSummary />
      <EmployeeTaskTable tasks={tasks} />
    </div>
  );
}
