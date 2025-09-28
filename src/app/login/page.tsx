"use client";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState<"manager" | "employee">("employee");
  const [department, setDepartment] = useState("IT");
  const login = useUserStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim())
      return alert("กรอก username และ password");

    login(username, password, level, department);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("level", level);
    localStorage.setItem("department", department);

    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 flex flex-col gap-4 p-6 border rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />

      <label className="flex flex-col">
        Role:
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as "manager" | "employee")}
          className="border p-2 rounded mt-1"
        >
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
      </label>

      <label className="flex flex-col">
        Department:
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 rounded mt-1"
        >
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
      </label>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        เข้าสู่ระบบ
      </button>
    </form>
  );
}
