import { useUserStore } from "@/store/userStore";
import { Role } from "@/types/types";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const setUserRole = useUserStore((state) => state.setUserRole);

    const handleLogin = (role: Role) => {
        setUserRole(role);
        navigate("/dashboard");
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={() => handleLogin(Role.Admin)}>Login as Admin</button>
            <button onClick={() => handleLogin(Role.ProjectManager)}>Login as Project Manager</button>
            <button onClick={() => handleLogin(Role.User)}>Login as User</button>
        </div>
    );
};

export default Login;
