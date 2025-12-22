"use client";

import { useEffect, useRef } from "react";
import { ASCII_ART } from "@/lib/ascii";
import gsap from "gsap";

export default function AsciiCanvasLoader({ done }: { done?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const fontSize = 12;
    const lineHeight = 14;
    const lines = ASCII_ART.split("\n");

    canvas.width = 900 * dpr;
    canvas.height = 700 * dpr;
    canvas.style.width = "900px";
    canvas.style.height = "700px";
    ctx.scale(dpr, dpr);

    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = "#9AFF00";
    ctx.textBaseline = "top";

    let line = 0;
    let char = 0;

    const typeInterval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < line; i++) {
        ctx.fillText(lines[i], 0, i * lineHeight);
      }

      if (line < lines.length) {
        ctx.fillText(
          lines[line].slice(0, char),
          0,
          line * lineHeight
        );
        char++;
        if (char > lines[line].length) {
          char = 0;
          line++;
        }
      } else {
        clearInterval(typeInterval);
        done?.();
      }
    }, 8);
    
    gsap.to(scanRef.current, {
      y: "100%",
      duration: 1.2,
      repeat: -1,
      ease: "none",
    });

    return () => clearInterval(typeInterval);
  }, [done]);

  return (
    <div className="relative">
      <canvas ref={canvasRef} />
      <div
        ref={scanRef}
        className="pointer-events-none absolute top-0 left-0 w-full h-1 bg-green-400 opacity-20 blur-sm"
      />
    </div>
  );
}
