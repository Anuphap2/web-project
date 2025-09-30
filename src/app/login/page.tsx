"use client";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Button from "@/components/UI/Button";
import { useUserListStore, useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { addUser, users } = useUserListStore();
  const { login } = useUserStore();
  const router = useRouter();

  const departments = ["HR", "IT", "Marketing", "Finance", "General"];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState<"manager" | "employee">("employee");
  const [department, setDepartment] = useState(departments[0]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = () => {
    if (!username.trim() || !password.trim()) {
      setError("กรุณากรอก Username และ Password");
      setSuccess(null);
      return;
    }

    if (isSignUp) {
      const exists = users.find((u) => u.username === username);
      if (exists) {
        setError("Username นี้มีคนใช้แล้ว");
        setSuccess(null);
        return;
      }

      addUser({ username, password, level, department });
      setSuccess("สมัครสมาชิกสำเร็จ! ล็อกอินอัตโนมัติ...");
      setError(null);

      login(username, password, level, department);
      if (level === "manager") router.push("/dashboard");
      else router.push("/home");

      setUsername("");
      setPassword("");
    } else {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) {
        setError("Username หรือ Password ไม่ถูกต้อง");
        setSuccess(null);
        return;
      }

      login(user.username, user.password, user.level, user.department);
      if (user.level === "manager") router.push("/dashboard");
      else router.push("/home");

      setError(null);
      setSuccess(null);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#ff8198]/30 via-white to-white p-4">
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl p-8 space-y-6 border-t-8 border-black/20">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 font-serif tracking-wide">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        {/* Username */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FaUser />
          </span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff8198] transition-all"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FaLock />
          </span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff8198] transition-all"
          />
        </div>

        {/* Level + Department เฉพาะตอน Sign Up */}
        {isSignUp && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                เลือกระดับผู้ใช้
              </label>
              <select
                value={level}
                onChange={(e) =>
                  setLevel(e.target.value as "manager" | "employee")
                }
                className="select select-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff8198] transition-all"
              >
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                เลือกแผนก
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="select select-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff8198] transition-all"
              >
                {departments.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Button */}
        <Button
          label={isSignUp ? "Sign Up" : "Login"}
          onClick={handleAuth}
          className="btn bg-black text-white hover:bg-gray-800 border-0 w-full text-lg font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
        />

        {/* Toggle Login / Sign Up */}
        <p className="text-center text-gray-600 mt-2">
          {isSignUp ? "มีบัญชีแล้ว?" : "ยังไม่มีบัญชี?"}
          <button
            className="text-[#ff8198] font-semibold underline ml-1"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setSuccess(null);
            }}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
