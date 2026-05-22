"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import FrostLogo from "@/components/ui/FrostLogo";

const NAV_LINKS = [
  { label: "Soluciones",    href: "#soluciones"    },
  { label: "Industrias",    href: "#industrias"    },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Nosotros",      href: "#nosotros"      },
];

function NavLink({ href, children, isActive, onClick }: {
  href: string; children: React.ReactNode; isActive: boolean; onClick: () => void;
}) {
  return (
    <motion.a
      href={href}
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className="relative px-3.5 py-2 text-[13.5px] font-medium rounded-lg
                 text-white/55 hover:text-white transition-colors duration-200 group"
      whileHover={{ y: -0.5 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.05] transition-colors duration-200" />
      {isActive && (
        <motion.span
          layoutId="nav-dot"
          className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#06B6D4]"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
      <span className="relative">{children}</span>
    </motion.a>
  );
}

function CTAButton({ onClick, fullWidth = false }: { onClick: () => void; fullWidth?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`relative overflow-hidden group ${fullWidth ? "w-full" : ""}
        px-4 py-2 rounded-xl text-[13px] font-semibold text-white
        bg-gradient-to-r from-[#2563EB] to-[#1d55d3]
        hover:from-[#2563EB] hover:to-[#06B6D4]
        transition-all duration-500
        shadow-[0_0_20px_rgba(37,99,235,0.3)]
        hover:shadow-[0_0_28px_rgba(6,182,212,0.4)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]/70`}
    >
      <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%]
                       bg-gradient-to-r from-transparent via-white/15 to-transparent
                       skew-x-[-20deg] transition-transform duration-700 ease-out pointer-events-none" />
      <span className="relative flex items-center justify-center gap-2 whitespace-nowrap">
        Agenda una reunión
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"
          className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-all duration-200">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </motion.button>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <motion.line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        style={{ originX: "50%", originY: "50%" }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }} />
      <motion.line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }} />
      <motion.line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        style={{ originX: "50%", originY: "50%" }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }} />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div style={{ opacity: navOpacity }}
          className="absolute inset-0 bg-[#0B1120]/85 backdrop-blur-xl border-b border-white/[0.06]" />
        <motion.div style={{ opacity: navOpacity }}
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-[68px]">

            <motion.a href="/" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              aria-label="Frost AI Solutions">
              <FrostLogo variant="full" size={32} />
            </motion.a>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href}
                  isActive={activeLink === link.href}
                  onClick={() => handleNavClick(link.href)}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <motion.a href="#demo-form"
                onClick={(e) => { e.preventDefault(); handleNavClick("#demo-form"); }}
                className="text-[13px] font-medium text-white/50 hover:text-white/80 transition-colors duration-200 px-2"
                whileHover={{ y: -0.5 }}>
                Iniciar sesión
              </motion.a>
              <CTAButton onClick={() => handleNavClick("#demo-form")} />
            </div>

            <motion.button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg
                         text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen((p) => !p)}
              whileTap={{ scale: 0.92 }}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}>
              <HamburgerIcon open={mobileOpen} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#0B1120]/60 backdrop-blur-sm md:hidden" />

            <motion.div key="drawer" ref={menuRef}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="fixed top-[76px] left-4 right-4 z-50 rounded-2xl overflow-hidden md:hidden
                         bg-[#0F1929]/95 backdrop-blur-2xl border border-white/10
                         shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px
                              bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />
              <div className="px-5 pt-4 pb-3 border-b border-white/[0.06]">
                <FrostLogo variant="full" size={26} />
              </div>
              <div className="p-4 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a key={link.href} href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.05, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium
                               text-white/65 hover:text-white hover:bg-white/5 transition-all duration-150 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/50 group-hover:bg-[#06B6D4] transition-colors" />
                    {link.label}
                  </motion.a>
                ))}
                <div className="my-3 h-px bg-white/[0.06]" />
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }} className="px-1 pb-1">
                  <CTAButton onClick={() => handleNavClick("#demo-form")} fullWidth />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
