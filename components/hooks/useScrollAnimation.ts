"use client";

/* ─────────────────────────────────────────────────────────────────
   useScrollAnimation
   Combina useInView + variantes de animación para el patrón más
   común: "animar cuando el elemento entra en el viewport, una sola vez"
───────────────────────────────────────────────────────────────── */

import { useRef } from "react";
import { useInView } from "framer-motion";

interface UseScrollAnimationOptions {
  /** Margin antes de que el elemento sea considerado "en view" */
  margin?: string;
  /** Si la animación se repite al volver a entrar en viewport */
  once?: boolean;
  /** Qué fracción del elemento debe ser visible */
  amount?: number | "some" | "all";
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { margin = "-60px", once = true, amount } = options;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: margin as `${number}px`,
    once,
    amount,
  });

  const animateState = isInView ? "show" : "hidden";

  return { ref, isInView, animateState } as const;
}

/* ─────────────────────────────────────────────────────────────────
   useScrollDirection
   Devuelve "up" | "down" según el scroll del usuario
───────────────────────────────────────────────────────────────── */

import { useState, useEffect } from "react";
import type { ScrollDirection } from "@/types";

export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>("none");
  const prevY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY;
      if (currentY > prevY.current + 4)       setDirection("down");
      else if (currentY < prevY.current - 4)  setDirection("up");
      prevY.current = currentY;
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return direction;
}

/* ─────────────────────────────────────────────────────────────────
   useScrollProgress
   Devuelve un valor 0–1 del progreso de scroll de la página entera
───────────────────────────────────────────────────────────────── */

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? scrollTop / total : 0);
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return progress;
}

/* ─────────────────────────────────────────────────────────────────
   useScrollY
   Devuelve el scrollY actual como número reactivo (sin Framer Motion)
───────────────────────────────────────────────────────────────── */

export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return scrollY;
}