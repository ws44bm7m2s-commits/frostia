"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  HardHat,
  Building2,
  Truck,
  Settings2,
  UtensilsCrossed,
  TrendingDown,
  Clock,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const scrollToDemo = () => {
  document.getElementById("demo-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const CASES = [
  {
    id: "mineria",
    icon: HardHat,
    industry: "Minería",
    tag: "Operaciones críticas",
    headline: "Control total de producción en tiempo real",
    description:
      "Integración de sensores IoT, telemetría de equipos y sistemas SCADA en un único dashboard operacional. Detección predictiva de fallas antes de que ocurran.",
    metrics: [
      { icon: TrendingDown, label: "Reducción de paradas no planificadas", value: "71%" },
      { icon: Clock,        label: "Tiempo de respuesta a alertas",        value: "< 4s" },
      { icon: ShieldCheck,  label: "Cumplimiento regulatorio automatizado", value: "100%" },
    ],
    modules: ["Telemetría SCADA", "Mantenimiento predictivo", "Reportes SII", "Gestión de flotas"],
    accent: "#f59e0b",
    bg: "from-[#f59e0b]/10 via-[#f59e0b]/4 to-transparent",
    border: "rgba(245,158,11,0.2)",
  },
  {
    id: "municipalidades",
    icon: Building2,
    industry: "Municipalidades",
    tag: "Gobierno digital",
    headline: "Digitalización de procesos ciudadanos sin fricción",
    description:
      "Automatización de trámites municipales, generación de reportes para SUBDERE y gestión de permisos. Reduce la carga administrativa en un 80% con flujos validados.",
    metrics: [
      { icon: TrendingDown, label: "Reducción de trámites presenciales",  value: "83%" },
      { icon: Clock,        label: "Tiempo promedio de respuesta",         value: "2.1h" },
      { icon: ShieldCheck,  label: "Automatización de informes SUBDERE",   value: "Total" },
    ],
    modules: ["Portal ciudadano", "Reportes SUBDERE", "Gestión de permisos", "Presupuesto digital"],
    accent: "#2563EB",
    bg: "from-[#2563EB]/10 via-[#2563EB]/4 to-transparent",
    border: "rgba(37,99,235,0.2)",
  },
  {
    id: "logistica",
    icon: Truck,
    industry: "Logística",
    tag: "Supply chain",
    headline: "Visibilidad completa de tu cadena de suministro",
    description:
      "Trazabilidad en tiempo real de flotas, inventarios y entregas. Integración con ERP, portales de clientes y alertas automáticas ante desviaciones de ruta o stock.",
    metrics: [
      { icon: TrendingDown, label: "Reducción de errores de despacho",    value: "91%" },
      { icon: Clock,        label: "Tiempo de picking optimizado",          value: "−38%" },
      { icon: ShieldCheck,  label: "Precisión de inventario en tiempo real", value: "99.6%" },
    ],
    modules: ["Tracking de flota", "WMS integrado", "Alertas de stock", "ETA en tiempo real"],
    accent: "#06B6D4",
    bg: "from-[#06B6D4]/10 via-[#06B6D4]/4 to-transparent",
    border: "rgba(6,182,212,0.2)",
  },
  {
    id: "operaciones",
    icon: Settings2,
    industry: "Operaciones",
    tag: "Inteligencia operacional",
    headline: "Excelencia operacional con IA en el núcleo",
    description:
      "Automatización de cierres contables, conciliaciones bancarias, reportes ejecutivos y aprobaciones. Conecta todos tus sistemas en un flujo de datos sin interrupciones.",
    metrics: [
      { icon: TrendingDown, label: "Horas hombre en reportería",           value: "−76%" },
      { icon: Clock,        label: "Cierre contable mensual",              value: "1 día" },
      { icon: ShieldCheck,  label: "Errores en conciliación bancaria",     value: "~0" },
    ],
    modules: ["Cierre contable auto.", "Conciliación bancaria", "Aprobaciones digitales", "KPI ejecutivos"],
    accent: "#7c3aed",
    bg: "from-[#7c3aed]/10 via-[#7c3aed]/4 to-transparent",
    border: "rgba(124,58,237,0.2)",
  },
  {
    id: "restaurantes",
    icon: UtensilsCrossed,
    industry: "Restaurantes",
    tag: "F&B inteligente",
    headline: "Gestión inteligente de cada servicio y turno",
    description:
      "Control de mermas, automatización de pedidos a proveedores, análisis de ventas por turno y predicción de demanda. Maximiza el margen sin aumentar el equipo.",
    metrics: [
      { icon: TrendingDown, label: "Reducción de merma operacional",      value: "44%" },
      { icon: Clock,        label: "Pedidos a proveedores automatizados",  value: "100%" },
      { icon: ShieldCheck,  label: "Incremento de margen operacional",    value: "+18%" },
    ],
    modules: ["Control de mermas", "Forecast de demanda", "Pedidos automáticos", "Dashboard por turno"],
    accent: "#e11d48",
    bg: "from-[#e11d48]/10 via-[#e11d48]/4 to-transparent",
    border: "rgba(225,29,72,0.2)",
  },
];

/* ─────────────────────────────────────────────────────────────────
   INDUSTRY TAB
───────────────────────────────────────────────────────────────── */
function IndustryTab({
  item,
  isActive,
  onClick,
}: {
  item: (typeof CASES)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[13px] font-medium
                  transition-all duration-200 whitespace-nowrap focus:outline-none
                  ${isActive
                    ? "text-white"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                  }`}
    >
      {isActive && (
        <motion.div
          layoutId="tab-bg"
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${item.accent}22, ${item.accent}10)`,
            border: `1px solid ${item.border}`,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <Icon size={14} strokeWidth={2} className="relative flex-shrink-0" style={{ color: isActive ? item.accent : undefined }} />
      <span className="relative">{item.industry}</span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   METRIC CARD
───────────────────────────────────────────────────────────────── */
function MetricCard({
  metric,
  accent,
  index,
}: {
  metric: (typeof CASES)[number]["metrics"][number];
  accent: string;
  index: number;
}) {
  const Icon = metric.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 + 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.025]"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${accent}18`, border: `1px solid ${accent}28` }}
      >
        <Icon size={14} style={{ color: accent }} strokeWidth={2} />
      </div>
      <div>
        <p className="text-[21px] font-bold text-white tracking-tight leading-none mb-1">
          {metric.value}
        </p>
        <p className="text-[11.5px] text-white/40 leading-snug">{metric.label}</p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CASE PANEL
───────────────────────────────────────────────────────────────── */
function CasePanel({ item }: { item: (typeof CASES)[number] }) {
  const Icon = item.icon;
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
    >
      {/* Left */}
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}28` }}
          >
            <Icon size={18} style={{ color: item.accent }} strokeWidth={1.8} />
          </div>
          <span
            className="text-[11px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
            style={{ color: item.accent, background: `${item.accent}14`, border: `1px solid ${item.accent}22` }}
          >
            {item.tag}
          </span>
        </div>

        <h3 className="text-[26px] sm:text-[30px] font-bold text-white tracking-[-0.025em] leading-[1.18] mb-4">
          {item.headline}
        </h3>

        <p className="text-[14.5px] text-white/45 leading-relaxed mb-6">
          {item.description}
        </p>

        {/* Module chips */}
        <div className="flex flex-wrap gap-2 mb-7">
          {item.modules.map((mod) => (
            <span
              key={mod}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-medium text-white/50
                         border border-white/[0.07] bg-white/[0.03]"
            >
              <span className="w-1 h-1 rounded-full" style={{ background: item.accent }} />
              {mod}
            </span>
          ))}
        </div>

        <motion.button
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="flex items-center gap-2 text-[13px] font-medium transition-colors duration-200"
          style={{ color: item.accent }}
        >
          Ver caso de estudio completo
          <ChevronRight size={14} strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Right — metrics */}
      <div className="space-y-3">
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/25 mb-4">
          Resultados comprobados
        </p>
        {item.metrics.map((m, i) => (
          <MetricCard key={m.label} metric={m} accent={item.accent} index={i} />
        ))}

        {/* Dashboard preview strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-white/30">Actividad reciente</span>
            <span className="flex items-center gap-1.5 text-[10px]" style={{ color: item.accent }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: item.accent }} />
              En vivo
            </span>
          </div>
          <div className="space-y-2">
            {[
              `Reporte ${item.industry.toLowerCase()} generado`,
              "Alerta procesada y resuelta",
              "Sincronización completada",
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-400/60" />
                  <span className="text-[11px] text-white/35">{log}</span>
                </div>
                <span className="text-[10px] text-white/20">hace {[2, 14, 38][i]}s</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────── */
export default function UseCasesSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="industrias"
      className="relative bg-[#0B1120] py-24 sm:py-32 overflow-hidden"
      style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[800px] h-[600px] rounded-full opacity-40"
          style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)" }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div ref={ref} className="mb-12">
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
              Casos de uso
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-[34px] sm:text-[42px] font-bold tracking-[-0.03em] text-white leading-[1.1] max-w-2xl mb-3"
          >
            Resultados reales en{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              cada industria.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[15px] text-white/40 max-w-xl"
          >
            Frost AI no es un software genérico. Cada implementación está diseñada
            para el ritmo y los desafíos específicos de tu industria.
          </motion.p>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="flex flex-wrap gap-2 mb-10 p-1.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] w-fit"
        >
          {CASES.map((item, i) => (
            <IndustryTab
              key={item.id}
              item={item}
              isActive={active === i}
              onClick={() => setActive(i)}
            />
          ))}
        </motion.div>

        {/* Panel */}
        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            <CasePanel key={CASES[active].id} item={CASES[active]} />
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          onClick={scrollToDemo}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex items-center gap-3 flex-wrap"
        >
          <button className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold
                             text-white bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]
                             hover:to-[#06B6D4] shadow-[0_0_24px_rgba(37,99,235,0.28)]
                             transition-all duration-500 focus:outline-none">
            Solicitar demo para tu industria
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
          <span className="text-[12px] text-white/25">
            Implementación en menos de 30 días · Sin costo de integración
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
