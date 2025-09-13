"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function JivoScript() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const script = document.createElement("script");
    script.src = "//code.jivosite.com/widget/QRgZeo4fF0";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [isAdmin]);

  return null;
}