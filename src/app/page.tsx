"use client";
import { useLoginForm } from "@/hooks/useLoginForm";
import { FaUser, FaLock } from "react-icons/fa";
import Button from "@/components/UI/Button";

export default function LoginPage() {
  const {
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
  } = useLoginForm();


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Welcome
        </h2>

        {/* Username Input */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FaUser />
          </span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FaLock />
          </span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Level Select */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as "manager" | "employee")}
          className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        >
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>

        {/* Department Select */}
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="select select-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        >
          {departments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>

        {/* Login Button */}
        <Button
          label="Login"
          onClick={handleLogin}
          className="btn btn-primary w-full text-lg font-semibold hover:scale-105 transition-transform duration-200"
        />
      </div>
    </div>
  );
}
