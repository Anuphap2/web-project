import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Task } from "@/types/task";

export const exportTasksToExcel = (tasks: Task[]) => {
  const worksheetData = tasks.map((t) => ({
    รหัสงาน: t.id,
    หัวข้อ: t.title,
    รายละเอียด: t.description || "",
    สถานะการทำงาน: t.status,
    ผู้ที่รับผิดชอบ: t.assignedTo || "ยังไม่ได้รับงาน",
    สร้างโดย: t.createdBy,
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
