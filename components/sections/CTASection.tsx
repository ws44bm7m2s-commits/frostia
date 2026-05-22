"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, Sparkles } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const PROOF_POINTS = [
  "Sin costo de integración",
  "Implementación en < 30 días",
  "Soporte dedicado 24/7",
  "Contrato flexible, sin permanencia",
];

const scrollToDemo = () => {
  document.getElementById("demo-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const FLOATING_STATS = [
  { value: "94%", label: "eficiencia operacional", x: "left-6", y: "top-8" },
  { value: "3.2×", label: "velocidad de decisión", x: "right-6", y: "top-12" },
  { value: "180+", label: "empresas automatizadas", x: "left-10", y: "bottom-10" },
  { value: "< 4s", label: "tiempo de respuesta IA", x: "right-8", y: "bottom-8" },
];

/* ─────────────────────────────────────────────────────────────────
   AURORA CANVAS — animated gradient mesh
───────────────────────────────────────────────────────────────── */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Core glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[900px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, rgba(6,182,212,0.06) 40%, transparent 70%)" }}
      />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 65%)" }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] right-[15%] w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 65%)" }}
        animate={{ x: [0, -50, 0], y: [0, 35, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute top-[30%] right-[-5%] w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)" }}
        animate={{ y: [0, -30, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cta-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0v48" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)" />
      </svg>

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.4), rgba(6,182,212,0.3), transparent)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FLOATING STAT BADGE
───────────────────────────────────────────────────────────────── */
function FloatingStat({ stat, delay }: { stat: (typeof FLOATING_STATS)[number]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      animate={{ y: [0, -6, 0] }}
      /* Note: cannot merge transition with animate in this pattern — use separate motion.div */
      className={`absolute ${stat.x} ${stat.y} hidden xl:flex flex-col items-start
                  px-3.5 py-2.5 rounded-xl border border-white/[0.09]
                  bg-[#0F1929]/80 backdrop-blur-md shadow-xl pointer-events-none`}
    >
      <span className="text-[20px] font-bold text-white tracking-tight leading-none mb-0.5">
        {stat.value}
      </span>
      <span className="text-[10px] text-white/35 whitespace-nowrap">{stat.label}</span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────── */
export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={ref}
      id="contacto"
      className="relative bg-[#0B1120] py-28 sm:py-36 overflow-hidden"
      style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <AuroraBackground />

      {/* Floating stats */}
      {FLOATING_STATS.map((stat, i) => (
        <FloatingStat key={stat.label} stat={stat} delay={0.4 + i * 0.1} />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                           border border-[#2563EB]/25 bg-[#2563EB]/[0.07]
                           text-[11px] font-semibold tracking-[0.12em] uppercase text-[#60a5fa]">
            <Sparkles size={11} className="text-[#06B6D4]" />
            Empieza hoy mismo
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-[38px] sm:text-[52px] lg:text-[60px] font-bold tracking-[-0.035em]
                     text-white leading-[1.06] mb-5"
        >
          Tu operación merece
          <br />
          <span className="bg-gradient-to-r from-[#2563EB] via-[#3b82f6] to-[#06B6D4] bg-clip-text text-transparent">
            trabajar con inteligencia.
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-[16px] text-white/42 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          En 45 minutos te mostramos cómo Frost AI puede automatizar tus procesos críticos,
          conectar tus sistemas y entregar resultados medibles desde el primer día.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          {/* Primary */}
          <motion.button
            onClick={scrollToDemo}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.975 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="group relative overflow-hidden flex items-center gap-2.5
                       px-7 py-4 rounded-xl font-semibold text-[14.5px] text-white
                       bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]
                       hover:from-[#2563EB] hover:to-[#06B6D4]
                       shadow-[0_0_40px_rgba(37,99,235,0.35)]
                       hover:shadow-[0_0_60px_rgba(6,182,212,0.40)]
                       transition-all duration-500 focus:outline-none w-full sm:w-auto"
          >
            <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%]
                             bg-gradient-to-r from-transparent via-white/15 to-transparent
                             skew-x-[-20deg] transition-transform duration-700 ease-out" />
            <Calendar size={16} strokeWidth={2} className="relative flex-shrink-0" />
            <span className="relative">Agenda una reunión gratuita</span>
            <ArrowRight size={15} strokeWidth={2} className="relative group-hover:translate-x-0.5 transition-transform duration-200" />
          </motion.button>

          {/* Secondary */}
          <motion.button
            whileHover={{ scale: 1.015, y: -1 }}
            whileTap={{ scale: 0.975 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="flex items-center gap-2.5 px-7 py-4 rounded-xl font-medium
                       text-[14px] text-white/55 hover:text-white
                       border border-white/[0.09] hover:border-white/[0.18]
                       bg-white/[0.02] hover:bg-white/[0.05]
                       transition-all duration-300 focus:outline-none w-full sm:w-auto"
          >
            Ver demostración en video
          </motion.button>
        </motion.div>

        {/* Proof points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {PROOF_POINTS.map((point) => (
            <span key={point} className="flex items-center gap-1.5 text-[12px] text-white/32">
              <CheckCircle2 size={12} strokeWidth={2.5} className="text-emerald-400/60 flex-shrink-0" />
              {point}
            </span>
          ))}
        </motion.div>

        {/* Bottom decorative separator */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-14 mx-auto h-px w-48 bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent"
        />

        {/* Contact info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65 }}
          className="mt-5 text-[12px] text-white/22"
        >
          ¿Prefieres escribirnos?{" "}
          <a href="mailto:contacto@frostai.cl" className="text-[#60a5fa]/60 hover:text-[#60a5fa] transition-colors duration-200 underline underline-offset-2">
            contacto@frostai.cl
          </a>
          {" · "}
          <a href="tel:+56912345678" className="text-white/35 hover:text-white/60 transition-colors duration-200">
            +56 9 1234 5678
          </a>
        </motion.p>
      </div>
    </section>
  );
}
