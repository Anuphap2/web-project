"use client";
import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import Card from "@/components/UI/Card";

export default function TaskSummary() {
  const tasks = useTaskStore((state) => state.tasks);
  const department = useUserStore((state) => state.department);

  // กรองเฉพาะงานของแผนกตัวเอง
  const deptTasks = tasks.filter((t) => t.department === department);

  const summary = {
    "No Assignee": 0,
    "In Progress": 0,
    Completed: 0,
  };

  deptTasks.forEach((t) => {
    if (t.status in summary) summary[t.status as keyof typeof summary]++;
  });

  const cards = [
    { label: "ยังไม่ได้รับงาน", count: summary["No Assignee"] },
    { label: "กำลังดำเนินการ", count: summary["In Progress"] },
    { label: "เสร็จสมบูรณ์", count: summary["Completed"] },
    { label: "รวมทั้งหมด", count: deptTasks.length },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.label} title={card.label}>
          <p className="text-2xl font-bold">{card.count}</p>
        </Card>
      ))}
    </div>
  );
}
