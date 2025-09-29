import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import { Task } from "@/types/task";
import { useState } from "react";

export function useGetNewTasks(tasks: Task[]) {
    const { username, level } = useUserStore();
    const updateTask = useTaskStore((state) => state.updateTask);
    const deleteTask = useTaskStore((state) => state.deleteTask);

    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState<Task["status"]>("No Assignee");

    const visibleTasks = level === "manager"
        ? tasks
        : tasks.filter((task) => {
            const assignees = task.assignees || [];
            const isFull = task.maxAssignees ? assignees.length >= task.maxAssignees : false;
            const hasUser = assignees.includes(username!);
            return !hasUser && !isFull;
        });

    const startEditing = (task: Task) => {
        setEditingTaskId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description || "");
        setEditStatus(task.status);
    };

    const cancelEditing = () => setEditingTaskId(null);

    const saveTask = (task: Task) => {
        updateTask({
            ...task,
            title: editTitle,
            description: editDescription,
            status: editStatus,
            updatedAt: new Date().toISOString(),
        });
        setEditingTaskId(null);
    };

    const handleDeleteTask = (task: Task) => {
        if (confirm("คุณแน่ใจว่าจะลบงานนี้หรือไม่?")) {
            deleteTask(task.id);
        }
    };

    const handleClaimTask = (task: Task) => {
        if (level === "manager") return;
        const assignees = task.assignees || [];
        if (task.maxAssignees && assignees.length >= task.maxAssignees) return;

        updateTask({
            ...task,
            assignees: [...assignees, username!],
            status: "In Progress",
            updatedAt: new Date().toISOString(),
        });
    };
    return {
        username,
        level,
        editingTaskId,
        editTitle,
        editDescription,
        editStatus,
        visibleTasks,
        startEditing,
        cancelEditing,
        saveTask,
        handleDeleteTask,
        handleClaimTask,
        setEditTitle,
        setEditDescription,
        setEditStatus,
    };
}