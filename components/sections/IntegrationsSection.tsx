"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Plug } from "lucide-react";
import { INTEGRATIONS, INTEGRATION_CATEGORIES, type IntegrationCategory } from "@/constants/integrations";

/* ─────────────────────────────────────────────────────────────────
   SVG ICONS PER INTEGRATION (monograms/abbrev rendereados en SVG)
───────────────────────────────────────────────────────────────── */
function IntegrationIcon({ name, accent }: { name: string; accent: string }) {
  const abbr = name.replace(/[^A-Z0-9]/g, "").slice(0, 2) || name.slice(0, 2).toUpperCase();
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-[12px] font-black"
      style={{
        background: `${accent}18`,
        border: `1px solid ${accent}30`,
        color: accent,
        letterSpacing: "-0.02em",
      }}
    >
      {abbr}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   INTEGRATION CHIP
───────────────────────────────────────────────────────────────── */
function IntegrationChip({
  item,
  index,
}: {
  item: (typeof INTEGRATIONS)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center gap-3 px-4 py-3 rounded-xl
                 border transition-all duration-250 cursor-default group"
      style={{
        borderColor: hovered ? `${item.accent}40` : "rgba(255,255,255,0.07)",
        background: hovered ? `${item.accent}08` : "rgba(255,255,255,0.02)",
      }}
    >
      {/* Hover glow */}
      {hovered && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: `radial-gradient(circle at 30% 50%, ${item.accent}10, transparent 70%)` }}
        />
      )}

      <IntegrationIcon name={item.name} accent={item.accent} />

      <div className="relative min-w-0">
        <p className="text-[13px] font-semibold text-white/80 leading-tight truncate group-hover:text-white transition-colors duration-200">
          {item.name}
        </p>
        <p className="text-[10.5px] text-white/28 mt-0.5">{item.category}</p>
      </div>

      {/* Live indicator */}
      <div className="ml-auto flex-shrink-0">
        <span
          className="w-1.5 h-1.5 rounded-full block"
          style={{ background: hovered ? item.accent : "rgba(255,255,255,0.15)" }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CATEGORY FILTER
───────────────────────────────────────────────────────────────── */
function CategoryFilter({
  active,
  onChange,
}: {
  active: IntegrationCategory | "all";
  onChange: (c: IntegrationCategory | "all") => void;
}) {
  const all = ["all", ...INTEGRATION_CATEGORIES] as const;
  return (
    <div className="flex flex-wrap gap-2">
      {all.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat as IntegrationCategory | "all")}
          className="px-3 py-1.5 rounded-lg text-[11.5px] font-medium transition-all duration-200 focus:outline-none"
          style={{
            color:      active === cat ? "white"                      : "rgba(255,255,255,0.35)",
            background: active === cat ? "rgba(37,99,235,0.22)"       : "rgba(255,255,255,0.03)",
            border:     active === cat ? "1px solid rgba(37,99,235,0.4)" : "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {cat === "all" ? "Todas" : cat}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────── */
export default function IntegrationsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView  = useInView(headerRef, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<IntegrationCategory | "all">("all");

  const filtered = activeCategory === "all"
    ? INTEGRATIONS
    : INTEGRATIONS.filter((i) => i.category === activeCategory);

  return (
    <section
      id="integraciones"
      className="relative bg-[#080E1C] py-24 sm:py-32 overflow-hidden"
      style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
          style={{ background: "radial-gradient(ellipse at bottom, rgba(6,182,212,0.06) 0%, transparent 70%)" }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
          <defs>
            <pattern id="int-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0v40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#int-grid)" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="grid lg:grid-cols-2 gap-10 items-start mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                               border border-[#2563EB]/25 bg-[#2563EB]/[0.07]
                               text-[11px] font-semibold tracking-[0.12em] uppercase text-[#60a5fa]">
                <Plug size={10} className="text-[#06B6D4]" />
                Ecosistema de integraciones
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-white leading-[1.1] mb-4"
            >
              Conecta con{" "}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                todo tu stack.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-[14.5px] text-white/40 leading-relaxed"
            >
              Frost AI se conecta con más de 200 sistemas sin requerir desarrollo a medida.
              ERP, bases de datos, APIs REST, IoT y plataformas gubernamentales listas en días.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.38 }}
              className="mt-6 flex items-center gap-4 flex-wrap"
            >
              <div className="flex items-center gap-2">
                <span className="text-[28px] font-bold text-white tracking-tight">200+</span>
                <span className="text-[12px] text-white/35 leading-tight">
                  conectores<br />disponibles
                </span>
              </div>
              <div className="w-px h-10 bg-white/[0.08]" />
              <div className="flex items-center gap-2">
                <span className="text-[28px] font-bold text-white tracking-tight">&lt;5d</span>
                <span className="text-[12px] text-white/35 leading-tight">
                  tiempo de<br />integración
                </span>
              </div>
              <div className="w-px h-10 bg-white/[0.08]" />
              <div className="flex items-center gap-2">
                <span className="text-[28px] font-bold text-white tracking-tight">0</span>
                <span className="text-[12px] text-white/35 leading-tight">
                  costo de<br />conector
                </span>
              </div>
            </motion.div>
          </div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:pt-2"
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/28 mb-3">
              Filtrar por categoría
            </p>
            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

            <motion.button
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="mt-6 flex items-center gap-2 text-[13px] font-medium text-[#06B6D4]/70 hover:text-[#06B6D4] transition-colors"
            >
              ¿No encuentras tu sistema?
              <ArrowRight size={13} strokeWidth={2} />
            </motion.button>
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          {filtered.map((item, i) => (
            <IntegrationChip key={item.id} item={item} index={i} />
          ))}
        </motion.div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]
                     flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/25
                            flex items-center justify-center flex-shrink-0 mt-0.5">
              <Plug size={14} className="text-[#2563EB]" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white/80">
                ¿Usas un sistema que no está en la lista?
              </p>
              <p className="text-[12px] text-white/35 mt-0.5">
                Desarrollamos conectores personalizados en menos de 2 semanas.
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl
                       text-[13px] font-semibold text-white
                       bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]
                       hover:to-[#06B6D4] shadow-[0_0_20px_rgba(37,99,235,0.25)]
                       transition-all duration-400 focus:outline-none"
          >
            Solicitar integración
            <ArrowRight size={13} strokeWidth={2} />
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
