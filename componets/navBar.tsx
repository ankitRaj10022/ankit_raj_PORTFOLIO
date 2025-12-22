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
      { y: -20, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, []);

  useEffect(() => {
    underlineRefs.current.forEach((el, i) => {
      const active = NAV_ITEMS[i].href === pathname;
      gsap.to(el, {
        scaleX: active ? 1 : 0,
        duration: 0.35,
        ease: "power2.out",
      });
    });
  }, [pathname]);

  return (
    <header
      ref={navRef}
      className="
        fixed top-6 left-1/2 -translate-x-1/2 z-40
        bg-black/30 backdrop-blur-xl
        border border-white/10
        rounded-full
        shadow-[0_0_40px_rgba(0,255,170,0.05)]
      "
    >
      <nav className="flex items-center gap-12 px-10 py-3 font-mono text-[13px] text-emerald-300/90">

        <div className="tracking-widest text-emerald-400 select-none">
          ANKIT&nbsp;RAJ
        </div>

        <div className="flex gap-8">
          {NAV_ITEMS.map((item, i) => (
            <div
              key={item.href}
              className="relative cursor-pointer"
              onMouseEnter={() =>
                gsap.to(underlineRefs.current[i], {
                  scaleX: 1,
                  duration: 0.3,
                  ease: "power2.out",
                })
              }
              onMouseLeave={() =>
                gsap.to(underlineRefs.current[i], {
                  scaleX: pathname === item.href ? 1 : 0,
                  duration: 0.3,
                  ease: "power2.in",
                })
              }
            >
              <Link
                href={item.href}
                className={`transition-colors ${
                  pathname === item.href
                    ? "text-emerald-200"
                    : "text-emerald-300/70 hover:text-emerald-200"
                }`}
              >
                {item.name}
              </Link>

              <span
                ref={(el) => {
                  if (el) underlineRefs.current[i] = el;
                }}
                className="
                  absolute -bottom-1 left-0 h-px w-full
                  bg-gradient-to-r from-transparent via-emerald-400 to-transparent
                  scale-x-0
                "
              />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}