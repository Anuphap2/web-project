"use client";
import { useUserStore } from "@/store/userStore";
import { useTaskStore } from "@/store/Tasks/taskStore";
import AddTaskForm from "@/components/UI/Tasks/TaskForm";
import TaskList from "@/components/UI/Tasks/Tasklist";
import DepartmentUserList from "@/components/UI/users/fetchUser";
import TaskSummary from "@/components/UI/Tasks/TaskSummary";

export default function HomePage() {
  const { department } = useUserStore();
  const tasks = useTaskStore((state) => state.tasks);

  // filter เฉพาะงานในแผนกของ user
  const departmentTasks = tasks.filter((t) => t.department === department);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Manager Dashboard</h1>

      {/* 1. Task Summary */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Task Summary</h2>
        <TaskSummary />
      </section>

      {/* 2. Users in Department */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Users in Your Department
        </h2>
        <DepartmentUserList />
      </section>

      {/* 3. Add Task Form */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
        <AddTaskForm />
      </section>

      {/* 4. Tasks of Department */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Department Tasks</h2>
        <TaskList tasks={departmentTasks} />
      </section>
    </div>
  );
}
