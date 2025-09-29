import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // ปรับพื้นหลังให้เข้มขึ้น และเพิ่มขอบบนสี Indigo เล็กน้อย
    <footer className="w-full bg-gray-950 text-white border-t-4 border-indigo-600">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo & Company Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-3xl font-extrabold tracking-tight text-white transition-colors hover:text-indigo-400"
            >
              My Task Flow
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              โซลูชันการจัดการงานที่เรียบง่ายและทรงพลัง
              สำหรับทีมและองค์กรยุคใหม่
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">
              เมนูลัด
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-base"
                >
                  หน้าหลัก (Home)
                </Link>
              </li>
              <li>
                <Link
                  href="/tasks"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-base"
                >
                  งานของฉัน (My Tasks)
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-base"
                >
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">
              ติดต่อเรา
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <FaEnvelope className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a
                  href="mailto:support@mycompany.com"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  support@mycompany.com
                </a>
              </li>
              <li className="text-gray-400 text-sm leading-relaxed">
                123/45 ถนนนวัตกรรม, แขวงโค้ดดิ้ง, กรุงเทพฯ 10100
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">
              เชื่อมต่อ
            </h3>
            <div className="flex space-x-5 mt-2">
              {[FaFacebook, FaTwitter, FaLinkedin, FaGithub].map(
                (Icon, idx) => (
                  <Link
                    key={idx}
                    href="#"
                    className="text-gray-400 hover:text-indigo-500 transition-transform transform hover:scale-110"
                  >
                    <Icon className="w-6 h-6" />
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="mt-16 pt-6 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500 font-medium">
            &copy; {currentYear} My Company. All rights reserved. | Built with
            ❤️ by Team
          </p>
        </div>
      </div>
    </footer>
  );
}
