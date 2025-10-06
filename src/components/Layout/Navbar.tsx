"use client";

import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { username, level, logout } = useUserStore();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);

  // Build GSAP timeline (animations only)
  useEffect(() => {
    if (!username) {
      setIsMenuOpen(false);
      menuTl.current?.pause(0);
      menuTl.current = null;
      return;
    }
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out", duration: 0.28 },
      });

      // Mobile menu panel animation (opacity + slight slide)
      tl.fromTo(
        "#mobile-menu",
        { opacity: 0, y: -8, pointerEvents: "none" },
        { opacity: 1, y: 0, pointerEvents: "auto" }
      );

      // Scrim animation
      tl.fromTo(
        "#menu-scrim",
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "auto" },
        0
      );

      menuTl.current = tl;
    }, navRef);

    return () => {
      menuTl.current = null;
      ctx.revert();
    };
  }, [username]);

  // Play / reverse the timeline when state changes
  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return;
    isMenuOpen ? tl.play() : tl.reverse();
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleLinkClick = () => setIsMenuOpen(false);

  const renderNavLinks = () =>
    level === "manager" ? (
      <>
        <li className="my-auto">
          <Link
            href="/dashboard"
            onClick={handleLinkClick}
            className="md:hover:text-[#ff8198] transition-colors"
          >
            งานทั้งหมดของแผนก
          </Link>
        </li>
        <li className="my-auto">
          <Link
            href="/addTasks"
            onClick={handleLinkClick}
            className="md:hover:text-[#ff8198] transition-colors"
          >
            เพิ่มงานใหม่
          </Link>
        </li>
        <li className="my-auto">
          <Link
            href="/listDepart"
            onClick={handleLinkClick}
            className="md:hover:text-[#ff8198] transition-colors"
          >
            รายชื่อพนักงาน
          </Link>
        </li>
      </>
    ) : (
      <>
        <li className="my-auto">
          <Link
            href="/home"
            onClick={handleLinkClick}
            className="md:hover:text-[#ff8198] transition-colors"
          >
            หน้าหลัก
          </Link>
        </li>
        <li className="my-auto">
          <Link
            href="/tasks"
            onClick={handleLinkClick}
            className="md:hover:text-[#ff8198] transition-colors"
          >
            งานของฉัน
          </Link>
        </li>
      </>
    );

  if (!username) return null;

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 shadow-md px-4 sm:px-6 lg:px-8 transition-colors duration-300 z-1000
        ${
          isMenuOpen
            ? "bg-white backdrop-blur-0"
            : "bg-white/60 backdrop-blur-md"
        }
      `}
    >
      <div className="flex items-center justify-between h-16">
        {/* Logo + Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden btn btn-ghost btn-circle text-gray-700 hover:text-[#ff8198]"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
            <Image
              src="/tasksflow.png"
              alt="Logo"
              width={40}
              height={40}
              priority
              className="object-contain sm:w-[50px] sm:h-[50px] mr-2"
            />
            TasksFlow
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex menu menu-horizontal space-x-4 text-gray-700">
          {renderNavLinks()}
        </ul>

        {/* Desktop User Info */}
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">
            Hi, {username} ({level})
          </span>
          <button
            onClick={handleLogout}
            className="btn bg-[#ff8198] text-white hover:bg-[#e76a87] border-0 btn-sm rounded-full"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Scrim (overlay) – do NOT cover navbar */}
      <div
        id="menu-scrim"
        className="fixed inset-x-0 top-16 bottom-0 z-[9990] bg-black/50 md:hidden"
        style={{ opacity: 0, pointerEvents: "none" }}
        role="presentation"
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu – fixed & highest layer, GSAP only animates opacity/translate */}
      <div
        id="mobile-menu"
        className="fixed top-16 left-0 w-full z-[9999] md:hidden
                   shadow-2xl border-t border-white/40
                   p-5 space-y-4
                   bg-white backdrop-blur-xl"
        style={{
          opacity: 0,
          transform: "translateY(-8px)",
          pointerEvents: "none",
        }}
      >
        <ul className="space-y-2 text-gray-800 font-medium">
          {renderNavLinks()}
        </ul>

        <div className="border-t border-white/60 pt-3 flex flex-col space-y-2">
          <span className="text-md font-medium text-gray-500 mb-8">
            Hi, {username} ({level})
          </span>
          <button
            onClick={handleLogout}
            className="btn w-full h-14 rounded-xl bg-[#ec516e] text-white hover:bg-[#e5305a] border-0"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
