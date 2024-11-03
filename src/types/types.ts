import { Icons } from "@/components/gadget/icons";

export enum Role {
    Admin = "Admin",
    ProjectManager = "ProjectManager",
    User = "User",
}

export interface NavItem {
    title: string;
    url: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
    isActive?: boolean;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    dueDate: string;
    progress: number;
    tasks: Task[];
}

export interface Task {
    id: number;
    name: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    assignedUser: string;
}
