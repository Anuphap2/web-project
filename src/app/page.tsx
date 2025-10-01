"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const GreenBlob = ({ className = "" }) => (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#ffff"
        d="M52.9,-54.1C67,-48.5,72.6,-28.9,71.2,-10.8C69.8,7.3,59.3,25.8,45.2,35.4C31.1,45.1,13.5,45.9,-4.3,47.9C-22.1,50,-44.2,53.2,-55.4,43.2C-66.6,33.3,-66.8,10.2,-64.1,-11.1C-61.3,-32.4,-55.5,-52.8,-41.8,-60.7C-28.1,-68.7,-6.6,-64.3,9.5,-61.2C25.6,-58.1,41.9,-56.3,51.9,-54.2Z"
        transform="translate(100 100) scale(2)"
      />
    </svg>
  );
  return (
    <div className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
      <section className="min-h-screen snap-start relative overflow-hidden py-10 sm:py-16 bg-landing">
        {/* Logo */}
        <div className="absolute top-5 left-5 sm:top-10 sm:left-10 z-10">
          <Image
            src="/tasksflow.png"
            alt="Logo"
            width={100}
            height={100}
            className="object-contain sm:w-[180px] sm:h-[150px]"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 pt-10 sm:pt-16">
          {/* Text */}
          <div className="mt-16 sm:mt-24 lg:mt-40 max-w-full lg:max-w-lg order-2 lg:order-1">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-4 sm:mb-10 text-white font-serif leading-tight lg:leading-none">
              T
              <span className="relative">
                ASKS
                <span className="absolute left-0 -bottom-8 sm:-bottom-10 text-3xl sm:text-5xl">
                  FLOW ?
                </span>
              </span>
            </h1>
            <br />
            <p className="text-base sm:text-lg lg:text-xl text-black/70 leading-relaxed max-w-full lg:max-w-lg mt-5">
              คือเว็บที่สามารถช่วยในการจัดระบบงานของคุณได้ สามารถแบ่งงาน
              และให้รายละเอียดงานในทีเดียว หรือดูงานทั้งหมดในแผนกหรือแค่ของคุณ
              เพื่อให้คุณสามารถจัดการงานได้ง่ายขึ้น และทำงานเป็นทีมให้ดีขึ้น
            </p>
          </div>

          {/* Graphic Box */}
          <div
            className="relative w-full aspect-[4/5] max-w-sm sm:max-w-md justify-self-center 
      lg:justify-self-end mt-4 sm:mt-16 lg:mt-24 order-1 lg:order-2"
          >
            {/* Blob Layer */}
            <GreenBlob className="absolute inset-0 w-full h-full text-green-300 overflow-visible" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10 text-center">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-widest text-gray-900 font-serif leading-none">
                TASKS
                <span className="block">FLOW</span>
              </h2>
              <p className="text-xs sm:text-sm mt-3 sm:mt-5 text-black/70 tracking-wider font-semibold">
                TASK MANAGEMENT THAT FLOWS SMOOTHLY, <br /> CLEARLY, AND
                COLLABORATIVELY.
              </p>

              {/* ปุ่ม */}
              <div className="flex justify-center mt-8 sm:mt-12">
                <button
                  onClick={() => router.push("/login")}
                  className="btn bg-black text-white hover:bg-gray-800 border-0 btn-md sm:btn-lg 
         rounded-full px-10 sm:px-16 text-xs sm:text-sm font-bold tracking-widest shadow-lg"
                >
                  เริ่มต้นใช้งาน
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="min-h-screen snap-start bg-landing px-6 py-16">
        <h1 className="text-3xl font-bold text-center mb-12">Features</h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 min-h-[200px] rounded-xl shadow-lg p-6 sm:p-8 border-t-8 border-black/50">
            <div className="text-black/80 mb-4">📌</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
              Feature 1
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              รายละเอียด Feature 1
            </p>
          </div>
          <div className="bg-gray-50 min-h-[200px] rounded-xl shadow-lg p-6 sm:p-8 border-t-8 border-black/50">
            <div className="text-black/80 mb-4">📌</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
              Feature 2
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              รายละเอียด Feature 2
            </p>
          </div>
          <div className="bg-gray-50 min-h-[200px] rounded-xl shadow-lg p-6 sm:p-8 border-t-8 border-black/50">
            <div className="text-black/80 mb-4">📌</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
              Feature 3
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              รายละเอียด Feature 3
            </p>
          </div>
        </div>
      </section>

      <section className="hero snap-start bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
            alt="Box Office"
            width={500}
            height={500}
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </section>
    </div>
  );
}
