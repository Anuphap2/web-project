"use client";
import { useState } from "react";
import { Task } from "@/types/task";
import { User } from "@/types/users";
import { useTaskListAll } from "@/hooks/TasklistAdmin";
import TaskTable from "../Table/TaskTable";
import EditTaskModal from "./EditTaskModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface TasklistProps {
  tasks: Task[];
  users: User[]; // รับข้อมูลพนักงานทั้งหมดเป็น props
}

export default function Tasklist({ tasks, users }: TasklistProps) {
  const {
    username,
    level: levelRaw,
    visibleTasks,
    claimTask,
    saveEdit,
    removeTask,
  } = useTaskListAll(tasks);

  const level = levelRaw || "manager";

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);
  const [filterText, setFilterText] = useState("");

  const filteredTasks = visibleTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(filterText.toLowerCase()) ||
      (task.assignees || []).some((a) =>
        a.toLowerCase().includes(filterText.toLowerCase())
      ) ||
      (task.description?.toLowerCase() || "").includes(filterText.toLowerCase())
  );

  if (!username) return null;
  if (visibleTasks.length === 0) return <p>ไม่มีงานให้แสดงตอนนี้</p>;

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="ค้นหาหัวข้องาน รายละเอียด หรือ ผู้รับผิดชอบ"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="input input-bordered w-full max-w-sm"
        />
      </div>

      <TaskTable
        tasks={filteredTasks}
        username={username}
        level={level}
        onEdit={setEditingTask}
        onDelete={setDeleteTask}
        onClaim={claimTask}
      />

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={saveEdit}
          users={users || []} // ใส่ default เป็น array ว่าง
        />
      )}

      {deleteTask && (
        <DeleteConfirmModal
          task={deleteTask}
          onClose={() => setDeleteTask(null)}
          onDelete={() => {
            removeTask(deleteTask.id);
            setDeleteTask(null);
          }}
        />
      )}
    </>
  );
}
