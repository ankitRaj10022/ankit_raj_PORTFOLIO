"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const ASCII_LINES = [
  " █████╗ ███╗   ██╗██╗  ██╗██╗████████╗    ██████╗  █████╗      ██╗",
  "██╔══██╗████╗  ██║██║ ██╔╝██║╚══██╔══╝    ██╔══██╗██╔══██╗     ██║",
  "███████║██╔██╗ ██║█████╔╝ ██║   ██║       ██████╔╝███████║     ██║",
  "██╔══██║██║╚██╗██║██╔═██╗ ██║   ██║       ██╔══██╗██╔══██║██   ██║",
  "██║  ██║██║ ╚████║██║  ██╗██║   ██║       ██║  ██║██║  ██║╚█████╔╝",
  "╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝",
];

export default function Loader({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [output, setOutput] = useState<string[]>([""]);

  useEffect(() => {
    let line = 0;
    let char = 0;

    const typeInterval = setInterval(() => {
      setOutput((prev) => {
        const copy = [...prev];

        if (line >= ASCII_LINES.length) {
          clearInterval(typeInterval);
          finish();
          return copy;
        }

        if (!copy[line]) copy[line] = "";

        copy[line] += ASCII_LINES[line][char] || "";
        char++;

        if (char >= ASCII_LINES[line].length) {
          char = 0;
          line++;
          copy.push("");
        }

        return copy;
      });
    }, 12); // typing speed (lower = faster)

    // Cursor blink
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // CRT jitter
    gsap.to(containerRef.current, {
      x: () => gsap.utils.random(-1.2, 1.2),
      y: () => gsap.utils.random(-1, 1),
      duration: 0.08,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });

    const finish = () => {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.03,
        delay: 1.5,
        duration: 0.8,
        onComplete,
      });
    };

    return () => {
      clearInterval(typeInterval);
      gsap.killTweensOf("*");
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black text-green-400 font-mono flex items-center justify-center"
    >
      <div className="relative">
        <pre className="text-sm leading-tight whitespace-pre">
          {output.join("\n")}
        </pre>

        <div className="absolute -bottom-8 left-0 text-green-500">
          <span>&gt; booting Ankit Raj</span>
          <span ref={cursorRef} className="ml-1">█</span>
        </div>
      </div>
    </div>
  );
}
