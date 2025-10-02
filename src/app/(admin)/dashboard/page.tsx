"use client";
import { useUserStore, useUserListStore } from "@/store/userStore";
import { useTaskStore } from "@/store/Tasks/taskStore";
import TaskList from "@/components/UI/Tasks/CRUD/TasklistAdmin";
import TaskSummary from "@/components/UI/Tasks/TaskSummaryAll";
import ExportButton from "@/components/UI/ExportButton";
import useCheckUser from "@/hooks/checkLogin";

export default function HomePage() {
  const { username, department, level } = useUserStore(); // ดึง users
  const tasks = useTaskStore((state) => state.tasks);
  const users = useUserListStore((state) => state.users); // ดึง user ทั้งหมด

  // ตรวจสอบสิทธิ์
  const { isAuthorized, isLoaded } = useCheckUser({ requiredRole: "manager" });
  if (!isLoaded) return <p>กำลังโหลด...</p>;
  if (!isAuthorized) return null;

  // filter เฉพาะงานในแผนกของ user
  const departmentTasks = tasks.filter((t) => t.department === department);

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300 transition-shadow duration-300 hover:shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              ยินดีต้อนรับ, <span className="text-primary">{username}</span>!
            </h1>
            <p className="text-lg text-gray-500 mb-4">ระบบจัดการงานสำหรับคุณ</p>

            <div className="flex items-center gap-4 mt-4">
              {/* Level Badge */}
              <div className="badge badge-lg badge-primary flex items-center justify-start gap-2 p-3 transition-all hover:scale-105">
                <span className="font-medium">ตำแหน่ง:</span>
                <span className="font-bold uppercase">{level}</span>
              </div>

              {/* Department Badge */}
              <div className="badge badge-lg badge-accent flex items-center justify-start gap-2 p-3 transition-all hover:scale-105">
                <span className="font-medium">แผนก:</span>
                <span className="font-bold">{department || "N/A"}</span>
              </div>

              <div className="ml-auto">
                <ExportButton />
              </div>
            </div>
          </div>
        </div>

        {/* 1. Task Summary */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">สรุปสถานะงาน</h2>
          <TaskSummary />
        </section>

        {/* 2. งานทั้งหมดของแผนก */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">งานทั้งหมดของแผนก</h2>
          {users && <TaskList users={users} tasks={departmentTasks} />}
        </section>
      </div>
    </div>
  );
}
