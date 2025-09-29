"use client";
import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import Button from "@/components/UI/Button";

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (data: {
    task: Task;
    title: string;
    description: string;
    status: Task["status"];
    assignees: string[];
    maxAssignees: number;
  }) => void;
  visibleTasks: Task[];
}

export default function EditTaskModal({
  task,
  onClose,
  onSave,
  visibleTasks,
}: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState<Task["status"]>(task.status);
  const [assignees, setAssignees] = useState<string[]>(task.assignees || []);
  const [maxAssignees, setMaxAssignees] = useState<number>(
    task.maxAssignees || 1
  );

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || "");
    setStatus(task.status);
    setAssignees(task.assignees || []);
    setMaxAssignees(task.maxAssignees || 1);
  }, [task]);

  const allUsers = visibleTasks
    .flatMap((t) => t.assignees || [])
    .filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Edit Task</h3>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="textarea textarea-bordered w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="select select-bordered w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
          >
            <option value="No Assignee">No Assignee</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <input
            type="number"
            min={1}
            value={maxAssignees}
            onChange={(e) => setMaxAssignees(Number(e.target.value))}
            className="input input-bordered w-full"
          />

          <select
            multiple
            value={assignees}
            onChange={(e) =>
              setAssignees(
                Array.from(e.target.selectedOptions, (opt) => opt.value)
              )
            }
            className="select select-bordered w-full h-32"
          >
            {allUsers.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>

          <div className="modal-action">
            <Button className="secondary" label="Cancel" onClick={onClose} />
            <Button
              className="btn-primary"
              label="Save"
              onClick={() =>
                onSave({
                  task,
                  title,
                  description,
                  status,
                  assignees,
                  maxAssignees,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
