import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-6xl font-bold mb-8">404</h1>
            <p className="text-2xl font-medium mb-8">Oops! Page not found.</p>
            <p className="text-lg mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
    );
};

export default NotFound;
