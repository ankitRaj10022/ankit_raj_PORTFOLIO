"use client";

import { useState } from "react";
import Loader from "@/component/loader";
import {Navbar} from "@/component/navBar";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Navbar/>

      {!loading && (
        <main className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold text-green-400">Main Content</h1>
        </main>
      )}
    </>
  );
}
