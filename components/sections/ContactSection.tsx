"use client";
 
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button"; // adjust path to your Button component
 
/* ─────────────────────────────────────────────────────────────────
   CONTACT / DEMO SECTION — FrostIA  (mobile-optimized)
   
   CAMBIOS CLAVE vs versión anterior:
   • useIsMobile() → desactiva backdrop-blur, blurs grandes y
     animaciones de Framer Motion en iOS/mobile
   • GlowOrbs sin blur en mobile (usan opacity gradient en su lugar)
   • Field usa <div> normal en mobile, motion.div solo en desktop
   • transition-colors en vez de transition-all en inputs
   • animate-pulse eliminado en mobile
   • backdrop-blur-xl → bg sólida semitransparente en mobile
───────────────────────────────────────────────────────────────── */
 
// ── Detecta mobile/iOS para reducir efectos costosos ─────────────
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
 
  return isMobile;
}
 
interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}
 
type SubmitStatus = "idle" | "loading" | "success" | "error";
 
// ── Glow orb — sin blur costoso en mobile ────────────────────────
function GlowOrb({
  className,
  color = "#2563EB",
  mobile = false,
}: {
  className?: string;
  color?: string;
  mobile?: boolean;
}) {
  if (mobile) return null; // eliminado completamente en mobile
  return (
    <div
      className={cn(
        "absolute rounded-full blur-[120px] opacity-20 pointer-events-none",
        className
      )}
      style={{ background: color }}
    />
  );
}
 
// ── Field — motion solo en desktop ───────────────────────────────
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
  isMobile?: boolean;
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
  isMobile = false,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
 
  const sharedClass = cn(
    "w-full bg-white/[0.06] border rounded-xl px-4 py-3",
    "text-white/90 placeholder:text-white/25 text-[14px] leading-relaxed",
    // transition-colors en vez de transition-all (mucho más barato en Safari)
    "transition-colors duration-200 outline-none resize-none",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    focused
      ? "border-[#06B6D4]/50 shadow-[0_0_0_2px_rgba(6,182,212,0.12)]"
      : "border-white/[0.10]"
  );
 
  const labelClass = cn(
    "text-[11.5px] font-semibold tracking-wider uppercase transition-colors duration-200",
    focused ? "text-[#06B6D4]" : "text-white/35"
  );
 
  const content = (
    <>
      <label htmlFor={id} className={labelClass}>
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
          // iOS: evita zoom automático al hacer focus (font-size >= 16px internamente)
          style={{ fontSize: "16px" }}
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
          // iOS: evita zoom automático al hacer focus (font-size >= 16px internamente)
          style={{ fontSize: "16px" }}
        />
      )}
    </>
  );
 
  // En mobile usamos div normal para evitar el overhead de Framer Motion
  if (isMobile) {
    return <div className="flex flex-col gap-1.5">{content}</div>;
  }
 
  return (
    <motion.div
      className="flex flex-col gap-1.5"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </motion.div>
  );
}
 
// ── Success state ────────────────────────────────────────────────
function SuccessState({
  onReset,
  isMobile,
}: {
  onReset: () => void;
  isMobile: boolean;
}) {
  // En mobile: sin animaciones de scale/pathLength, solo fade simple
  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-6 gap-6">
        <div className="w-16 h-16 rounded-full border border-[#06B6D4]/40 bg-[#06B6D4]/10 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-[#06B6D4]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white tracking-tight">
            Mensaje enviado correctamente
          </h3>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Nuestro equipo revisará tu solicitud y te contactará en menos de 24
            horas hábiles.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={onReset}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }
 
  return (
    <motion.div
      key="success"
      className="flex flex-col items-center justify-center text-center py-12 px-6 gap-6"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
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
            transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
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
          Nuestro equipo revisará tu solicitud y te contactará en menos de 24
          horas hábiles.
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
    <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3">
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
        <p className="text-red-400 text-[13px] font-medium">
          Error al enviar el mensaje
        </p>
        <p className="text-red-400/60 text-[12px] mt-0.5 leading-relaxed">
          Hubo un problema al procesar tu solicitud. Por favor, inténtalo de
          nuevo.
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-400/50 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5"
        aria-label="Cerrar error"
      >
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
 
// ── SideCard — animaciones reducidas en mobile ───────────────────
function SideCard({ isMobile }: { isMobile: boolean }) {
  const items = [
    { icon: "⚡", title: "Activación inmediata", desc: "Tu demo lista en menos de 24h" },
    { icon: "🔒", title: "Sin compromisos", desc: "Prueba gratuita, sin tarjeta" },
    { icon: "🤝", title: "Onboarding guiado", desc: "Te acompañamos desde el día 1" },
  ];
 
  const Wrap = isMobile
    ? ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div className={className}>{children}</div>
      )
    : ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
        <motion.div
          className={className}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay }}
        >
          {children}
        </motion.div>
      );
 
  return (
    <div className="flex flex-col gap-5">
      {/* Badge — sin animate-pulse en mobile */}
      <Wrap
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#06B6D4]/20 bg-[#06B6D4]/[0.06] w-fit"
        delay={0.1}
      >
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full bg-[#06B6D4]",
            !isMobile && "animate-pulse"
          )}
        />
        <span className="text-[11.5px] font-semibold text-[#06B6D4] tracking-wider uppercase">
          Demo disponible
        </span>
      </Wrap>
 
      {/* Heading */}
      <Wrap className="space-y-3" delay={0.15}>
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
          Agenda una sesión personalizada con nuestro equipo y explora cómo
          automatizar tus flujos con IA.
        </p>
      </Wrap>
 
      {/* Feature list */}
      <div className="flex flex-col gap-3 mt-2">
        {items.map((item, i) => (
          <Wrap key={item.title} delay={0.25 + i * 0.08}>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-base flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-white/80 text-[13px] font-semibold">
                  {item.title}
                </p>
                <p className="text-white/35 text-[12px] mt-0.5">{item.desc}</p>
              </div>
            </div>
          </Wrap>
        ))}
      </div>
 
      {/* Social proof */}
      <Wrap className="mt-2 pt-5 border-t border-white/[0.06]" delay={0.55}>
        <p className="text-white/25 text-[11.5px] uppercase tracking-widest font-semibold mb-3">
          Empresas que confían en nosotros
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          {["Acme Corp", "Nexus AI", "Orbit", "Flux Labs"].map((name) => (
            <span
              key={name}
              className="text-white/20 text-[12px] font-semibold tracking-wide"
            >
              {name}
            </span>
          ))}
        </div>
      </Wrap>
    </div>
  );
}
 
