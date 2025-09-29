"use client";
import { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa'; // นำเข้าไอคอนใหม่

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username, level, logout } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // รวมเมนูทั้งหมดไว้ในโครงสร้างเดียว
  const navItems = [
    { label: "Dashboard", href: "/dashboard", roles: ["manager"] },
    { label: "Home", href: "/home", roles: ["employee"] },
    { label: "My Tasks", href: "/tasks", roles: ["employee"] },
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(level || ''));
  
  // กำหนดสีหลักใหม่: Indigo 600
  const primaryColorClass = "text-indigo-600 dark:text-indigo-400";
  const hoverColorClass = "hover:text-indigo-700 dark:hover:text-indigo-500";
  const focusRingClass = "focus:ring-indigo-500";

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b shadow-lg dark:bg-gray-900/90 dark:border-gray-800 transition-shadow duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo or Home Link */}
          <Link
            href={username ? (level === 'manager' ? '/dashboard' : '/home') : '#'}
            className="flex items-center space-x-2 text-2xl font-extrabold text-gray-900 dark:text-gray-100 group"
          >
            <FaUserCircle className={`w-8 h-8 ${primaryColorClass} transition-colors duration-300 group-hover:text-indigo-500`} />
            <span>My Task Flow</span> {/* เปลี่ยนชื่อให้ดูดีขึ้น */}
          </Link>

          {/* Desktop menu */}
          {username && (
            <div className="hidden md:flex items-center space-x-6">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-gray-600 dark:text-gray-300 ${hoverColorClass} px-3 py-2 rounded-lg font-medium transition-colors`}
                >
                  {item.label}
                </Link>
              ))}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-400 border-l pl-4 border-gray-200">
                Hi, {username} ({level})
              </span>
              <button
                onClick={handleLogout}
                className="ml-4 cursor-pointer bg-red-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-red-700 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          {username && (
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset ${focusRingClass}`}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <FaTimes className="block h-6 w-6" />
                ) : (
                  <FaBars className="block h-6 w-6" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {username && isMenuOpen && (
        <div id="mobile-menu" className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-gray-800 transition-colors`}
              onClick={() => setIsMenuOpen(false)} // ปิดเมนูเมื่อคลิก
            >
              {item.label}
            </Link>
          ))}
          <span className="block px-3 py-2 text-sm text-gray-500 dark:text-gray-400 border-t pt-2 mt-2">
            Hi, {username} ({level})
          </span>
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer bg-red-600 text-white px-3 py-2 rounded-xl hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
