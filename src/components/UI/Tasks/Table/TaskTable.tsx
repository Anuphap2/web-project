import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Task } from "@/types/task";
import Button from "@/components/UI/Button";

interface TaskTableProps {
  tasks: Task[];
  username: string;
  level: string;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onClaim: (task: Task) => void;
}

export default function TaskTable({
  tasks,
  username,
  level,
  onEdit,
  onDelete,
  onClaim,
}: TaskTableProps) {
  // เก็บ state ของ row ที่กำลัง expand
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const columns: TableColumn<Task>[] = [
    { name: "Title", selector: (row) => row.title, sortable: true },
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
    { name: "Status", selector: (row) => row.status, sortable: true },
    {
      name: "Assignees",
      selector: (row) => (row.assignees || []).join(", "),
      wrap: true,
    },
    {
      name: "End Date",
      selector: (row) =>
        row.dateEnd ? new Date(row.dateEnd).toLocaleDateString() : "-",
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => new Date(row.updatedAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        const isAssigned = (row.assignees || []).includes(username);
        return level === "manager" ? (
          <div className="flex gap-2">
            <Button
              className="btn-warning"
              label="Edit"
              onClick={() => onEdit(row)}
            />
            <Button
              className="btn-error"
              label="Delete"
              onClick={() => onDelete(row)}
            />
          </div>
        ) : (
          !isAssigned && (
            <Button
              className="btn-primary"
              label="Claim Task"
              onClick={() => onClaim(row)}
            />
          )
        );
      },
      ignoreRowClick: true,
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

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Task List</h2>
      <DataTable
        columns={columns}
        data={tasks}
        pagination
        highlightOnHover
        striped
        customStyles={customStyles}
        responsive
        noHeader
      />
    </div>
  );
}
