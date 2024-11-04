import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { Role } from "@/types/types";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const setUserRole = useUserStore((state) => state.setUserRole);

    const handleLogin = (role: Role) => {
        setUserRole(role);
        navigate("/dashboard/overview");
    };

    return (
        <div className="relative flex-col items-center justify-center w-screen h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative flex-col hidden h-full min-w-full p-10 text-white bg-muted lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 mr-2"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    Logo
                </div>
            </div>
            <div className="flex items-center h-full p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                        <p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
                    </div>

                    <div className="flex flex-col justify-between gap-4">
                        <Button onClick={() => handleLogin(Role.Admin)}>Login as Admin</Button>
                        <Button onClick={() => handleLogin(Role.ProjectManager)}>Login as Project Manager</Button>
                        <Button onClick={() => handleLogin(Role.User)}>Login as User</Button>
                    </div>
                    <p className="px-8 text-sm text-center text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
