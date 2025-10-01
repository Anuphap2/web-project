"use client";
import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import { exportTasksToExcel } from "@/utils/exportExcel";
import Button from "./Button";

export default function ExportButton() {
  const tasks = useTaskStore((state) => state.tasks);
  const { level, department } = useUserStore();

  const handleExport = () => {
    if (level !== "manager") return; // เฉพาะ manager
    const tasksOfDept = tasks.filter((t) => t.department === department);
    exportTasksToExcel(tasksOfDept);
  };

  if (level !== "manager") return null; // employee จะไม่เห็นปุ่ม

  return <Button className="btn btn-primary" label="Export Excel" onClick={handleExport} />;
}
