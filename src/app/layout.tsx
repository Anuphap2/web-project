import "@/styles/globals.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Hero from "../components/common/Herosection";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Project",
  description: "",
  icons: {
    // icon: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Navbar />
        <Hero />
        {children}
        <Footer />
      </body>
    </html>
  );
}
