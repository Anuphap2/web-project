import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import { Task } from "@/types/task";

export function useEmployeeTasks(tasks: Task[]) {
  const { username } = useUserStore();
  const updateTask = useTaskStore((state) => state.updateTask);

  const handleToggleComplete = (task: Task) => {
    if (!username || !(task.assignees?.includes(username))) return;

    const updatedTask: Task = {
      ...task,
      status: task.status === "Completed" ? "In Progress" : "Completed",
      updatedAt: new Date().toISOString(),
    };

    updateTask(updatedTask);
  };

  const handleUnassign = (task: Task) => {
    if (!username || task.status !== "In Progress") return;

    const newAssignees = (task.assignees || []).filter((u) => u !== username);
    const updatedTask: Task = {
      ...task,
      assignees: newAssignees,
      status: newAssignees.length === 0 ? "No Assignee" : task.status,
      updatedAt: new Date().toISOString(),
    };

    updateTask(updatedTask);
  };

  const visibleTasks = username
    ? tasks.filter((task) => task.assignees?.includes(username))
    : [];

  return { username, visibleTasks, handleToggleComplete, handleUnassign };
}
