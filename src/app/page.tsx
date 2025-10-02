"use client";
import { useRouter } from "next/navigation";
import heroBg from "@/components/img/teamwork.jpg";
import aboutImg from "@/components/img/kelly-sikkema--1_RZL8BGBM-unsplash.jpg";
import FeatureImg1 from "@/components/img/mapbox-ZT5v0puBjZI-unsplash.jpg";
import FeatureImg2 from "@/components/img/marissa-grootes-flRm0z3MEoA-unsplash.jpg";
import FeatureImg3 from "@/components/img/vitaly-gariev-pdQIqtbeIsE-unsplash.jpg";

export default function HomePage() {
  const router = useRouter();
  const aboutContext =
    "เว็บไซต์สำหรับการจัดการงานภายในองค์กร ที่ช่วยให้คุณและทีมสามารถแบ่งงานมอบหมายงาน พร้อมรายละเอียดที่ครบถ้วนในที่เดียว คุณสามารถเลือกดูงานทั้งหมดของทั้งแผนก หรือโฟกัสเฉพาะงานของตัวเอง เพื่อช่วยให้การติดตามและบริหารจัดการงานง่ายขึ้นและยังส่งเสริมการทำงานร่วมกันภายในทีมให้มีประสิทธิภาพมากกว่าเดิม";
  return (
    <div className="flex flex-col overflow-x-hidden">
      <div
        id="Hero"
        className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), #FFF), url(${heroBg.src})`,
        }}
      >
        <img
          src="/tasksflow.png"
          alt="TaskFlow Logo"
          className="w-32 mb-4 absolute top-4 left-0"
        />
        <h1
          id="Hero-title"
          className="font-bold text-7xl text-[#E35E25] text-center"
        >
          TASKSFLOW
        </h1>
        <div id="hero-btn" className="mt-8 gap-4 flex">
          <button
            className="px-6 py-3 bg-[#E35E25]/90 backdrop-blur-xl text-white rounded-full font-semibold text-lg hover:bg-[#c94e1f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c94e1f] transition-colors duration-200"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <a
            href="#content"
            className="px-6 py-3 border-2 border-[#E35E25] rounded-full font-semibold backdrop-blur-xl bg-white/20 hover:backdrop-blur-sm hover:bg-white/5 duration-200"
          >
            ดูเพิ่มเติม
          </a>
        </div>
        <div
          id="scroll-suggest"
          className="absolute bottom-12 left-0 w-full flex justify-center flex-col z-10 pointer-events-none"
        >
          <p className="text-lg text-gray-600 flex flex-col items-center mx-auto">
            เลื่อนลง
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-arrow-bar-down mx-auto"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5M8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 
      .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 
      12.293V6.5A.5.5 0 0 1 8 6"
            />
          </svg>
        </div>
      </div>
      <section
        id="content"
        className="px-8 md:px-16 py-16 md:py-20 container mx-auto mt-16"
      >
        <div
          className="w-full h-96 bg-cover bg-center rounded-2xl flex items-center justify-center"
          style={{ backgroundImage: `url(${aboutImg.src})` }}
          role="img"
          aria-label="About tasksflow picture"
        >
          <p className="text-md leading-10 md:text-xl indent-10 m-12 p-4 bg-white/30 rounded-lg backdrop-blur-lg shadow-lg">
            {aboutContext}
          </p>
        </div>
      </section>
      <section
        id="features"
        className="w-full flex flex-col py-16 md:py-20 gap-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-8 md:px-16 container mx-auto">
          <div
            className="order-2 w-full h-96 bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: `url(${FeatureImg1.src})` }}
            role="img"
            aria-label="Features-picture-1"
          ></div>
          <div className="order-1 flex flex-col justify-center items-center text-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              fill="currentColor"
              className="bi bi-file-earmark-plus-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0" />
            </svg>
            <p className="text-6xl">มอบหมายงาน</p>
            <p className="text-lg md:text-xl leading-10">
              สามารถสร้างงานใหม่ ใส่รายละเอียด กำหนดวันส่ง และมอบหมายงานได้ทันที
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-8 md:px-16 container mx-auto">
          <div
            className=" order-2 md:order-1 w-full h-96 bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: `url(${FeatureImg2.src})` }}
            role="img"
            aria-label="Features-picture-2"
          ></div>
          <div className="order-1 md:order-2 flex flex-col justify-center items-center text-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <p className="text-6xl">มอบหมายงาน</p>
            <p className="text-lg md:text-xl leading-10">
              สามารถสร้างงานใหม่ ใส่รายละเอียด กำหนดวันส่ง และมอบหมายงานได้ทันที
            </p>
          </div>
          {/* Overlay เพื่อให้ข้อความอ่านง่ายขึ้น */}{" "}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>{" "}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-8 md:px-16 container mx-auto">
          <div
            className="order-2 w-full h-96 bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: `url(${FeatureImg3.src})` }}
            role="img"
            aria-label="Features-picture-3"
          ></div>
          <div className="order-1 flex flex-col justify-center items-center text-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              fill="currentColor"
              className="bi bi-people-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
            </svg>
            <p className="text-6xl">ทำงานร่วมกับทีมได้ง่าย</p>
            <p className="text-lg md:text-xl leading-10">
              แชร์งานและอัปเดตสถานะร่วมกันเพิ่มประสิทธิภาพการทำงาน
              และลดความซ้ำซ้อน
            </p>
          </div>
        </div>
        <div className="px-8 md:px-16 container mx-auto mt-8">
          <div className="flex flex-col justify-center items-center text-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              fill="currentColor"
              className="bi bi-gear-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
            <p className="text-6xl">จัดการงานได้ครบวงจร</p>
            <p className="text-lg md:text-xl leading-10">
              เพิ่มงานใหม่ กำหนดผู้รับผิดชอบ
              หรือมอบหมายงานให้ทีมดูแลทุกขั้นตอนการทำงานได้จากที่เดียว
            </p>
          </div>
        </div>
        <div className="px-8 md:px-16 container mx-auto mt-8">
          <div className="flex flex-col justify-center items-center text-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              fill="currentColor"
              className="bi bi-card-checklist"
              viewBox="0 0 16 16"
            >
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
              <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
            </svg>
            <p className="text-6xl">ติดตามสถานะงานผ่าน Dashboard ที่ชัดเจน</p>
            <p className="text-lg md:text-xl leading-10">
              ดูภาพรวมงานทั้งหมดและติดตามความคืบหน้าของแต่ละงานผ่าน Dashboard
              ที่ชัดเจน
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
