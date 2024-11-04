import { Role } from "@/types/types";
import Cookies from "js-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const cookieStorage = {
    getItem: (key: string) => Cookies.get(key) ?? null,
    setItem: (key: string, value: string) => Cookies.set(key, value),
    removeItem: (key: string) => Cookies.remove(key),
};

interface UserStore {
    userRole: Role | null;
    setUserRole: (role: Role) => void;
    clearUserRole: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            userRole: null,
            setUserRole: (role: Role) => {
                set({ userRole: role });
            },
            clearUserRole: () => {
                set({ userRole: null });
            },
        }),
        {
            name: "user-store",
            storage: createJSONStorage(() => cookieStorage),
        },
    ),
);
