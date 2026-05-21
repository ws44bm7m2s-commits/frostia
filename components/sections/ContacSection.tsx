"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button"; // adjust path to your Button component

/* ─────────────────────────────────────────────────────────────────
   CONTACT / DEMO SECTION — FrostIA
   Sección completa de contacto con formulario funcional, animaciones
   Framer Motion, glassmorphism y estilo SaaS premium.
───────────────────────────────────────────────────────────────── */

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ── Floating glow orb background decoration ──────────────────────
function GlowOrb({
  className,
  color = "#2563EB",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={cn("absolute rounded-full blur-[120px] opacity-20 pointer-events-none", className)}
      style={{ background: color }}
    />
  );
}

// ── Individual input field with focus glow ───────────────────────
interface FieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  textarea?: boolean;
  rows?: number;
  delay?: number;
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  textarea = false,
  rows = 4,
  delay = 0,
}: FieldProps) {
  const [focused, setFocused] = useState(false);

  const sharedClass = cn(
    "w-full bg-white/[0.04] border rounded-xl px-4 py-3",
    "text-white/90 placeholder:text-white/25 text-[13.5px] leading-relaxed",
    "transition-all duration-300 outline-none resize-none",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    focused
      ? "border-[#06B6D4]/50 shadow-[0_0_0_3px_rgba(6,182,212,0.10),inset_0_1px_0_rgba(255,255,255,0.06)]"
      : "border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
    "hover:border-white/[0.14]"
  );

  return (
    <motion.div
      className="flex flex-col gap-1.5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <label
        htmlFor={id}
        className={cn(
          "text-[11.5px] font-semibold tracking-wider uppercase transition-colors duration-300",
          focused ? "text-[#06B6D4]" : "text-white/35"
        )}
      >
        {label}
        {required && <span className="ml-1 text-[#06B6D4]/70">*</span>}
      </label>

      {textarea ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          required={required}
          className={sharedClass}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          required={required}
          className={sharedClass}
        />
      )}
    </motion.div>
  );
}

// ── Success state ────────────────────────────────────────────────
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      className="flex flex-col items-center justify-center text-center py-12 px-6 gap-6"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated checkmark */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#06B6D4]/20 blur-2xl scale-150" />
        <motion.div
          className="relative w-16 h-16 rounded-full border border-[#06B6D4]/40 bg-[#06B6D4]/10 flex items-center justify-center"
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        >
          <motion.svg
            className="w-7 h-7 text-[#06B6D4]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <motion.path d="M5 13l4 4L19 7" />
          </motion.svg>
        </motion.div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white tracking-tight">
          Mensaje enviado correctamente
        </h3>
        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
          Nuestro equipo revisará tu solicitud y te contactará en menos de 24 horas hábiles.
        </p>
      </div>

      <Button variant="secondary" size="sm" onClick={onReset}>
        Enviar otro mensaje
      </Button>
    </motion.div>
  );
}

// ── Error banner ─────────────────────────────────────────────────
function ErrorBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <svg
        className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <div className="flex-1 min-w-0">
        <p className="text-red-400 text-[13px] font-medium">Error al enviar el mensaje</p>
        <p className="text-red-400/60 text-[12px] mt-0.5 leading-relaxed">
          Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-400/50 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5"
        aria-label="Cerrar error"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </motion.div>
  );
}

