import { z } from "zod";

export const taskSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    status: z.string(),
    priority: z.string(),
    dueDate: z.string(),
    label: z.string(),
    assignedUser: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
