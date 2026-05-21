"use client";

/* ─────────────────────────────────────────────────────────────────
   useWindowSize
   Devuelve { width, height } del viewport, actualizado en resize
───────────────────────────────────────────────────────────────── */

import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });

  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

/* ─────────────────────────────────────────────────────────────────
   useBreakpoint
   Devuelve true si el viewport supera el breakpoint dado
   Breakpoints sincronizados con Tailwind
───────────────────────────────────────────────────────────────── */

const BREAKPOINTS = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

export function useBreakpoint(bp: Breakpoint): boolean {
  const { width } = useWindowSize();
  return width >= BREAKPOINTS[bp];
}

/* ─────────────────────────────────────────────────────────────────
   useIsMobile
   Shortcut para detectar mobile (< md)
───────────────────────────────────────────────────────────────── */

export function useIsMobile(): boolean {
  const { width } = useWindowSize();
  return width > 0 && width < BREAKPOINTS.md;
}

/* ─────────────────────────────────────────────────────────────────
   useIsDesktop
   Shortcut para detectar desktop (>= lg)
───────────────────────────────────────────────────────────────── */

export function useIsDesktop(): boolean {
  const { width } = useWindowSize();
  return width >= BREAKPOINTS.lg;
}