"use client";
import { useState } from "react";
import { Task } from "@/types/task";
import { useTaskListAll } from "@/hooks/TasklistAdmin";
import TaskTable from "../Table/TaskTable";
import EditTaskModal from "./EditTaskModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function Tasklist({ tasks }: { tasks: Task[] }) {
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

  if (!username) return null;
  if (visibleTasks.length === 0) return <p>ไม่มีงานให้แสดงตอนนี้</p>;

  return (
    <>
      <TaskTable
        tasks={visibleTasks}
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
          visibleTasks={visibleTasks} // สำหรับรายชื่อ assignees
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
