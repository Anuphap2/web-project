"use client";
import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import Button from "@/components/UI/Button";
import { Task } from "@/types/task";
import { useState } from "react";

type TaskListProps = {
  tasks: Task[];
};

export default function TaskCard({ tasks }: TaskListProps) {
  const { username, level } = useUserStore();
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<Task["status"]>("No Assignee");

  if (!username) return null; // ยังไม่ได้ login

  // กรองงาน: 
  // - employee: เห็นเฉพาะงานที่ยังไม่ได้รับและยังไม่เต็ม
  // - manager: เห็นทุกงาน
  const visibleTasks = level === "manager"
    ? tasks
    : tasks.filter((task) => {
        const assignees = task.assignees || [];
        const isFull = task.maxAssignees ? assignees.length >= task.maxAssignees : false;
        const hasUser = assignees.includes(username);
        return !hasUser && !isFull;
      });

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditStatus(task.status);
  };

  const cancelEditing = () => setEditingTaskId(null);

  const saveTask = (task: Task) => {
    updateTask({
      ...task,
      title: editTitle,
      description: editDescription,
      status: editStatus,
      updatedAt: new Date().toISOString(),
    });
    setEditingTaskId(null);
  };

  const handleDeleteTask = (task: Task) => {
    if (confirm("คุณแน่ใจว่าจะลบงานนี้หรือไม่?")) {
      deleteTask(task.id);
    }
  };

  const handleClaimTask = (task: Task) => {
    if (level === "manager") return; // manager ไม่ต้อง claim
    const assignees = task.assignees || [];
    if (task.maxAssignees && assignees.length >= task.maxAssignees) return;

    updateTask({
      ...task,
      assignees: [...assignees, username],
      status: "In Progress",
      updatedAt: new Date().toISOString(),
    });
  };

  if (visibleTasks.length === 0) return <p>ไม่มีงานให้แสดงตอนนี้</p>;

  return (
    <ul className="space-y-2">
      {visibleTasks.map((task) => {
        const isEditing = editingTaskId === task.id;
        const assignees = task.assignees || [];
        const isAssigned = assignees.includes(username);

        return (
          <li
            key={task.id}
            className="border rounded p-3 bg-white shadow hover:shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex-1">
              {isEditing ? (
                <div className="flex flex-col gap-2">
                  <input
                    className="border p-1 rounded"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="border p-1 rounded"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <select
                    className="border p-1 rounded"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as Task["status"])}
                  >
                    <option value="No Assignee">No Assignee</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold">{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                  <p>Status: {task.status}</p>
                  <p>Assigned to: {assignees.join(", ") || "Unassigned"}</p>
                </div>
              )}
            </div>

            <div className="mt-2 md:mt-0 md:ml-4 flex flex-col gap-2">
              {level === "manager" ? (
                isEditing ? (
                  <>
                    <Button label="Save" onClick={() => saveTask(task)} />
                    <Button label="Cancel" onClick={cancelEditing} />
                  </>
                ) : (
                  <>
                    <Button label="Edit" onClick={() => startEditing(task)} />
                    <Button label="Delete" onClick={() => handleDeleteTask(task)} />
                  </>
                )
              ) : (
                !isAssigned && (
                  <Button label="Claim Task" onClick={() => handleClaimTask(task)} />
                )
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
