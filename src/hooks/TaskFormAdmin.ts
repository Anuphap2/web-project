import { useState, useMemo } from "react";
import { useUserStore, useUserListStore } from "@/store/userStore";
import { useTaskStore } from "@/store/Tasks/taskStore";

export function useAddTaskForm(setToast?: (toast: { type: "success" | "error"; text: string }) => void) {
  const { username, department } = useUserStore();
  const users = useUserListStore((state) => state.users);
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState<string[]>([]);
  const [maxAssignees, setMaxAssignees] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const departmentUsers = useMemo(
    () => users.filter((u) => u.department === department),
    [users, department]
  );

  const handleAddTask = (assignees?: string[]) => {
    const finalAssignees = assignees ?? assignedTo;

    if (!title.trim()) {
      setToast?.({ type: "error", text: "กรุณาใส่หัวข้อ task" });
      return;
    }

    if (finalAssignees.length > maxAssignees) {
      setToast?.({ type: "error", text: `จำนวนผู้รับผิดชอบสูงสุดคือ ${maxAssignees} คน` });
      return;
    }

    addTask({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      status: finalAssignees.length ? "In Progress" : "No Assignee",
      createdBy: username!,
      department: department!,
      assignedTo: finalAssignees.length === 1 ? finalAssignees[0] : undefined,
      assignees: finalAssignees,
      maxAssignees,
      dateEnd: dueDate || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    setToast?.({ type: "success", text: "สร้างงานสำเร็จ" });

    // reset form
    setTitle("");
    setDescription("");
    setAssignedTo([]);
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
