import { NavItem } from "@/types/types";

export const navItems: NavItem[] = [
    {
        title: "Dashboard",
        url: "/dashboard/overview",
        icon: "dashboard",
        isActive: false,
    },
    {
        title: "Projects",
        url: "/dashboard/projects",
        icon: "product",
        isActive: false,
    },
    {
        title: "Kanban",
        url: "/dashboard/kanban",
        icon: "kanban",
        isActive: false,
    },
];
