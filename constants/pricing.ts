/* ─────────────────────────────────────────────────────────────────
   FROST AI — Pricing Constants
   Importado por PricingSection.tsx
───────────────────────────────────────────────────────────────── */

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    description: "Para equipos que quieren automatizar sus primeros procesos sin riesgo.",
    priceAnnual: 990,
    priceMonthly: 1238,
    currency: "USD",
    period: "mes",
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
    name: "Professional",
    description: "La opción elegida por la mayoría de nuestros clientes en minería y logística.",
    priceAnnual: 2490,
    priceMonthly: 3113,
    currency: "USD",
    period: "mes",
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
    name: "Enterprise",
    description: "Para grandes operaciones, municipalidades y holdings con necesidades específicas.",
    priceAnnual: null,
    priceMonthly: null,
    currency: "USD",
    period: "",
    billing: "Precio según escala y módulos",
    features: [
      "Todo lo de Professional",
      "Infraestructura dedicada",
      "Integraciones SCADA / IoT",
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

export const PRICING_FAQS = [
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
] as const;
