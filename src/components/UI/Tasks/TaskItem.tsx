"use client";
import { Task } from "@/types/task";
import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import Button from "@/components/UI/Button";

type EmployeeTaskTableProps = {
  tasks: Task[];
};

export default function EmployeeTaskTable({ tasks }: EmployeeTaskTableProps) {
  const { username } = useUserStore();
  const updateTask = useTaskStore((state) => state.updateTask);

  if (!username) return <p>กรุณา login ก่อน</p>;

  // filter งานที่พนักงานเห็นได้
  const visibleTasks =
    tasks?.filter((task) => {
      const assignees = task.assignees || [];
      return assignees.includes(username); // เอาเฉพาะงานที่ตัวเองเป็น assignee
    }) || [];

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

  if (visibleTasks.length === 0) return <p>ไม่มีงานให้แสดงตอนนี้</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Assignees</th>
            <th className="px-4 py-2 text-left">EndDate At</th>
            <th className="px-4 py-2 text-left">Updated At</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleTasks.map((task) => {
            const assignees = task.assignees || [];
            const isAssignedToMe = assignees.includes(username);

            return (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">{task.description || "-"}</td>
                <td className="px-4 py-2">{task.status}</td>
                <td className="px-4 py-2">
                  {assignees.join(", ") || "Unassigned"}
                </td>
                <td className="px-4 py-2">
                  {task.dateEnd
                    ? new Date(task.dateEnd).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-2">
                  {new Date(task.updatedAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  {/* Claim/Assign ตัวเองได้ ถ้ายังไม่เต็ม */}

                  {/* ปุ่มของงานที่ตัวเองเป็น assignee */}
                  {isAssignedToMe && (
                    <>
                      <Button
                        label={
                          task.status === "Completed"
                            ? "Mark In Progress"
                            : "Complete Task"
                        }
                        onClick={() => handleToggleComplete(task)}
                      />
                      {task.status === "In Progress" && (
                        <Button
                          label="Unassign"
                          onClick={() => handleUnassign(task)}
                        />
                      )}
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
