import PrivateRoute from "@/components/PrivateRoute";
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
                    element: <Navigate to="/projects" replace />,
                },
                {
                    path: "login",
                    element: userRole ? <Navigate to="/projects" replace /> : <Login />,
                },
                {
                    path: "dashboard",
                    element: (
                        <PrivateRoute allowedRoles={[Role.Admin, Role.ProjectManager, Role.User]} userRole={userRole}>
                            <ProjectOverview />
                        </PrivateRoute>
                    ),
                },
                {
                    path: "projects",
                    element: (
                        <PrivateRoute allowedRoles={[Role.Admin, Role.ProjectManager, Role.User]} userRole={userRole}>
                            <ProjectList />
                        </PrivateRoute>
                    ),
                },
                {
                    path: "projects/:projectId",
                    element: (
                        <PrivateRoute allowedRoles={[Role.Admin, Role.ProjectManager, Role.User]} userRole={userRole}>
                            <ProjectDetails />
                        </PrivateRoute>
                    ),
                },
                {
                    path: "kanban",
                    element: (
                        <PrivateRoute allowedRoles={[Role.Admin, Role.ProjectManager, Role.User]} userRole={userRole}>
                            <Kanban />
                        </PrivateRoute>
                    ),
                },
                {
                    path: "*",
                    element: <NotFound />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRoutes;

// One minor suggestion is to consider adding a loading indicator or a fallback component for when the user's role is being fetched or when the user is not authenticated.

// src/pages/auth/Login.tsx
// One minor suggestion is to consider adding some error handling for when the user's role is not set or when there's an issue with navigation.
// Another suggestion is to consider adding some accessibility features, such as ARIA attributes, to the login buttons.

// src/store/userStore.ts
// One minor suggestion is to consider adding some validation for when the user's role is being set or cleared.
// Another suggestion is to consider using a more robust way of storing and retrieving the user's role, such as using a secure storage mechanism like localStorage or a token-based system.
