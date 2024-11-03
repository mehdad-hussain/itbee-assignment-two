import React from "react";
import { ThemeProvider } from "./theme-provider";
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                {children}
            </ThemeProvider>
        </>
    );
}
