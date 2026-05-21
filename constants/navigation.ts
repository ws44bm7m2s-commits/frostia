/* ─────────────────────────────────────────────────────────────────
   FROST AI — Navigation Constants
───────────────────────────────────────────────────────────────── */

import type { NavLink, NavGroup } from "@/types";

/* ── MAIN NAV ── */
export const NAV_LINKS: NavLink[] = [
  { label: "Soluciones",    href: "#soluciones"    },
  { label: "Industrias",    href: "#industrias"    },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Nosotros",      href: "#nosotros"      },
];

/* ── FOOTER NAV GROUPS ── */
export const FOOTER_NAV: NavGroup[] = [
  {
    title: "Plataforma",
    links: [
      { label: "Automatización empresarial", href: "#soluciones" },
      { label: "Dashboards inteligentes",    href: "#soluciones" },
      { label: "IA aplicada al negocio",     href: "#soluciones" },
      { label: "Integración de sistemas",    href: "#soluciones" },
    ],
  },
  {
    title: "Industrias",
    links: [
      { label: "Minería",         href: "#industrias" },
      { label: "Municipalidades", href: "#industrias" },
      { label: "Logística",       href: "#industrias" },
      { label: "Operaciones",     href: "#industrias" },
      { label: "Restaurantes",    href: "#industrias" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros",       href: "#nosotros"   },
      { label: "Casos de éxito", href: "#industrias" },
      { label: "Blog técnico",   href: "#",          external: true },
      { label: "Careers",        href: "#",          external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos de uso",         href: "#", external: true },
      { label: "Política de privacidad",  href: "#", external: true },
      { label: "Seguridad de datos",      href: "#", external: true },
      { label: "SLA & Uptime",            href: "#", external: true },
    ],
  },
];

/* ── SOCIAL LINKS ── */
export const SOCIAL_LINKS = [
  { label: "LinkedIn",   href: "https://linkedin.com/company/frostai", icon: "linkedin"  },
  { label: "Twitter/X",  href: "https://twitter.com/frostai_cl",       icon: "twitter"   },
  { label: "GitHub",     href: "https://github.com/frostai",           icon: "github"    },
] as const;

/* ── CONTACT ── */
export const CONTACT = {
  email:   "contacto@frostai.cl",
  phone:   "+56 9 1234 5678",
  address: "Santiago, Chile",
  mailto:  "mailto:contacto@frostai.cl",
  tel:     "tel:+56912345678",
} as const;