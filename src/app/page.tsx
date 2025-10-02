"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP Plugins เพียงครั้งเดียว
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// ----------------------------------------------------
// 2. Component: Header/Navbar (คงเดิม)
// ----------------------------------------------------
const SiteHeader = () => {
  const router = useRouter();

  const navItems = [
    { name: "คุณสมบัติ", href: "#features" },
    { name: "ราคา", href: "#pricing" },
    { name: "ติดต่อเรา", href: "#contact" },
  ];

  return (
    <div className="navbar bg-white border-b border-rose-200/50 sticky top-0 z-50 shadow-md">
      {" "}
      <div className="navbar-start">
        {/* Logo area */}{" "}
        <Image
          src="/tasksflow.png" // ใช้โลโก้สีเข้ม
          alt="TasksFlow Logo"
          width={120}
          height={100}
          className="object-contain sm:w-[150px] sm:h-[120px] ml-5"
        />{" "}
      </div>{" "}
      <div className="navbar-center hidden lg:flex">
        {" "}
        <ul className="menu menu-horizontal px-1">
          {" "}
          {navItems.map((item) => (
            <li key={item.name}>
              {" "}
              <a
                href={item.href}
                className="text-gray-700 hover:text-fuchsia-600 font-medium"
              >
                {item.name}{" "}
              </a>{" "}
            </li>
          ))}{" "}
        </ul>{" "}
      </div>{" "}
      <div className="navbar-end mr-5">
        {" "}
        <button
          onClick={() => router.push("/login")}
          className="btn btn-outline btn-sm sm:btn-md border-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-600 hover:text-white transition duration-300 mr-2"
        >
          เข้าสู่ระบบ{" "}
        </button>{" "}
        <button
          onClick={() => router.push("/signup")}
          className="btn btn-primary btn-sm sm:btn-md bg-fuchsia-600 border-fuchsia-600 text-white hover:bg-fuchsia-700 transition duration-300"
        >
          ลงทะเบียน{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
};

export default function HomePage() {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null); // ---------------------------------------------------- // 3. useEffect: GSAP ScrollSmoother & Animations // ----------------------------------------------------

  // ใน HomePage Component
  useEffect(() => {
    // ใช้ Ref ตัวอื่นที่ไม่ใช่ pageRef เพื่อให้ ScrollTrigger ทำงานกับ DOM ที่ถูกต้อง
    // Note: ลบ ScrollSmoother ออกชั่วคราวเพื่อความเรียบง่ายในการ Pin
    // if (!pageRef.current) return;

    // Kill all previous instances for hot reloading safety
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // 1. PIN & ANIMATE SECTION 1 (Hero)
    if (backgroundRef.current && heroTextRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#section-1",
          pin: true, // ตรึง Section 1 ไว้
          start: "top top", // เริ่มตรึงเมื่อ Section 1 ชนด้านบน
          end: "+=200%", // ให้ Scroll 2 เท่าของความสูง Section นี้
          scrub: 1, // ทำให้แอนิเมชันตามการ Scroll
        },
      });

      // Background Mockup Parallax (Parallax ที่ละเอียดขึ้น)
      tl.to(
        backgroundRef.current,
        {
          y: "10%", // เคลื่อนไหวช้ากว่า
          ease: "none",
        },
        0
      );

      // Hero Text Fade Out (ส่วนหลักของ TasksFlow)
      tl.to(
        heroTextRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: -150,
          ease: "power1.inOut",
        },
        0
      ); // 0 คือเริ่มพร้อมกัน

      // 2. PIN & ANIMATE SECTION 2 (Kanban Mockup) - Transition/Color Change
      // ใช้ #section-2 เป็น Trigger เพื่อเริ่มการเปลี่ยนสีพื้นหลังและ Pin
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#section-2",
            pin: true, // ตรึง Section 2 ไว้
            start: "top top",
            end: "+=150%",
            scrub: true,
            // markers: true,
          },
        })
        .from("#section-2-content", {
          opacity: 0,
          y: 50,
          duration: 0.5,
        })
        .to(
          document.body,
          {
            // เปลี่ยนสีพื้นหลัง body (หรือ main container)
            backgroundColor: "#ffffff", // เปลี่ยนจาก white/gray เป็นสีอื่นหากต้องการ
            duration: 0.5,
          },
          0.5
        );
    }

    // Optional: Simple fade-in for Features (Section 3)
    if (document.getElementById("features")) {
      gsap.from("#features", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: "#features",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => {
      // Cleanup GSAP
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // ... (ส่วนอื่นๆ ของ Component)

  return (
    <div ref={pageRef} className="text-gray-900 bg-white">
      {/* ---------------------------------------------------- */}{" "}
      {/* HEADER: NAVIGATION BAR (คงเดิม) */}{" "}
      {/* ---------------------------------------------------- */}
      <SiteHeader />{" "}
      {/* ---------------------------------------------------- */}{" "}
      {/* SECTION 1: HERO - ใช้สีเป็น Mockup และ Parallax */}{" "}
      {/* ---------------------------------------------------- */}{" "}
      <section className="relative h-[80vh] sm:h-[90vh] overflow-hidden bg-white">
        {" "}
        {/* Background Mockup (แทนที่ Image) - ใช้ ref สำหรับ Parallax */}{" "}
        <div
          ref={backgroundRef}
          className="absolute inset-0 w-full h-[120%] transform translate-y-[-100px]" // เพิ่มความสูง/translate-y เพื่อรองรับ Parallax
        >
          {/* สีพื้นหลังโดยรวม */}{" "}
          <div className="absolute inset-0 bg-gray-50"></div>
          {/* Mockup ชั้นหนังสือ (Shelf 1) */}
          <div className="absolute top-[20%] w-full h-2 bg-amber-800 shadow-lg">
            <div className="absolute -top-10 left-[15%] w-32 h-16 bg-gray-500/80 rounded-sm"></div>
            <div className="absolute -top-16 left-[30%] w-10 h-20 bg-fuchsia-800/80 rounded-sm"></div>
            <div className="absolute -top-12 right-[20%] w-24 h-14 bg-gray-400/80 rounded-sm"></div>
          </div>
          {/* Mockup ชั้นหนังสือ (Shelf 2) */}
          <div className="absolute top-[50%] w-full h-2 bg-amber-800 shadow-lg">
            <div className="absolute -top-14 left-[45%] w-16 h-18 bg-gray-500/80 rounded-sm"></div>
            <div className="absolute -top-10 right-[10%] w-36 h-12 bg-fuchsia-600/80 rounded-sm"></div>
            <div className="absolute -top-18 right-[40%] w-8 h-24 bg-gray-600/80 rounded-sm"></div>
          </div>
          {/* Overlay เพื่อให้ข้อความอ่านง่ายขึ้น */}{" "}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>{" "}
        </div>
        {/* Main Content: จัดให้อยู่ตรงกลาง */}{" "}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          {/* Text for GSAP Animation */}{" "}
          <div ref={heroTextRef} className="p-4">
            {" "}
            <h1 className="text-7xl sm:text-9xl font-extrabold text-gray-900 tracking-wider mb-2 font-serif">
              Tasksflow{" "}
            </h1>{" "}
            <div className="flex flex-col items-center justify-center">
              {" "}
              <p className="text-xl text-gray-700 mt-10">Scroll</p>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 animate-bounce text-gray-700"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />{" "}
              </svg>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
      {/* --- */} {/* ---------------------------------------------------- */}{" "}
      {/* SECTION 1.5: CONTENT - ใช้สีเป็น Mockup แทนรูป Post-it (ปรับ Layout ใหม่) */}
      {/* ---------------------------------------------------- */}{" "}
      <section className="py-20 bg-white border-b border-rose-200/50">
        {" "}
        <div ref={heroContentRef} className="max-w-7xl mx-auto px-6">
          {/* Title Block (รวมข้อความจากเดิม) */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-fuchsia-600">
              จัดการงานที่ไหลลื่นและเป็นระเบียบ
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              **TasksFlow** คือเว็บไซต์สำหรับ **การจัดการงานภายในองค์กร**
              ที่ช่วยให้คุณและทีมสามารถแบ่งงาน มอบหมายงาน
              พร้อมรายละเอียดที่ครบถ้วนในที่เดียว
              คุณสามารถเลือกดูงานทั้งหมดของทั้งแผนก หรือโฟกัสเฉพาะงานของตัวเอง
              เพื่อช่วยให้การติดตามและบริหารจัดการงานง่ายขึ้น
              และยังส่งเสริมการทำงานร่วมกันภายในทีมให้มีประสิทธิภาพมากขึ้นกว่าเดิม
            </p>
          </div>{" "}
          {/* Image Area - ใช้สี Mockup แทนรูป Post-it (Kanban Board Mockup) */}
          <div className="w-full max-w-6xl mx-auto p-8 rounded-2xl bg-gray-100 shadow-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Project: Landing Page Development (Mockup)
            </h3>
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {/* Column 1: To Do (Yellow) */}
              <div className="flex-shrink-0 w-64 p-4 bg-white rounded-xl shadow-md border-t-4 border-yellow-500">
                <h4 className="font-bold text-sm mb-3 text-gray-800">
                  TO DO (3)
                </h4>
                <div className="p-3 mb-3 bg-yellow-100 border border-yellow-200 rounded text-sm shadow-sm">
                  Setup Next.js Project
                </div>
                <div className="p-3 mb-3 bg-yellow-100 border border-yellow-200 rounded text-sm shadow-sm">
                  Design Hero Section (Figma)
                </div>
                <div className="p-3 bg-yellow-100 border border-yellow-200 rounded text-sm shadow-sm">
                  Plan Database Schema
                </div>
              </div>

              {/* Column 2: In Progress (Blue/Fuchsia) */}
              <div className="flex-shrink-0 w-64 p-4 bg-white rounded-xl shadow-md border-t-4 border-fuchsia-500">
                <h4 className="font-bold text-sm mb-3 text-gray-800">
                  IN PROGRESS (2)
                </h4>
                <div className="p-3 mb-3 bg-fuchsia-100 border border-fuchsia-200 rounded text-sm shadow-sm">
                  Implement GSAP ScrollSmoother
                </div>
                <div className="p-3 bg-blue-100 border border-blue-200 rounded text-sm shadow-sm">
                  Create API Endpoints
                </div>
              </div>

              {/* Column 3: Review (Orange) */}
              <div className="flex-shrink-0 w-64 p-4 bg-white rounded-xl shadow-md border-t-4 border-orange-500">
                <h4 className="font-bold text-sm mb-3 text-gray-800">
                  REVIEW (1)
                </h4>
                <div className="p-3 mb-3 bg-orange-100 border border-orange-200 rounded text-sm shadow-sm">
                  Test Mobile Responsiveness
                </div>
              </div>

              {/* Column 4: Done (Green) */}
              <div className="flex-shrink-0 w-64 p-4 bg-white rounded-xl shadow-md border-t-4 border-green-500">
                <h4 className="font-bold text-sm mb-3 text-gray-800">
                  DONE (2)
                </h4>
                <div className="p-3 mb-3 bg-green-100 border border-green-200 rounded text-sm shadow-sm">
                  Initialize Tailwind CSS
                </div>
                <div className="p-3 bg-green-100 border border-green-200 rounded text-sm shadow-sm">
                  Setup CI/CD Pipeline
                </div>
              </div>
            </div>
          </div>{" "}
          {/* Call to Action Button - ย้ายมาอยู่ด้านล่าง Mockup เพื่อความโดดเด่น */}{" "}
          <div className="flex justify-center mt-12">
            <button
              onClick={() => router.push("/signup")}
              className="btn btn-primary bg-fuchsia-600 text-white hover:bg-fuchsia-700 border-0 btn-lg rounded-lg shadow-lg font-bold transition duration-300"
            >
              เริ่มต้นจัดการ Flow งานของคุณ
            </button>
          </div>{" "}
        </div>{" "}
      </section>
      {/* --- */} {/* ---------------------------------------------------- */}{" "}
      {/* SECTION 2: FEATURES (คงเดิม) */}{" "}
      {/* ---------------------------------------------------- */}{" "}
      <section
        id="features"
        className="min-h-screen bg-white px-6 py-20 sm:py-32"
      >
        {" "}
        <div className="max-w-7xl mx-auto">
          {" "}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-16 text-gray-900">
            พลังขับเคลื่อนของ{" "}
            <span className="text-fuchsia-600">TasksFlow</span>{" "}
          </h1>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature Card 1: Focus on Clarity */}{" "}
            <div className="card bg-white min-h-[250px] rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 p-8 border-t-8 border-fuchsia-600 transform hover:-translate-y-1">
              {" "}
              <div className="text-3xl text-fuchsia-600 mb-4">✨</div>{" "}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">
                มุมมองงานที่ชัดเจน{" "}
              </h3>{" "}
              <p className="text-sm sm:text-base text-gray-600">
                เปลี่ยนระหว่างมุมมอง Kanban, Gantt, และ Calendar ได้อย่างง่ายดาย
                ทำให้เห็นภาพรวมและรายละเอียดของทุกโปรเจกต์{" "}
              </p>{" "}
            </div>
            {/* Feature Card 2: Focus on Collaboration */}{" "}
            <div className="card bg-white min-h-[250px] rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 p-8 border-t-8 border-fuchsia-600 transform hover:-translate-y-1">
              {" "}
              <div className="text-3xl text-fuchsia-600 mb-4">🔗</div>{" "}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">
                การเชื่อมต่อทีมที่ไร้รอยต่อ{" "}
              </h3>{" "}
              <p className="text-sm sm:text-base text-gray-600">
                สื่อสารภายในงาน, แนบไฟล์, และสร้าง Checklist
                เพื่อให้ทุกคนในทีมเข้าใจเป้าหมายเดียวกันแบบเรียลไทม์{" "}
              </p>{" "}
            </div>
            {/* Feature Card 3: Focus on Efficiency */}{" "}
            <div className="card bg-white min-h-[250px] rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 p-8 border-t-8 border-fuchsia-600 transform hover:-translate-y-1">
              {" "}
              <div className="text-3xl text-fuchsia-600 mb-4">🚀</div>{" "}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">
                การจัดการเวลาและทรัพยากร{" "}
              </h3>{" "}
              <p className="text-sm sm:text-base text-gray-600">
                กำหนด Deadline, จัดสรรทรัพยากร, และดูรายงานความคืบหน้าเชิงสถิติ
                เพื่อส่งมอบงานได้ทันเวลา{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
      {/* --- */} {/* ---------------------------------------------------- */}{" "}
      {/* SECTION 3: CALL TO ACTION (คงเดิม) */}{" "}
      {/* ---------------------------------------------------- */}{" "}
      <section id="pricing" className="min-h-screen bg-rose-50 py-20 sm:py-32">
        {" "}
        <div className="hero max-w-7xl mx-auto p-6 bg-white rounded-3xl shadow-2xl border border-rose-100">
          {" "}
          <div className="hero-content flex-col lg:flex-row-reverse gap-12">
            {" "}
            {/* Image (ใช้ภาพตัวอย่าง) - สามารถเปลี่ยนเป็น Div สีๆ แทนได้หากต้องการ Mockup ทั้งหมด */}{" "}
            <Image
              alt="TasksFlow Dashboard Preview"
              width={500}
              height={500}
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              className="max-w-xs sm:max-w-sm lg:max-w-md rounded-xl shadow-2xl border-4 border-fuchsia-400/50"
            />
            {/* Content */}{" "}
            <div className="lg:w-1/2">
              {" "}
              <span className="text-fuchsia-600 font-bold text-lg block mb-2">
                เริ่มต้นการเปลี่ยนผ่าน{" "}
              </span>{" "}
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                ยกระดับประสิทธิภาพของทีมให้เหนือกว่าคู่แข่ง{" "}
              </h1>{" "}
              <p className="py-6 text-gray-700 text-lg">
                TasksFlow ไม่ใช่แค่แอปพลิเคชันจัดการงาน
                แต่เป็นเครื่องมือกลยุทธ์ที่จะช่วยให้คุณและทีมทำงานได้อย่างมีทิศทาง
                ทดลองใช้ฟรีและสัมผัสความแตกต่างของการจัดการงานที่ถูกออกแบบมาเพื่อความสำเร็จ!{" "}
              </p>
              {/* Button */}{" "}
              <button
                onClick={() => router.push("/signup")}
                className="btn btn-primary bg-fuchsia-600 text-white hover:bg-fuchsia-700 border-0 btn-lg rounded-lg shadow-lg font-bold transition duration-300"
              >
                ทดลองใช้งานฟรี 14 วัน{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
    </div>
  );
}
