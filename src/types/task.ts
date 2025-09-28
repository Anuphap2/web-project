export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  createdBy: string;
  assignedTo?: string;
  department: string;
  createdAt: string;
  updatedAt: string;
};




