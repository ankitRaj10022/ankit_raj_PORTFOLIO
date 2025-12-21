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
      const tl = gsap.timeline({
        repeat: FRAMES.length - 1,
        onRepeat: () => {
          setFrame((f) => (f + 1) % FRAMES.length);
        },
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            delay: 0.4,
            onComplete,
          });
        },
      });

      tl.to({}, { duration: 0.7 });

      return () => tl.kill();
    }, [onComplete]);

    return (
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 bg-black text-green-400 font-mono text-sm flex items-center justify-center"
      >
        <pre className="leading-tight whitespace-pre">
  {FRAMES[frame]}
        </pre>
        <span className="absolute bottom-6 animate-pulse">█</span>
      </div>
    );
  }
