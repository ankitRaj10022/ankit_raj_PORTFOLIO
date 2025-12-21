"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -40, opacity: 0 },
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
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40 bg-black/70 backdrop-blur border-b border-green-500/20"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-green-400 font-mono text-sm">
        {/* Logo */}
        <div className="tracking-wide">
          <span className="text-green-500 font-bold">&gt;</span> Ankit_Raj
        </div>

        {/* Nav */}
        <nav className="hidden md:flex gap-8">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/projects">Skills</NavItem>
          <NavItem href="/playground">Projects</NavItem>
          <NavItem href="/contact">About_Me</NavItem>
          <NavItem href="/contact">Contact_Me</NavItem>
        </nav>

        {/* CTA
        <Link
          href="/login"
          className="border border-green-500/40 px-4 py-1.5 rounded hover:bg-green-500/10 transition"
        >
          Login
        </Link> */}
      </div>
    </header>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative group transition-colors"
    >
      {children}
      <span className="absolute left-0 -bottom-1 h-px w-0 bg-green-400 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
