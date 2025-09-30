"use client";
import { useUserStore } from "@/store/userStore";
import { useTaskStore } from "@/store/Tasks/taskStore";
import Tasks from "@/components/UI/Tasks/Task";

export default function HomePage() {
  const { username, level, department } = useUserStore();
  const tasks = useTaskStore((state) => state.tasks);

  const departmentTasks = tasks.filter((t) => t.department === department);

  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Card */}
        <div className="card bg-white/90 shadow-xl border-l-4 border-indigo-500 transition-shadow duration-300 hover:shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              ยินดีต้อนรับ, <span className="text-indigo-500">{username}</span>!
            </h1>
            <p className="text-gray-700 mb-4">ระบบจัดการงานสำหรับคุณ</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {/* Level Badge */}
              <div className="badge flex items-center gap-2 p-3 bg-indigo-100 text-indigo-600 font-bold hover:scale-105 transition-transform">
                <span>ตำแหน่ง:</span>
                <span className="uppercase">{level}</span>
              </div>

              {/* Department Badge */}
              <div className="badge flex items-center gap-2 p-3 bg-emerald-100 text-emerald-600 font-bold hover:scale-105 transition-transform">
                <span>แผนก:</span>
                <span>{department || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Department Tasks */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
            งานทั้งหมดในแผนก
            <span className="badge bg-emerald-100 text-emerald-600">
              {department}
            </span>
          </h2>

          {departmentTasks.length > 0 ? (
            <Tasks tasks={departmentTasks} />
          ) : (
            <div className="card bg-white/90 shadow-lg rounded-xl text-center p-6 hover:shadow-xl hover:scale-105 transition-transform">
              <p className="text-gray-500 text-lg">
                ขณะนี้ยังไม่มีงานในแผนกของคุณ
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
