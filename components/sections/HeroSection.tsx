"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const scrollToDemo = () => {
  document.getElementById("demo-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const STATS = [
  { value: 94, suffix: "%", label: "Reducción de procesos manuales" },
  { value: 3.2, suffix: "x", label: "Mayor velocidad operacional" },
  { value: 180, suffix: "+", label: "Empresas automatizadas" },
  { value: 99.9, suffix: "%", label: "Uptime garantizado" },
];

const TICKER_ITEMS = [
  "Automatización RPA",
  "Dashboards en Tiempo Real",
  "Integración ERP / SAP",
  "Reportes Automáticos",
  "IA Generativa Aplicada",
  "Minería de Datos",
  "Municipalidades Digitales",
  "Inteligencia Operacional",
];

const FLOATING_TAGS = [
  { label: "IA Generativa", x: "8%",  y: "22%", delay: 0.2 },
  { label: "Reportes Auto.", x: "80%", y: "18%", delay: 0.5 },
  { label: "ERP Connect",   x: "6%",  y: "68%", delay: 0.8 },
  { label: "Real-time Data",x: "78%", y: "72%", delay: 0.35 },
];

/* ─────────────────────────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────────────────────────── */
function AnimatedCounter({
  target,
  suffix,
  duration = 2.2,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(parseFloat((eased * target).toFixed(target % 1 !== 0 ? 1 : 0)));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {target % 1 !== 0 ? display.toFixed(1) : Math.round(display)}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   GRID CANVAS — subtle animated dot grid
───────────────────────────────────────────────────────────────── */
function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const SPACING = 44;
    let W = 0, H = 0, cols = 0, rows = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cols = Math.ceil(W / SPACING) + 1;
      rows = Math.ceil(H / SPACING) + 1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const t = Date.now() * 0.0006;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;
          const dx = x - mouse.current.x;
          const dy = y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / 180);
          const pulse = Math.sin(t + r * 0.4 + c * 0.3) * 0.5 + 0.5;
          const alpha = 0.06 + pulse * 0.04 + proximity * 0.35;
          const radius = 1 + proximity * 2.2;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37,99,235,${alpha})`;
          ctx.fill();

          if (proximity > 0.15) {
            ctx.beginPath();
            ctx.arc(x, y, radius * 0.45, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6,182,212,${proximity * 0.8})`;
            ctx.fill();
          }
        }
      }
      raf.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-70 pointer-events-none"
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   TICKER
───────────────────────────────────────────────────────────────── */
function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden h-7 flex items-center">
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-0">
            <span className="text-[11px] tracking-[0.15em] uppercase font-medium text-white/35 px-5">
              {item}
            </span>
            <span className="text-[#2563EB]/40 text-[10px]">◆</span>
          </span>
        ))}
      </motion.div>
      {/* Fade edges */}
      <div className="absolute left-0 w-16 h-full bg-gradient-to-r from-[#0B1120] to-transparent pointer-events-none" />
      <div className="absolute right-0 w-16 h-full bg-gradient-to-l from-[#0B1120] to-transparent pointer-events-none" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DASHBOARD MOCKUP — right-side visual element
