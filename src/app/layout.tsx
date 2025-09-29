import "@/styles/globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // เพิ่ม CSS ของ Toastify

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Task Management",
    description: "Your simple and effective task management system.",
    icons: {
        // icon: "/favicon.ico",
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
        <html lang="en" data-theme="light"> 
            <body className={`antialiased`}>
                <Navbar />
                {children}
                <Footer />
                
                {/* *** เพิ่ม ToastContainer ตรงนี้ ***
                  เพื่อให้ Toast แสดงผลได้ทั่วทั้งแอปพลิเคชัน 
                */}
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
