"use client";
import { useTaskStore } from "@/store/taskStore";
import { useUserStore } from "@/store/userStore";

export default function TaskSummary() {
  const tasks = useTaskStore((state) => state.tasks);
  const { department } = useUserStore();

  const deptTasks = tasks.filter((t) => t.department === department);

  const todoCount = deptTasks.filter((t) => t.status === "todo").length;
  const inProgressCount = deptTasks.filter(
    (t) => t.status === "in-progress"
  ).length;
  const doneCount = deptTasks.filter((t) => t.status === "done").length;

  return (
    <div className="flex gap-4 mb-4">
      <div className="bg-yellow-100 p-4 rounded shadow">
        <h3 className="font-bold">ยังไม่เสร็จ</h3>
        <p className="text-2xl">{todoCount}</p>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow">
        <h3 className="font-bold">อยู่ระหว่างดำเนินการ</h3>
        <p className="text-2xl">{inProgressCount}</p>
      </div>
      <div className="bg-green-100 p-4 rounded shadow">
        <h3 className="font-bold">เสร็จแล้ว</h3>
        <p className="text-2xl">{doneCount}</p>
      </div>
    </div>
  );
}
