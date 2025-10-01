import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Task } from "@/types/task";

const formatDate = (dateStr?: string, withTime = true) => {
  if (!dateStr) return "";
  const options: Intl.DateTimeFormatOptions = withTime
    ? { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }
    : { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Intl.DateTimeFormat("th-TH", options).format(new Date(dateStr));
};

const getDelayStatus = (task: Task) => {
  if (task.status !== "Completed" || !task.dateEnd) return "-";
  return new Date(task.updatedAt) > new Date(task.dateEnd) ? "ล่าช้า" : "ทันเวลา";
};

const generateSummary = (tasks: Task[]) => {
  const summary = {
    "ยังไม่ได้รับงาน": 0,
    "กำลังดำเนินการ": 0,
    "เสร็จสมบูรณ์": 0,
  };

  tasks.forEach((t) => {
    if (t.status === "No Assignee") summary["ยังไม่ได้รับงาน"]++;
    else if (t.status === "In Progress") summary["กำลังดำเนินการ"]++;
    else if (t.status === "Completed") summary["เสร็จสมบูรณ์"]++;
  });

  return [
    { สถานะ: "ยังไม่ได้รับงาน", จำนวน: summary["ยังไม่ได้รับงาน"] },
    { สถานะ: "กำลังดำเนินการ", จำนวน: summary["กำลังดำเนินการ"] },
    { สถานะ: "เสร็จสมบูรณ์", จำนวน: summary["เสร็จสมบูรณ์"] },
    { สถานะ: "รวมทั้งหมด", จำนวน: tasks.length },
  ];
};

export const exportTasksToExcel = (tasks: Task[]) => {
  const taskSheetData = tasks.map((t) => ({
    รหัสงาน: t.id,
    หัวข้อ: t.title,
    รายละเอียด: t.description || "",
    สถานะการทำงาน: t.status,
    ผู้ที่รับผิดชอบ: t.assignees?.join(", ") || "ยังไม่มีผู้ที่รับผิดชอบ",
    แผนก: t.department,
    สร้างโดย: t.createdBy,
    สร้างงานวันที่: formatDate(t.createdAt),
    สิ้นสุดวันที่: formatDate(t.dateEnd, false),
    อัพเดทล่าสุด: formatDate(t.updatedAt),
    สถานะการล่าช้า: getDelayStatus(t),
  }));

  const taskSheet = XLSX.utils.json_to_sheet(taskSheetData);
  const summarySheet = XLSX.utils.json_to_sheet(generateSummary(tasks));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, taskSheet, "Tasks");
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  const today = new Date();
  const fileName = `tasks_${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}.xlsx`;

  saveAs(blob, fileName);
};
