/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ── PERFORMANCE ── */
  compress: true,
  poweredByHeader: false,

  /* ── IMÁGENES ── */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 año
  },

  /* ── HEADERS DE SEGURIDAD Y CACHE ── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff"                        },
          { key: "X-Frame-Options",         value: "DENY"                           },
          { key: "X-XSS-Protection",        value: "1; mode=block"                  },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin"},
          { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Cache agresivo para assets estáticos
        source: "/(.*)\\.(ico|png|jpg|jpeg|svg|webp|avif|woff|woff2|ttf|otf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  /* ── REDIRECTS ── */
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;