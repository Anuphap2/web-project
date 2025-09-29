import { useState } from "react";
import { Task } from "@/types/task";
import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";

type TaskTableProps = { tasks: Task[] };

export default function Tasklist({ tasks }: TaskTableProps) {
  const { username, level } = useUserStore();
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  // สำหรับ Edit Modal
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<Task["status"]>("No Assignee");

  // สำหรับ Delete Modal
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditStatus(task.status);
  };

  const saveEdit = () => {
    if (!editingTask) return;
    updateTask({
      ...editingTask,
      title: editTitle,
      description: editDescription,
      status: editStatus,
      updatedAt: new Date().toISOString(),
    });
    setEditingTask(null);
  };

  const openDeleteConfirm = (task: Task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) deleteTask(taskToDelete.id);
    setTaskToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleClaimTask = (task: Task) => {
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

  const visibleTasks =
    level === "manager"
      ? tasks
      : tasks.filter((task) => {
          const assignees = task.assignees || [];
          const isFull = task.maxAssignees
            ? assignees.length >= task.maxAssignees
            : false;
          const hasUser = assignees.includes(username!);
          return !hasUser && !isFull;
        });

  if (!username) return null;
  if (visibleTasks.length === 0) return <p>ไม่มีงานให้แสดงตอนนี้</p>;

  return (
    <>
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
              const isAssigned = username
                ? (task.assignees || []).includes(username)
                : false;
              return (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2">{task.description || "-"}</td>
                  <td className="px-4 py-2">{task.status}</td>
                  <td className="px-4 py-2">
                    {(task.assignees || []).join(", ")}
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
                    {level === "manager" ? (
                      <>
                        <Button
                          label="Edit"
                          onClick={() => openEditModal(task)}
                        />
                        <Button
                          label="Delete"
                          onClick={() => openDeleteConfirm(task)}
                        />
                      </>
                    ) : (
                      !isAssigned && (
                        <Button
                          label="Claim Task"
                          onClick={() => handleClaimTask(task)}
                        />
                      )
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal แก้ไขงาน */}
      <Modal
        isOpen={!!editingTask}
        title="Edit Task"
        onClose={() => setEditingTask(null)}
      >
        <div className="flex flex-col gap-2">
          <input
            className="border p-1 rounded w-full"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className="border p-1 rounded w-full"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <select
            className="border p-1 rounded w-full"
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value as Task["status"])}
          >
            <option value="No Assignee">No Assignee</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="flex justify-end gap-2 mt-4">
            <Button label="Cancel" onClick={() => setEditingTask(null)} />
            <Button label="Save" onClick={saveEdit} />
          </div>
        </div>
      </Modal>

      {/* Modal ยืนยันลบงาน */}
      <Modal
        isOpen={deleteModalOpen}
        title="Confirm Delete"
        onClose={() => setDeleteModalOpen(false)}
      >
        <p>คุณแน่ใจว่าจะลบงานนี้หรือไม่? การลบไม่สามารถกู้คืนได้</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button label="Cancel" onClick={() => setDeleteModalOpen(false)} />
          <Button label="Delete" onClick={confirmDelete} />
        </div>
      </Modal>
    </>
  );
}
