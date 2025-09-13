"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JivoScript from "@/components/JivoScript";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className={!isAdmin ? "pt-20 lg:pt-24" : ""}>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <JivoScript />}
    </>
  );
}