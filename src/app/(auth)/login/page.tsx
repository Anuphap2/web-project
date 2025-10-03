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
    <div
      className={`flex min-h-screen items-center justify-around p-4 bg-[#FE90A4]`}
    >
      {/* Toast Component */}
      {toast && (
        <Toast
          message={toast.text}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Image
        src={"/3d.png"}
        alt="Design illustration"
        width={530.56}
        height={530.56}
        className="object-contain sm:w-[530.56px] sm:h-[530.56px] ml-5 hidden lg:block"
      />

      <div className="w-full max-w-md  rounded-3xl bg-white shadow-2xl p-8 space-y-6">
        <div className="flex items-center justify-center">
          <div>
            <Image src="/tasksflow.png" alt="Logo" width={180} height={100} />
            <p className="text-gray-500 text-center font-serif text-2xl font-bold mt-[-10px] ">
              {isSignUp ? "Sign Up" : "Log in"}
            </p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-50">
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`input input-bordered w-full pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff8198] transition-all`}
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 z-50 text-gray-400">
              <FaLock />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // ใช้ input/rounded-xl/pl-10 และ focus ring เดิม
              className={`input input-bordered w-full pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff8198] transition-all`}
            />
          </div>
        </div>

        {/* Level + Department เฉพาะตอน Sign Up */}
        {isSignUp && (
          <div className="space-y-4">
            {/* เลือกระดับผู้ใช้ */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                เลือกระดับผู้ใช้
              </label>
              <select
                value={level}
                onChange={(e) =>
                  setLevel(e.target.value as "manager" | "employee")
                }
                // ใช้ select/rounded-xl และ focus ring เดิม
                className={`select select-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff8198] transition-all`}
              >
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            {/* เลือกแผนก */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                เลือกแผนก
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                // ใช้ select/rounded-xl และ focus ring เดิม
                className={`select select-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff8198] transition-all`}
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

        {/* Button - Login/Sign Up */}
        <Button
          label={isSignUp ? "Sign Up" : "Log in"}
          onClick={handleAuth}
          // ใช้ className ของปุ่มเดิม
          className="btn bg-black text-white hover:bg-gray-800 border-0 w-full text-lg font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
        />

        {/* Toggle Login / Sign Up */}
        <p className="text-center text-gray-600 mt-2 text-sm">
          {isSignUp ? "มีบัญชีแล้ว?" : "ยังไม่มีบัญชี?"}
          <button
            // ใช้ className ของปุ่มสลับเดิม
            className={`text-[#ff8198}] cursor-pointer font-semibold underline ml-1`}
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
