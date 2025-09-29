// src/hooks/useLoginForm.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

const departments = ["HR", "IT", "Finance"];

export function useLoginForm() {
    const router = useRouter();
    const login = useUserStore((state) => state.login);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState<"manager" | "employee">("employee");
    const [department, setDepartment] = useState(departments[0]);

    const handleLogin = () => {
        if (!username || !password) {
            alert("กรุณากรอก username และ password");
            return;
        }

        login(username, password, level, department);

        if (level === "manager") {
            router.push("/dashboard");
        } else {
            router.push("/home");
        }
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
        departments,
        handleLogin,
    };
}