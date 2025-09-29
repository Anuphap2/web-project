import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import { Task } from "@/types/task";

export function useEmployeeTasks(tasks: Task[]) {
  const { username } = useUserStore();
  const updateTask = useTaskStore((state) => state.updateTask);

  if (!username) return { username: null, visibleTasks: [], handleToggleComplete: () => {}, handleUnassign: () => {} };

  // filter งานที่พนักงานเห็นได้ (ตัวเองเป็น assignee)
  const visibleTasks = tasks.filter((task) => {
    const assignees = task.assignees || [];
    return assignees.includes(username);
  });

  const handleToggleComplete = (task: Task) => {
    const assignees = task.assignees || [];
    if (!assignees.includes(username)) return;

    const newStatus = task.status === "Completed" ? "In Progress" : "Completed";
    updateTask({
      ...task,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleUnassign = (task: Task) => {
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

  return { username, visibleTasks, handleToggleComplete, handleUnassign };
}