───────────────────────────────────────────────────────────────── */
function DashboardMockup() {
  const bars = [72, 45, 88, 61, 94, 53, 79, 66, 91, 58, 84, 70];
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{ perspective: "1200px" }}
      className="relative w-full max-w-[540px] mx-auto lg:mx-0"
    >
      {/* Outer glow */}
      <div className="absolute -inset-8 bg-[#2563EB]/10 rounded-3xl blur-3xl pointer-events-none" />
      <div className="absolute -inset-4 bg-[#06B6D4]/5 rounded-2xl blur-2xl pointer-events-none" />

      {/* Card */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0F1929]/90 backdrop-blur-xl shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <span className="text-[11px] text-white/25 font-mono ml-2">frost-ops.dashboard</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400/70 font-medium">Live</span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Metric row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Procesos/h", value: "2,847", delta: "+12.4%", up: true },
              { label: "Eficiencia", value: "94.2%", delta: "+3.1%", up: true },
              { label: "Alertas", value: "0", delta: "Nominal", up: true },
            ].map((m) => (
              <div key={m.label} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.05]">
                <p className="text-[10px] text-white/35 mb-1">{m.label}</p>
                <p className="text-[15px] font-semibold text-white tracking-tight">{m.value}</p>
                <p className={`text-[10px] mt-0.5 font-medium ${m.up ? "text-emerald-400/80" : "text-red-400/80"}`}>
                  {m.delta}
                </p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.05]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-medium text-white/50">Rendimiento operacional — 30d</span>
              <span className="text-[10px] text-[#06B6D4]/70 font-medium">↑ 18.3%</span>
            </div>
            <div className="flex items-end gap-1 h-16">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    background: i === bars.length - 1
                      ? "linear-gradient(to top, #2563EB, #06B6D4)"
                      : "rgba(37,99,235,0.25)",
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: i * 0.04 + 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                />
              ))}
            </div>
          </div>

          {/* Process feed */}
          <div className="space-y-1.5">
            {[
              { proc: "Reporte mensual SAP", status: "Completado", t: "hace 2s" },
              { proc: "Sync datos municipales", status: "Ejecutando", t: "ahora" },
              { proc: "Alerta inventario mina", status: "Procesado", t: "hace 18s" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="flex items-center justify-between bg-white/[0.02] rounded-lg px-3 py-2 border border-white/[0.04]"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    item.status === "Ejecutando"
                      ? "bg-[#06B6D4] animate-pulse"
                      : "bg-emerald-400/70"
                  }`} />
                  <span className="text-[11px] text-white/55">{item.proc}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium ${
                    item.status === "Ejecutando" ? "text-[#06B6D4]/80" : "text-emerald-400/70"
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-[10px] text-white/20">{item.t}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating tags */}
      {FLOATING_TAGS.map((tag) => (
        <motion.div
          key={tag.label}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: tag.delay + 1.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{ left: tag.x, top: tag.y }}
          className="absolute hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
                     bg-[#0F1929]/90 backdrop-blur border border-white/[0.08]
                     shadow-lg pointer-events-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
          <span className="text-[10px] font-medium text-white/60 whitespace-nowrap">{tag.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HERO SECTION — main export
───────────────────────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y        = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const ySpring  = useSpring(y, { stiffness: 80, damping: 25 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col bg-[#0B1120] overflow-hidden"
      style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      {/* ── BACKGROUND LAYERS ── */}

      {/* Base radial gradient — top center bloom */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[700px]
                        bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.18)_0%,transparent_65%)]" />
        <div className="absolute top-[-5%] left-[55%] w-[500px] h-[500px]
                        bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.10)_0%,transparent_65%)]" />
        {/* Bottom left accent */}
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[400px]
                        bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Animated dot grid */}
      <GridCanvas />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent pointer-events-none"
        animate={{ top: ["15%", "85%", "15%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── TICKER BAR ── */}
      <div className="relative z-10 border-b border-white/[0.05] mt-[68px]">
        <Ticker />
      </div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ y: ySpring, opacity }}
        className="relative z-10 flex-1 flex items-center"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* ── LEFT: TEXT ── */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-col items-start"
            >
              {/* Eyebrow badge */}
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                                 border border-[#2563EB]/30 bg-[#2563EB]/[0.08]
                                 text-[11.5px] font-medium tracking-wide text-[#60a5fa]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
                  Plataforma de Inteligencia Operacional
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="text-[42px] sm:text-[52px] lg:text-[58px] xl:text-[64px] font-bold leading-[1.04] tracking-[-0.03em] text-white mb-5"
              >
                Automatiza tu
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#2563EB] via-[#3b82f6] to-[#06B6D4] bg-clip-text text-transparent">
                    operación
                  </span>
                  {/* Underline decoration */}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full
                               bg-gradient-to-r from-[#2563EB] to-[#06B6D4]"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  />
                </span>
                <br />
                con IA empresarial.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-[16.5px] leading-[1.65] text-white/50 max-w-[480px] mb-8 font-light"
              >
                Frost AI Solutions transforma la forma en que las empresas, municipalidades y
                operaciones mineras procesan datos, generan reportes y toman decisiones — en
                tiempo real, sin intervención manual.
              </motion.p>

              {/* CTA row */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-10">
                {/* Primary CTA */}
                <motion.button
                  onClick={scrollToDemo}
                  whileHover={{ scale: 1.025, y: -2 }}
                  whileTap={{ scale: 0.975 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="group relative overflow-hidden px-6 py-3.5 rounded-xl font-semibold
                             text-[14px] text-white tracking-[-0.01em]
                             bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]
                             hover:from-[#2563EB] hover:to-[#06B6D4]
                             shadow-[0_0_30px_rgba(37,99,235,0.35)]
                             hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]
                             transition-all duration-500 focus:outline-none focus-visible:ring-2
                             focus-visible:ring-[#06B6D4]/60"
                >
                  <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%]
                                   bg-gradient-to-r from-transparent via-white/15 to-transparent
                                   skew-x-[-20deg] transition-transform duration-700 ease-out" />
                  <span className="relative flex items-center gap-2.5">
                    Agenda una demostración
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </motion.button>

                {/* Secondary CTA */}
                <motion.button
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.975 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium
                             text-[14px] text-white/65 hover:text-white
                             border border-white/[0.10] hover:border-white/[0.20]
                             bg-white/[0.02] hover:bg-white/[0.05]
                             transition-all duration-300 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-[#06B6D4]/70">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor"/>
                  </svg>
                  Ver cómo funciona
                </motion.button>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
                <div className="flex -space-x-2">
                  {["F", "M", "C", "A"].map((init, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-[#0B1120] flex items-center justify-center
                                 text-[10px] font-bold text-white"
                      style={{ background: ["#2563EB","#0891b2","#1d4ed8","#0e7490"][i] }}
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <span className="text-[12px] text-white/35">
                  Más de{" "}
                  <span className="text-white/60 font-medium">180 empresas</span>
                  {" "}confían en Frost AI
                </span>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: DASHBOARD VISUAL ── */}
            <div className="relative flex justify-center lg:justify-end">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── STATS BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="relative z-10 border-t border-white/[0.06] bg-white/[0.015] backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {STATS.map((stat, i) => (
              <div key={i} className="px-6 py-5 flex flex-col items-center text-center group">
                <span className="text-[26px] sm:text-[30px] font-bold tracking-tight text-white mb-1
                                 bg-gradient-to-r from-white to-white/70 bg-clip-text">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[11.5px] text-white/35 leading-tight">{stat.label}</span>
                {/* Hover accent line */}
                <motion.div
                  className="mt-2 h-px w-0 group-hover:w-8 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] rounded-full"
                  transition={{ duration: 0.3 }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── SCROLL CUE ── */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 hidden lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          className="w-[1px] h-10 bg-gradient-to-b from-transparent via-[#2563EB]/40 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[9px] tracking-[0.2em] uppercase text-white/20">Scroll</span>
      </motion.div>
    </section>
  );
}
