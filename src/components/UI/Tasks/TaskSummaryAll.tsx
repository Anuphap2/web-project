"use client";
import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import {
  FaClipboardList,
  FaHourglassHalf,
  FaRegCalendarCheck,
  FaExclamationCircle,
} from "react-icons/fa";

const getColorClasses = (label: string) => {
  switch (label) {
    case "ยังไม่ได้รับงาน":
      return {
        iconBg: "bg-gray-500",
        border: "border-gray-500",
        text: "text-gray-700",
      };
    case "กำลังดำเนินการ":
      return {
        iconBg: "bg-yellow-500",
        border: "border-yellow-500",
        text: "text-yellow-700",
      };
    case "เสร็จสมบูรณ์":
      return {
        iconBg: "bg-green-500",
        border: "border-green-500",
        text: "text-green-700",
      };
    case "รวมทั้งหมด":
      return {
        iconBg: "bg-blue-600",
        border: "border-blue-600",
        text: "text-blue-800",
      };
    default:
      return {
        iconBg: "bg-gray-300",
        border: "border-gray-300",
        text: "text-gray-500",
      };
  }
};

export default function TaskSummary() {
  const tasks = useTaskStore((state) => state.tasks);
  const department = useUserStore((state) => state.department);

  if (!department) return null;

  // กรองงานเฉพาะแผนกตัวเอง
  const deptTasks = tasks.filter((t) => t.department === department);

  const summary = {
    ยังไม่ได้รับงาน: deptTasks.filter((t) => t.status === "No Assignee").length,
    กำลังดำเนินการ: deptTasks.filter((t) => t.status === "In Progress").length,
    เสร็จสมบูรณ์: deptTasks.filter((t) => t.status === "Completed").length,
  };

  const cards = [
    {
      label: "ยังไม่ได้รับงาน",
      count: summary["ยังไม่ได้รับงาน"],
      icon: FaExclamationCircle,
      detail: "งานที่ยังไม่ได้มอบหมาย",
    },
    {
      label: "กำลังดำเนินการ",
      count: summary["กำลังดำเนินการ"],
      icon: FaHourglassHalf,
      detail: "งานที่กำลังดำเนินการ",
    },
    {
      label: "เสร็จสมบูรณ์",
      count: summary["เสร็จสมบูรณ์"],
      icon: FaRegCalendarCheck,
      detail: "งานที่เสร็จสมบูรณ์แล้ว",
    },
    {
      label: "รวมทั้งหมด",
      count: deptTasks.length,
      icon: FaClipboardList,
      detail: "งานทั้งหมดของแผนก",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto max-w-6xl">
      {cards.map((card) => {
        const { iconBg, border, text } = getColorClasses(card.label);
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className={`bg-white p-5 rounded-xl shadow-lg border-l-4 ${border} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className={`p-3 rounded-full ${iconBg} text-white flex items-center justify-center shadow-md`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <p className={`text-3xl font-extrabold ${text} tracking-tight`}>
                {card.count}
              </p>
            </div>
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
