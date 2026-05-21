"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   SectionWrapper
   Componente base que estandariza:
   - Padding vertical por sección
   - Max-width del contenedor
   - Separadores de borde top/bottom
   - Animación de entrada opcional
   - Background configurable
───────────────────────────────────────────────────────────────── */

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  bg?: "dark" | "darker" | "transparent";
  topBorder?: boolean;
  bottomBorder?: boolean;
  animate?: boolean;
  py?: "sm" | "md" | "lg";
}

const BG_MAP = {
  dark:        "bg-[#0B1120]",
  darker:      "bg-[#080E1C]",
  transparent: "bg-transparent",
} as const;

const PY_MAP = {
  sm: "py-16 sm:py-20",
  md: "py-24 sm:py-28",
  lg: "py-28 sm:py-36",
} as const;

export default function SectionWrapper({
  id,
  children,
  className,
  containerClassName,
  bg = "dark",
  topBorder    = true,
  bottomBorder = true,
  animate      = false,
  py           = "md",
}: SectionWrapperProps) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });

  const content = animate ? (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={cn(
        "relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10",
        containerClassName
      )}
    >
      {children}
    </motion.div>
  ) : (
    <div
      className={cn(
        "relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10",
        containerClassName
      )}
    >
      {children}
    </div>
  );

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        BG_MAP[bg],
        PY_MAP[py],
        className
      )}
      style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      {topBorder && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent pointer-events-none" />
      )}

      {content}

      {bottomBorder && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
      )}
    </section>
  );
}
