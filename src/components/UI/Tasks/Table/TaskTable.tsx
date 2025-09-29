"use client";
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
  const columns: TableColumn<Task>[] = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Description", selector: (row) => row.description || "-", wrap: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Assignees", selector: (row) => (row.assignees || []).join(", "), wrap: true },
    { name: "End Date", selector: (row) => row.dateEnd ? new Date(row.dateEnd).toLocaleDateString() : "-", sortable: true },
    { name: "Updated At", selector: (row) => new Date(row.updatedAt).toLocaleString(), sortable: true },
    {
      name: "Actions",
      cell: (row) => {
        const isAssigned = (row.assignees || []).includes(username);
        return level === "manager" ? (
          <div className="flex gap-2">
            <Button className="btn-warning" label="Edit" onClick={() => onEdit(row)} />
            <Button className="btn-error" label="Delete" onClick={() => onDelete(row)} />
          </div>
        ) : (
          !isAssigned && (
            <Button className="btn-primary" label="Claim Task" onClick={() => onClaim(row)} />
          )
        );
      },
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Task List</h2>
      <DataTable
        columns={columns}
        data={tasks}
        pagination
        highlightOnHover
        striped
        responsive
        noHeader
      />
    </div>
  );
}
