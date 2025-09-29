"use client";
import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Task } from "@/types/task";
import { useTaskListAll } from "@/hooks/TasklistAdmin";
import Button from "@/components/UI/Button";

// ใช้ DaisyUI Modal
export default function Tasklist({ tasks }: { tasks: Task[] }) {
  const { username, level, visibleTasks, claimTask, saveEdit, removeTask } =
    useTaskListAll(tasks);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<Task["status"]>("No Assignee");

  if (!username) return null;
  if (visibleTasks.length === 0) return <p>ไม่มีงานให้แสดงตอนนี้</p>;

  const columns: TableColumn<Task>[] = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    {
      name: "Description",
      selector: (row) => row.description || "-",
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
              onClick={() => {
                setEditingTask(row);
                setEditTitle(row.title);
                setEditDescription(row.description || "");
                setEditStatus(row.status);
              }}
            />
            <Button
              className="btn-error"
              label="Delete"
              onClick={() => setDeleteTask(row)}
            />
          </div>
        ) : (
          !isAssigned && (
            <Button
              className="btn-primary"
              label="Claim Task"
              onClick={() => claimTask(row)}
            />
          )
        );
      },
      ignoreRowClick: true,
    },
  ];

  return (
    <>
      <div className="p-4 bg-white rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Task List</h2>
        <DataTable
          columns={columns}
          data={visibleTasks}
          pagination
          highlightOnHover
          striped
          responsive
          noHeader
        />
      </div>

      {/* Edit Modal */}
      <div className={editingTask ? "modal modal-open" : "modal"}>
        <div className="modal-box relative">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setEditingTask(null)}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-4">Edit Task</h3>
          {editingTask && (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                className="input input-bordered w-full"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="textarea textarea-bordered w-full"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <select
                className="select select-bordered w-full"
                value={editStatus}
                onChange={(e) =>
                  setEditStatus(e.target.value as Task["status"])
                }
              >
                <option value="No Assignee">No Assignee</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="modal-action">
                <Button
                  className="secondary"
                  label="Cancel"
                  onClick={() => setEditingTask(null)}
                />
                <Button
                  className="btn-primary"
                  label="Save"
                  onClick={() => {
                    if (editingTask)
                      saveEdit(
                        editingTask,
                        editTitle,
                        editDescription,
                        editStatus
                      );
                    setEditingTask(null);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirm Modal */}
      <div className={deleteTask ? "modal modal-open" : "modal"}>
        <div className="modal-box relative">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setDeleteTask(null)}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-4">Confirm Delete</h3>
          <p>คุณแน่ใจว่าจะลบงานนี้หรือไม่?</p>
          <div className="modal-action">
            <Button
              className="btn secondary"
              label="Cancel"
              onClick={() => setDeleteTask(null)}
            />
            <Button
              label="Delete"
              onClick={() => {
                if (deleteTask) removeTask(deleteTask.id);
                setDeleteTask(null);
              }}
              className="btn btn-error"
            />
          </div>
        </div>
      </div>
    </>
  );
}
