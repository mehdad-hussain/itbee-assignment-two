import { Role } from "@/types/types";
import Cookies from "js-cookie";
import { create } from "zustand";

interface UserState {
    userRole: Role | null;
    setUserRole: (role: Role) => void;
    clearUserRole: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    userRole: null,
    setUserRole: (role: Role) => {
        set({ userRole: role });
        Cookies.set("userRole", role, { expires: 1 }); // Save in cookie for 1 day
    },
    clearUserRole: () => {
        set({ userRole: null });
        Cookies.remove("userRole");
    },
}));

const userRoleCookie = Cookies.get("userRole") as Role | undefined;
if (userRoleCookie) {
    useUserStore.setState({ userRole: userRoleCookie });
}
