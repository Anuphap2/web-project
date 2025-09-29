import { useState } from "react";
import { useUserStore, useUserListStore } from "@/store/userStore";
import { useTaskStore } from "@/store/Tasks/taskStore";

export function useAddTaskForm() {
  const { username, department } = useUserStore();
  const users = useUserListStore((state) => state.users);
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState<string[]>([]);
  const [maxAssignees, setMaxAssignees] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const departmentUsers = users.filter((u) => u.department === department);

  const handleAddTask = (assignees?: string[]) => { // ✅ รับ argument
    const finalAssignees = assignees || assignedTo;

    if (!title) return alert("กรุณาใส่หัวข้อ task");
    if (finalAssignees.length > maxAssignees)
      return alert(`จำนวนผู้รับผิดชอบสูงสุดคือ ${maxAssignees} คน`);

    addTask({
      id: Date.now().toString(),
      title,
      description,
      status: finalAssignees.length ? "In Progress" : "No Assignee", // ปรับให้ตรง enum ของคุณ
      createdBy: username!,
      department: department!,
      assignedTo: finalAssignees.length === 1 ? finalAssignees[0] : undefined,
      maxAssignees,
      assignees: finalAssignees,
      dateEnd: dueDate || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // reset form
    setTitle("");
    setDescription("");
    setAssignedTo([]);
    setDueDate("");
    setMaxAssignees(1);
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

