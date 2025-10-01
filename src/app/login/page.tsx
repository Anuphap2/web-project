"use client";
import { FaUser, FaLock } from "react-icons/fa";
import Button from "@/components/UI/Button";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Toast from "@/components/Layout/Toast";

export default function AuthPage() {
  const {
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
  } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#ff8198]/30 via-white to-white p-4">
      {toast && (
        <Toast
          message={toast.text}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl p-8 space-y-6 border-t-8 border-black/20">
        <div className="flex items-center justify-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 font-serif tracking-wide">
              TasksFlow
            </h1>
            <p className="text-gray-500 text-center">
              {" "}
              {isSignUp ? "Sign Up" : "Login"} ระบบจัดการงานสำหรับคุณ
            </p>
          </div>
          <Image
            src={"/tasksflow.png"}
            alt="Logo"
            width={100}
            height={100}
          ></Image>
        </div>

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
            className="text-[#ff8198] cursor-pointer font-semibold underline ml-1"
            onClick={() => {
              setIsSignUp(!isSignUp);
            }}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
