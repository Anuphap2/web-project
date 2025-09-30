"use client";
import { useState } from "react";
import Button from "@/components/UI/Button";
import { useGetNewTasks } from "@/hooks/Task";
import { Task } from "@/types/task";
import {
  FaEdit,
  FaTrashAlt,
  FaSave,
  FaBan,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";
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

  const [showFullDescMap, setShowFullDescMap] = useState<{
    [key: string]: boolean;
  }>({});

  if (!username) return null;

  if (visibleTasks.length === 0)
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-base-100 rounded-xl shadow-lg border border-base-200 text-center">
        <FaCheckCircle className="text-5xl text-success mb-4" />
        <p className="text-xl font-semibold text-gray-700 mb-1">
          ไม่มีงานใหม่ให้แสดง
        </p>
        <p className="text-gray-500">
          คุณสามารถสร้างงานใหม่ หรือรอการมอบหมายงานได้
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
        return "bg-blue-100 text-blue-800";
    }
  };

  const toggleDesc = (taskId: string) => {
    setShowFullDescMap((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {visibleTasks.map((task) => {
        const isEditing = editingTaskId === task.id;
        const assignees = task.assignees || [];
        const isAssigned = assignees.includes(username);
        const showFullDesc = showFullDescMap[task.id] || false;

        return (
          <li
            key={task.id}
            className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow border border-base-200 rounded-xl flex flex-col"
          >
            <div className="card-body flex-1 flex flex-col gap-4">
              {/* Header */}
              {isEditing ? (
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="หัวข้อ"
                    className="input input-bordered input-lg w-full"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    placeholder="รายละเอียด"
                    className="textarea textarea-bordered h-24 w-full"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <select
                    className="select select-bordered w-full"
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
                <>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <h3 className="card-title text-xl sm:text-2xl font-bold flex flex-wrap items-center gap-2 break-words">
                      <BiTask className="text-primary text-xl sm:text-2xl" />
                      {task.title}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full font-semibold text-sm ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </div>

                  {/* Description with toggle */}
                  {task.description && (
                    <div>
                      <p
                        className={`text-gray-600 leading-relaxed ${
                          showFullDesc ? "" : "line-clamp-3"
                        }`}
                      >
                        {task.description}
                      </p>
                      {task.description.length > 100 && (
                        <button
                          className="text-blue-500 text-sm underline mt-1"
                          onClick={() => toggleDesc(task.id)}
                        >
                          {showFullDesc ? "ซ่อน" : "ดูเพิ่มเติม"}
                        </button>
                      )}
                    </div>
                  )}

                  {task.dateEnd && (
                    <p className="text-gray-500 text-sm">
                      สิ้นสุดวันที่: {task.dateEnd}
                    </p>
                  )}
                  {task.maxAssignees && (
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      จำนวนผู้รับผิดชอบ: {task.maxAssignees} คน
                    </p>
                  )}

                  {/* Assignees */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {assignees.length > 0 ? (
                      assignees.map((a) => (
                        <span
                          key={a}
                          className="badge badge-sm badge-outline flex items-center gap-1 text-gray-700"
                        >
                          <FaUser /> {a}
                        </span>
                      ))
                    ) : (
                      <span className="badge badge-sm badge-outline text-gray-500">
                        Unassigned
                      </span>
                    )}
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="card-actions mt-auto justify-end flex-wrap gap-2 border-t border-base-200 pt-3">
                {level === "manager" ? (
                  isEditing ? (
                    <>
                      <Button
                        label="บันทึก"
                        onClick={() => saveTask(task)}
                        className="btn btn-success btn-sm gap-1 hover:scale-105 transition-transform"
                      >
                        <FaSave /> บันทึก
                      </Button>
                      <Button
                        label="ยกเลิก"
                        onClick={cancelEditing}
                        className="btn btn-error btn-sm gap-1 hover:scale-105 transition-transform"
                      >
                        <FaBan /> ยกเลิก
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        label="แก้ไข"
                        onClick={() => startEditing(task)}
                        className="btn btn-primary btn-sm gap-1 hover:scale-105 transition-transform"
                      >
                        <FaEdit /> แก้ไข
                      </Button>
                      <Button
                        label="ลบ"
                        onClick={() => handleDeleteTask(task)}
                        className="btn btn-ghost btn-sm gap-1 text-error hover:bg-error/10 hover:text-error"
                      >
                        <FaTrashAlt /> ลบ
                      </Button>
                    </>
                  )
                ) : (
                  !isAssigned && (
                    <Button
                      label="รับงาน"
                      onClick={() => handleClaimTask(task)}
                      className="btn btn-secondary btn-sm gap-1 w-full hover:scale-105 transition-transform"
                    >
                      <BiTask /> รับงาน
                    </Button>
                  )
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
