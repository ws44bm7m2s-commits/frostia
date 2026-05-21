"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap, Building2, Crown } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const PLANS = [
  {
    id: "starter",
    icon: Zap,
    name: "Starter",
    description: "Para equipos que quieren automatizar sus primeros procesos sin riesgo.",
    price: "990",
    period: "USD / mes",
    billing: "Facturado anualmente",
    features: [
      "Hasta 5 flujos automatizados",
      "1 dashboard operacional",
      "3 integraciones activas",
      "Alertas por email y Slack",
      "Soporte en horario hábil",
      "Onboarding guiado (2 sesiones)",
    ],
    missing: [
      "IA generativa para reportes",
      "Integraciones gubernamentales",
      "SLA garantizado",
    ],
    cta: "Empezar gratis 14 días",
    highlighted: false,
    accent: "#06B6D4",
    tag: null,
  },
  {
    id: "professional",
    icon: Building2,
    name: "Professional",
    description: "La opción elegida por la mayoría de nuestros clientes en minería y logística.",
    price: "2.490",
    period: "USD / mes",
    billing: "Facturado anualmente",
    features: [
      "Flujos RPA ilimitados",
      "Hasta 10 dashboards",
      "Integraciones ilimitadas",
      "IA generativa para reportes",
      "Alertas predictivas con ML",
      "Soporte 24/7 por Slack dedicado",
      "SLA 99.9% garantizado",
      "Onboarding completo (6 sesiones)",
    ],
    missing: [],
    cta: "Agenda una demo",
    highlighted: true,
    accent: "#2563EB",
    tag: "Más popular",
  },
  {
    id: "enterprise",
    icon: Crown,
    name: "Enterprise",
    description: "Para grandes operaciones, municipalidades y holdings con necesidades específicas.",
    price: "custom",
    period: "",
    billing: "Precio según escala y módulos",
    features: [
      "Todo lo de Professional",
      "Infraestructura dedicada (on-premise / VPC)",
      "Integraciones SCADA / OPC-UA / IoT",
      "Modelos IA entrenados con tus datos",
      "Conectores gubernamentales (SII, SUBDERE)",
      "Equipo dedicado de soporte técnico",
      "SLA personalizado con penalidades",
      "Auditoría y certificación de seguridad",
    ],
    missing: [],
    cta: "Hablar con ventas",
    highlighted: false,
    accent: "#7c3aed",
    tag: "Para grandes empresas",
  },
] as const;

const FAQS = [
  {
    q: "¿Puedo cambiar de plan en cualquier momento?",
    a: "Sí. Puedes hacer upgrade inmediato o downgrade al próximo ciclo de facturación sin penalidades.",
  },
  {
    q: "¿El período de prueba requiere tarjeta de crédito?",
    a: "No. Los 14 días de prueba del plan Starter son completamente gratuitos y sin datos de pago.",
  },
  {
    q: "¿Qué pasa con mis datos si cancelo?",
    a: "Tienes 30 días para exportar todo. Eliminamos tus datos de forma segura y certificada tras ese período.",
  },
  {
    q: "¿El precio incluye las integraciones?",
    a: "Sí. Todos los conectores disponibles están incluidos en el plan. Sin costos adicionales por integración.",
  },
];

