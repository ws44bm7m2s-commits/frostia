"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ScanSearch, Puzzle, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    icon: ScanSearch,
    title: "Diagnóstico\noperacional",
    description:
      "Analizamos tus flujos actuales, sistemas existentes y puntos de fricción. En 5 días tienes un mapa de automatización con ROI proyectado para cada proceso.",
    details: [
      "Auditoría de procesos en 48h",
      "Mapeo de sistemas y conectores",
      "ROI proyectado por proceso",
      "Roadmap de implementación",
    ],
    accent: "#2563EB",
    tag: "Semana 1",
  },
  {
    number: "02",
    icon: Puzzle,
    title: "Integración\ny configuración",
    description:
      "Conectamos Frost AI a tus sistemas sin interrumpir la operación. Configuramos dashboards, automatizaciones y alertas según los KPIs que importan a tu equipo.",
    details: [
      "Conexión sin downtime",
      "Configuración de workflows",
      "Entrenamiento del equipo",
      "QA y pruebas en paralelo",
    ],
    accent: "#06B6D4",
    tag: "Semanas 2–3",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Operación\ny escala",
    description:
      "Tu operación trabaja sola. Monitoreo continuo, mejoras iterativas y expansión hacia nuevos procesos conforme el equipo gana confianza en la plataforma.",
    details: [
      "Go-live con soporte 24/7",
      "Optimización continua con IA",
      "Expansión modular a nuevas áreas",
      "Reportes ejecutivos automáticos",
    ],
    accent: "#7c3aed",
    tag: "Mes 1 en adelante",
  },
];

/* ─────────────────────────────────────────────────────────────────
   CONNECTOR LINE (desktop only)
───────────────────────────────────────────────────────────────── */
function ConnectorLine({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="hidden lg:flex flex-1 items-center justify-center px-2 mt-[-60px]">
      <div className="relative w-full h-px bg-white/[0.06]">
        <motion.div
          className="absolute inset-0 origin-left"
          style={{ background: `linear-gradient(90deg, ${accent}, #06B6D4)`, height: "1px" }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        />
        {/* Arrow tip */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: "#06B6D4" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.3 }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   STEP CARD
───────────────────────────────────────────────────────────────── */
function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="relative flex flex-col group"
    >
      {/* Step number watermark */}
      <span
        className="absolute -top-3 -right-2 text-[72px] font-black leading-none select-none pointer-events-none"
        style={{ color: `${step.accent}08`, fontVariantNumeric: "tabular-nums" }}
      >
        {step.number}
      </span>

      {/* Card */}
      <div
        className="relative flex flex-col h-full rounded-2xl border border-white/[0.07]
                   bg-[#0F1929]/70 backdrop-blur-sm overflow-hidden
                   transition-colors duration-300 group-hover:border-opacity-60"
        style={{ "--hover-border": step.border } as React.CSSProperties}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)` }}
        />
        {/* Gradient bg */}
        <div
          className="absolute top-0 left-0 right-0 h-[160px] pointer-events-none"
          style={{ background: `linear-gradient(180deg, ${step.accent}10 0%, transparent 100%)` }}
        />

        <div className="relative p-6 flex flex-col gap-5 h-full">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `${step.accent}18`, border: `1px solid ${step.accent}28` }}
            >
              <Icon size={18} style={{ color: step.accent }} strokeWidth={1.8} />
            </div>
            <span
              className="text-[10px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
              style={{ color: step.accent, background: `${step.accent}12`, border: `1px solid ${step.accent}22` }}
            >
              {step.tag}
            </span>
          </div>

          {/* Step label */}
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-bold tracking-[0.08em] tabular-nums"
              style={{ color: step.accent }}
            >
              PASO {step.number}
            </span>
            <div className="flex-1 h-px" style={{ background: `${step.accent}22` }} />
          </div>

          {/* Title */}
          <h3 className="text-[22px] font-bold text-white tracking-[-0.025em] leading-[1.18] whitespace-pre-line -mt-2">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-[13.5px] text-white/42 leading-relaxed flex-1">
            {step.description}
          </p>

          {/* Detail list */}
          <ul className="space-y-2 pt-1 border-t border-white/[0.05]">
            {step.details.map((d) => (
              <li key={d} className="flex items-center gap-2">
                <CheckCircle2 size={12} strokeWidth={2.2} style={{ color: step.accent }} className="flex-shrink-0" />
                <span className="text-[12px] text-white/45">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────── */
export default function HowItWorksSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="como-funciona"
      className="relative bg-[#0B1120] py-24 sm:py-32 overflow-hidden"
      style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
          style={{ background: "radial-gradient(ellipse at bottom, rgba(37,99,235,0.07) 0%, transparent 65%)" }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                             border border-[#2563EB]/25 bg-[#2563EB]/[0.07]
                             text-[11px] font-semibold tracking-[0.12em] uppercase text-[#60a5fa]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
              Proceso de implementación
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-[34px] sm:text-[42px] font-bold tracking-[-0.03em] text-white leading-[1.1] mb-4"
          >
            Operativo en{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              menos de 30 días.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[15px] text-white/40 leading-relaxed"
          >
            Sin meses de consultoría ni riesgos de migración. Un proceso estructurado
            que respeta tu operación actual mientras construye la nueva.
          </motion.p>
        </div>

        {/* Steps layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 lg:gap-4 items-start">
          {STEPS.map((step, i) => (
            <>
              <StepCard key={step.number} step={step} index={i} />
              {i < STEPS.length - 1 && (
                <ConnectorLine key={`conn-${i}`} accent={step.accent} />
              )}
            </>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.975 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="group relative overflow-hidden flex items-center gap-2.5
                       px-6 py-3.5 rounded-xl font-semibold text-[13.5px] text-white
                       bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]
                       hover:from-[#2563EB] hover:to-[#06B6D4]
                       shadow-[0_0_28px_rgba(37,99,235,0.28)]
                       hover:shadow-[0_0_40px_rgba(6,182,212,0.35)]
                       transition-all duration-500 focus:outline-none"
          >
            <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%]
                             bg-gradient-to-r from-transparent via-white/15 to-transparent
                             skew-x-[-20deg] transition-transform duration-700 ease-out" />
            <span className="relative flex items-center gap-2">
              Iniciar diagnóstico gratuito
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
          </motion.button>

          <p className="text-[12px] text-white/25 text-center">
            Sin compromiso · Respuesta en menos de 24h
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
