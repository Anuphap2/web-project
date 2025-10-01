"use client";
import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import EmployeeTaskTable from "@/components/UI/Tasks/Table/TaskItemUser"; // Assume this component exists
import TaskSummary from "@/components/UI/Tasks/TaskSumUser"; // Assume this component exists

export default function MyTasksPage() {
  // กำหนดให้เริ่มต้นเป็น true เพื่อให้แสดง Skeleton
  const username = useUserStore((state) => state.username);
  const tasks = useTaskStore((state) => state.tasks);

  
  // กรองงานเฉพาะของผู้ใช้ปัจจุบัน
  if (!username) return null;
  const myTasks = tasks.filter((t) => t.assignees?.includes(username));

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-8">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Section Header */}
        <div className="border-b border-base-300 pb-4 mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">งานของฉัน</h1>
          <p className="text-lg text-gray-500 mt-2">
            รายการงานทั้งหมดที่คุณได้รับมอบหมาย
          </p>
        </div>

        <div className="space-y-8">
          {/* Task Summary */}
          <TaskSummary />

          {/* Task Table - ใช้ Card ของ DaisyUI ห่อหุ้ม */}
          <div className="card bg-base-100 shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              รายละเอียดงาน
            </h2>
            {myTasks.length > 0 ? (
              <EmployeeTaskTable tasks={myTasks} />
            ) : (
              <div className="py-10 text-center text-gray-500">
                <p>ยังไม่มีงานใด ๆ ที่ได้รับมอบหมาย</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
