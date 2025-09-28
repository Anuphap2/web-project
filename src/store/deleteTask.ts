import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "@/types/task";

type TaskState = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
    }),
    { name: "task-storage" }
  )
);