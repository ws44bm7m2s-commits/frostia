/* ─────────────────────────────────────────────────────────────────
   FROST AI — Utility Functions
───────────────────────────────────────────────────────────────── */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/* ── cn() — merge Tailwind classes safely ── */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/* ── Smooth scroll to element by href ── */
export function scrollToSection(href: string): void {
  if (!href.startsWith("#")) return;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Format large numbers: 1200 → "1.2k", 1500000 → "1.5M" ── */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

/* ── Clamp a number between min and max ── */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/* ── Linear interpolation ── */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/* ── Map a value from one range to another ── */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/* ── Debounce ── */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ── Throttle ── */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

/* ── Generate gradient string from two hex colors ── */
export function gradient(from: string, to: string, direction = "135deg"): string {
  return `linear-gradient(${direction}, ${from}, ${to})`;
}

/* ── Hex color to RGBA string ── */
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ── Truncate string ── */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

/* ── Check if running on client ── */
export const isClient = typeof window !== "undefined";

/* ── Get CSS variable value from :root ── */
export function getCSSVar(name: string): string {
  if (!isClient) return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/* ── Stagger delay calculator for lists ── */
export function staggerDelay(index: number, base = 0.08, offset = 0.05): number {
  return index * base + offset;
}