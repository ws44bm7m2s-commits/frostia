"use client";

import { useRef, useEffect, useState } from "react";
import { easeOutCubic } from "@/lib/animations";

/* ─────────────────────────────────────────────────────────────────
   AnimatedCounter
   Se activa solo cuando el elemento entra en el viewport.
   Uso:
   <AnimatedCounter target={94} suffix="%" />
   <AnimatedCounter target={3.2} suffix="×" decimals={1} duration={2} />
───────────────────────────────────────────────────────────────── */

interface AnimatedCounterProps {
  target:      number;
  suffix?:     string;
  prefix?:     string;
  decimals?:   number;
  duration?:   number;  // segundos
  className?:  string;
  accentColor?: string;
}

export default function AnimatedCounter({
  target,
  suffix     = "",
  prefix     = "",
  decimals   = 0,
  duration   = 2.2,
  className  = "",
  accentColor,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const ref     = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0  = performance.now();
          const ms  = duration * 1000;

          const step = (now: number) => {
            const progress = Math.min((now - t0) / ms, 1);
            const eased    = easeOutCubic(progress);
            const value    = eased * target;
            setDisplay(parseFloat(value.toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(step);
            else setDisplay(target);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimals]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display);

  return (
    <span ref={ref} className={className} style={accentColor ? { color: accentColor } : undefined}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
