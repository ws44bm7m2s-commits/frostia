"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────
   BUTTON — componente reutilizable con variantes
   Uso:
   <Button variant="primary">Agenda demo</Button>
   <Button variant="secondary" size="sm">Ver más</Button>
   <Button variant="ghost">Iniciar sesión</Button>
───────────────────────────────────────────────────────────────── */

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize    = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  className?: string;
  fullWidth?: boolean;
  disabled?:  boolean;
  loading?:   boolean;
  icon?:      ReactNode;
  iconPosition?: "left" | "right";
  onClick?:  () => void;
  href?:     string;
  type?:     "button" | "submit" | "reset";
  ariaLabel?: string;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary: `
    text-white
    bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]
    hover:from-[#2563EB] hover:to-[#06B6D4]
    shadow-[0_0_24px_rgba(37,99,235,0.28)]
    hover:shadow-[0_0_36px_rgba(6,182,212,0.35)]
    transition-all duration-500
  `,
  secondary: `
    text-white/65 hover:text-white
    border border-white/[0.10] hover:border-white/[0.20]
    bg-white/[0.03] hover:bg-white/[0.06]
    transition-all duration-300
  `,
  ghost: `
    text-white/50 hover:text-white
    hover:bg-white/[0.05]
    transition-all duration-200
  `,
  outline: `
    text-[#06B6D4] hover:text-white
    border border-[#06B6D4]/30 hover:border-[#06B6D4]/70
    hover:bg-[#06B6D4]/10
    transition-all duration-300
  `,
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-[12.5px] rounded-lg  gap-1.5",
  md: "px-5    py-2.5 text-[13.5px] rounded-xl  gap-2",
  lg: "px-7    py-3.5 text-[15px]   rounded-xl  gap-2.5",
};

export default function Button({
  children,
  variant  = "primary",
  size     = "md",
  className,
  fullWidth  = false,
  disabled   = false,
  loading    = false,
  icon,
  iconPosition = "right",
  onClick,
  href,
  type     = "button",
  ariaLabel,
}: ButtonProps) {
  const base = cn(
    "relative overflow-hidden group inline-flex items-center justify-center font-semibold",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]/60",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    VARIANTS[variant],
    SIZES[size],
    fullWidth && "w-full",
    className
  );

  const inner = (
    <>
      {/* Shimmer — only for primary */}
      {variant === "primary" && (
        <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%]
                         bg-gradient-to-r from-transparent via-white/15 to-transparent
                         skew-x-[-20deg] transition-transform duration-700 ease-out pointer-events-none" />
      )}

      {/* Loading spinner */}
      {loading && (
        <svg className="animate-spin w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}

      {/* Left icon */}
      {icon && iconPosition === "left" && !loading && (
        <span className="relative flex-shrink-0">{icon}</span>
      )}

      {/* Label */}
      <span className="relative">{children}</span>

      {/* Right icon */}
      {icon && iconPosition === "right" && !loading && (
        <span className="relative flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={base}
        whileHover={!disabled ? { scale: 1.02, y: -1 } : {}}
        whileTap={!disabled  ? { scale: 0.97 }         : {}}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        aria-label={ariaLabel}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={base}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled  ? { scale: 0.97 }         : {}}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      aria-label={ariaLabel}
    >
      {inner}
    </motion.button>
  );
}
