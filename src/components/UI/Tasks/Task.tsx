"use client";
import Button from "@/components/UI/Button";
import { useGetNewTasks } from "@/hooks/Task";
import { Task } from "@/types/task";
import { FaEdit, FaTrashAlt, FaSave, FaBan, FaCheckCircle } from "react-icons/fa";
import { BiTask } from "react-icons/bi";

type TaskListProps = {
  tasks: Task[];
};

export default function Tasks({ tasks }: TaskListProps) {
  const {
    username,
    level,
    visibleTasks,
    editingTaskId,
    editTitle,
    editDescription,
    editStatus,
    startEditing,
    cancelEditing,
    saveTask,
    handleDeleteTask,
    handleClaimTask,
    setEditTitle,
    setEditDescription,
    setEditStatus,
  } = useGetNewTasks(tasks);

  if (!username) return null;
  if (visibleTasks.length === 0) return (
    <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-md">
      <p className="text-gray-500 text-lg">
        <FaCheckCircle className="inline-block mr-2 text-green-500" />
        ไม่มีงานใหม่ให้แสดงตอนนี้
      </p>
    </div>
  );

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "No Assignee":
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ul className="space-y-4">
      {visibleTasks.map((task) => {
        const isEditing = editingTaskId === task.id;
        const assignees = task.assignees || [];
        const isAssigned = assignees.includes(username);

        return (
          <li
            key={task.id}
            className="border-none rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex-1 space-y-2">
              {isEditing ? (
                <div className="flex flex-col gap-3">
                  <input
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <select
                    className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    value={editStatus}
                    onChange={(e) =>
                      setEditStatus(e.target.value as Task["status"])
                    }
                  >
                    <option value="No Assignee">No Assignee</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <BiTask className="mr-2 text-blue-500" />
                    {task.title}
                  </h3>
                  {task.description && <p className="text-gray-600">{task.description}</p>}
                  <span
                    className={`inline-block text-sm font-semibold rounded-full px-3 py-1 mt-2 ${getStatusColor(task.status)}`}
                  >
                    {task.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Assigned to: {assignees.join(", ") || "Unassigned"}</p>
                </div>
              )}
            </div>

            <div className="mt-4 md:mt-0 md:ml-6 flex flex-wrap gap-2 justify-end">
              {level === "manager" ? (
                isEditing ? (
                  <>
                    <Button
                      label="Save"
                      onClick={() => saveTask(task)}
                      className="bg-green-500 text-white hover:bg-green-600 transition-colors"
                    >
                      <FaSave />
                    </Button>
                    <Button
                      label="Cancel"
                      onClick={cancelEditing}
                      className="bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      <FaBan />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      label="Edit"
                      onClick={() => startEditing(task)}
                      className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      label="Delete"
                      onClick={() => handleDeleteTask(task)}
                      className="bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                    >
                      <FaTrashAlt />
                    </Button>
                  </>
                )
              ) : (
                !isAssigned && (
                  <Button
                    label="Claim Task"
                    onClick={() => handleClaimTask(task)}
                    className="bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                  >
                    Claim Task
                  </Button>
                )
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}