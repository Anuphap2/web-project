import { Task } from "@/types/task";
import { User } from "@/types/users";

export interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (data: {
    task: Task;
    title: string;
    description: string;
    status: Task["status"];
    assignees: string[];
    maxAssignees: number;
    dateEnd?: string;
  }) => void;
  users: User[]; // รับ array ของพนักงานจริง
  onMessage?: (msg: { type: "success" | "error"; text: string }) => void;
}

export interface DeleteConfirmModalProps {
  task: Task;
  onClose: () => void;
  onDelete: () => void;
  onMessage?: (type: "success" | "error", message: string) => void;
}
