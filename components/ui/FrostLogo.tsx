"use client";

/* ─────────────────────────────────────────────────────────────────
   FrostLogo — SVG inline fiel al concepto visual oficial
   Variantes: "full" (icono + wordmark horizontal)
              "icon" (solo copo, cuadrado)
              "stacked" (icono + wordmark vertical)
   Tamaños controlados por prop `size` (altura base del icono en px)
───────────────────────────────────────────────────────────────── */

interface FrostLogoProps {
  variant?: "full" | "icon" | "stacked";
  /** Altura del icono en px. El wordmark escala proporcionalmente. */
  size?: number;
  className?: string;
}

export default function FrostLogo({
  variant = "full",
  size = 36,
  className = "",
}: FrostLogoProps) {
  const id = `frost-grad-${variant}-${size}`;

  /* El icono SVG: viewBox 100×100, se escala con width/height */
  const SnowflakeIcon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#06B6D4" />
          <stop offset="55%"  stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>

      {/* ── STROKE SETTINGS: gradient stroke via paint-order trick ── */}
      <g stroke={`url(#${id})`} strokeLinecap="round" strokeLinejoin="round">

        {/* ═══════════════════════════════════════════════════════
            BRAZO SUPERIOR VERTICAL  (12 o'clock)
        ═════════════════════════════════════════════════════════ */}
        {/* Tallo principal */}
        <line x1="50" y1="50" x2="50" y2="14" strokeWidth="3.2" />
        {/* Nodo terminal */}
        <circle cx="50" cy="11" r="3.5" strokeWidth="2.5" fill="none" />
        {/* Sub-brazos en T horizontales (a ~28) */}
        <line x1="43" y1="28" x2="50" y2="28" strokeWidth="2.4" />
        <line x1="57" y1="28" x2="50" y2="28" strokeWidth="2.4" />
        {/* Nodos sub-brazos */}
        <circle cx="41" cy="28" r="2.4" strokeWidth="2" fill="none" />
        <circle cx="59" cy="28" r="2.4" strokeWidth="2" fill="none" />

        {/* ═══════════════════════════════════════════════════════
            BRAZO INFERIOR VERTICAL  (6 o'clock)
        ═════════════════════════════════════════════════════════ */}
        <line x1="50" y1="50" x2="50" y2="86" strokeWidth="3.2" />
        <circle cx="50" cy="89" r="3.5" strokeWidth="2.5" fill="none" />
        <line x1="43" y1="72" x2="50" y2="72" strokeWidth="2.4" />
        <line x1="57" y1="72" x2="50" y2="72" strokeWidth="2.4" />
        <circle cx="41" cy="72" r="2.4" strokeWidth="2" fill="none" />
        <circle cx="59" cy="72" r="2.4" strokeWidth="2" fill="none" />

        {/* ═══════════════════════════════════════════════════════
            BRAZO DERECHO  (3 o'clock)
        ═════════════════════════════════════════════════════════ */}
        <line x1="50" y1="50" x2="86" y2="50" strokeWidth="3.2" />
        <circle cx="89" cy="50" r="3.5" strokeWidth="2.5" fill="none" />
        <line x1="72" y1="43" x2="72" y2="50" strokeWidth="2.4" />
        <line x1="72" y1="57" x2="72" y2="50" strokeWidth="2.4" />
        <circle cx="72" cy="41" r="2.4" strokeWidth="2" fill="none" />
        <circle cx="72" cy="59" r="2.4" strokeWidth="2" fill="none" />

        {/* ═══════════════════════════════════════════════════════
            BRAZO IZQUIERDO  (9 o'clock)
        ═════════════════════════════════════════════════════════ */}
        <line x1="50" y1="50" x2="14" y2="50" strokeWidth="3.2" />
        <circle cx="11" cy="50" r="3.5" strokeWidth="2.5" fill="none" />
        <line x1="28" y1="43" x2="28" y2="50" strokeWidth="2.4" />
        <line x1="28" y1="57" x2="28" y2="50" strokeWidth="2.4" />
        <circle cx="28" cy="41" r="2.4" strokeWidth="2" fill="none" />
        <circle cx="28" cy="59" r="2.4" strokeWidth="2" fill="none" />

        {/* ═══════════════════════════════════════════════════════
            BRAZO DIAGONAL SUPERIOR-DERECHO  (1–2 o'clock)
            Con quiebre de circuito (trazo en L)
        ═════════════════════════════════════════════════════════ */}
        {/* Tallo diagonal principal */}
        <line x1="50" y1="50" x2="75" y2="25" strokeWidth="3.2" />
        {/* Quiebre angular: desde ~(68,32) un segmento ortogonal */}
        <polyline points="68,32 76,32 76,20" strokeWidth="2.2" fill="none" />
        {/* Nodo terminal en punta diagonal */}
        <circle cx="79" cy="17" r="3.2" strokeWidth="2.2" fill="none" />
        {/* Nodo en el codo */}
        <circle cx="76" cy="32" r="2" strokeWidth="1.8" fill="none" />

        {/* ═══════════════════════════════════════════════════════
            BRAZO DIAGONAL INFERIOR-IZQUIERDO  (7–8 o'clock)
        ═════════════════════════════════════════════════════════ */}
        <line x1="50" y1="50" x2="25" y2="75" strokeWidth="3.2" />
        <polyline points="32,68 24,68 24,80" strokeWidth="2.2" fill="none" />
        <circle cx="21" cy="83" r="3.2" strokeWidth="2.2" fill="none" />
        <circle cx="24" cy="68" r="2" strokeWidth="1.8" fill="none" />

        {/* ═══════════════════════════════════════════════════════
            BRAZO DIAGONAL SUPERIOR-IZQUIERDO  (10–11 o'clock)
        ═════════════════════════════════════════════════════════ */}
        <line x1="50" y1="50" x2="25" y2="25" strokeWidth="3.2" />
        <polyline points="32,32 24,32 24,20" strokeWidth="2.2" fill="none" />
        <circle cx="21" cy="17" r="3.2" strokeWidth="2.2" fill="none" />
        <circle cx="24" cy="32" r="2" strokeWidth="1.8" fill="none" />

        {/* ═══════════════════════════════════════════════════════
            BRAZO DIAGONAL INFERIOR-DERECHO  (4–5 o'clock)
        ═════════════════════════════════════════════════════════ */}
        <line x1="50" y1="50" x2="75" y2="75" strokeWidth="3.2" />
        <polyline points="68,68 76,68 76,80" strokeWidth="2.2" fill="none" />
        <circle cx="79" cy="83" r="3.2" strokeWidth="2.2" fill="none" />
        <circle cx="76" cy="68" r="2" strokeWidth="1.8" fill="none" />

        {/* ═══════════════════════════════════════════════════════
            ROMBO CENTRAL
        ═════════════════════════════════════════════════════════ */}
        <polygon
          points="50,38 62,50 50,62 38,50"
          strokeWidth="2.4"
          fill="none"
        />

        {/* Punto central */}
        <circle cx="50" cy="50" r="2.8" strokeWidth="0" fill={`url(#${id})`} />
      </g>
    </svg>
  );

  /* ── WORDMARK ── */
  const wordmarkSize = Math.round(size * 0.44); // escala relativa al icono

  const Wordmark = (
    <div
      className="flex flex-col leading-none select-none"
      style={{ gap: Math.round(size * 0.04) }}
    >
      <span
        className="font-black text-white tracking-tight"
        style={{
          fontSize: wordmarkSize,
          letterSpacing: "-0.02em",
          fontFamily: "'Inter', 'DM Sans', sans-serif",
        }}
      >
        FROST
      </span>
      <span
        className="font-semibold tracking-[0.18em] uppercase"
        style={{
          fontSize: Math.round(wordmarkSize * 0.44),
          color: "rgba(255,255,255,0.45)",
          fontFamily: "'Inter', 'DM Sans', sans-serif",
          letterSpacing: "0.2em",
        }}
      >
        AI SOLUTIONS
      </span>
    </div>
  );

  /* ── VARIANTS ── */
  if (variant === "icon") return SnowflakeIcon;

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        {SnowflakeIcon}
        <div className="flex flex-col items-center leading-none select-none">
          <span
            className="font-black text-white tracking-tight"
            style={{
              fontSize: wordmarkSize,
              letterSpacing: "-0.02em",
              fontFamily: "'Inter', 'DM Sans', sans-serif",
            }}
          >
            FROST
          </span>
          <span
            className="font-semibold uppercase"
            style={{
              fontSize: Math.round(wordmarkSize * 0.44),
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.2em",
              fontFamily: "'Inter', 'DM Sans', sans-serif",
            }}
          >
            AI SOLUTIONS
          </span>
        </div>
      </div>
    );
  }

  // "full" — horizontal (default)
  return (
    <div
      className={`flex items-center ${className}`}
      style={{ gap: Math.round(size * 0.3) }}
    >
      {SnowflakeIcon}
      {Wordmark}
    </div>
  );
}
