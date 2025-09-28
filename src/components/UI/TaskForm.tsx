"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTaskStore } from "@/store/taskStore";
import { useUserStore } from "@/store/userStore";
import { taskSchema } from "@/schema/taskSchema";

type TaskFormData = z.infer<typeof taskSchema>;

export default function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask);
  const username = useUserStore((state) => state.username);
  const level = useUserStore((state) => state.level);
  const department = useUserStore((state) => state.department);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { status: "todo" },
  });

  const onSubmit = (data: TaskFormData) => {
    if (level !== "manager")
      return alert("You do not have permission to add tasks 😢");

    const task = {
      id: `T${Date.now()}`,
      title: data.title,
      description: data.description,
      status: data.status,
      createdBy: username!,
      assignedTo: data.assignedTo || undefined,
      department: department!,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addTask(task);
    reset();
    alert("Task added successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 max-w-md"
    >
      <input
        {...register("title")}
        placeholder="Task title"
        className="border p-2 rounded"
      />
      {errors.title && (
        <span className="text-red-500">{errors.title.message}</span>
      )}

      <textarea
        {...register("description")}
        placeholder="Task description"
        className="border p-2 rounded"
      />

      <label className="flex flex-col">
        Status:
        <select {...register("status")} className="border p-2 rounded mt-1">
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </label>

      {level === "manager" && (
        <label className="flex flex-col">
          Assign to:
          <input
            {...register("assignedTo")}
            placeholder="Employee username"
            className="border p-2 rounded mt-1"
          />
        </label>
      )}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
        Add Task
      </button>
    </form>
  );
}
