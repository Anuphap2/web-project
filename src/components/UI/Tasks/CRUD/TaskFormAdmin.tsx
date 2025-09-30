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

  // เปลี่ยน assignedTo เป็น array
  const [assignedToMulti, setAssignedToMulti] = useState<string[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = () => {
    // ตรวจสอบด้วย Zod schema
    const result = taskSchema.safeParse({
      title,
      description,
      status: "No Assignee",
      dateEnd: dueDate,
      assignedTo: assignedToMulti,
    });

    if (!result.success) {
      // ดึงข้อความ error ของ field แรก (หรือเอาหลายข้อถ้าต้องการ)
      const firstErrorMessage =
        result.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง";
      setError(firstErrorMessage);
      setSuccess(null);
      return;
    }

    // ผ่าน validation แล้ว
    handleAddTask(assignedToMulti);
    setAssignedToMulti([]);
    setSuccess("เพิ่ม Task สำเร็จ!");
    setError(null);
  };

  return (
    <>
      <div className="p-6 bg-base-100 rounded-xl shadow-md max-w-xl mx-auto space-y-6">
        {/* Toasts */}
        {error && (
          <Toast message={error} type="error" onClose={() => setError(null)} />
        )}
        {success && (
          <Toast
            message={success}
            type="success"
            onClose={() => setSuccess(null)}
          />
        )}

        <h2 className="text-2xl font-bold text-gray-800">สร้างงาน</h2>

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
            className="input input-bordered w-full"
          />
        </div>

        {/* Description */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">รายละเอียดของงาน</span>
          </label>
          <textarea
            placeholder="รายละเอียดของงาน"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full h-24"
          />
        </div>

        {/* Max Assignees */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">จำนวนผู้รับผิดชอบ</span>
          </label>
          <input
            type="number"
            min={1}
            max={departmentUsers.length}
            value={maxAssignees}
            onChange={(e) => setMaxAssignees(Number(e.target.value))}
            className="input input-bordered w-full"
            placeholder="Max number of assignees"
          />
        </div>

        {/* Assigned To (multi-select) */}

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">มอบหมายงานให้</span>
          </label>
          <div className="border rounded p-2 max-h-48 overflow-y-auto">
            {departmentUsers.map((u) => (
              <label key={u.username} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={assignedToMulti.includes(u.username)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (assignedToMulti.length < maxAssignees) {
                        setAssignedToMulti([...assignedToMulti, u.username]);
                      }
                    } else {
                      setAssignedToMulti(
                        assignedToMulti.filter((name) => name !== u.username)
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

        {/* Due Date */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">ถึงวันวันที่</span>
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="form-control w-full mt-4">
          <button onClick={onSubmit} className="btn btn-primary w-full">
            เพิ่มงาน
          </button>
        </div>
      </div>
    </>
  );
}
