"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "@/constants/testimonials";

/* ─────────────────────────────────────────────────────────────────
   AVATAR
───────────────────────────────────────────────────────────────── */
function Avatar({ initials, accent }: { initials: string; accent: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center
                 text-[13px] font-bold text-white flex-shrink-0 select-none"
      style={{
        background: `linear-gradient(135deg, ${accent}cc, ${accent}66)`,
        border: `1.5px solid ${accent}44`,
      }}
    >
      {initials}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   STARS
───────────────────────────────────────────────────────────────── */
function Stars({ accent }: { accent: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} fill={accent} style={{ color: accent }} strokeWidth={0} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TESTIMONIAL CARD
───────────────────────────────────────────────────────────────── */
function TestimonialCard({ item }: { item: (typeof TESTIMONIALS)[number] }) {
  return (
    <div className="relative flex flex-col h-full rounded-2xl overflow-hidden
                    border border-white/[0.08] bg-[#0F1929]/80 backdrop-blur-sm p-6 gap-5">
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{ background: `linear-gradient(90deg, transparent, ${item.accent}80, transparent)` }}
      />
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${item.accent}12, transparent 70%)` }}
      />

      {/* Quote icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${item.accent}16`, border: `1px solid ${item.accent}26` }}
      >
        <Quote size={14} style={{ color: item.accent }} strokeWidth={2} />
      </div>

      {/* Stars */}
      <Stars accent={item.accent} />

      {/* Quote */}
      <blockquote className="text-[14px] leading-[1.72] text-white/58 flex-1 relative">
        <span className="text-white/80">&#8220;</span>
        {item.quote}
        <span className="text-white/80">&#8221;</span>
      </blockquote>

      {/* Metric badge */}
      {item.metric && (
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg w-fit"
          style={{
            background: `${item.accent}10`,
            border: `1px solid ${item.accent}28`,
          }}
        >
          <span className="text-[16px] font-bold tracking-tight" style={{ color: item.accent }}>
            {item.metric.value}
          </span>
          <span className="text-[10.5px] text-white/35">{item.metric.label}</span>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-white/[0.06]" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <Avatar initials={item.avatar} accent={item.accent} />
        <div>
          <p className="text-[13px] font-semibold text-white/90 leading-tight">{item.author}</p>
          <p className="text-[11.5px] text-white/38 mt-0.5">{item.role}</p>
          <p className="text-[11px] font-medium mt-0.5" style={{ color: `${item.accent}bb` }}>
            {item.company}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────── */
export default function TestimonialsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView  = useInView(headerRef, { once: true, margin: "-80px" });

  const [page, setPage]           = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoplay, setAutoplay]   = useState(true);

  // Show 1 on mobile, 2 on md, 3 on lg
  const ITEMS_PER_PAGE = 3;
  const totalPages     = Math.ceil(TESTIMONIALS.length / ITEMS_PER_PAGE);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setPage((p) => (p + dir + totalPages) % totalPages);
  }, [totalPages]);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => paginate(1), 5500);
    return () => clearInterval(id);
  }, [autoplay, paginate]);

  const currentItems = TESTIMONIALS.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const variants = {
    enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40, filter: "blur(4px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
    exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -30 : 30, filter: "blur(4px)", transition: { duration: 0.3 } }),
  };

  return (
    <section
      className="relative bg-[#0B1120] py-24 sm:py-32 overflow-hidden"
      style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
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
                Lo que dicen nuestros clientes
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-white leading-[1.1]"
            >
              Resultados que{" "}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                hablan por sí solos.
              </span>
            </motion.h2>
          </div>

          {/* Nav arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => { setAutoplay(false); paginate(-1); }}
              className="w-9 h-9 rounded-xl border border-white/[0.09] bg-white/[0.03]
                         flex items-center justify-center text-white/45
                         hover:text-white hover:border-white/[0.15] hover:bg-white/[0.06]
                         transition-all duration-200 focus:outline-none"
              aria-label="Anterior"
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            <button
              onClick={() => { setAutoplay(false); paginate(1); }}
              className="w-9 h-9 rounded-xl border border-white/[0.09] bg-white/[0.03]
                         flex items-center justify-center text-white/45
                         hover:text-white hover:border-white/[0.15] hover:bg-white/[0.06]
                         transition-all duration-200 focus:outline-none"
              aria-label="Siguiente"
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5 ml-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoplay(false); setDirection(i > page ? 1 : -1); setPage(i); }}
                  className="transition-all duration-300 rounded-full focus:outline-none"
                  style={{
                    width: i === page ? 20 : 6,
                    height: 6,
                    background: i === page
                      ? "linear-gradient(90deg, #2563EB, #06B6D4)"
                      : "rgba(255,255,255,0.15)",
                  }}
                  aria-label={`Página ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cards carousel */}
        <div className="relative overflow-hidden min-h-[320px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {currentItems.map((item) => (
                <TestimonialCard key={item.id} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-3 flex-wrap"
        >
          <div className="flex -space-x-2.5">
            {["RF", "CM", "FA", "VS", "MP", "AC"].map((init, i) => (
              <div
                key={init}
                className="w-7 h-7 rounded-full border-2 border-[#0B1120] flex items-center
                           justify-center text-[9px] font-bold text-white"
                style={{
                  background: ["#f59e0b","#2563EB","#06B6D4","#059669","#e11d48","#7c3aed"][i],
                  zIndex: 6 - i,
                }}
              >
                {init}
              </div>
            ))}
          </div>
          <span className="text-[12px] text-white/32">
            Más de{" "}
            <span className="text-white/55 font-medium">180 empresas</span>
            {" "}confían en Frost AI · NPS promedio{" "}
            <span className="text-[#06B6D4]/80 font-semibold">72</span>
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
