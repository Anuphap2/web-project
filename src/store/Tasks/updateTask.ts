import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task, TaskState } from "@/types/task";

export const useUpdateTask = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],
            addTask: (task: Task) =>
                set((state) => ({ tasks: [...state.tasks, task] })),
            updateTask: (updatedTask: Task) =>
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === updatedTask.id ? { ...t, ...updatedTask } : t
                    ),
                })),

            deleteTask: (id: string) =>
                set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
        }),
        {
            name: "tasks",
        }
    )
);
