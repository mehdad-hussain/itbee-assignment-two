import ErrorBoundary from "@/components/gadget/ErrorBoundary";
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
            element: (
                <ErrorBoundary>
                    <MainLayout />
                </ErrorBoundary>
            ),
            children: [
                {
                    path: "/",
                    element: <Navigate to="/dashboard/overview" replace />,
                },
                {
                    path: "dashboard",
                    element: <Navigate to="/dashboard/overview" replace />,
                },
                {
                    path: "login",
                    element: <ErrorBoundary>{userRole ? <Navigate to="/dashboard/overview" replace /> : <Login />}</ErrorBoundary>,
                },
                {
                    path: "dashboard/overview",
                    element: (
                        <ErrorBoundary>
                            <PrivateRoute allowedRoles={[Role.Admin, Role.ProjectManager, Role.User]} userRole={userRole}>
                                <ProjectOverview />
                            </PrivateRoute>
                        </ErrorBoundary>
                    ),
                },
                {
                    path: "dashboard/overview",
                    element: (
                        <ErrorBoundary>
                            <PrivateRoute allowedRoles={[Role.Admin, Role.ProjectManager, Role.User]} userRole={userRole}>
                                <ProjectOverview />
                            </PrivateRoute>
                        </ErrorBoundary>
                    ),
                    errorElement: <ErrorBoundary />,
                },
                {
                    path: "dashboard/projects",
                    element: (
                        <ErrorBoundary>
                            <PrivateRoute allowedRoles={[Role.Admin, Role.ProjectManager, Role.User]} userRole={userRole}>
                                <ProjectList />
                            </PrivateRoute>
                        </ErrorBoundary>
                    ),
                    errorElement: <ErrorBoundary />,
                },
                {
                    path: "dashboard/projects/:projectId",
                    element: (
                        <ErrorBoundary>
                            <PrivateRoute allowedRoles={[Role.Admin, Role.ProjectManager, Role.User]} userRole={userRole}>
                                <ProjectDetails />
                            </PrivateRoute>
                        </ErrorBoundary>
                    ),
                    errorElement: <ErrorBoundary />,
                },
                {
                    path: "dashboard/kanban",
                    element: (
                        <ErrorBoundary>
                            <PrivateRoute allowedRoles={[Role.Admin, Role.ProjectManager, Role.User]} userRole={userRole}>
                                <Kanban />
                            </PrivateRoute>
                        </ErrorBoundary>
                    ),
                    errorElement: <ErrorBoundary />,
                },
            ],
        },
        {
            path: "*",
            element: <NotFound />,
            errorElement: <ErrorBoundary />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRoutes;
