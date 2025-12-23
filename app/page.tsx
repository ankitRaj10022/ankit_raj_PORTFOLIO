"use client";

import { useState } from "react";
import FunkyLoader from "../components/loader";
import "@/styles/funky-loader.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <html lang="en">
      <body>
        {showLoader && <FunkyLoader onDone={() => setShowLoader(false)} />}
        {!showLoader && children}
      </body>
    </html>
  );
}
