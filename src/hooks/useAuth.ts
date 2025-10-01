import { useState } from "react";
import { useUserListStore, useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export type ToastType = {
    type: "success" | "error";
    text: string;
};

export function useAuth() {
    const { addUser, users } = useUserListStore();
    const { login } = useUserStore();
    const router = useRouter();

    const departments = ["HR", "IT", "Marketing", "Finance", "General"];

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState<"manager" | "employee">("employee");
    const [department, setDepartment] = useState(departments[0]);
    const [isSignUp, setIsSignUp] = useState(false);
    const [toast, setToast] = useState<ToastType | null>(null);

    const handleAuth = () => {
        if (!username.trim() || !password.trim()) return setToast({ type: "error", text: "กรุณากรอก Username และ Password" });

        if (isSignUp) {
            if (users.find(u => u.username === username)) return setToast({ type: "error", text: "Username นี้มีคนใช้แล้ว" });

            addUser({ username, password, level, department });
            login(username, password, level, department);
            setToast({ type: "success", text: "สมัครสมาชิกสำเร็จ! ล็อกอินอัตโนมัติ..." });
            router.push(level === "manager" ? "/dashboard" : "/home");
        } else {
            const user = users.find(u => u.username === username && u.password === password);
            if (!user) return setToast({ type: "error", text: "Username หรือ Password ไม่ถูกต้อง" });

            login(user.username, user.password, user.level, user.department);
            router.push(user.level === "manager" ? "/dashboard" : "/home");
        }

        setUsername("");
        setPassword("");
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        level,
        setLevel,
        department,
        setDepartment,
        isSignUp,
        setIsSignUp,
        toast,
        setToast,
        departments,
        handleAuth,
    };
}
