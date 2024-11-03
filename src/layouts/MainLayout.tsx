import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

const MainLayout: React.FC = () => {
    const location = useLocation();
    const ref = useRef<LoadingBarRef>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
        ref.current?.continuousStart();

        const completeDelay = setTimeout(() => {
            ref.current?.complete();
            setIsAnimating(false);
        }, 500);

        return () => clearTimeout(completeDelay);
    }, [location.pathname]);

    return (
        <>
            <LoadingBar color="#0095a2" className="shadow-[0_0.5rem_2rem_rgba(0,_255,_226,_0.5)]" ref={ref} />
            {!isAnimating && <Outlet />}
        </>
    );
};

export default MainLayout;
