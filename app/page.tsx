"use client";

import { useState } from "react";
import TerminalLoader from "@/componets/loader";
import Header from "@/componets/header";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <TerminalLoader onComplete={() => setLoading(false)} />}

      {/* {!loading && (
        <main className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">App Loaded</h1>
        </main>
      )} */}


    <Header/>
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Main Content</h1>
      </main>
    </>
  );
}
