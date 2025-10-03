"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import aboutImg from "@/components/img/kelly-sikkema--1_RZL8BGBM-unsplash.jpg";
import FeatureImg1 from "@/components/img/mapbox-ZT5v0puBjZI-unsplash.jpg";
import FeatureImg2 from "@/components/img/marissa-grootes-flRm0z3MEoA-unsplash.jpg";
import FeatureImg3 from "@/components/img/vitaly-gariev-pdQIqtbeIsE-unsplash.jpg";
import ThreeDImage from "@/components/img/3Dimage.png";

export default function HomePage() {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ReturnType<typeof ScrollSmoother.create> | null>(
    null
  );

  useEffect(() => {
    if (!pageRef.current) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Detect mobile
    const isMobile = window.innerWidth <= 768;

    // Kill previous smoother (HMR)
    ScrollSmoother.get()?.kill();

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: isMobile ? 0.8 : 1.2, // mobile smooth faster
      normalizeScroll: true,
      effects: !isMobile, // ปิด effects บนมือถือเพื่อลด lag
    });
    smootherRef.current = smoother;

    const q = gsap.utils.selector(pageRef);

    const ctx = gsap.context(() => {
      // HERO TITLE SPLIT
      const heroTitle = q("#Hero-title")[0];
      if (heroTitle && !heroTitle.querySelector("span")) {
        heroTitle.innerHTML = heroTitle
          .textContent!.split("")
          .map((c) => `<span class="inline-block">${c}</span>`)
          .join("");
      }

      // HERO TIMELINE
      const heroTL = gsap.timeline({
        scrollTrigger: { trigger: "#Hero", start: "top 90%", once: true },
      });
      heroTL
        .from("#Hero-title span", {
          y: 50,
          opacity: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(q("#hero-btn > *"), {
          opacity: 0,
          y: 20,
          stagger: 0.2,
          duration: 0.6,
          ease: "power1.out",
          immediateRender: false,
        });

      // HERO BG PARALLAX (เบาลงสำหรับมือถือ)
      gsap.to(q("#Hero"), {
        backgroundPositionY: isMobile ? "10%" : "20%",
        ease: "none",
        scrollTrigger: {
          trigger: "#Hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // SCROLL HINT BOUNCE
      gsap.to(q("#scroll-suggest svg"), {
        y: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 0.8,
      });

      // ABOUT CARD
      gsap.from(q("#about-card"), {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
      if (!isMobile) {
        gsap.to(q("#about-card"), {
          backgroundPositionY: "60%",
          ease: "none",
          scrollTrigger: {
            trigger: "#about-card",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // FEATURES REVEAL + PARALLAX
      gsap.utils.toArray<HTMLElement>("[data-feature]").forEach((el, i) => {
        const fromX = i % 2 === 0 ? -30 : 30;
        gsap.from(el, {
          opacity: 0,
          x: isMobile ? 0 : fromX,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        const bgEl = el.querySelector<HTMLElement>("[data-parallax-bg]");
        if (bgEl && !isMobile) {
          const bgUrl = bgEl.style.backgroundImage;
          bgEl.style.backgroundImage = "none";
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            onEnter: () => {
              bgEl.style.backgroundImage = bgUrl;
            },
          });

          gsap.to(bgEl, {
            backgroundPositionY: "40%",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      // FLOATING 3D IMAGE
      const threeD = q("#threeD-image")[0];
      if (threeD && !isMobile) {
        gsap.to(threeD, {
          y: 10,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: threeD,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          willChange: "transform",
        });
      }
    }, pageRef);

    return () => {
      ctx.revert();
      smoother.kill();
      smootherRef.current = null;
    };
  }, []);

  // Scroll-to-content function เหมือนเดิม
  const handleScrollToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.querySelector<HTMLElement>("#content");
    const smoother = smootherRef.current;
    if (smoother) {
      smoother.scrollTo(target ?? "#content", true);
      return;
    }
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const aboutContext =
    "เว็บไซต์สำหรับการจัดการงานภายในองค์กร ที่ช่วยให้คุณและทีมสามารถแบ่งงานมอบหมายงาน พร้อมรายละเอียดที่ครบถ้วนในที่เดียว...";

  return (
    <div id="smooth-wrapper">
      <div
        id="smooth-content"
        ref={pageRef}
        className="flex flex-col overflow-x-hidden"
      >
        {/* HERO */}
        <div
          id="Hero"
          className="h-screen w-screen flex flex-col items-center justify-center relative bg-[#FE90A4] overflow-hidden"
          style={{ backgroundColor: "#FE90A4" }}
        >
          {/* Overlay โปร่งใสทำให้พื้นนุ่ม */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

          <Image
            src="/tasksflow.png"
            alt="TaskFlow Logo"
            width={128}
            height={128}
            className="mb-4 relative z-10"
          />

          <h1
            id="Hero-title"
            className="font-bold text-6xl text-white text-center relative z-10 drop-shadow-lg"
          >
            TASKSFLOW
          </h1>

          <div id="hero-btn" className="mt-8 flex gap-4 relative z-10">
            <button
              className="cursor-pointer inline-flex items-center justify-center px-6 py-3 bg-white/90 backdrop-blur-md text-black rounded-full font-semibold text-lg 
      hover:bg-white transition duration-200 shrink-0 shadow-lg"
              onClick={() => router.push("/login")}
            >
              เข้าสู่ระบบ
            </button>

            <a
              href="#content"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-full font-semibold backdrop-blur-md bg-white/20 hover:bg-white/30 transition duration-200 shrink-0 shadow-lg"
              onClick={handleScrollToContent}
            >
              ดูเพิ่มเติม
            </a>
          </div>

          {/* Scroll hint */}
          <div
            id="scroll-suggest"
            className="absolute bottom-12 left-0 w-full flex justify-center flex-col z-10 pointer-events-none"
          >
            <p className="text-lg text-white flex flex-col items-center mx-auto">
              เลื่อนลง
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-arrow-bar-down mx-auto text-white animate-bounce"
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

        {/* ABOUT */}
        <section
          id="content"
          // เพิ่ม padding ด้านบนให้มากขึ้นเล็กน้อยเพื่อให้ดูมีพื้นที่หายใจ
          className="px-8 md:px-16 py-20 md:py-28 container mx-auto mt-8"
        >
          <div
            id="about-card"
            // ปรับ rounded-2xl เป็น rounded-3xl ให้ดูนุ่มนวลขึ้น
            className="w-full h-96 rounded-3xl relative overflow-hidden flex items-center justify-center flex-col text-center bg-cover bg-center shadow-2xl"
            style={{ backgroundImage: `url(${aboutImg.src})` }}
            role="img"
            aria-label="About tasksflow picture"
          >
            {/* Dark Overlay เพิ่มความชัดเจนของข้อความ */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 max-w-3xl px-6">
              <h1
                // เปลี่ยนเป็นสีชมพูตามธีมหลัก และปรับ drop-shadow ให้คมชัด
                className="text-4xl md:text-5xl font-extrabold text-[#FE90A4] drop-shadow-md"
                style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8)" }}
              >
                Tasksflow คืออะไร?
              </h1>
              <p
                className="mt-6 text-lg md:text-xl leading-relaxed text-gray-900 
                       px-10 py-8 rounded-xl 
                       bg-white/80 backdrop-blur-md 
                       shadow-xl border-2 border-white/50"
                // เพิ่ม Inner Shadow เล็กน้อย
                style={{
                  boxShadow:
                    "0 8px 15px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.7)",
                }}
              >
                {aboutContext}
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section
          id="features"
          className="w-full flex flex-col py-16 md:py-20 gap-32"
        >
          {/* Feature 1 */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-8 md:px-16 container mx-auto"
            data-feature
          >
            <div
              className="order-2 w-full h-96 bg-cover bg-center rounded-2xl"
              style={{ backgroundImage: `url(${FeatureImg1.src})` }}
              role="img"
              aria-label="Features-picture-1"
              data-parallax-bg
            />
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
                สามารถสร้างงานใหม่ ใส่รายละเอียด กำหนดวันส่ง
                และมอบหมายงานได้ทันที
              </p>
            </div>
          </div>

          {/* Feature 2 (with white glass overlay in your design) */}
          <div
            className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-8 md:px-16 container mx-auto overflow-hidden rounded-2xl"
            data-feature
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl bg-white/40 z-10"
              aria-hidden="true"
            ></div>
            <div
              className="order-2 md:order-1 w-full h-96 bg-cover bg-center rounded-2xl relative z-0"
              style={{ backgroundImage: `url(${FeatureImg2.src})` }}
              role="img"
              aria-label="Features-picture-2"
              data-parallax-bg
            />
            <div className="order-1 md:order-2 flex flex-col justify-center items-center text-center gap-4 relative z-20">
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
                สามารถสร้างงานใหม่ ใส่รายละเอียด กำหนดวันส่ง
                และมอบหมายงานได้ทันที
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-8 md:px-16 container mx-auto"
            data-feature
          >
            <div
              className="order-2 w-full h-96 bg-cover bg-center rounded-2xl"
              style={{ backgroundImage: `url(${FeatureImg3.src})` }}
              role="img"
              aria-label="Features-picture-3"
              data-parallax-bg
            />
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

          {/* Extra blocks */}
          <div className="px-8 md:px-16 container mx-auto mt-8" data-feature>
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

          <div className="px-8 md:px-16 container mx-auto mt-8" data-feature>
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
                <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
              </svg>
              <p className="text-6xl">ติดตามสถานะงานผ่าน Dashboard ที่ชัดเจน</p>
              <p className="text-lg md:text-xl leading-10">
                ดูภาพรวมงานทั้งหมดและติดตามความคืบหน้าของแต่ละงานผ่าน Dashboard
                ที่ชัดเจน
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CARD */}


        <div className="mx-auto max-w-6xl p-4 md:p-8 my-8" data-feature>
          <section className="relative overflow-hidden bg-white">
            <div className="grid items-center gap-8 p-6 md:grid-cols-2 md:p-10">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-500">
                  เริ่มต้นการเปลี่ยนผ่าน
                </h1>
                <p className="mt-1 text-xl md:text-2xl font-semibold text-neutral-700">
                  ยกระดับประสิทธิภาพของทีมให้เหนือกว่าคู่แข่ง
                </p>
                <p className="mt-6 leading-7 text-neutral-600">
                  <span className="font-semibold">TasksFlow</span>{" "}
                  ไม่ใช่แค่แอปพลิเคชันจัดการงาน
                  แต่เป็นเครื่องมือกลยุทธ์ที่จะช่วยให้คุณและทีมทำงานได้อย่างมีทิศทาง
                  ทดลองใช้ฟรีและสัมผัสความแตกต่างของการจัดการงานที่ถูกออกแบบมาเพื่อความสำเร็จ!
                </p>
              </div>
              <div className="relative">
                <Image
                  id="threeD-image"
                  src={ThreeDImage}
                  alt="side_3dimage"
                  className="mx-auto w-64 md:w-80"
                  priority
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
