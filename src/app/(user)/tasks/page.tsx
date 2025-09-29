"use client";
import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import EmployeeTaskTable from "@/components/UI/Tasks/TaskItemUser";
import TaskSummary from "@/components/UI/Tasks/TaskSumUser";

export default function MyTasksPage() {
  const username = useUserStore((state) => state.username);
  const tasks = useTaskStore((state) => state.tasks);

  if (!username) return null;

  return (
    <div className="container mx-auto p-8 bg-white border border-gray-200 rounded-lg">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">งานของฉัน</h1>
        <p className="text-sm text-gray-500 mt-1">รายการงานที่ได้รับมอบหมาย</p>
      </div>

      <div className="flex justify-center mb-8">
        <TaskSummary />
      </div>

      <div>
        <EmployeeTaskTable tasks={tasks} />
      </div>
    </div>
  );
}