/* ─────────────────────────────────────────────────────────────────
   PLAN CARD
───────────────────────────────────────────────────────────────── */
function PlanCard({
  plan,
  index,
  billing,
}: {
  plan: (typeof PLANS)[number];
  index: number;
  billing: "monthly" | "annual";
}) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-50px" });
  const Icon    = plan.icon;

  const displayPrice =
    plan.price === "custom"
      ? "Custom"
      : billing === "monthly"
      ? String(Math.round(parseInt(plan.price.replace(".", "")) * 1.25 / 1000) + "." + String(Math.round(parseInt(plan.price.replace(".", "")) * 1.25) % 1000).padStart(3,"0"))
      : plan.price;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={`relative flex flex-col rounded-2xl overflow-hidden border
                  ${plan.highlighted
                    ? "border-[#2563EB]/40 shadow-[0_0_60px_rgba(37,99,235,0.18)]"
                    : "border-white/[0.08]"
                  } bg-[#0F1929]/80 backdrop-blur-sm`}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${plan.accent}${plan.highlighted ? "cc" : "60"}, transparent)`,
        }}
      />

      {/* Popular badge */}
      {plan.tag && (
        <div className="absolute top-4 right-4">
          <span
            className="text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
            style={{
              color: plan.accent,
              background: `${plan.accent}18`,
              border: `1px solid ${plan.accent}35`,
            }}
          >
            {plan.tag}
          </span>
        </div>
      )}

      {/* Highlighted bg */}
      {plan.highlighted && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(37,99,235,0.08) 0%, transparent 60%)" }}
        />
      )}

      <div className="relative flex flex-col h-full p-6 gap-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${plan.accent}18`, border: `1px solid ${plan.accent}28` }}
          >
            <Icon size={17} style={{ color: plan.accent }} strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-white tracking-tight">{plan.name}</h3>
            <p className="text-[12px] text-white/40 mt-0.5 leading-snug">{plan.description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 pb-1">
          {plan.price === "custom" ? (
            <span className="text-[36px] font-black text-white tracking-tight leading-none">
              A medida
            </span>
          ) : (
            <>
              <span className="text-[13px] text-white/40 mb-1.5">USD</span>
              <span className="text-[40px] font-black text-white tracking-[-0.03em] leading-none">
                {displayPrice}
              </span>
              <span className="text-[12px] text-white/40 mb-1.5">/ mes</span>
            </>
          )}
        </div>
        <p className="text-[11px] text-white/28 -mt-3">{plan.billing}</p>

        {/* Divider */}
        <div className="h-px bg-white/[0.06]" />

        {/* Features */}
        <ul className="flex-1 space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <CheckCircle2
                size={13}
                strokeWidth={2.2}
                className="flex-shrink-0 mt-0.5"
                style={{ color: plan.accent }}
              />
              <span className="text-[12.5px] text-white/58 leading-snug">{f}</span>
            </li>
          ))}
          {"missing" in plan && plan.missing.map((f) => (
            <li key={f} className="flex items-start gap-2.5 opacity-35">
              <div className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                <div className="w-1.5 h-px bg-white/40 rounded-full" />
              </div>
              <span className="text-[12.5px] text-white/35 leading-snug line-through decoration-white/20">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          className={`group relative overflow-hidden flex items-center justify-center gap-2
                      w-full py-3 rounded-xl text-[13.5px] font-semibold
                      transition-all duration-400 focus:outline-none
                      ${plan.highlighted
                        ? "text-white bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:to-[#06B6D4] shadow-[0_0_24px_rgba(37,99,235,0.3)] hover:shadow-[0_0_32px_rgba(6,182,212,0.35)]"
                        : "text-white/75 hover:text-white border border-white/[0.10] hover:border-white/[0.20] bg-white/[0.03] hover:bg-white/[0.06]"
                      }`}
        >
          {plan.highlighted && (
            <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%]
                             bg-gradient-to-r from-transparent via-white/15 to-transparent
                             skew-x-[-20deg] transition-transform duration-700 ease-out" />
          )}
          <span className="relative">{plan.cta}</span>
          <ArrowRight size={13} strokeWidth={2.2} className="relative group-hover:translate-x-0.5 transition-transform duration-200" />
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────────────────────────────── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="border-b border-white/[0.07] last:border-0"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-4 text-left gap-4 group focus:outline-none"
      >
        <span className="text-[14px] font-medium text-white/70 group-hover:text-white transition-colors duration-200">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex-shrink-0 w-5 h-5 rounded-full border border-white/[0.12] bg-white/[0.04]
                     flex items-center justify-center text-white/40 group-hover:text-white/70
                     group-hover:border-white/[0.2] transition-colors duration-200"
        >
          <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-[13.5px] text-white/40 leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────── */
export default function PricingSection() {
  const headerRef              = useRef<HTMLDivElement>(null);
  const isInView               = useInView(headerRef, { once: true, margin: "-80px" });
  const [billing, setBilling]  = useState<"monthly" | "annual">("annual");

  return (
    <section
      id="precios"
      className="relative bg-[#0B1120] py-24 sm:py-32 overflow-hidden"
      style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          style={{ background: "radial-gradient(ellipse at top, rgba(37,99,235,0.09) 0%, transparent 65%)" }} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12">
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
              Planes y precios
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-[34px] sm:text-[44px] font-bold tracking-[-0.03em] text-white leading-[1.1] mb-4"
          >
            Precio justo para{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              cada escala.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.22 }}
            className="text-[15px] text-white/40 leading-relaxed mb-8"
          >
            Sin sorpresas. Sin costos de integración. Sin penalidades por escalar.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-1 p-1 rounded-xl border border-white/[0.08] bg-white/[0.03]"
          >
            {(["annual", "monthly"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`relative px-4 py-1.5 rounded-lg text-[12.5px] font-medium transition-all duration-200 focus:outline-none ${
                  billing === b ? "text-white" : "text-white/40 hover:text-white/65"
                }`}
              >
                {billing === b && (
                  <motion.div
                    layoutId="billing-pill"
                    className="absolute inset-0 rounded-lg bg-[#2563EB]/30 border border-[#2563EB]/40"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
                <span className="relative">
                  {b === "annual" ? "Anual" : "Mensual"}
                </span>
                {b === "annual" && (
                  <span className="relative ml-1.5 text-[10px] font-bold text-emerald-400/80">
                    −20%
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} billing={billing} />
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[20px] font-bold text-white text-center mb-8 tracking-tight"
          >
            Preguntas frecuentes
          </motion.h3>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-2">
            {FAQS.map((faq, i) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
