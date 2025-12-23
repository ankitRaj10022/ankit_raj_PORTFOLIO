"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 600);
      },
    });

    tl.to(
      {},
      {
        duration: 2.5,
        ease: "power2.out",
        onUpdate: function () {
          setProgress(Math.floor(this.progress() * 100));
        },
      }
    );

    gsap.to(".scanline", {
      y: "100%",
      repeat: -1,
      duration: 1.2,
      ease: "none",
    });

    gsap.fromTo(
      textRef.current,
      { opacity: 0.2 },
      {
        opacity: 1,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: "power1.inOut",
      }
    );
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="loader-container"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="scanline" />

        <div className="loader-content">
          <span className="loader-title" ref={textRef}>
            INITIALIZING SYSTEM
          </span>

          <div className="loader-bar">
            <div
              className="loader-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="loader-percentage">{progress}%</span>

          <span className="loader-subtext">
            Loading Portfolio Assets
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
