"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiEdit3, FiUsers, FiBarChart2, FiList } from "react-icons/fi";
import { FaCog } from "react-icons/fa";

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
    desc: "ดูภาพรวมและประสิทธิภาพการทำงานของทีมด้วยกราฟและรายงานวิเคราะห์ผล",
    icon: FiBarChart2,
  },
  {
    title: "📋 รายการงานรวมศูนย์",
    desc: "ดูงานทั้งหมดในแผนกหรือโปรเจกต์ของคุณเพื่อจัดการงานได้ง่ายขึ้น",
    icon: FiList,
  },
];

// --- Feature Card Component (Responsive) ---
type FeatureCardProps = {
  icon: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
  delay: number;
};
const FeatureCard = ({ icon: Icon, title, desc, delay }: FeatureCardProps) => (
  <motion.div
    className="card bg-gray-50 min-h-[200px] h-auto rounded-xl shadow-lg p-6 sm:p-8 transform hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out border-t-8 border-black/50"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: delay }}
  >
    <div className="text-black/80 mb-4">
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto" />
    </div>
    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
      {title}
    </h3>
    <p className="text-xs sm:text-sm text-gray-600">{desc}</p>
  </motion.div>
);

// --- Hero Section Component (ปรับปรุง Gradient เต็มหน้าจอ) ---
const HeroSection = () => {
  const router = useRouter(); // สร้าง instance ของ router

  return (
    <section className="min-h-screen relative overflow-hidden py-10 sm:py-16 bg-gradient-to-br from-[#ff8198]/50 via-white to-white">
      {/* Logo */}
      <motion.div
        className="absolute top-5 left-5 sm:top-10 sm:left-10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <Image
          src="/tasksflow.png"
          alt="Logo"
          width={70}
          height={70}
          className="object-contain sm:w-[100px] sm:h-[100px]"
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 pt-10 sm:pt-16">
        {/* Text */}
        <div className="mt-16 sm:mt-24 lg:mt-40 max-w-full lg:max-w-lg order-2 lg:order-1">
          <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-4 sm:mb-10 text-gray-900 font-serif leading-tight lg:leading-none"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.5 }}
          >
            About
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-black/70 leading-relaxed max-w-full lg:max-w-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.7 }}
          >
            **Workflow Manager** is a task management system that makes work
            clear and efficient. Managers can assign tasks and view employees,
            while employees can access departmental tasks, accept them, or work
            on assigned ones — all with **real-time tracking** and improved
            collaboration.
          </motion.p>
        </div>

        {/* Graphic Box */}
        <motion.div
          className="relative w-full aspect-[4/5] max-w-sm sm:max-w-md justify-self-center lg:justify-self-end mt-4 sm:mt-16 lg:mt-24 shadow-2xl order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, type: "spring" }}
        >
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-gray-100 h-full w-full relative overflow-hidden">
            {/* เฟืองสีดำ (บนขวา) */}
            <FaCog className="absolute top-[-1.5rem] right-[-1.5rem] w-20 h-20 sm:w-24 sm:h-24 text-black/90 rotate-[20deg] opacity-90 filter drop-shadow-lg" />

            {/* Tasks Flow Header */}
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
              <motion.button
                onClick={() => router.push("/login")}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-black text-white hover:bg-gray-800 border-0 btn-md sm:btn-lg rounded-full px-10 sm:px-16 text-xs sm:text-sm font-bold tracking-widest shadow-lg"
              >
                เริ่มต้นใช้งาน
              </motion.button>
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
        </motion.div>
      </div>

      {/* Features */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 mt-16 lg:mt-52 pb-16">
        {featuresData.slice(0, 3).map((feature, i) => (
          <FeatureCard
            key={i}
            icon={feature.icon}
            title={feature.title}
            desc={feature.desc}
            delay={i * 0.2 + 0.5}
          />
        ))}
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
    </>
  );
}
