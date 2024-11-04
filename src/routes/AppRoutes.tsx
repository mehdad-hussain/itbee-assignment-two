import PrivateRoute from "@/components/gadget/PrivateRoute";
import MainLayout from "@/components/layouts/MainLayout";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/auth/Login";
import Kanban from "@/pages/kanban/Kanban";
import ProjectDetails from "@/pages/projects/ProjectDetails";
import ProjectList from "@/pages/projects/ProjectList";
import ProjectOverview from "@/pages/projects/ProjectOverview";
import { useUserStore } from "@/store/userStore";
import { Role } from "@/types/types";
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

const AppRoutes: React.FC = () => {
    const userRole = useUserStore((state) => state.userRole);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />, // Wrapping in MainLayout to show TopLoader
            children: [
                {
                    path: "/",
                    element: <Navigate to="/dashboard/overview" replace />,
                },
                {
                    path: "/dashboard",
                    element: <Navigate to="/dashboard/overview" replace />,
                },
                {
                    path: "login",
                    element: userRole ? <Navigate to="/projects" replace /> : <Login />,
                },
                {
                    path: "dashboard/overview",
                    element: (
                        <PrivateRoute allowedRoles={[Role.Admin, Role.ProjectManager, Role.User]} userRole={userRole}>
                            <ProjectOverview />
                        </PrivateRoute>
                    ),
                },
                {
                    path: "dashboard/projects",
                    element: (
                        <PrivateRoute allowedRoles={[Role.Admin, Role.ProjectManager, Role.User]} userRole={userRole}>
                            <ProjectList />
                        </PrivateRoute>
                    ),
                },
                {
                    path: "dashboard/projects/:projectId",
                    element: (
                        <PrivateRoute allowedRoles={[Role.Admin, Role.ProjectManager, Role.User]} userRole={userRole}>
                            <ProjectDetails />
                        </PrivateRoute>
                    ),
                },
                {
                    path: "dashboard/kanban",
                    element: (
                        <PrivateRoute allowedRoles={[Role.Admin, Role.ProjectManager, Role.User]} userRole={userRole}>
                            <Kanban />
                        </PrivateRoute>
                    ),
                },
            ],
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRoutes;
