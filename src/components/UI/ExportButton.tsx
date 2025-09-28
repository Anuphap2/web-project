"use client";
import { useTaskStore } from "@/store/taskStore";
import { exportTasksToExcel } from "@/utils/exportExcel";
import Button from "./Button"; // import ปุ่มของคุณ

export default function ExportButton() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <Button
      label="Export Excel"
      onClick={() => exportTasksToExcel(tasks)}
    />
  );
}
