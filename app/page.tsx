"use client";

import { useState } from "react";
import Loader from "@/componets/loader";
import Navbar from "@/componets/navBar";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Navbar/>

      {!loading && (
        <main className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">Main Content</h1>
        </main>
      )}
    </>
  );
}
