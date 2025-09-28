import { create } from "zustand";
import { Task } from "@/types/task";

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  assignTask: (id: string, username: string) => void;
  loadTasks: () => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  loadTasks: () => {
    const stored = localStorage.getItem("tasks");
    if (stored) set({ tasks: JSON.parse(stored) });
  },

  addTask: (task) => {
    set((state) => {
      const newTasks = [task, ...state.tasks];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return { tasks: newTasks };
    });
  },

  updateTask: (updatedTask) => {
    set((state) => {
      const newTasks = state.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      );
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return { tasks: newTasks };
    });
  },

  deleteTask: (id) => {
    set((state) => {
      const newTasks = state.tasks.filter((t) => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return { tasks: newTasks };
    });
  },

  assignTask: (id, username) => {
    set((state) => {
      const newTasks = state.tasks.map((t) =>
        t.id === id ? { ...t, assignedTo: username, updatedAt: new Date().toISOString() } : t
      );
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return { tasks: newTasks };
    });
  },
}));
