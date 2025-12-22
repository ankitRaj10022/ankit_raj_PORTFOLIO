"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Playground", href: "/playground" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 bg-black/70 backdrop-blur border-b border-green-500/20"
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between font-mono text-sm text-green-400">
        
        {/* Logo */}
        <div className="tracking-wide text-green-500">
          <span className="text-green-400">&gt;</span> ankit-raj
        </div>

        {/* Navigation */}
        <nav className="flex gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative transition-colors ${
                  isActive ? "text-green-300" : "text-green-500/80"
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-px bg-green-400 transition-all duration-300
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
