import { FaEnvelope } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // ปรับพื้นหลังให้เข้มขึ้น และเพิ่มขอบบนสี Indigo เล็กน้อย
    <footer className="w-full bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl py-12 px-6 sm:px-8 lg:px-12">
        {/* Main Flex */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10">
          {/* Logo & Info */}
          <div className="flex flex-col items-start space-y-3">
            <Image
              src="/tasksflow.png"
              alt="Logo"
              width={100}
              height={100}
              className="invert" // สีขาวสำหรับโลโก้ดำ
            />
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              โซลูชันการจัดการงานที่เรียบง่ายและทรงพลัง
              สำหรับทีมและองค์กรยุคใหม่
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:items-start space-y-3">
            <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-1 mb-2">
              ติดต่อเรา
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-indigo-400 w-4 h-4 flex-shrink-0" />
                <a href="#" className="hover:text-indigo-500 transition-colors">
                  support@mycompany.com
                </a>
              </li>
              <li className="text-gray-400">MAEJO UNIVERSITY</li>
            </ul>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500 font-medium">
            &copy; {currentYear} My Company. All rights reserved. | Built with
            ❤️ by Team
          </p>
        </div>
      </div>
    </footer>
  );
}
