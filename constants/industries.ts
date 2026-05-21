/* ─────────────────────────────────────────────────────────────────
   FROST AI — Industries / Use Cases Data
   Importado por UseCasesSection.tsx
───────────────────────────────────────────────────────────────── */

export const INDUSTRIES_DATA = [
  {
    id: "mineria",
    industry: "Minería",
    tag: "Operaciones críticas",
    headline: "Control total de producción en tiempo real",
    description:
      "Integración de sensores IoT, telemetría de equipos y sistemas SCADA en un único dashboard operacional. Detección predictiva de fallas antes de que ocurran.",
    metrics: [
      { label: "Reducción de paradas no planificadas", value: "71%" },
      { label: "Tiempo de respuesta a alertas",        value: "< 4s" },
      { label: "Cumplimiento regulatorio automatizado", value: "100%" },
    ],
    modules: ["Telemetría SCADA", "Mantenimiento predictivo", "Reportes SII", "Gestión de flotas"],
    accent: "#f59e0b",
    bg:     "from-[#f59e0b]/10 via-[#f59e0b]/4 to-transparent",
    border: "rgba(245,158,11,0.2)",
  },
  {
    id: "municipalidades",
    industry: "Municipalidades",
    tag: "Gobierno digital",
    headline: "Digitalización de procesos ciudadanos sin fricción",
    description:
      "Automatización de trámites municipales, generación de reportes para SUBDERE y gestión de permisos. Reduce la carga administrativa en un 80% con flujos validados.",
    metrics: [
      { label: "Reducción de trámites presenciales",  value: "83%" },
      { label: "Tiempo promedio de respuesta",        value: "2.1h" },
      { label: "Automatización de informes SUBDERE",  value: "Total" },
    ],
    modules: ["Portal ciudadano", "Reportes SUBDERE", "Gestión de permisos", "Presupuesto digital"],
    accent: "#2563EB",
    bg:     "from-[#2563EB]/10 via-[#2563EB]/4 to-transparent",
    border: "rgba(37,99,235,0.2)",
  },
  {
    id: "logistica",
    industry: "Logística",
    tag: "Supply chain",
    headline: "Visibilidad completa de tu cadena de suministro",
    description:
      "Trazabilidad en tiempo real de flotas, inventarios y entregas. Integración con ERP, portales de clientes y alertas automáticas ante desviaciones de ruta o stock.",
    metrics: [
      { label: "Reducción de errores de despacho",      value: "91%" },
      { label: "Tiempo de picking optimizado",           value: "−38%" },
      { label: "Precisión de inventario en tiempo real", value: "99.6%" },
    ],
    modules: ["Tracking de flota", "WMS integrado", "Alertas de stock", "ETA en tiempo real"],
    accent: "#06B6D4",
    bg:     "from-[#06B6D4]/10 via-[#06B6D4]/4 to-transparent",
    border: "rgba(6,182,212,0.2)",
  },
  {
    id: "operaciones",
    industry: "Operaciones",
    tag: "Inteligencia operacional",
    headline: "Excelencia operacional con IA en el núcleo",
    description:
      "Automatización de cierres contables, conciliaciones bancarias, reportes ejecutivos y aprobaciones. Conecta todos tus sistemas en un flujo de datos sin interrupciones.",
    metrics: [
      { label: "Horas hombre en reportería",   value: "−76%" },
      { label: "Cierre contable mensual",      value: "1 día" },
      { label: "Errores en conciliación",      value: "~0"   },
    ],
    modules: ["Cierre contable auto.", "Conciliación bancaria", "Aprobaciones digitales", "KPI ejecutivos"],
    accent: "#7c3aed",
    bg:     "from-[#7c3aed]/10 via-[#7c3aed]/4 to-transparent",
    border: "rgba(124,58,237,0.2)",
  },
  {
    id: "restaurantes",
    industry: "Restaurantes",
    tag: "F&B inteligente",
    headline: "Gestión inteligente de cada servicio y turno",
    description:
      "Control de mermas, automatización de pedidos a proveedores, análisis de ventas por turno y predicción de demanda. Maximiza el margen sin aumentar el equipo.",
    metrics: [
      { label: "Reducción de merma operacional",    value: "44%"  },
      { label: "Pedidos a proveedores automatizados", value: "100%" },
      { label: "Incremento de margen operacional",  value: "+18%" },
    ],
    modules: ["Control de mermas", "Forecast de demanda", "Pedidos automáticos", "Dashboard por turno"],
    accent: "#e11d48",
    bg:     "from-[#e11d48]/10 via-[#e11d48]/4 to-transparent",
    border: "rgba(225,29,72,0.2)",
  },
] as const;