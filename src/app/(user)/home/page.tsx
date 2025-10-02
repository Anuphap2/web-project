"use client";
import { useUserStore } from "@/store/userStore";
import { useTaskStore } from "@/store/Tasks/taskStore";
import Tasks from "@/components/UI/Tasks/Task";
import useCheckUser from "@/hooks/checkLogin";
export default function HomePage() {
  const { username, level, department } = useUserStore();
  const tasks = useTaskStore((state) => state.tasks);
  const departmentTasks = tasks.filter((t) => t.department === department);

  const { isAuthorized } = useCheckUser({ requiredRole: "employee" });
  if (!isAuthorized) return null;

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
            </div>
          </div>
        </div>

        {/* Department Tasks */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
            งานทั้งหมดในแผนก
            <span className="badge badge-info">{department}</span>
          </h2>

          {departmentTasks.length > 0 ? (
            // เอา grid ออกแล้วให้ Tasks จัด layout เอง
            <Tasks tasks={departmentTasks} />
          ) : (
            <div className="card bg-base-100 shadow-lg rounded-xl text-center p-6 transition-all hover:shadow-xl">
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
