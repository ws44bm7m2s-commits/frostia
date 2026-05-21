/* ─────────────────────────────────────────────────────────────────
   FROST AI — Services / Features Data
   Importado por FeaturesSection.tsx
───────────────────────────────────────────────────────────────── */

export const SERVICES_DATA = [
  {
    id: "automatizacion",
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
    accent:    "#2563EB",
    accentAlt: "#1d4ed8",
    gradient:  "from-[#2563EB]/15 via-[#2563EB]/5 to-transparent",
    border:    "rgba(37,99,235,0.25)",
    glow:      "rgba(37,99,235,0.12)",
  },
  {
    id: "dashboards",
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
    accent:    "#06B6D4",
    accentAlt: "#0891b2",
    gradient:  "from-[#06B6D4]/15 via-[#06B6D4]/5 to-transparent",
    border:    "rgba(6,182,212,0.25)",
    glow:      "rgba(6,182,212,0.12)",
  },
  {
    id: "ia-aplicada",
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
    accent:    "#7c3aed",
    accentAlt: "#6d28d9",
    gradient:  "from-[#7c3aed]/15 via-[#7c3aed]/5 to-transparent",
    border:    "rgba(124,58,237,0.25)",
    glow:      "rgba(124,58,237,0.12)",
  },
  {
    id: "integracion",
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
    accent:    "#059669",
    accentAlt: "#047857",
    gradient:  "from-[#059669]/15 via-[#059669]/5 to-transparent",
    border:    "rgba(5,150,105,0.25)",
    glow:      "rgba(5,150,105,0.12)",
  },
] as const;