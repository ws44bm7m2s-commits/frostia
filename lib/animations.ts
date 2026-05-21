/* ─────────────────────────────────────────────────────────────────
   FROST AI — Shared Framer Motion Variants & Transitions
   FIXED: ease arrays tipados como [number,number,number,number]
   para compatibilidad con Framer Motion + TypeScript strict mode
───────────────────────────────────────────────────────────────── */

import type { Variants, Transition } from "framer-motion";

/* ── EASE PRESETS — tipados explícitamente para evitar error TS ── */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT:   [number, number, number, number] = [0.4, 0, 0.2, 1];

/* ── TRANSITIONS ── */
export const transitionFast: Transition = {
  duration: 0.35,
  ease: EASE_OUT_EXPO,
};
export const transitionMedium: Transition = {
  duration: 0.6,
  ease: EASE_OUT_EXPO,
};
export const transitionSlow: Transition = {
  duration: 0.9,
  ease: EASE_OUT_EXPO,
};
export const transitionSpring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 24,
};

/* ── FADE IN UP ── */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
};

/* ── FADE IN DOWN ── */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -18, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/* ── FADE IN LEFT ── */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -24, filter: "blur(3px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/* ── FADE IN RIGHT ── */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 24, filter: "blur(3px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/* ── FADE IN (simple, no movement) ── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_IN_OUT },
  },
};

/* ── SCALE IN ── */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

/* ── STAGGER CONTAINER ── */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/* ── STAGGER FAST ── */
export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.02,
    },
  },
};

/* ── STAGGER SLOW ── */
export const staggerSlow: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/* ── SLIDE UP MODAL ── */
export const slideUpModal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.97,
    transition: { duration: 0.22, ease: EASE_IN_OUT },
  },
};

/* ── BACKDROP ── */
export const backdrop: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.2  } },
  exit:   { opacity: 0, transition: { duration: 0.18 } },
};

/* ── EASING HELPERS (para IntersectionObserver manual) ── */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/* ── SCROLL-LINKED PRESETS ── */
export const parallaxY = {
  slow:   { input: [0, 1] as number[], output: ["0%", "12%"] },
  medium: { input: [0, 1] as number[], output: ["0%", "20%"] },
  fast:   { input: [0, 1] as number[], output: ["0%", "32%"] },
};
