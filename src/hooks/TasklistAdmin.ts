import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import { Task } from "@/types/task";

export function useTaskListAll(tasks: Task[]) {
  const { username, level } = useUserStore();
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  // --- actions ---
  const claimTask = (task: Task) => {
    if (level === "manager") return;

    const assignees = task.assignees || [];
    if (task.maxAssignees && assignees.length >= task.maxAssignees) return;

    updateTask({
      ...task,
      assignees: [...assignees, username!],
      status: "In Progress",
      updatedAt: new Date().toISOString(),
    });
  };

  const saveEdit = (task: Task, title: string, description: string, status: Task["status"]) => {
    updateTask({
      ...task,
      title,
      description,
      status,
      updatedAt: new Date().toISOString(),
    });
  };

  const removeTask = (id: string) => {
    deleteTask(id);
  };

  // --- filter tasks ---
  const visibleTasks =
    level === "manager"
      ? tasks
      : tasks.filter((task) => {
          const assignees = task.assignees || [];
          const isFull = task.maxAssignees ? assignees.length >= task.maxAssignees : false;
          const hasUser = assignees.includes(username!);
          return !(hasUser || isFull);
        });

  return {
    username,
    level,
    visibleTasks,
    claimTask,
    saveEdit,
    removeTask,
  };
}
