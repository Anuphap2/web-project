"use client";
import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import Button from "@/components/UI/Button";
import Toast from "@/components/Layout/Toast";
import Modal from "@/components/UI/Modal";
import { FaUser } from "react-icons/fa";
import { EditTaskModalProps } from "./interface/EditTaskModalProps";

export default function EditTaskModal({
  task,
  onClose,
  onSave,
  users,
  onMessage,
}: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState<Task["status"]>(task.status);
  const [assignees, setAssignees] = useState<string[]>(task.assignees || []);
  const [maxAssignees, setMaxAssignees] = useState<number>(
    task.maxAssignees || 1
  );
  const [dueDate, setDueDate] = useState<string>(task.dateEnd || "");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || "");
    setStatus(task.status);
    setAssignees(task.assignees || []);
    setMaxAssignees(task.maxAssignees || 1);
    setDueDate(task.dateEnd || "");
  }, [task]);

  const allUsersInDept = users
    .filter((u) => u.department === task.department)
    .map((u) => u.username);

  const handleSave = () => {
    if (!title.trim()) {
      onMessage?.({ type: "error", text: "กรุณากรอก Title" });
      return;
    }
    if (assignees.length > maxAssignees) {
      onMessage?.({
        type: "error",
        text: `จำนวนผู้รับผิดชอบสูงสุดคือ ${maxAssignees} คน`,
      });
      return;
    }

    try {
      onSave({
        task,
        title,
        description,
        status,
        assignees,
        maxAssignees,
        dateEnd: dueDate,
      });
      console.log(dueDate);
      onMessage?.({ type: "success", text: "แก้ไข Task สำเร็จ!" });
      onClose();
    } catch {
      onMessage?.({ type: "error", text: "เกิดข้อผิดพลาด กรุณาลองใหม่" });
    }
  };

  return (
    <Modal isOpen={true} title="Edit Task" onClose={onClose}>
      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
      {success && (
        <Toast
          message={success}
          type="success"
          onClose={() => setSuccess(null)}
        />
      )}

      <div className="space-y-5">
        {/* Title */}
        <div className="flex flex-col">
          <label className="label">
            <span className="label-text font-semibold">Title</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Status + Due Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Status</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value as Task["status"])}
            >
              <option value="No Assignee">No Assignee</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Due Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        {/* Max Assignees + Assign To */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Max Assignees</span>
            </label>
            <input
              type="number"
              min={1}
              value={maxAssignees}
              onChange={(e) => setMaxAssignees(Number(e.target.value))}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Assign To</span>
            </label>
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline w-full text-left">
                {assignees.length > 0
                  ? `${assignees.length} assigned`
                  : "Select assignees"}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-h-48 overflow-auto"
              >
                {allUsersInDept.map((user) => (
                  <li key={user}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={assignees.includes(user)}
                        onChange={(e) => {
                          if (e.target.checked)
                            setAssignees([...assignees, user]);
                          else
                            setAssignees(assignees.filter((a) => a !== user));
                        }}
                      />
                      <FaUser className="text-gray-500" /> {user}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {assignees.length > 0 ? (
            assignees.map((a) => (
              <span
                key={a}
                className="badge badge-sm badge-outline flex items-center gap-1"
              >
                <FaUser /> {a}
              </span>
            ))
          ) : (
            <span className="badge badge-sm badge-outline text-gray-500">
              Unassigned
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="modal-action justify-end gap-2">
          <Button className="secondary" label="Cancel" onClick={onClose} />
          <Button className="btn-primary" label="Save" onClick={handleSave} />
        </div>
      </div>
    </Modal>
  );
}
