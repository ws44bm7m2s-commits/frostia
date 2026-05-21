import type { Metadata } from "next";
import HeroSection         from "@/components/sections/HeroSection";
import FeaturesSection     from "@/components/sections/FeaturesSection";
import StatsSection        from "@/components/sections/StatsSection";
import HowItWorksSection   from "@/components/sections/HowItWorksSection";
import UseCasesSection     from "@/components/sections/UseCasesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import IntegrationsSection from "@/components/sections/IntegrationsSection";
import PricingSection      from "@/components/sections/PricingSection";
import CTASection          from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";


/* ─────────────────────────────────────────────────────────────────
   SEO — sobreescribe el title del layout
───────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Frost AI Solutions — Automatización e Inteligencia Operacional",
  description:
    "Plataforma de IA empresarial para minería, municipalidades y operaciones. Automatiza procesos, conecta sistemas y toma decisiones en tiempo real.",
};

/* ─────────────────────────────────────────────────────────────────
   LANDING PAGE
   Orden narrativo optimizado para conversión:
   Hero → Servicios → Prueba social (Stats) → Proceso →
   Casos reales → Testimonios → Integraciones → Precios → CTA
───────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="bg-[#0B1120] antialiased overflow-x-hidden">

      {/* 1 — Primera impresión: propuesta de valor + dashboard demo */}
      <HeroSection />

      {/* 2 — Los 4 pilares del producto */}
      <FeaturesSection />

      {/* 3 — Números que generan confianza */}
      <StatsSection />

      {/* 4 — Proceso simple: diagnóstico → integración → operación */}
      <HowItWorksSection />

      {/* 5 — Casos reales por industria con métricas */}
      <UseCasesSection />

      {/* 6 — Prueba social: testimonios de clientes reales */}
      <TestimonialsSection />

      {/* 7 — Ecosistema técnico: 200+ integraciones */}
      <IntegrationsSection />

      {/* 8 — Planes y precios transparentes */}
      <PricingSection />

      {/* 9 — Conversión final: agenda una reunión */}
      <CTASection />

      {/* 10 — Formulario agenda una reunion */}
      <ContactSection />

    </main>
  );
}
