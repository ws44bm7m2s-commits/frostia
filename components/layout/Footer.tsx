"use client";

import { motion } from "framer-motion";
import {Mail, Phone, MapPin, ArrowUpRight, ExternalLink } from "lucide-react";
import FrostLogo from "@/components/ui/FrostLogo";

const NAV_GROUPS = [
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
      { label: "Blog técnico",   href: "#"           },
      { label: "Careers",        href: "#"           },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos de uso",        href: "#" },
      { label: "Política de privacidad", href: "#" },
      { label: "Seguridad de datos",     href: "#" },
      { label: "SLA & Uptime",           href: "#" },
    ],
  },
];

const SOCIALS = [
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "GitHub" },
];

const BADGES = [
  { label: "ISO 27001", sub: "Seguridad de datos" },
  { label: "SOC 2",     sub: "Tipo II certificado" },
  { label: "99.9%",     sub: "Uptime SLA" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative bg-[#060C18] border-t border-white/[0.06] overflow-hidden"
      style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-6">

          {/* ── BRAND COL ── */}
          <div className="col-span-2 md:col-span-6 lg:col-span-3 flex flex-col gap-5">
            <a href="/" aria-label="Frost AI Solutions">
              <FrostLogo variant="full" size={32} />
            </a>

            <p className="text-[13px] text-white/32 leading-relaxed max-w-[260px]">
              Plataforma de inteligencia operacional para minería, municipalidades y empresas que exigen más de sus datos.
            </p>

            <div className="space-y-2">
              {[
                { icon: Mail,   text: "contacto@frostai.cl", href: "mailto:contacto@frostai.cl" },
                { icon: Phone,  text: "+56 9 1234 5678",     href: "tel:+56912345678" },
                { icon: MapPin, text: "Santiago, Chile",      href: "#" },
              ].map(({ icon: Icon, text, href }) => (
                <a key={text} href={href}
                  className="flex items-center gap-2.5 text-[12.5px] text-white/32
                             hover:text-white/65 transition-colors duration-200 w-fit group">
                  <Icon size={12} strokeWidth={2} className="flex-shrink-0 text-[#2563EB]/55 group-hover:text-[#06B6D4]/75 transition-colors" />
                  {text}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {SOCIALS.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03]
                            text-white/50 hover:text-white transition-all duration-200 text-sm"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          {/* ── NAV GROUPS ── */}
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-3">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/28 mb-1">
                {group.title}
              </p>
              {group.links.map(({ label, href }) => (
                <button key={label} onClick={() => scrollTo(href)}
                  className="flex items-center gap-1 text-[12.5px] text-white/38
                             hover:text-white/75 transition-colors duration-200 text-left w-fit group">
                  {label}
                  {href === "#" && (
                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          {BADGES.map((b) => (
            <div key={b.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
              <span className="text-[11px] font-semibold text-white/48">{b.label}</span>
              <span className="text-[10.5px] text-white/22">{b.sub}</span>
            </div>
          ))}
          <span className="text-[11px] text-white/16 ml-auto hidden sm:block">
            Todos los sistemas operativos ·{" "}
            <span className="text-emerald-400/40">●</span> Uptime 99.9%
          </span>
        </div>

        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11.5px] text-white/20">
            © {new Date().getFullYear()} Frost AI Solutions SpA · Todos los derechos reservados
          </p>
          <a href="#" className="flex items-center gap-1.5 text-[11.5px] text-white/20
                                  hover:text-white/45 transition-colors duration-200 group">
            Hecho en Chile con precisión
            <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </footer>
  );
}
