"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiEdit3, FiUsers, FiBarChart2, FiList } from "react-icons/fi";
import { FaCog } from "react-icons/fa";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// --- Feature Data Array ---
const featuresData = [
  {
    title: "📝 สร้างงานอย่างรวดเร็ว",
    desc: "สร้างงานใหม่ ระบุวันที่, ลำดับความสำคัญ และรายละเอียดงานในที่เดียว",
    icon: FiEdit3,
  },
  {
    title: "👥 มอบหมายและติดตาม",
    desc: "มอบหมายงานให้ทีม กำหนดผู้รับผิดชอบและติดตามสถานะงานแบบเรียลไทม์",
    icon: FiUsers,
  },
  {
    title: "📊 วิเคราะห์แดชบอร์ด",
    desc: "ดูภาพรวมและประสิทธิภาพการทำงานของทีมด้วยรายงานวิเคราะห์ผล",
    icon: FiBarChart2,
  },
  {
    title: "📋 รายการงานรวมศูนย์",
    desc: "ดูงานทั้งหมดในแผนกหรือโปรเจกต์ของคุณเพื่อจัดการงานได้ง่ายขึ้น",
    icon: FiList,
  },
];

// --- Feature Card Component ---
type FeatureCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
  delay: number;
};
const FeatureCard = ({ icon: Icon, title, desc, delay }: FeatureCardProps) => (
  <div
    className="card bg-gray-50 min-h-[200px] h-auto rounded-xl shadow-lg p-6 sm:p-8 border-t-8 border-black/50"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className="text-black/80 mb-4">
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto" />
    </div>
    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
      {title}
    </h3>
    <p className="text-xs sm:text-sm text-gray-600">{desc}</p>
  </div>
);

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden py-10 sm:py-16 bg-landing">
      {/* Logo */}
      <div
        className="absolute top-5 left-5 sm:top-10 sm:left-10 z-10"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        <Image
          src="/tasksflow.png"
          alt="Logo"
          width={100}
          height={100}
          className="object-contain sm:w-[150px] sm:h-[150px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 pt-10 sm:pt-16">
        {/* Text */}
        <div
          className="mt-16 sm:mt-24 lg:mt-40 max-w-full lg:max-w-lg order-2 lg:order-1"
          data-aos="fade-right"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-4 sm:mb-10 text-gray-900 font-serif leading-tight lg:leading-none">
            TASKS FLOWS คืออะไร ?
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-black/70 leading-relaxed max-w-full lg:max-w-lg mt-4">
            คือเว็บที่สามารถช่วยในการจัดระบบงานของคุณได้ สามารถแบ่งงาน
            และให้รายละเอียดงานในทีเดียว หรือดูงานทั้งหมดในแผนกหรือแค่ของคุณ
            เพื่อให้คุณสามารถจัดการงานได้ง่ายขึ้น และทำงานเป็นทีมให้ดีขึ้น
          </p>
        </div>

        {/* Graphic Box */}
        <div
          className="relative w-full aspect-[4/5] max-w-sm sm:max-w-md justify-self-center lg:justify-self-end mt-4 sm:mt-16 lg:mt-24 shadow-2xl order-1 lg:order-2"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-gray-100 h-full w-full relative overflow-hidden">
            <FaCog className="absolute top-[-1.5rem] right-[-1.5rem] w-20 h-20 sm:w-24 sm:h-24 text-black/90 rotate-[20deg] opacity-90 filter drop-shadow-lg" />

            <div className="text-center mt-8 sm:mt-16 mb-4 sm:mb-8">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-widest text-gray-900 font-serif leading-none">
                TASKS
                <span className="block mt-[-0.5rem] sm:mt-[-0.7rem]">FLOW</span>
              </h2>
              <p className="text-xs sm:text-sm mt-3 sm:mt-5 text-black/70 tracking-wider font-semibold">
                TASK MANAGEMENT THAT FLOWS SMOOTHLY, <br /> CLEARLY, AND
                COLLABORATIVELY.
              </p>
            </div>

            {/* Login Button */}
            <div className="flex justify-center mt-8 sm:mt-12">
              <button
                onClick={() => router.push("/login")}
                className="btn bg-black text-white hover:bg-gray-800 border-0 btn-md sm:btn-lg rounded-full px-10 sm:px-16 text-xs sm:text-sm font-bold tracking-widest shadow-lg"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                เริ่มต้นใช้งาน
              </button>
            </div>

            {/* Barcode Graphic */}
            <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center">
              <div className="w-11/12 sm:w-3/4 h-8 sm:h-12 overflow-hidden">
                <div className="flex space-x-[1px] sm:space-x-[1.5px] h-full">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-full bg-black/80 ${
                        i % 3 === 0 ? "w-2" : "w-[1px]"
                      } ${i % 5 === 0 ? "h-3/4" : "h-full"}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 mt-16 lg:mt-52 pb-16">
        {featuresData.slice(0, 3).map((feature, i) => (
          <FeatureCard
            key={i}
            icon={feature.icon}
            title={feature.title}
            desc={feature.desc}
            delay={i * 200} // delay เป็น ms
          />
        ))}
      </div>
    </section>
  );
}
