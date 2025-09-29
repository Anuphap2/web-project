"use client";
import { useTaskStore } from "@/store/Tasks/taskStore";
import { useUserStore } from "@/store/userStore";
import TaskItem from "@/components/UI/Tasks/TaskItem";

export default function MyTasksPage() {
  const username = useUserStore((state) => state.username);
  const tasks = useTaskStore((state) => state.tasks);

  if (!username) return <p>กรุณา login ก่อน</p>;

  const myTasks = tasks.filter((t) => (t.assignees || []).includes(username));

  if (myTasks.length === 0) return <p>คุณยังไม่ได้รับงานใด ๆ</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">งานของฉัน</h1>
      <ul className="space-y-3">
        {myTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
