"use client"; // บังคับให้ component นี้เป็น client

import { useState } from "react";
import { useRouter } from "next/navigation"; // App Router ใช้จาก next/navigation
import { useUserStore } from "@/store/userStore";
import Button from "@/components/UI/Button";

const departments = ["HR", "IT", "Finance"];

export default function LoginPage() {
  const router = useRouter();
  const login = useUserStore((state: { login: (username: string, password: string, level: "manager" | "employee", department: string) => void }) => state.login);
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
      router.push("dashboard"); // redirect ไปหน้า home
    } else {
      router.push("home"); // redirect ไปหน้า home
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded border p-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-2"
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as "manager" | "employee")}
          className="w-full rounded border p-2"
        >
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full rounded border p-2"
        >
          {departments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>

        <Button label="Login" onClick={handleLogin} />
      </div>
    </div>
  );
}
