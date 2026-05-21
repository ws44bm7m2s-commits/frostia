"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible]   = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      const pct   = total > 0 ? scrollTop / total : 0;
      setProgress(pct);
      setVisible(scrollTop > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* SVG ring */
  const SIZE   = 44;
  const RADIUS = 18;
  const CIRC   = 2 * Math.PI * RADIUS;
  const dash   = CIRC * (1 - progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="stt"
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit={{    opacity: 0, scale: 0.7, y: 12  }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          onClick={handleClick}
          aria-label="Volver al inicio"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center
                     rounded-full bg-[#0F1929]/90 backdrop-blur-md
                     border border-white/[0.10] shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                     hover:border-[#2563EB]/40 transition-colors duration-200
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]/60"
          style={{ width: SIZE, height: SIZE }}
          whileHover={{ scale: 1.08 }}
          whileTap={{  scale: 0.94 }}
        >
          {/* Progress ring */}
          <svg
            width={SIZE}
            height={SIZE}
            className="absolute inset-0 -rotate-90"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
          >
            {/* Track */}
            <circle
              cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="2"
            />
            {/* Progress */}
            <circle
              cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
              fill="none"
              stroke="url(#stt-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={dash}
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
            <defs>
              <linearGradient id="stt-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#2563EB" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Arrow icon */}
          <ArrowUp
            size={15}
            strokeWidth={2.2}
            className="relative text-white/70 hover:text-white transition-colors duration-200"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
