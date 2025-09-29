import "@/styles/globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Management",
  description: "",
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
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {/* <Hero
          title="การใช้งาน Hero Section"
          subtitle="ด้วย Tag Hero"
          label="ดูเพิ่มเติม"
          link="#features"
        /> */}

        {children}
        <Footer />
      </body>
    </html>
  );
}
