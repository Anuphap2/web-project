"use client";
import { useUserStore } from "@/store/userStore";
import { useTaskStore } from "@/store/Tasks/taskStore";
import AddTaskForm from "@/components/UI/Tasks/TaskForm";
import TaskList from "@/components/UI/Tasks/Tasklist";
import DepartmentUserList from "@/components/UI/users/fetchUser";

export default function HomePage() {
  const { username, department } = useUserStore();
  const tasks = useTaskStore((state) => state.tasks);

  // filter เฉพาะงานในแผนกของ user
  const departmentTasks = tasks.filter((t) => t.department === department);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-2">Welcome, {username}</h1>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Add Task</h2>
        <AddTaskForm />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Users in your department
        </h2>
        <DepartmentUserList />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Tasks in your department
        </h2>
        <TaskList tasks={departmentTasks} />
      </div>
    </div>
  );
}
