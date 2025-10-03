import "@/styles/globals.css";
import { Noto_Sans_Thai } from "next/font/google";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 1. กำหนดค่า Font โดยใช้ next/font
const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  display: "swap", // ช่วยให้ข้อความแสดงผลทันทีแม้ Font จะยังโหลดไม่เสร็จ (FOIT/FOUT Mitigation)
  variable: "--font-noto", // ตั้งชื่อ Variable (ถ้าต้องการใช้ใน Tailwind)
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks Flow",
  description: "Your simple and effective task management system.",
  icons: {
    icon: "/tasksflow.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={notoSansThai.className} // 👈 ใช้ตรงนี้
    >
      <body className="antialiased flex min-h-screen flex-col">
        <Navbar />

        <main id="smooth-wrapper">
          <div id="smooth-content">
            {children}

            <Footer />
          </div>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