// ── Right-side decorative card ────────────────────────────────────
function SideCard() {
  const items = [
    { icon: "⚡", title: "Activación inmediata", desc: "Tu demo lista en menos de 24h" },
    { icon: "🔒", title: "Sin compromisos", desc: "Prueba gratuita, sin tarjeta" },
    { icon: "🤝", title: "Onboarding guiado", desc: "Te acompañamos desde el día 1" },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#06B6D4]/20 bg-[#06B6D4]/[0.06] w-fit"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
        <span className="text-[11.5px] font-semibold text-[#06B6D4] tracking-wider uppercase">
          Demo disponible
        </span>
      </motion.div>

      {/* Heading */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-[1.15] tracking-tight">
          Descubre lo que
          <br />
          <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
            FrostIA
          </span>{" "}
          puede hacer
          <br />
          por tu negocio
        </h2>
        <p className="text-white/40 text-[14px] leading-relaxed max-w-sm">
          Agenda una sesión personalizada con nuestro equipo y explora cómo automatizar tus flujos con IA.
        </p>
      </motion.div>

      {/* Feature list */}
      <div className="flex flex-col gap-3 mt-2">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            className="flex items-start gap-3 group"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.25 + i * 0.08 }}
          >
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-base flex-shrink-0 group-hover:border-[#06B6D4]/30 transition-colors duration-300">
              {item.icon}
            </div>
            <div>
              <p className="text-white/80 text-[13px] font-semibold">{item.title}</p>
              <p className="text-white/35 text-[12px] mt-0.5">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Social proof */}
      <motion.div
        className="mt-2 pt-5 border-t border-white/[0.06]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <p className="text-white/25 text-[11.5px] uppercase tracking-widest font-semibold mb-3">
          Empresas que confían en nosotros
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          {["Acme Corp", "Nexus AI", "Orbit", "Flux Labs"].map((name) => (
            <span
              key={name}
              className="text-white/20 text-[12px] font-semibold tracking-wide hover:text-white/40 transition-colors duration-300 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ── Main exported component ───────────────────────────────────────
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const updateField = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError   = status === "error";
  const isDisabled = isLoading || isSuccess;

  const handleSubmit = async () => {
    // Basic client-side validation
    if (!form.name || !form.email || !form.company || !form.message) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          company: form.company,
          message: form.message,
        }),
      });

      if (!res.ok) throw new Error("Server error");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", company: "", message: "" });
    setStatus("idle");
  };

  const ArrowIcon = (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#080C14] py-24 md:py-32"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow orbs */}
      <GlowOrb className="w-[600px] h-[400px] -top-32 -left-40" color="#2563EB" />
      <GlowOrb className="w-[500px] h-[350px] bottom-0 right-0" color="#06B6D4" />
      <GlowOrb className="w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="#1d4ed8" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* ── LEFT: info ── */}
          <SideCard />

          {/* ── RIGHT: form card ── */}
          <motion.div
            className={cn(
              "relative rounded-2xl overflow-hidden",
              "border border-white/[0.08]",
              "bg-white/[0.02] backdrop-blur-xl",
              "shadow-[0_0_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]"
            )}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/40 to-transparent" />

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <SuccessState key="success" onReset={handleReset} />
              ) : (
                <motion.div
                  key="form"
                  className="p-7 sm:p-9"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Card header */}
                  <motion.div
                    className="mb-7"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-white tracking-tight">
                      Solicitar demo
                    </h3>
                    <p className="text-white/35 text-[13px] mt-1 leading-relaxed">
                      Completa el formulario y nos pondremos en contacto contigo.
                    </p>
                  </motion.div>

                  {/* Error banner */}
                  <AnimatePresence>
                    {isError && (
                      <div className="mb-5">
                        <ErrorBanner onDismiss={() => setStatus("idle")} />
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Fields */}
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field
                        label="Nombre"
                        id="name"
                        placeholder="Ana García"
                        value={form.name}
                        onChange={updateField("name")}
                        required
                        disabled={isDisabled}
                        delay={0.05}
                      />
                      <Field
                        label="Empresa"
                        id="company"
                        placeholder="Acme S.A."
                        value={form.company}
                        onChange={updateField("company")}
                        required
                        disabled={isDisabled}
                        delay={0.1}
                      />
                    </div>

                    <Field
                      label="Correo electrónico"
                      id="email"
                      type="email"
                      placeholder="ana@empresa.com"
                      value={form.email}
                      onChange={updateField("email")}
                      required
                      disabled={isDisabled}
                      delay={0.15}
                    />

                    <Field
                      label="Mensaje"
                      id="message"
                      placeholder="Cuéntanos sobre tu proyecto o lo que necesitas automatizar…"
                      value={form.message}
                      onChange={updateField("message")}
                      required
                      disabled={isDisabled}
                      textarea
                      rows={4}
                      delay={0.2}
                    />
                  </div>

                  {/* Submit */}
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      loading={isLoading}
                      disabled={isDisabled}
                      icon={!isLoading ? ArrowIcon : undefined}
                      iconPosition="right"
                      onClick={handleSubmit}
                    >
                      {isLoading ? "Enviando solicitud…" : "Solicitar demo ahora"}
                    </Button>

                    <p className="text-center text-white/20 text-[11.5px] mt-4 leading-relaxed">
                      Sin spam. Sin compromisos. Solo una conversación.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
