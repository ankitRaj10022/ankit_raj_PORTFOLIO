"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function FunkyLoader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onDone,
    });

    tl.from(".word span", {
      y: () => gsap.utils.random(-120, 120),
      x: () => gsap.utils.random(-80, 80),
      rotate: () => gsap.utils.random(-25, 25),
      opacity: 0,
      stagger: 0.04,
      ease: "power3.out",
      duration: 0.8,
    })
      .to(".cursor", {
        scaleY: 0,
        duration: 0.3,
      })
      .to(
        ".loader-bg",
        {
          clipPath: "circle(0% at 50% 50%)",
          duration: 0.8,
          ease: "power4.inOut",
        },
        "-=0.2"
      );
  }, [onDone]);

  return (
    <motion.div
      className="loader-bg"
      initial={{ clipPath: "circle(100% at 50% 50%)" }}
      exit={{ opacity: 0 }}
    >
      <div className="loader-center">
        <div className="w
