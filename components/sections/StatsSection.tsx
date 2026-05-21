"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, Zap, Clock, ShieldCheck, Globe } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const STATS = [
  {
    icon: TrendingUp,
    value: 94,
    suffix: "%",
    label: "Reducción de procesos manuales",
    sub: "promedio en clientes activos",
    accent: "#2563EB",
  },
  {
    icon: Zap,
    value: 3.2,
    suffix: "×",
    decimals: 1,
    label: "Mayor velocidad operacional",
    sub: "en toma de decisiones críticas",
    accent: "#06B6D4",
  },
  {
    icon: Users,
    value: 180,
    suffix: "+",
    label: "Empresas automatizadas",
    sub: "en minería, municipios y ops.",
    accent: "#7c3aed",
  },
  {
    icon: Clock,
    value: 30,
    suffix: " días",
    label: "Tiempo de implementación",
    sub: "desde diagnóstico hasta go-live",
    accent: "#059669",
  },
  {
    icon: ShieldCheck,
    value: 99.9,
    suffix: "%",
    decimals: 1,
    label: "Uptime garantizado",
    sub: "SLA con soporte 24/7",
    accent: "#f59e0b",
  },
  {
    icon: Globe,
    value: 200,
    suffix: "+",
    label: "Integraciones disponibles",
    sub: "SAP, Oracle, REST, IoT y más",
    accent: "#e11d48",
  },
];

/* ─────────────────────────────────────────────────────────────────
   COUNTER
───────────────────────────────────────────────────────────────── */
function Counter({
  target,
  suffix,
  decimals = 0,
  accent,
}: {
  target: number;
  suffix: string;
  decimals?: number;
  accent: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const dur = 2000;
          const step = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(parseFloat((ease * target).toFixed(decimals)));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      <span style={{ color: accent }}>
        {decimals > 0 ? val.toFixed(decimals) : Math.round(val)}
      </span>
      <span className="text-white/60">{suffix}</span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────────────────────────── */
function StatCard({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="group relative flex flex-col gap-3 p-5 rounded-2xl
                 border border-white/[0.07] bg-white/[0.025]
                 hover:border-white/[0.12] hover:bg-white/[0.04]
                 transition-all duration-300 overflow-hidden"
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at top right, ${stat.accent}14, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${stat.accent}16`, border: `1px solid ${stat.accent}28` }}
      >
        <Icon size={15} style={{ color: stat.accent }} strokeWidth={2} />
      </div>

      {/* Value */}
      <div className="text-[32px] sm:text-[36px] font-bold tracking-tight leading-none">
        <Counter
          target={stat.value}
          suffix={stat.suffix}
          decimals={stat.decimals}
          accent={stat.accent}
        />
      </div>

      {/* Label */}
      <div>
        <p className="text-[13px] font-semibold text-white/80 leading-snug mb-0.5">
          {stat.label}
        </p>
        <p className="text-[11.5px] text-white/30">{stat.sub}</p>
      </div>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.accent}50, transparent)` }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────── */
export default function StatsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      className="relative bg-[#080E1C] py-24 sm:py-28 overflow-hidden"
      style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)" }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
          <defs>
            <pattern id="stats-grid" x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M44 0H0v44" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stats-grid)" />
        </svg>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                             border border-[#2563EB]/25 bg-[#2563EB]/[0.07]
                             text-[11px] font-semibold tracking-[0.12em] uppercase text-[#60a5fa]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
              Resultados comprobados
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-white leading-[1.1] mb-3"
          >
            Números que{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              hablan solos.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="text-[14.5px] text-white/38"
          >
            Métricas reales medidas en implementaciones activas a lo largo de Chile.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-[11px] text-white/18 mt-8"
        >
          Datos basados en mediciones promedio de clientes activos · Resultados pueden variar según industria y escala
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
