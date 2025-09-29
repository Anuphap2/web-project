"use client";
import { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username, level, logout } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/"); // กลับหน้า login
  };

  const menuItems = username
    ? [
        ...(level === "manager"
          ? [
              { label: "Dashboard", href: "/dashboard" },
              // { label: "Tasks", href: "/tasks" },
            ]
          : [
              { label: "Home", href: "/home" },
              { label: "My Tasks", href: "/tasks" },
            ]),
      ]
    : [];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm border-b shadow-sm dark:bg-gray-950/80 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-gray-100"
          >
            My Website
          </Link>

          {/* Desktop menu */}
          {username && (
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
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
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {username && isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
