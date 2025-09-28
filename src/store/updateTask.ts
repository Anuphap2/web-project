import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "@/types/task";

type TaskState = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
      updateTask: (updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === updatedTask.id
              ? { ...t, ...updatedTask, updatedAt: new Date().toISOString() }
              : t
          ),
        })),
    }),
    { name: "task-storage" }
  )
);