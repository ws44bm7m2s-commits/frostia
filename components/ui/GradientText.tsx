import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────
   GradientText
   Uso:
   <GradientText>operación inteligente</GradientText>
   <GradientText from="#7c3aed" to="#06B6D4">IA aplicada</GradientText>
───────────────────────────────────────────────────────────────── */

interface GradientTextProps {
  children: ReactNode;
  from?: string;
  to?: string;
  via?: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export default function GradientText({
  children,
  from = "#2563EB",
  via,
  to   = "#06B6D4",
  className,
  as: Tag = "span",
}: GradientTextProps) {
  const gradient = via
    ? `linear-gradient(135deg, ${from}, ${via}, ${to})`
    : `linear-gradient(135deg, ${from}, ${to})`;

  return (
    <Tag
      className={cn("bg-clip-text text-transparent inline", className)}
      style={{ backgroundImage: gradient }}
    >
      {children}
    </Tag>
  );
}
