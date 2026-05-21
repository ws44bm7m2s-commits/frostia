/* ─────────────────────────────────────────────────────────────────
   FROST AI SOLUTIONS — Global TypeScript Interfaces & Types
───────────────────────────────────────────────────────────────── */

/* ── NAVIGATION ── */
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

/* ── LOGO ── */
export type LogoVariant = "full" | "icon" | "stacked";

/* ── SERVICES / FEATURES ── */
export interface ServiceFeature {
  id: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string; style?: React.CSSProperties }>;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  metric: {
    value: string;
    label: string;
  };
  accent: string;
  accentAlt: string;
  gradient: string;
  border: string;
  glow: string;
}

/* ── INDUSTRIES / USE CASES ── */
export interface UseCase {
  id: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  industry: string;
  tag: string;
  headline: string;
  description: string;
  metrics: UseCaseMetric[];
  modules: string[];
  accent: string;
  bg: string;
  border: string;
}

export interface UseCaseMetric {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  label: string;
  value: string;
}

/* ── STATS ── */
export interface Stat {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  sub: string;
  accent: string;
}

/* ── TESTIMONIALS ── */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  avatar: string;   // initials fallback
  accent: string;
  metric?: {
    value: string;
    label: string;
  };
}

/* ── HOW IT WORKS ── */
export interface ProcessStep {
  number: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  title: string;
  description: string;
  details: string[];
  accent: string;
  tag: string;
}

/* ── INTEGRATIONS ── */
export interface Integration {
  id: string;
  name: string;
  category: IntegrationCategory;
  description: string;
  accent: string;
}

export type IntegrationCategory =
  | "ERP"
  | "BI"
  | "Cloud"
  | "Database"
  | "IoT"
  | "Comunicación"
  | "Gobierno";

/* ── PRICING ── */
export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string | "custom";
  period?: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  accent: string;
}

/* ── FRAMER MOTION VARIANTS ── */
export interface MotionVariants {
  hidden: object;
  show: object;
}

/* ── SECTION PROPS BASE ── */
export interface SectionProps {
  id?: string;
  className?: string;
}

/* ── SCROLL DIRECTION ── */
export type ScrollDirection = "up" | "down" | "none";

/* ── THEME ── */
export interface FrostTheme {
  colors: {
    dark: string;
    darker: string;
    darkest: string;
    surface: string;
    blue: string;
    blueDark: string;
    cyan: string;
    gray: string;
    light: string;
  };
}