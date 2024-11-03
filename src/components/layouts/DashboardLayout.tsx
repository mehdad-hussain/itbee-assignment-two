import React from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "./app-sidebar";

const DashboardLayout: React.FC = () => {
    return (
        <AppSidebar>
            <Outlet />
        </AppSidebar>
    );
};

export default DashboardLayout;
