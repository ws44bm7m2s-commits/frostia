/* ─────────────────────────────────────────────────────────────────
   FROST AI — Testimonials Data
   Importado por TestimonialsSection.tsx
───────────────────────────────────────────────────────────────── */

export const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "Frost AI transformó cómo operamos nuestra planta. Los reportes que antes tomaban 3 días ahora se generan solos cada mañana. El equipo de turno tiene los datos antes de que empiece la jornada.",
    author: "Rodrigo Fuentes",
    role: "Gerente de Operaciones",
    company: "Minera del Norte S.A.",
    industry: "Minería",
    avatar: "RF",
    accent: "#f59e0b",
    metric: { value: "71%", label: "menos paradas no planificadas" },
  },
  {
    id: "t2",
    quote:
      "Implementamos el módulo municipal en 18 días. Hoy el 80% de los trámites se resuelven sin que el ciudadano venga presencialmente. El ahorro en personal administrativo fue inmediato.",
    author: "Claudia Morales",
    role: "Directora de Innovación",
    company: "Municipalidad de Quilicura",
    industry: "Municipalidades",
    avatar: "CM",
    accent: "#2563EB",
    metric: { value: "83%", label: "trámites resueltos online" },
  },
  {
    id: "t3",
    quote:
      "Nuestro cierre contable bajó de 5 días a 1. El sistema reconcilia automáticamente con el banco y genera el informe para el directorio. Cero errores en 8 meses consecutivos.",
    author: "Felipe Araya",
    role: "CFO",
    company: "LogiCarga SpA",
    industry: "Logística",
    avatar: "FA",
    accent: "#06B6D4",
    metric: { value: "1 día", label: "tiempo de cierre contable" },
  },
  {
    id: "t4",
    quote:
      "La visibilidad que tenemos hoy sobre nuestra cadena de frío es total. Las alertas de temperatura llegan en menos de 4 segundos. Frost AI nos salvó de una pérdida millonaria el mes pasado.",
    author: "Valentina Soto",
    role: "Gerente de Supply Chain",
    company: "FreshRoute Ltda.",
    industry: "Logística",
    avatar: "VS",
    accent: "#059669",
    metric: { value: "99.6%", label: "precisión de inventario" },
  },
  {
    id: "t5",
    quote:
      "Los dashboards de ventas por turno cambiaron la conversación con nuestros locales. Ahora cada jefe de turno toma decisiones basadas en datos, no en intuición. El margen subió 18% en el primer trimestre.",
    author: "Martín Pérez",
    role: "Director de Operaciones",
    company: "Cadena Gastronómica Prime",
    industry: "Restaurantes",
    avatar: "MP",
    accent: "#e11d48",
    metric: { value: "+18%", label: "margen operacional" },
  },
  {
    id: "t6",
    quote:
      "Evaluamos 4 plataformas. Frost AI fue la única que entendió nuestro problema real y no intentó vendernos software genérico. La implementación fue quirúrgica.",
    author: "Andrea Cifuentes",
    role: "CTO",
    company: "Holding Industrial AQ",
    industry: "Operaciones",
    avatar: "AC",
    accent: "#7c3aed",
    metric: { value: "−76%", label: "horas en reportería manual" },
  },
] as const;