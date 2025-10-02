import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

interface UseCheckUserOptions {
    requiredRole?: "manager" | "employee"; // page permission
}

export default function useCheckUser({ requiredRole }: UseCheckUserOptions = {}) {
    const { username, level, logout, isLoaded, loadUser } = useUserStore();
    const router = useRouter();

    const isAuthorized =
        !!username &&
        (level === "manager" || level === "employee") &&
        (!requiredRole || level === requiredRole);

    // โหลด user
    useEffect(() => {
        if (!isLoaded) loadUser?.();
    }, [isLoaded, loadUser]);

    // redirect ถ้า role ไม่ตรง
    useEffect(() => {
        if (isLoaded && !isAuthorized) {
            logout();
            router.push("/login");
        }
    }, [isLoaded, isAuthorized, logout, router]);

    return { isAuthorized, username, level, isLoaded };
}

