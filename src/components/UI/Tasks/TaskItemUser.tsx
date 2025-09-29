"use client";
import { Task } from "@/types/task";
import { useEmployeeTasks } from "@/hooks/TaskItemUser";
import Button from "@/components/UI/Button";
import { FaCheckCircle, FaSpinner, FaPlusCircle } from "react-icons/fa";
import { BiTask } from "react-icons/bi";

type EmployeeTaskTableProps = {
  tasks: Task[];
};

const statusMap = {
  "No Assignee": {
    text: "No Assignee",
    color: "bg-gray-200 text-gray-700",
    icon: FaPlusCircle,
  },
  "In Progress": {
    text: "In Progress",
    color: "bg-yellow-200 text-yellow-800",
    icon: FaSpinner,
  },
  Completed: {
    text: "Completed",
    color: "bg-green-200 text-green-800",
    icon: FaCheckCircle,
  },
};

export default function EmployeeTaskTable({ tasks }: EmployeeTaskTableProps) {
  const { username, visibleTasks, handleToggleComplete, handleUnassign } =
    useEmployeeTasks(tasks);

  if (!username)
    return <p className="text-center text-gray-500 p-4">กรุณา login ก่อน</p>;
  if (visibleTasks.length === 0)
    return (
      <p className="text-center text-gray-500 p-4">ไม่มีงานที่ได้รับมอบหมาย</p>
    );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Assignees
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Updated At
            </th>
            <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {visibleTasks.map((task) => {
            const assignees = task.assignees || [];
            const isAssignedToMe = assignees.includes(username);
            const statusInfo =
              statusMap[task.status] || statusMap["No Assignee"];

            return (
              <tr
                key={task.id}
                className="hover:bg-gray-50 transition-colors duration-200 odd:bg-white even:bg-gray-50"
              >
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <BiTask className="mr-2 text-blue-500" />
                    {task.title}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.description || "-"}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
                  >
                    <statusInfo.icon className="mr-1" />
                    {statusInfo.text}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {assignees.join(", ") || "Unassigned"}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.dateEnd
                    ? new Date(task.dateEnd).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(task.updatedAt).toLocaleString()}
                </td>

                {/* ปรับปรุง: ใช้ div พร้อม flex และ gap-2 เพื่อแยกปุ่ม */}
                <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                  {isAssignedToMe && (
                    <div className="flex justify-center gap-2">
                      <Button
                        label={
                          task.status === "Completed"
                            ? "Mark In Progress"
                            : "Complete Task"
                        }
                        onClick={() => handleToggleComplete(task)}
                        // ปรับขนาดปุ่มให้เล็กลงเล็กน้อย: px-3 py-1.5 text-xs
                        className={`font-semibold ${
                          task.status === "Completed"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-green-500 hover:bg-green-600"
                        } text-white px-3 py-1.5 text-xs rounded-md transition-colors`}
                      />
                      {task.status === "In Progress" && (
                        <Button
                          label="Unassign"
                          onClick={() => handleUnassign(task)}
                          className="font-semibold bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-xs rounded-md transition-colors"
                        />
                      )}
                    </div>
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
