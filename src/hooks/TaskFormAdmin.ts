import { useState } from "react";
import { useUserStore, useUserListStore } from "@/store/userStore";
import { useTaskStore } from "@/store/Tasks/taskStore";

export function useAddTaskForm() {
  const { username, department } = useUserStore();
  const users = useUserListStore((state) => state.users);
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState<string | "">("");
  const [maxAssignees, setMaxAssignees] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const departmentUsers = users.filter((u) => u.department === department);

  const handleAddTask = () => {
    if (!title) return alert("กรุณาใส่หัวข้อ task");

    addTask({
      id: Date.now().toString(),
      title,
      description,
      status: "No Assignee",
      createdBy: username!,
      department: department!,
      assignedTo: assignedTo || undefined,
      maxAssignees,
      assignees: assignedTo ? [assignedTo] : [],
      dateEnd: dueDate || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // reset form
    setTitle("");
    setDescription("");
    setAssignedTo("");
    setMaxAssignees(1);
    setDueDate("");
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    assignedTo,
    setAssignedTo,
    maxAssignees,
    setMaxAssignees,
    dueDate,
    setDueDate,
    departmentUsers,
    handleAddTask,
  };
}