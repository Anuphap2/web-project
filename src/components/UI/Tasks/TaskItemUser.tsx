"use client";
import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Task } from "@/types/task";
import Button from "@/components/UI/Button";
import { FaCheckCircle, FaSpinner, FaPlusCircle } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { useEmployeeTasks } from "@/hooks/TaskItemUser";

type EmployeeTaskTableProps = {
  tasks: Task[];
};

const statusMap = {
  "No Assignee": {
    text: "No Assignee",
    color: "bg-gray-200 text-gray-700",
    icon: FaPlusCircle,
  },
  "In Progress": {
    text: "In Progress",
    color: "bg-yellow-200 text-yellow-800",
    icon: FaSpinner,
  },
  Completed: {
    text: "Completed",
    color: "bg-green-200 text-green-800",
    icon: FaCheckCircle,
  },
};

export default function EmployeeTaskTable({ tasks }: EmployeeTaskTableProps) {
  const { username, visibleTasks, handleToggleComplete, handleUnassign } =
    useEmployeeTasks(tasks);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [filterText, setFilterText] = useState("");

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!username)
    return <p className="text-center text-gray-500 p-4">กรุณา login ก่อน</p>;
  if (visibleTasks.length === 0)
    return (
      <p className="text-center text-gray-500 p-4">ไม่มีงานที่ได้รับมอบหมาย</p>
    );

  const columns: TableColumn<Task>[] = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center">
          <BiTask className="mr-2 text-blue-500" />
          {row.title}
        </div>
      ),
    },
    {
      name: "Description",
      cell: (row) => {
        const isExpanded = expandedRows[row.id] || false;
        const text = row.description || "-";
        const shortText = text.length > 100 ? text.slice(0, 100) + "..." : text;
        return (
          <div>
            <p>{isExpanded ? text : shortText}</p>
            {text.length > 100 && (
              <button
                className="text-blue-500 text-sm underline mt-1"
                onClick={() => toggleRow(row.id)}
              >
                {isExpanded ? "ซ่อน" : "ดูเพิ่มเติม"}
              </button>
            )}
          </div>
        );
      },
      wrap: true,
    },
    {
      name: "Status",
      sortable: true,
      cell: (row) => {
        const statusInfo = statusMap[row.status] || statusMap["No Assignee"];
        const Icon = statusInfo.icon;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
          >
            <Icon className="mr-1" />
            {statusInfo.text}
          </span>
        );
      },
    },
    {
      name: "Assignees",
      selector: (row) => (row.assignees || []).join(", "),
      wrap: true,
    },
    {
      name: "Due Date",
      sortable: true,
      selector: (row) =>
        row.dateEnd ? new Date(row.dateEnd).toLocaleDateString() : "-",
    },
    {
      name: "Updated At",
      sortable: true,
      selector: (row) => new Date(row.updatedAt).toLocaleString(),
    },
    {
      name: "Actions",
      cell: (row) => {
        const isAssignedToMe = (row.assignees || []).includes(username);

        if (!isAssignedToMe) return null;

        return (
          <div className="flex flex-col items-center gap-2">
            <div>
              <Button
                label={
                  row.status === "Completed" ? "กลับไปทำต่อ" : "ทำงานเสร็จ"
                }
                onClick={() => handleToggleComplete(row)}
                className={`font-semibold ${
                  row.status === "Completed"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white px-3 py-1.5 text-xs rounded-md transition-colors`}
              />
            </div>

            {row.status === "In Progress" && (
              <div>
                <Button
                  label="ยกเลิก"
                  onClick={() => handleUnassign(row)}
                  className="font-semibold bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-xs rounded-md transition-colors"
                />
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f3f4f6",
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    rows: {
      style: {
        minHeight: "50px",
        fontSize: "14px",
        borderBottom: "1px solid #e5e7eb",
      },
    },
  };

  const filteredTasks = visibleTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(filterText.toLowerCase()) ||
      (task.assignees || [])
        .join(", ")
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      (task.description?.toLowerCase() || "").includes(filterText.toLowerCase())
  );

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="ค้นหาหัวข้องาน รายละเอียด หรือ ผู้รับผิดชอบ"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="input input-bordered w-full max-w-sm"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredTasks}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
        noHeader
      />
    </div>
  );
}
