"use client";
import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import Button from "@/components/UI/Button";
import { Task } from "@/types/task";

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  const { username } = useUserStore();
  const updateTask = useTaskStore((state) => state.updateTask);

  const handleClaimTask = (task: Task) => {
    if (!username) return;

    const currentAssignees = task.assignees || [];
    if (task.maxAssignees && currentAssignees.length >= task.maxAssignees) return;

    if (!currentAssignees.includes(username)) {
      const newAssignees = [...currentAssignees, username];
      const newStatus = newAssignees.length > 0 ? "In Progress" : "No Assignee";

      updateTask({
        ...task,
        assignees: newAssignees,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handleToggleComplete = (task: Task) => {
    if (!username || !(task.assignees || []).includes(username)) return;

    const newStatus = task.status === "Completed" ? "In Progress" : "Completed";

    updateTask({
      ...task,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleUnassignTask = (task: Task) => {
    if (!username) return;

    const currentAssignees = task.assignees || [];
    const newAssignees = currentAssignees.filter((u) => u !== username);
    const newStatus = newAssignees.length === 0 ? "No Assignee" : "In Progress";

    updateTask({
      ...task,
      assignees: newAssignees,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
  };

  // กรองงาน: ให้เห็นเฉพาะที่ตัวเองเป็น assignee หรือยังว่างและไม่เต็ม
  const visibleTasks = tasks.filter((task) => {
    const currentAssignees = task.assignees || [];
    const isAssignedToMe = username ? currentAssignees.includes(username) : false;
    const isFull = task.maxAssignees ? currentAssignees.length >= task.maxAssignees : false;
    return isAssignedToMe || (!isFull && currentAssignees.length === 0);
  });

  if (visibleTasks.length === 0) return <p>No tasks available for you</p>;

  return (
    <ul className="space-y-2">
      {visibleTasks.map((task) => {
        const currentAssignees = task.assignees || [];
        const isAssigned = username ? currentAssignees.includes(username) : false;

        return (
          <li
            key={task.id}
            className="border rounded p-3 bg-white shadow hover:shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex-1">
              <h3 className="font-bold">{task.title}</h3>
              {task.description && <p>{task.description}</p>}
              <p>Status: {task.status}</p>
              <p>Assigned to: {currentAssignees.join(", ") || "Unassigned"}</p>
            </div>
            <div className="mt-2 md:mt-0 md:ml-4 flex flex-col gap-2">
              {!isAssigned && username && currentAssignees.length === 0 && (
                <Button label="Claim Task" onClick={() => handleClaimTask(task)} />
              )}
              {isAssigned && (
                <>
                  <Button
                    label={task.status === "Completed" ? "Mark In Progress" : "Complete Task"}
                    onClick={() => handleToggleComplete(task)}
                  />
                  <Button label="Unassign" onClick={() => handleUnassignTask(task)} />
                </>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
