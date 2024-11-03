import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
    return (
        <div className="flex size-full justify-center items-center">
            <Outlet />
        </div>
    );
};

export default AuthLayout;
