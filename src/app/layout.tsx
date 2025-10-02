import "@/styles/globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // เพิ่ม CSS ของ Toastify

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
    <html lang="en" data-theme="light" data-scroll-behavior="smooth">
      <body className="antialiased flex min-h-screen flex-col">
        <Navbar />
<<<<<<< HEAD
        <main className="flex-1">
=======
        <main>
>>>>>>> caec83b7136a912f5dcacb8aeff7735abe4fc890
          {children}
          <Footer />
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

