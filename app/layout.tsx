"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TerminalLoader from "@/componets/ter";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <html lang="en">
      <body className="bg-black text-white">
        {loading && <TerminalLoader onFinish={() => setLoading(false)} />}
        {children}
      </body>
    </html>
  );
}
