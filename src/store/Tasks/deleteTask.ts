import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TaskState } from "@/types/task";


export const useTaskDelete = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],
            deleteTask: (id) =>
                set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
        }),
        { name: "tasks" }
    )
);