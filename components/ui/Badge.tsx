import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────
   Badge — pill label reutilizable
   Uso:
   <Badge>Más popular</Badge>
   <Badge accent="#06B6D4" dot>En vivo</Badge>
   <Badge variant="outline">Beta</Badge>
───────────────────────────────────────────────────────────────── */

type BadgeVariant = "solid" | "outline" | "ghost";

interface BadgeProps {
  children: ReactNode;
  accent?:   string;
  dot?:      boolean;
  dotPulse?: boolean;
  variant?:  BadgeVariant;
  className?: string;
  size?:     "xs" | "sm" | "md";
}

const SIZE_MAP = {
  xs: "px-2 py-0.5 text-[9px] tracking-[0.12em]",
  sm: "px-2.5 py-1 text-[10.5px] tracking-[0.12em]",
  md: "px-3.5 py-1.5 text-[11px] tracking-[0.12em]",
} as const;

export default function Badge({
  children,
  accent    = "#2563EB",
  dot       = false,
  dotPulse  = false,
  variant   = "solid",
  className,
  size      = "sm",
}: BadgeProps) {
  const styles: React.CSSProperties =
    variant === "solid"
      ? { color: accent, background: `${accent}14`, border: `1px solid ${accent}28` }
      : variant === "outline"
      ? { color: accent, border: `1px solid ${accent}50`, background: "transparent" }
      : { color: accent, background: "transparent" };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold uppercase",
        SIZE_MAP[size],
        className
      )}
      style={styles}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", dotPulse && "animate-pulse")}
          style={{ background: accent }}
        />
      )}
      {children}
    </span>
  );
}
