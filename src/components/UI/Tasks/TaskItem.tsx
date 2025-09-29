"use client";
import { Task } from "@/types/task";
import Button from "@/components/UI/Button";
import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const username = useUserStore((state) => state.username);
  const updateTask = useTaskStore((state) => state.updateTask);

  const handleToggleComplete = () => {
    const newStatus = task.status === "Completed" ? "In Progress" : "Completed";
    updateTask({
      ...task,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleUnassign = () => {
    if (task.status !== "In Progress") return;

    const newAssignees = (task.assignees || []).filter((u) => u !== username);
    const newStatus = newAssignees.length === 0 ? "No Assignee" : task.status;

    updateTask({
      ...task,
      assignees: newAssignees,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <li className="border p-3 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center bg-white">
      <div className="flex-1">
        <h3 className="font-semibold">{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <p>สถานะ: {task.status}</p>
        <p>ผู้รับงาน: {(task.assignees || []).join(", ")}</p>
        <p className="text-xs text-gray-400">
          อัปเดตล่าสุด: {new Date(task.updatedAt).toLocaleString()}
        </p>
      </div>

      <div className="mt-2 md:mt-0 md:ml-4 flex flex-col gap-2">
        <Button
          label={task.status === "Completed" ? "Mark In Progress" : "Complete Task"}
          onClick={handleToggleComplete}
        />
        {task.status === "In Progress" && <Button label="Unassign" onClick={handleUnassign} />}
      </div>
    </li>
  );
}
