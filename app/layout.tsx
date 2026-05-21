import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar           from "@/components/layout/Navbar";
import Footer           from "@/components/layout/Footer";
import ScrollToTop      from "@/components/layout/ScrollToTop";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import ContactSection from "@/components/sections/ContactSection";

<ContactSection />
/* ─────────────────────────────────────────────────────────────────
   FUENTE — Inter optimizada con next/font
───────────────────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

/* ─────────────────────────────────────────────────────────────────
   VIEWPORT
───────────────────────────────────────────────────────────────── */
export const viewport = {
  themeColor: "#0B1120",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ─────────────────────────────────────────────────────────────────
   METADATA GLOBAL
───────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://frostai.cl"),
  title: {
    default:  "Frost AI Solutions — Automatización e Inteligencia Operacional",
    template: "%s | Frost AI Solutions",
  },
  description:
    "Plataforma de IA empresarial para minería, municipalidades y operaciones. Automatiza procesos, conecta sistemas y toma decisiones en tiempo real.",
  keywords: [
    "automatización empresarial",
    "inteligencia artificial Chile",
    "dashboards operacionales",
    "integración SAP ERP",
    "IA minería",
    "municipalidades digitales",
    "RPA Chile",
  ],
  authors:  [{ name: "Frost AI Solutions", url: "https://frostai.cl" }],
  creator:  "Frost AI Solutions",
  publisher:"Frost AI Solutions",

  /* Open Graph */
  openGraph: {
    type:      "website",
    locale:    "es_CL",
    url:       "https://frostai.cl",
    siteName:  "Frost AI Solutions",
    title:     "Frost AI Solutions — Automatización e Inteligencia Operacional",
    description:
      "Plataforma de IA para automatizar procesos, conectar sistemas y operar con inteligencia en tiempo real.",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "Frost AI Solutions",
      },
    ],
  },

  /* Twitter */
  twitter: {
    card:        "summary_large_image",
    site:        "@frostai_cl",
    creator:     "@frostai_cl",
    title:       "Frost AI Solutions",
    description: "Automatización e Inteligencia Operacional para empresas de alto rendimiento.",
    images:      ["/og-image.png"],
  },

  /* Icons */
  icons: {
    icon:        [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple:       [{ url: "/apple-touch-icon.png" }],
    shortcut:    "/favicon.ico",
  },

  /* Manifest */
  manifest: "/manifest.json",

  /* Robots */
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },

  /* Verificación (reemplazar con IDs reales) */
  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_ID",
  },

  /* Alternates */
  alternates: {
    canonical: "https://frostai.cl",
    languages: { "es-CL": "https://frostai.cl" },
  },
};

/* ─────────────────────────────────────────────────────────────────
   ROOT LAYOUT
───────────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="bg-[#0B1120] text-white antialiased overflow-x-hidden"
        style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
      >
        {/* Barra de progreso de lectura — top del viewport */}
        <ScrollProgressBar />

        {/* Navbar sticky */}
        <Navbar />

        {/* Contenido de la página */}
        {children}

        {/* Footer */}
        <Footer />

        {/* Botón scroll to top con ring de progreso */}
        <ScrollToTop />
      </body>
    </html>
  );
}
