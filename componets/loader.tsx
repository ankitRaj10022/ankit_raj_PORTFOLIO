"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const FRAMES = [
  ` > initializing user environment...`,
  `> loading modules... [OK]`,
  ` █████╗ ███╗   ██╗██╗  ██╗██╗████████╗    ██████╗  █████╗      ██╗
  ██╔══██╗████╗  ██║██║ ██╔╝██║╚══██╔══╝    ██╔══██╗██╔══██╗     ██║
  ███████║██╔██╗ ██║█████╔╝ ██║   ██║       ██████╔╝███████║     ██║
  ██╔══██║██║╚██╗██║██╔═██╗ ██║   ██║       ██╔══██╗██╔══██║██   ██║
  ██║  ██║██║ ╚████║██║  ██╗██║   ██║       ██║  ██║██║  ██║╚█████╔╝
  ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝
  > system ready ✔
  `
  ];

  export default function Loader({
    onComplete,
  }: {
    onComplete?: () => void;
  }) {
    const containerRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<HTMLPreElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set(asciiRef.current, {
      opacity: 0,
      scale: 0.96,
      filter: "blur(2px)",
    });

    // Boot in
    tl.to(asciiRef.current, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.9,
      ease: "power3.out",
    });

    // CRT jitter (subtle, infinite)
    gsap.to(asciiRef.current, {
      x: () => gsap.utils.random(-1.5, 1.5),
      y: () => gsap.utils.random(-1, 1),
      duration: 0.08,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });

    // Cursor blink
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Exit animation
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 1.03,
      duration: 0.8,
      delay: 1.8,
      onComplete,
    });

    return () => {
      tl.kill();
      gsap.killTweensOf("*");
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black text-green-400 font-mono flex items-center justify-center"
    >
      <div className="relative">
        <pre
          ref={asciiRef}
          className="text-sm leading-tight whitespace-pre select-none"
        >
{FRAMES}
        </pre>

        <div className="absolute -bottom-8 left-0 text-green-500">
          <span>&gt; loading</span>
          <span ref={cursorRef} className="ml-1">█</span>
        </div>
      </div>
    </div>
  );
}