// ── Main exported component ───────────────────────────────────────
export default function ContactSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
 
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
  const isError = status === "error";
  const isDisabled = isLoading || isSuccess;
 
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.company || !form.message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
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
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
 
  // Clases de la tarjeta del formulario
  // En mobile: sin backdrop-blur (demasiado costoso en Safari iOS)
  const cardClass = cn(
    "relative rounded-2xl overflow-hidden border border-white/[0.08]",
    "shadow-[0_0_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]",
    isMobile
      ? "bg-[#0e1420]" // color sólido en mobile, sin blur
      : "bg-white/[0.02] backdrop-blur-xl"
  );
 
  return (
    <section
      id="demo-form"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#080C14] py-24 md:py-32"
    >
      {/* Background grid — solo desktop */}
      {!isMobile && (
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
      )}
 
      {/* Glow orbs — solo desktop (blur-[120px] es muy pesado en mobile) */}
      <GlowOrb
        className="w-[600px] h-[400px] -top-32 -left-40"
        color="#2563EB"
        mobile={isMobile}
      />
      <GlowOrb
        className="w-[500px] h-[350px] bottom-0 right-0"
        color="#06B6D4"
        mobile={isMobile}
      />
      <GlowOrb
        className="w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        color="#1d4ed8"
        mobile={isMobile}
      />
 
      {/* Gradiente suave de fondo para mobile (reemplaza los orbs) */}
      {isMobile && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 40% at 20% 0%, rgba(37,99,235,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(6,182,212,0.10) 0%, transparent 70%)",
          }}
        />
      )}
 
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {/* Wrapper — sin motion en mobile */}
        {isMobile ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <SideCard isMobile={isMobile} />
 
            {/* Form card — mobile */}
            <div className={cardClass}>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/40 to-transparent" />
 
              {isSuccess ? (
                <SuccessState onReset={handleReset} isMobile={isMobile} />
              ) : (
                <div className="p-6 sm:p-8">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white tracking-tight">
                      Solicitar demo
                    </h3>
                    <p className="text-white/35 text-[13px] mt-1 leading-relaxed">
                      Completa el formulario y nos pondremos en contacto contigo.
                    </p>
                  </div>
 
                  {isError && (
                    <div className="mb-5">
                      <ErrorBanner onDismiss={() => setStatus("idle")} />
                    </div>
                  )}
 
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
                        isMobile={isMobile}
                      />
                      <Field
                        label="Empresa"
                        id="company"
                        placeholder="Acme S.A."
                        value={form.company}
                        onChange={updateField("company")}
                        required
                        disabled={isDisabled}
                        isMobile={isMobile}
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
                      isMobile={isMobile}
                    />
                    <Field
                      label="Mensaje"
                      id="message"
                      placeholder="Cuéntanos sobre tu proyecto…"
                      value={form.message}
                      onChange={updateField("message")}
                      required
                      disabled={isDisabled}
                      textarea
                      rows={4}
                      isMobile={isMobile}
                    />
                  </div>
 
                  <div className="mt-6">
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
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Desktop: con todas las animaciones
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SideCard isMobile={isMobile} />
 
            <motion.div
              className={cardClass}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/40 to-transparent" />
 
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <SuccessState key="success" onReset={handleReset} isMobile={isMobile} />
                ) : (
                  <motion.div
                    key="form"
                    className="p-7 sm:p-9"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.div
                      className="mb-7"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <h3 className="text-lg font-semibold text-white tracking-tight">
                        Solicitar demo
                      </h3>
                      <p className="text-white/35 text-[13px] mt-1 leading-relaxed">
                        Completa el formulario y nos pondremos en contacto contigo.
                      </p>
                    </motion.div>
 
                    <AnimatePresence>
                      {isError && (
                        <motion.div
                          className="mb-5"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25 }}
                        >
                          <ErrorBanner onDismiss={() => setStatus("idle")} />
                        </motion.div>
                      )}
                    </AnimatePresence>
 
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
                          isMobile={isMobile}
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
                          isMobile={isMobile}
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
                        isMobile={isMobile}
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
                        isMobile={isMobile}
                      />
                    </div>
 
                    <motion.div
                      className="mt-6"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.22 }}
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
        )}
      </div>
    </section>
  );
}