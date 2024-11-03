import { useUserStore } from "@/store/userStore";
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import Providers from "../providers/providers";
import AuthLayout from "./AuthLayout";
import DashboardLayout from "./DashboardLayout";

const MainLayout: React.FC = () => {
    const location = useLocation();
    const ref = useRef<LoadingBarRef>(null);
    const userRole = useUserStore((state) => state.userRole);

    useEffect(() => {
        ref.current?.continuousStart();

        const completeDelay = setTimeout(() => {
            ref.current?.complete();
        }, 500);

        return () => clearTimeout(completeDelay);
    }, [location.pathname]);

    return (
        <Providers>
            <LoadingBar color="#0095a2" className="shadow-[0_0.5rem_2rem_rgba(0,_255,_226,_0.5)]" ref={ref} />
            {userRole ? <DashboardLayout /> : <AuthLayout />}
        </Providers>
    );
};

export default MainLayout;
