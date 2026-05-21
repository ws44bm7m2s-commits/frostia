"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Zap,
  LayoutDashboard,
  BrainCircuit,
  GitMerge,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "automatizacion",
    icon: Zap,
    eyebrow: "Proceso → Flujo",
    title: "Automatización\nEmpresarial",
    description:
      "Eliminamos tareas repetitivas de alto costo con flujos RPA inteligentes. Desde conciliaciones contables hasta aprobaciones de cadena de suministro — sin intervención humana.",
    features: [
      "Flujos RPA con lógica condicional",
      "Triggers multi-sistema en tiempo real",
      "Auditoría y trazabilidad completa",
    ],
    metric: { value: "94%", label: "reducción de carga manual" },
    accent: "#2563EB",
    accentAlt: "#1d4ed8",
    gradient: "from-[#2563EB]/15 via-[#2563EB]/5 to-transparent",
    border: "rgba(37,99,235,0.25)",
    glow: "rgba(37,99,235,0.12)",
  },
  {
    id: "dashboards",
    icon: LayoutDashboard,
    eyebrow: "Datos → Decisión",
    title: "Dashboards\nInteligentes",
    description:
      "Paneles operacionales diseñados para la toma de decisiones críticas. KPIs en tiempo real, alertas predictivas y visualizaciones que revelan lo que los datos ocultan.",
    features: [
      "Actualización sub-segundo vía WebSocket",
      "Alertas con IA predictiva integrada",
      "White-label para cada industria",
    ],
    metric: { value: "3.2×", label: "mayor velocidad de decisión" },
    accent: "#06B6D4",
    accentAlt: "#0891b2",
    gradient: "from-[#06B6D4]/15 via-[#06B6D4]/5 to-transparent",
    border: "rgba(6,182,212,0.25)",
    glow: "rgba(6,182,212,0.12)",
  },
  {
    id: "ia-aplicada",
    icon: BrainCircuit,
    eyebrow: "Patrón → Predicción",
    title: "IA Aplicada\nal Negocio",
    description:
      "Modelos de machine learning entrenados sobre tus datos operacionales. Predicción de fallas, optimización de rutas, análisis de contratos y generación automática de reportes ejecutivos.",
    features: [
      "Modelos fine-tuned sobre datos propios",
      "Generación de reportes con LLMs",
      "Detección de anomalías en producción",
    ],
    metric: { value: "68%", label: "menos errores operacionales" },
    accent: "#7c3aed",
    accentAlt: "#6d28d9",
    gradient: "from-[#7c3aed]/15 via-[#7c3aed]/5 to-transparent",
    border: "rgba(124,58,237,0.25)",
    glow: "rgba(124,58,237,0.12)",
  },
  {
    id: "integracion",
    icon: GitMerge,
    eyebrow: "Silos → Ecosistema",
    title: "Integración\nde Sistemas",
    description:
      "Conectamos tu stack tecnológico existente — ERP, SAP, plataformas municipales, sensores IoT — en una arquitectura unificada de datos sin fricción ni pérdida de información.",
    features: [
      "Conectores nativos SAP, Oracle, SQL",
      "API gateway con rate limiting y logs",
      "ETL/ELT con transformación en streaming",
    ],
    metric: { value: "200+", label: "integraciones disponibles" },
    accent: "#059669",
    accentAlt: "#047857",
    gradient: "from-[#059669]/15 via-[#059669]/5 to-transparent",
    border: "rgba(5,150,105,0.25)",
    glow: "rgba(5,150,105,0.12)",
  },
];

