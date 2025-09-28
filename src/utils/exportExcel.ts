import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Task } from "@/types/task";

export const exportTasksToExcel = (tasks: Task[]) => {
  const worksheetData = tasks.map((t) => ({
    ID: t.id,
    Title: t.title,
    Description: t.description || "",
    Status: t.status,
    CreatedAt: new Date(t.createdAt).toLocaleString(),
    UpdatedAt: new Date(t.updatedAt).toLocaleString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, `tasks_${Date.now()}.xlsx`);
};
