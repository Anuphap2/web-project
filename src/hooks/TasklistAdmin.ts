import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import { Task } from "@/types/task";

export function useTaskListAll(tasks: Task[]) {
  const { username, level } = useUserStore();
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  // --- Actions ---
  const claimTask = (task: Task) => {
    if (level === "manager" || !username) return;

    const assignees = task.assignees || [];
    if (task.maxAssignees && assignees.length >= task.maxAssignees) return;

    updateTask({
      ...task,
      assignees: [...assignees, username],
      status: "In Progress",
      updatedAt: new Date().toISOString(),
    });
  };

  const saveEdit = (params: {
    task: Task;
    title?: string;
    description?: string;
    status?: Task["status"];
    assignees?: string[];
    maxAssignees?: number;
    dateEnd?: string;
  }) => {
    const { task, title, description, status, assignees, maxAssignees, dateEnd } = params;

    updateTask({
      ...task,
      title: title ?? task.title,
      description: description ?? task.description,
      status: status ?? task.status,
      assignees: assignees ?? task.assignees,
      maxAssignees: maxAssignees ?? task.maxAssignees,
      dateEnd: dateEnd ?? task.dateEnd, // <-- เพิ่มตรงนี้
      updatedAt: new Date().toISOString(),
    });
  };


  const removeTask = (id: string) => {
    deleteTask(id);
  };

  // --- Filter tasks ---
  const visibleTasks = tasks.filter((task) => {
    if (level === "manager") return true;
    if (!username) return false;

    const assignees = task.assignees || [];
    const isFull = task.maxAssignees ? assignees.length >= task.maxAssignees : false;
    const hasUser = assignees.includes(username);

    // พนักงานจะเห็นเฉพาะงานที่ยังไม่ได้ assign หรือยังไม่เต็ม
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
