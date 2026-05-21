"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const [raw, setRaw] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setRaw(total > 0 ? scrollTop / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const width = useSpring(raw * 100, { stiffness: 200, damping: 30, mass: 0.5 });

  return (
    <motion.div
      className="fixed top-0 left-0 z-[60] h-[2px] origin-left pointer-events-none"
      style={{
        width: width.get() + "%",
        background: "linear-gradient(90deg, #2563EB, #06B6D4)",
        boxShadow: "0 0 8px rgba(6,182,212,0.6)",
      }}
    />
  );
}
