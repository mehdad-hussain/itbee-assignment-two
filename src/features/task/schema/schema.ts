import { z } from "zod";

export enum TaskStatus {
    TODO = "todo",
    BACKLOG = "backlog",
    IN_PROGRESS = "in progress",
    DONE = "done",
    CANCELED = "canceled",
}

export enum TaskPriority {
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low",
}

export enum TaskLabel {
    BUG = "bug",
    FEATURE = "feature",
    DOCUMENTATION = "documentation",
}

export const taskSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    status: z.enum([TaskStatus.TODO, TaskStatus.BACKLOG, TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.CANCELED]),
    priority: z.enum([TaskPriority.HIGH, TaskPriority.MEDIUM, TaskPriority.LOW]),
    dueDate: z.date(),
    label: z.enum([TaskLabel.BUG, TaskLabel.FEATURE, TaskLabel.DOCUMENTATION]),
    assignedUser: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export const projectSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    status: z.string(),
    dueDate: z.string(),
    progress: z.number(),
    tasks: z.array(taskSchema),
});

export type Project = z.infer<typeof projectSchema>;

export const createTaskSchema = z.object({
    name: z.string().min(3, { message: "Task name must be at least 3 characters long" }),
    description: z.string().max(255, { message: "Task description must be at most 255 characters long" }),
    status: z
        .enum([TaskStatus.TODO, TaskStatus.BACKLOG, TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.CANCELED])
        .refine((val) => Object.values(TaskStatus).includes(val), {
            message: "Invalid task status",
        }),
    priority: z
        .enum([TaskPriority.HIGH, TaskPriority.MEDIUM, TaskPriority.LOW])
        .refine((val) => Object.values(TaskPriority).includes(val), {
            message: "Invalid task priority",
        }),
    dueDate: z.date({ message: "Invalid date format" }),
    label: z.enum([TaskLabel.BUG, TaskLabel.FEATURE, TaskLabel.DOCUMENTATION]).refine((val) => Object.values(TaskLabel).includes(val), {
        message: "Invalid task label",
    }),
    assignedUser: z.string().max(20, { message: "User name must be at most 20 characters long" }),
});

export type CreateTask = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
    dueDate: z.date().optional(),
    label: z.string().optional(),
    assignedUser: z.string().optional(),
});

export type UpdateTask = z.infer<typeof updateTaskSchema>;
