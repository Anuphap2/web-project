"use client";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const { username, level, logout } = useUserStore();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!username) return null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // ✅ ฟังก์ชันสร้างเมนู
  const renderNavLinks = () =>
    level === "manager" ? (
      <>
        <li>
          <Link
            href="/dashboard"
            className="hover:text-indigo-600 transition-colors"
          >
            งานทั้งหมดของแผนก
          </Link>
        </li>
        <li>
          <Link
            href="/addTasks"
            className="hover:text-indigo-600 transition-colors"
          >
            เพิ่มงานใหม่
          </Link>
        </li>
        <li>
          <Link
            href="/listDepart"
            className="hover:text-indigo-600 transition-colors"
          >
            รายชื่อพนักงาน
          </Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link
            href="/home"
            className="hover:text-indigo-600 transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/tasks"
            className="hover:text-indigo-600 transition-colors"
          >
            My Tasks
          </Link>
        </li>
      </>
    );

  return (
    <nav className="sticky top-0 z-50 bg-base-100 shadow-md backdrop-blur-md px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Logo + Mobile Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden btn btn-ghost btn-circle"
          >
            {isMenuOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>

          <Link
            href={level === "manager" ? "/dashboard" : "/home"}
            className="flex items-center text-xl font-bold text-gray-900"
          >
            <FaUserCircle className="w-6 h-6 mr-2 text-indigo-600" />
            My Task Flow
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex menu menu-horizontal space-x-4">
          {renderNavLinks()}
        </ul>

        {/* Desktop User Info */}
        <div className="hidden lg:flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">
            Hi, {username} ({level})
          </span>
          <button
            onClick={handleLogout}
            className="btn btn-error btn-sm rounded-full"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-2 bg-base-100 rounded-xl shadow-lg p-4 space-y-3">
          <ul className="space-y-2">{renderNavLinks()}</ul>
          <div className="border-t border-gray-200 pt-2 flex flex-col space-y-2">
            <span className="text-sm font-medium text-gray-700">
              Hi, {username} ({level})
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-error w-full rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
