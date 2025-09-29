"use client";
import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import { FaClipboardList, FaHourglassHalf, FaRegCalendarCheck } from "react-icons/fa";

// ฟังก์ชันจำลองเพื่อกำหนดสี dynamic สำหรับ Tailwind
// เนื่องจาก Tailwind จะต้องรู้คลาสทั้งหมดล่วงหน้า
const getColorClasses = (label: string) => {
    switch (label) {
        case "กำลังดำเนินการ":
            return { iconBg: "bg-yellow-500", border: "border-yellow-500", text: "text-yellow-700" };
        case "เสร็จสมบูรณ์":
            return { iconBg: "bg-green-500", border: "border-green-500", text: "text-green-700" };
        // ลบสถานะ "ยังไม่ได้รับงาน" ออก
        case "รวมทั้งหมด":
            return { iconBg: "bg-blue-600", border: "border-blue-600", text: "text-blue-800" };
        default:
            return { iconBg: "bg-gray-300", border: "border-gray-300", text: "text-gray-500" };
    }
};

export default function TaskSummary() {
  const tasks = useTaskStore((state) => state.tasks);
  const username = useUserStore((state) => state.username);

  if (!username) return null;

  // กรองงาน: เฉพาะงานที่ตัวเองเป็น assignee
  const myTasks = tasks.filter((t) => t.assignees?.includes(username));

  // นับสถานะ (เหลือเฉพาะที่เกี่ยวข้องกับงานที่ได้รับมอบหมาย)
  const summary = {
    // ลบ "No Assignee" ออกจากการนับ
    "In Progress": myTasks.filter(t => t.status === "In Progress").length,
    "Completed": myTasks.filter(t => t.status === "Completed").length,
  };

  const cards = [
    { label: "กำลังดำเนินการ", count: summary["In Progress"], icon: FaHourglassHalf, detail: "งานที่รอการดำเนินการ" },
    { label: "เสร็จสมบูรณ์", count: summary["Completed"], icon: FaRegCalendarCheck, detail: "งานที่ถูกปิดแล้ว" },
    // ลบการ์ด "ยังไม่ได้รับงาน" ออก
    { label: "รวมทั้งหมด", count: myTasks.length, icon: FaClipboardList, detail: "งานทั้งหมดของคุณ" },
  ];

  return (
    // แก้ไข: เปลี่ยน md:grid-cols-4 เป็น md:grid-cols-3 เพื่อให้การ์ดดูสมดุล
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-5xl">
      {cards.map((card) => {
        const { iconBg, border, text } = getColorClasses(card.label);
        
        return (
          <div
            key={card.label}
            // เพิ่ม border-l-4 และ hover effect
            className={`bg-white p-5 rounded-xl shadow-lg border-l-4 ${border} transition-all duration-300 hover:shadow-2xl hover:translate-y-[-2px]`}
          >
            <div className="flex items-center justify-between mb-2">
                
                {/* Icon ที่มีพื้นหลังสีเต็ม */}
                <div
                    className={`p-3 rounded-full ${iconBg} text-white flex items-center justify-center shadow-md`}
                >
                    <card.icon className="w-5 h-5" />
                </div>

                {/* จำนวนงาน */}
                <p className={`text-3xl font-extrabold ${text} tracking-tight`}>
                    {card.count}
                </p>
            </div>
            
            {/* รายละเอียด */}
            <div className="mt-3">
                <p className="text-sm font-semibold uppercase text-gray-500">
                    {card.label}
                </p>
                <p className="text-xs text-gray-400 mt-1">{card.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
