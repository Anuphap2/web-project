import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "@/types/task";

type TaskState = {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],
            addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
            updateTask: (task) =>
                set((state) => ({ tasks: state.tasks.map(t => t.id === task.id ? task : t) })),
            deleteTask: (id) =>
                set((state) => ({ tasks: state.tasks.filter(t => t.id !== id) })),
        }),
        { name: "task-storage" } // เก็บใน localStorage
    )
);