import { Role } from "@/types/types";
import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactElement;
    allowedRoles: Role[];
    userRole: Role | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles, userRole }) => {
    if (!allowedRoles.includes(userRole as Role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
export default PrivateRoute;
