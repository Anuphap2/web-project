type Task = {
  id: string;
  title: string;
  description?: string;
  status: "No Assignee" | "In Progress" | "Completed";
  createdBy: string;
  dateEnd?: string;
  assignedTo?: string;
  maxAssignees?: number;     // จำนวนคนสูงสุด
  assignees?: string[];      // คนที่รับงานแล้ว
  department: string;
  createdAt: string;
  updatedAt: string;
};

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  assignTask: (id: string, username: string) => void;
  loadTasks: () => void;
};

type TaskState = {
  tasks: Task[];
  addTask?: (task: Task) => void;
  updateTask?: (task: Task) => void;
  deleteTask?: (id: string) => void;
  assignTask?: (id: string, username: string) => void;
}

export type { Task, TaskStore, TaskState };
