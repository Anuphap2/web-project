"use client";
import { useAddTaskForm } from "@/hooks/TaskFormAdmin";
import { useState } from "react";
import Toast from "@/components/Layout/Toast";
import { taskSchema } from "@/schema/taskSchema";

export default function AddTaskForm() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    maxAssignees,
    setMaxAssignees,
    dueDate,
    setDueDate,
    departmentUsers,
    handleAddTask,
  } = useAddTaskForm();

  const [assignedToMulti, setAssignedToMulti] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = () => {
    const result = taskSchema.safeParse({
      title,
      description,
      status: "No Assignee",
      dateEnd: dueDate,
      assignedTo: assignedToMulti,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง");
      setSuccess(null);
      return;
    }

    handleAddTask(assignedToMulti);
    setAssignedToMulti([]);
    setSuccess("เพิ่ม Task สำเร็จ!");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col py-8">
      <main className="flex-1 flex justify-center items-start px-4">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
          {/* Toasts */}
          {error && (
            <Toast
              message={error}
              type="error"
              onClose={() => setError(null)}
            />
          )}
          {success && (
            <Toast
              message={success}
              type="success"
              onClose={() => setSuccess(null)}
            />
          )}

          {/* Form Title */}
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-6">
            สร้างงานใหม่
          </h2>

          {/* Horizontal Layout */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column: Title, Description, Due Date */}
            <div className="md:w-1/2 space-y-4">
              {/* Task Title */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">หัวข้องาน</span>
                </label>
                <input
                  type="text"
                  placeholder="หัวข้องาน"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Description */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    รายละเอียดงาน
                  </span>
                </label>
                <textarea
                  placeholder="รายละเอียดของงาน"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="textarea textarea-bordered w-full h-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Due Date */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">ถึงวันที่</span>
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Right Column: Assignees, Max Assignees */}
            <div className="md:w-1/2 space-y-4">
              {/* Max Assignees */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    จำนวนผู้รับผิดชอบ
                  </span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={departmentUsers.length}
                  value={maxAssignees}
                  onChange={(e) => setMaxAssignees(Number(e.target.value))}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="จำนวนสูงสุด"
                />
              </div>

              {/* Assigned To */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    มอบหมายงานให้
                  </span>
                </label>
                <div className="border rounded-lg p-3 max-h-80 overflow-y-auto bg-gray-50">
                  {departmentUsers.map((u) => (
                    <label
                      key={u.username}
                      className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-100 rounded p-1"
                    >
                      <input
                        type="checkbox"
                        checked={assignedToMulti.includes(u.username)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (assignedToMulti.length < maxAssignees) {
                              setAssignedToMulti([
                                ...assignedToMulti,
                                u.username,
                              ]);
                            }
                          } else {
                            setAssignedToMulti(
                              assignedToMulti.filter(
                                (name) => name !== u.username
                              )
                            );
                          }
                        }}
                        className="checkbox checkbox-sm"
                      />
                      <span className="truncate">
                        {u.username} ({u.level})
                      </span>
                    </label>
                  ))}
                </div>
                <span className="text-sm text-gray-400 mt-1">
                  เลือกได้สูงสุด {maxAssignees} คน
                </span>
              </div>

              {/* Submit Button */}
              <div className="form-control w-full mt-6">
                <button
                  onClick={onSubmit}
                  className="btn btn-primary w-full text-lg font-semibold"
                >
                  เพิ่มงาน
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
