"use client";
import { useUserStore } from "@/store/userStore";
import { useTaskStore } from "@/store/Tasks/taskStore";
import TaskList from "@/components/UI/Tasks/CRUD/TasklistAdmin";
import TaskSummary from "@/components/UI/Tasks/TaskSummaryAll";
import ExportButton from "@/components/UI/ExportButton";

export default function HomePage() {
  const { username, department } = useUserStore();
  const tasks = useTaskStore((state) => state.tasks);

  // filter เฉพาะงานในแผนกของ user
  const departmentTasks = tasks.filter((t) => t.department === department);

  return (
    <div className="p-8 space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          Manager {username} - {department} Dashboard
        </h1>
        <ExportButton />
      </header>

      {/* 1. Task Summary */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">สรุปสถานะงาน</h2>
        <TaskSummary />
      </section>


      {/* 3. งานทั้งหมดของแผนก */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">งานทั้งหมดของแผนก</h2>
        <TaskList tasks={departmentTasks} />
      </section>
    </div>
  );
}
