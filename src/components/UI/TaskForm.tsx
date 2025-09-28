"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTaskStore } from "@/store/taskStore";

const taskSchema = z.object({
  title: z.string().min(3, "ต้องมีอย่างน้อย 3 ตัวอักษร"),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]), // เพิ่ม status validation
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { status: "todo" }, // default status
  });
  const onSubmit = (data: TaskFormData) => {
    // ดึง task ปัจจุบัน
    const tasks = useTaskStore.getState().tasks;

    // หาเลข id สูงสุด
    const lastIdNumber = tasks
      .map((t) => parseInt(t.id.replace("T", ""), 10))
      .reduce((max, curr) => (curr > max ? curr : max), 0);

    // สร้าง id ใหม่แบบ T001, T002 ...
    const task = {
      id: `T${(lastIdNumber + 1).toString().padStart(3, "0")}`,
      title: data.title,
      description: data.description,
      status: data.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addTask(task);
    reset();
    alert("เพิ่มงานเรียบร้อย!");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 max-w-md"
    >
      <input
        {...register("title")}
        placeholder="ชื่องาน"
        className="border p-2 rounded"
      />
      {errors.title && (
        <span className="text-red-500">{errors.title.message}</span>
      )}

      <textarea
        {...register("description")}
        placeholder="รายละเอียดงาน"
        className="border p-2 rounded"
      />

      <label className="flex flex-col">
        ระดับดำเนินการ:
        <select {...register("status")} className="border p-2 rounded mt-1">
          <option value="todo">ยังไม่เสร็จ (To Do)</option>
          <option value="in-progress">อยู่ระหว่างดำเนินการ</option>
          <option value="done">เสร็จแล้ว</option>
        </select>
      </label>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
        เพิ่มงาน
      </button>
    </form>
  );
}
