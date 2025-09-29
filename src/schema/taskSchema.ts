import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "หัวข้อต้องมีอย่างน้อย 3 ตัวอักษรขึ้นไป"),
  description: z.string().optional(),
  status: z.enum(["No Assignee", "In Progress", "Completed"]),
  dateEnd: z.string().optional(),
  assignedTo: z.string().optional(),
});