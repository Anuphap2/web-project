import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Task } from "@/types/task";

export const exportTasksToExcel = (tasks: Task[]) => {
  // 1️⃣ Sheet Tasks
  const worksheetData = tasks.map((t) => {
    let delayStatus = "-"; // default สำหรับงานที่ยังไม่เสร็จ
    if (t.status === "Completed" && t.dateEnd) {
      delayStatus = new Date(t.updatedAt) > new Date(t.dateEnd) ? "ล่าช้า" : "ทันเวลา";
    }

    return {
      รหัสงาน: t.id,
      หัวข้อ: t.title,
      รายละเอียด: t.description || "",
      สถานะการทำงาน: t.status,
      ผู้ที่รับผิดชอบ: t.assignees && t.assignees.length > 0
        ? t.assignees.join(", ")
        : "ยังไม่ได้รับงาน",
      แผนก: t.department,
      สร้างโดย: t.createdBy,
      สร้างงานวันที่: new Date(t.createdAt).toLocaleString(),
      สิ้นสุดวันที่: t.dateEnd ? new Date(t.dateEnd).toLocaleDateString() : "",
      อัพเดทล่าสุด: new Date(t.updatedAt).toLocaleString(),
      สถานะการล่าช้า: delayStatus,
    };
  });

  const taskSheet = XLSX.utils.json_to_sheet(worksheetData);

  // 2️⃣ Sheet Summary
  const summary = {
    "No Assignee": 0,
    "In Progress": 0,
    Completed: 0,
  };

  tasks.forEach((t) => {
    if (t.status in summary) summary[t.status as keyof typeof summary]++;
  });

  const summarySheet = XLSX.utils.json_to_sheet([
    { สถานะ: "ยังไม่ได้รับงาน", จำนวน: summary["No Assignee"] },
    { สถานะ: "กำลังดำเนินการ", จำนวน: summary["In Progress"] },
    { สถานะ: "เสร็จสมบูรณ์", จำนวน: summary["Completed"] },
    { สถานะ: "รวมทั้งหมด", จำนวน: tasks.length },
  ]);

  // 3️⃣ สร้าง Workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, taskSheet, "Tasks");
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

  // 4️⃣ Export
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // เดือนต้อง +1
  const dd = String(today.getDate()).padStart(2, "0");

  saveAs(data, `tasks_${yyyy}-${mm}-${dd}.xlsx`); // tasks_2025-09-29.xlsx

};
