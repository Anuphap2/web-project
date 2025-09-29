import { useState } from "react";
import { Task } from "@/types/task";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import { useTaskListAll } from "@/hooks/TasklistAdmin";

type TaskTableProps = { tasks: Task[] };

export default function Tasklist({ tasks }: TaskTableProps) {
  const { username, level, visibleTasks, claimTask, saveEdit, removeTask } =
    useTaskListAll(tasks);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<Task["status"]>("No Assignee");

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

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
              const isAssigned = (task.assignees || []).includes(username);
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
                          onClick={() => {
                            setEditingTask(task);
                            setEditTitle(task.title);
                            setEditDescription(task.description || "");
                            setEditStatus(task.status);
                          }}
                        />
                        <Button
                          label="Delete"
                          onClick={() => setTaskToDelete(task)}
                        />
                      </>
                    ) : (
                      !isAssigned && (
                        <Button
                          label="Claim Task"
                          onClick={() => claimTask(task)}
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

      {/* Modal แก้ไข */}
      <Modal
        isOpen={!!editingTask}
        title="Edit Task"
        onClose={() => setEditingTask(null)}
      >
        {editingTask && (
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
              <Button
                label="Save"
                onClick={() => {
                  saveEdit(editingTask, editTitle, editDescription, editStatus);
                  setEditingTask(null);
                }}
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Modal ลบ */}
      <Modal
        isOpen={!!taskToDelete}
        title="Confirm Delete"
        onClose={() => setTaskToDelete(null)}
      >
        <p>คุณแน่ใจว่าจะลบงานนี้หรือไม่?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button label="Cancel" onClick={() => setTaskToDelete(null)} />
          <Button
            label="Delete"
            onClick={() => {
              if (taskToDelete) removeTask(taskToDelete.id);
              setTaskToDelete(null);
            }}
          />
        </div>
      </Modal>
    </>
  );
}