/* ─────────────────────────────────────────────────────────────────
   BACKGROUND GRID (SVG, static — no canvas needed here)
───────────────────────────────────────────────────────────────── */
function SectionGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="sg" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0H0v56" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sg)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ANIMATED NUMBER
───────────────────────────────────────────────────────────────── */
function MetricBadge({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div
      className="inline-flex flex-col items-start px-3.5 py-2.5 rounded-xl border"
      style={{
        borderColor: `${accent}30`,
        background: `${accent}08`,
      }}
    >
      <span className="text-[22px] font-bold tracking-tight text-white leading-none mb-0.5">
        {value}
      </span>
      <span className="text-[10.5px] text-white/40 leading-tight">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────────────────────────────── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="relative group"
    >
      {/* Outer glow — visible on hover */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(400px circle at ${cursorPos.x}px ${cursorPos.y}px, ${service.glow}, transparent 60%)`,
        }}
      />

      {/* Card shell */}
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative h-full rounded-2xl overflow-hidden cursor-default
                   border border-white/[0.07] bg-[#0F1929]/70 backdrop-blur-sm
                   transition-colors duration-300"
        style={{
          borderColor: hovered ? service.border : "rgba(255,255,255,0.07)",
        }}
      >
        {/* Spotlight — follows cursor inside card */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            background: `radial-gradient(280px circle at ${cursorPos.x}px ${cursorPos.y}px, ${service.glow}, transparent 70%)`,
          }}
        />

        {/* Top gradient flush */}
        <div className={`absolute top-0 left-0 right-0 h-[180px] bg-gradient-to-b ${service.gradient} pointer-events-none`} />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-2xl"
          style={{
            background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
          }}
          animate={{ opacity: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative p-6 flex flex-col h-full gap-5">
          {/* Header row */}
          <div className="flex items-start justify-between">
            {/* Icon box */}
            <motion.div
              className="relative w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${service.accent}22, ${service.accent}10)`,
                border: `1px solid ${service.accent}30`,
              }}
              animate={hovered ? { scale: 1.08, rotate: -3 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Icon size={18} style={{ color: service.accent }} strokeWidth={1.8} />
              {/* Icon glow */}
              <div
                className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                style={{ background: service.accent }}
              />
            </motion.div>

            {/* Eyebrow */}
            <span
              className="text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
              style={{
                color: service.accent,
                background: `${service.accent}12`,
                border: `1px solid ${service.accent}25`,
              }}
            >
              {service.eyebrow}
            </span>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-[22px] font-bold text-white leading-[1.15] tracking-[-0.025em] whitespace-pre-line">
              {service.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-[13.5px] leading-[1.65] text-white/45 flex-1">
            {service.description}
          </p>

          {/* Feature list */}
          <ul className="space-y-2">
            {service.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={13}
                  strokeWidth={2}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: service.accent }}
                />
                <span className="text-[12.5px] text-white/50 leading-snug">{feat}</span>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="h-px bg-white/[0.06]" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <MetricBadge
              value={service.metric.value}
              label={service.metric.label}
              accent={service.accent}
            />

            {/* CTA arrow */}
            <motion.button
              className="flex items-center gap-1.5 text-[12px] font-medium transition-colors duration-200"
              style={{ color: hovered ? service.accent : "rgba(255,255,255,0.3)" }}
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Ver más
              <ArrowRight size={13} strokeWidth={2} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────────────────────────── */
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="text-center mb-16 max-w-2xl mx-auto">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                   border border-[#2563EB]/25 bg-[#2563EB]/[0.07]
                   text-[11px] font-semibold tracking-[0.12em] uppercase text-[#60a5fa] mb-5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
        Capacidades de la plataforma
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="text-[36px] sm:text-[44px] font-bold tracking-[-0.03em] text-white leading-[1.1] mb-4"
      >
        Todo lo que tu empresa{" "}
        <span className="bg-gradient-to-r from-[#2563EB] via-[#3b82f6] to-[#06B6D4] bg-clip-text text-transparent">
          necesita operar
        </span>{" "}
        con inteligencia.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.22 }}
        className="text-[15.5px] text-white/40 leading-relaxed"
      >
        Una plataforma unificada que conecta automatización, análisis y predicción
        en un solo ecosistema diseñado para industrias críticas.
      </motion.p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   BOTTOM CTA STRIP
───────────────────────────────────────────────────────────────── */
function BottomCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      {/* Primary */}
      <motion.button
        whileHover={{ scale: 1.025, y: -2 }}
        whileTap={{ scale: 0.975 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="group relative overflow-hidden px-6 py-3.5 rounded-xl font-semibold
                   text-[13.5px] text-white
                   bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]
                   hover:from-[#2563EB] hover:to-[#06B6D4]
                   shadow-[0_0_28px_rgba(37,99,235,0.3)]
                   hover:shadow-[0_0_40px_rgba(6,182,212,0.35)]
                   transition-all duration-500 focus:outline-none"
      >
        <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%]
                         bg-gradient-to-r from-transparent via-white/15 to-transparent
                         skew-x-[-20deg] transition-transform duration-700 ease-out" />
        <span className="relative flex items-center gap-2">
          Hablar con un especialista
          <ArrowRight size={15} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </span>
      </motion.button>

      {/* Secondary */}
      <motion.button
        whileHover={{ scale: 1.015, y: -1 }}
        whileTap={{ scale: 0.975 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="px-6 py-3.5 rounded-xl font-medium text-[13.5px]
                   text-white/50 hover:text-white/80
                   border border-white/[0.08] hover:border-white/[0.16]
                   bg-white/[0.02] hover:bg-white/[0.04]
                   transition-all duration-300 focus:outline-none"
      >
        Ver casos de éxito →
      </motion.button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FLOATING AMBIENT ORBS
───────────────────────────────────────────────────────────────── */
function AmbientOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Left orb */}
      <motion.div
        className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
        }}
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Right orb */}
      <motion.div
        className="absolute -right-40 bottom-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
        }}
        animate={{ y: [0, 25, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────── */
export default function FeaturesSection() {
  return (
    <section
      id="soluciones"
      className="relative bg-[#0B1120] py-24 sm:py-32 overflow-hidden"
      style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      <SectionGrid />
      <AmbientOrbs />

      {/* Top separator gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeader />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <BottomCTA />

        {/* Bottom integrations hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-[12px] text-white/20 mt-10 tracking-wide"
        >
          Compatible con SAP · Oracle · Salesforce · Power BI · PostgreSQL · REST APIs · IoT / SCADA
        </motion.p>
      </div>

      {/* Bottom separator gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
