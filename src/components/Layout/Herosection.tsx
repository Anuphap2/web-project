import Link from "next/link";
import { ReactNode } from "react";

interface HeroProps {
  /** หัวข้อหลัก */
  title: string;
  /** คำอธิบาย */
  subtitle: string;
  /** ข้อความบนปุ่ม */
  label?: string;
  /** ลิงก์ปลายทางของปุ่ม */
  link?: string;
  /** เนื้อหาเพิ่มเติม เช่น รูปภาพ หรือวิดีโอ */
  children?: ReactNode;
}

export default function Hero({
  title,
  subtitle,
  label,
  link,
  children,
}: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 py-20 md:py-32">
      {/* Background Gradient & Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900"></div>
        {/* You can replace this with an SVG pattern for more flair */}
        <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] bg-repeat"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-7xl">
            {title}
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-700 dark:text-gray-300 sm:text-xl lg:text-2xl leading-relaxed">
            {subtitle}
          </p>
          {label && link && (
            <div className="pt-8">
              <Link
                href={link}
                className="inline-block rounded-full bg-blue-600 px-10 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {label}
              </Link>
            </div>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}
