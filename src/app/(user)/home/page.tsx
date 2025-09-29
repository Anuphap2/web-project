"use client";
import { useUserStore } from "@/store/userStore";
import { useTaskStore } from "@/store/Tasks/taskStore";
import Tasks from "@/components/UI/Tasks/Task";
// สมมติว่า Tasks เป็นคอมโพเนนต์ที่แสดงตารางงาน
// และมี Tasks ที่ถูก Mock หรือเชื่อมต่อกับ Store เรียบร้อยแล้ว

export default function HomePage() {
  const { username, level, department } = useUserStore();
  const tasks = useTaskStore((state) => state.tasks);

  // กรองงานเฉพาะแผนก
  const departmentTasks = tasks.filter((t) => t.department === department);

  // การ์ดสำหรับแสดงข้อมูลต้อนรับ
  const WelcomeCard = () => (
    <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100 transition-shadow duration-300">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
        ยินดีต้อนรับ, <span className="text-indigo-600">{username}</span>!
      </h1>
      <p className="text-lg text-gray-500 mb-4">
        ยินดีต้อนรับสู่ระบบจัดการงานของคุณ
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4 mt-4">
        {/* Level Badge */}
        <div className="flex items-center space-x-2 p-3 bg-indigo-50 rounded-lg">
          <span className="text-sm font-medium text-indigo-700">ตำแหน่ง:</span>
          <span className="text-lg font-bold text-indigo-800 uppercase">
            {level}
          </span>
        </div>

        {/* Department Badge */}
        <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-lg">
          <span className="text-sm font-medium text-gray-600">แผนก:</span>
          <span className="text-lg font-bold text-gray-800">
            {department || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* ใช้ max-w-7xl mx-auto เพื่อจัดกึ่งกลางและจำกัดความกว้าง */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ส่วนต้อนรับ */}
        <WelcomeCard />

        {/* ส่วนงานในแผนก */}
        <div className="pt-4">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
            งานทั้งหมดในแผนก
            <span className="text-indigo-600 ml-2">({department})</span>
          </h2>

          {/* Tasks component (สมมติว่าเป็น component ที่มีตารางงาน) */}
          {departmentTasks.length > 0 ? (
            // หาก Tasks component ของคุณรับ prop ชื่อ 'tasks'
            <Tasks tasks={departmentTasks} />
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-lg text-center text-gray-500">
              <p>ขณะนี้ยังไม่มีงานในแผนกของคุณ</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
