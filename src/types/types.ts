import { Icons } from "@/components/icons";

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
