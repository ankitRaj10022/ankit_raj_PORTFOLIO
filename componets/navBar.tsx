"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "About_me", href: "/about_me" },
  { name: "Contact_me", href: "/contact_me" },
];

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const underlineRefs = useRef<HTMLSpanElement[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      }
    );
  }, []);

  useEffect(() => {
    underlineRefs.current.forEach((el, i) => {
      const isActive = NAV_ITEMS[i].href === pathname;
      gsap.to(el, {
        scaleX: isActive ? 1 : 0,
        transformOrigin: "left center",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }, [pathname]);

  return (
    <header
      ref={navRef}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 bg-black/40 backdrop-blur-md border border-green-500/20 rounded-xl">
      <nav className="flex items-center gap-10 px-8 py-3 font-mono text-sm text-green-400">
        
        <div className="text-green-500 tracking-wide select-none">
          <span className="text-green-400">&gt;</span> ankit-raj
        </div>

        <div className="flex gap-8">
          {NAV_ITEMS.map((item, i) => (
            <div
              key={item.href}
              className="relative cursor-pointer"
              onMouseEnter={() =>
                gsap.to(underlineRefs.current[i], {
                  scaleX: 1,
                  duration: 0.25,
                  ease: "power2.out",
                })
              }
              onMouseLeave={() =>
                gsap.to(underlineRefs.current[i], {
                  scaleX: pathname === item.href ? 1 : 0,
                  duration: 0.25,
                  ease: "power2.in",
                })
              }
            >
              <Link href={item.href}>{item.name}</Link>

              <span
                ref={(el) => {
                  if (el) underlineRefs.current[i] = el;
                }}
                className="absolute -bottom-1 left-0 h-px w-full bg-green-400 scale-x-0"
              />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}