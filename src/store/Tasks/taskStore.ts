import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TaskStore, Task } from "@/types/task";

export const useTaskStore = create<TaskStore>()(
    persist(
        (set) => ({
            tasks: [],

            loadTasks: () => {
                const tasks = localStorage.getItem("tasks");
                if (tasks) {
                    set({ tasks: JSON.parse(tasks) });
                }
            },

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
