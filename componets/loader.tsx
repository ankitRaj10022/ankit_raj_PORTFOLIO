"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LINES = [
  "Initializing system modules...",
  "Loading kernel dependencies...",
  "Mounting virtual file system...",
  "Authenticating secure shell...",
  "Fetching environment variables...",
  "Compiling runtime binaries...",
  "Establishing encrypted channel...",
  "Optimizing memory allocation...",
  "Launching application core...",
];

export default function TerminalLoader({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string[]>([]);

  useEffect(() => {
    let lineIndex = 0;

    const typeLine = async (line: string) => {
      let current = "";
      for (let char of line) {
        current += char;
        setText((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = current;
          return copy;
        });
        await new Promise((r) => setTimeout(r, 90));
      }
    };

    const run = async () => {
      while (lineIndex < LINES.length) {
        setText((prev) => [...prev, ""]);
        await typeLine(LINES[lineIndex]);
        lineIndex++;
        await new Promise((r) => setTimeout(r, 300));
      }

      // Fade out
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        onComplete,
      });
    };

    run();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black text-green-400 font-mono text-sm p-6 overflow-hidden"
    >
      {text.map((line, i) => (
        <div key={i} className="leading-relaxed">
          {">"} {line}
        </div>
      ))}
      <span className="animate-pulse">█</span>
    </div>
  );
}
