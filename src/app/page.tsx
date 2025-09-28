"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTaskStore } from "@/store/taskStore";
import { useUserStore } from "@/store/userStore";
import TaskForm from "@/components/UI/TaskForm";
import TaskCard from "@/components/UI/TaskCard";
import TaskSummary from "@/components/UI/TaskSummary";
import ExportButton from "@/components/UI/ExportButton"; // import ปุ่ม export

export default function App() {
  const { tasks, loadTasks } = useTaskStore();
  const { username, level, department, login } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    const savedLevel = localStorage.getItem("level") as
      | "manager"
      | "employee"
      | null;
    const savedDepartment = localStorage.getItem("department");

    if (savedUsername && savedPassword && savedLevel && savedDepartment) {
      login(savedUsername, savedPassword, savedLevel, savedDepartment);
    } else {
      router.push("/login");
    }

    loadTasks();
    setLoading(false);
  }, [login, router, loadTasks]);

  if (!username || !level || loading) return null;

  // filter tasks ตาม role
  const visibleTasks =
    level === "manager"
      ? tasks.filter((t) => t.department === department)
      : tasks.filter(
          (t) =>
            t.department === department &&
            (t.createdBy === username ||
              t.assignedTo === username ||
              !t.assignedTo)
        );

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="flex justify-between items-center mb-10 flex-col md:flex-row md:items-center gap-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-600">
            {level} ({department}) | สวัสดี, {username} 👋
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            จัดการงานของคุณ 🚀
          </h1>
        </div>
        {/* เพิ่มตรงนี้ */}
        {level === "manager" && <ExportButton />}
      </header>

      <section className="space-y-8">
        <TaskSummary />
        {level === "manager" && <TaskForm />}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800">รายการงานทั้งหมด</h2>
        <div className="grid gap-4">
          {visibleTasks.length === 0 ? (
            <div className="bg-white p-6 rounded-xl text-center text-gray-500 shadow-sm border border-dashed border-gray-300">
              🎉 ไม่มีงานสำหรับคุณ
            </div>
          ) : (
            visibleTasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </section>
    </main>
  );
}
