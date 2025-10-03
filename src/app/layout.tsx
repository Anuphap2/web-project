import "@/styles/globals.css";
import { Noto_Sans_Thai } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={notoSansThai.className} data-theme="light">
      <body className="flex flex-col min-h-screen antialiased">
        {children}
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
