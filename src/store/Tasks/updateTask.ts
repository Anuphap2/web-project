import { create } from "zustand";
import { persist } from "zustand/middleware"; // เพิ่ม middleware จะได้ไม่ต้องเรียกใช้ localStorage
import { Task, TaskState } from "@/types/task";

export const useUpdateTask = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],
            addTask: (task: Task) =>
                set((state) => ({ tasks: [...state.tasks, task] })),
            updateTask: (task: Task) =>
                set((state) => ({
                    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
                })),
            deleteTask: (id: string) =>
                set((state) => ({
                    tasks: state.tasks.filter((t) => t.id !== id),
                })),
            assignTask: (id: string, username: string) =>
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === id ? { ...t, assignedTo: username } : t
                    ),
                })),
        }),
        {
            name: "tasks", // key ที่ใช้ใน localStorage
        }
    )
);
