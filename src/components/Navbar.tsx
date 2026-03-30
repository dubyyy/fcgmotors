"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Cars", href: "/cars" },
  { label: "Spare Parts", href: "/spare-parts" },
  { label: "Import Service", href: "/import" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const WHATSAPP_URL = "https://wa.me/2348030523555?text=Hello%20FGC%20Autos%2C%20I%27d%20like%20to%20make%20an%20inquiry.";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Do not show navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isHeroTransparent = (pathname === "/" || pathname?.startsWith("/cars/")) && !scrolled;
  const navTextColor = isHeroTransparent ? "text-white" : "text-foreground";
  const navHoverColor = isHeroTransparent ? "hover:text-white" : "hover:text-foreground";
  const navMutedColor = isHeroTransparent ? "text-white/90" : "text-muted-foreground";
  const navBorderColor = isHeroTransparent ? "border-white/30" : "border-foreground/30";
  const navLineColor = isHeroTransparent ? "bg-white" : "bg-foreground";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled ? "glass-panel shadow-sm py-0" : "bg-transparent py-2"
        }`}
      // translateZ(0) forces a GPU compositing layer so iOS Safari keeps
      // the fixed element's touch hit-test area in sync after scrolling.
      style={{ transform: "translateZ(0)", willChange: "transform" }}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20 gap-2">
        {/* Logo */}
        <Link
          href="/"
          className={`relative group font-display flex items-center justify-center z-50 shrink-0 ${navTextColor}`}
          onClick={() => setOpen(false)}
        >
          <div className="flex flex-col leading-none">
            <div className="flex items-center">
              <span className="font-bold tracking-[0.3em] text-xl sm:text-2xl">FGC</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary mx-1.5" />
              <span className="italic font-light tracking-[0.15em] text-xl sm:text-2xl opacity-100">AUTOS</span>
            </div>
            <span className="text-[8px] uppercase tracking-[0.5em] mt-1 opacity-80 font-sans font-bold">Nigeria's Finest</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-6 lg:gap-8 mx-auto">
          {navLinks.map((l) => {
            const isActive = pathname === l.href;
            return (
              <li key={l.href} className="relative py-2">
                <Link
                  href={l.href}
                  className={`relative z-10 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-500 ${isActive ? navTextColor : `${navMutedColor} ${navHoverColor}`
                    }`}
                >
                  {l.label}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className={`absolute -bottom-1 left-0 right-0 h-[1px] z-0 ${navLineColor}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </li>
            );
          })}
        </ul>


        {/* Mobile toggle — pill backdrop ensures icon is always readable regardless of page bg */}
        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden relative z-50 p-2 -mr-2 focus:outline-none shrink-0 transition-colors duration-300 ${navTextColor}`}
          style={{ touchAction: "manipulation" }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <motion.div
            animate={open ? "open" : "closed"}
            className="relative w-6 h-6 flex items-center justify-center"
          >
            <AnimatePresence mode="popLayout">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </button>
      </nav>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile menu dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[4.5rem] z-50 mx-3 lg:hidden overflow-hidden"
          >
            {/* Dark panel — solid background so appearance is identical on every route */}
            <div
              className="rounded-2xl p-6 shadow-2xl"
              style={{
                background: "hsl(var(--foreground))",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Menu header */}
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
                Navigation
              </p>
              <nav>
                <motion.ul
                  className="flex flex-col"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.07,
                        delayChildren: 0.05,
                      },
                    },
                  }}
                >
                  {navLinks.map((l) => {
                    const isActive = pathname === l.href;
                    return (
                      <motion.li
                        key={l.href}
                        variants={{
                          hidden: { opacity: 0, x: -16 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                        className="last:border-b-0"
                      >
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between py-4 group"
                        >
                          <span
                            className="text-xl font-light tracking-wide transition-colors duration-300"
                            style={{
                              fontFamily: "'Bodoni Moda', serif",
                              color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.55)",
                            }}
                          >
                            {l.label}
                          </span>
                          <motion.span
                            style={{ color: "rgba(255,255,255,0.7)" }}
                            className={`transition-all duration-300 ${
                              isActive
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
                            }`}
                          >
                            →
                          </motion.span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              {/* Footer actions */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col gap-4 mt-6 pt-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex flex-col gap-2">
                  <p className="text-[11px] flex items-center gap-2.5 font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0"
                      style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
                    >L</span>
                    Lagos showroom open Mon–Sat
                  </p>
                  <p className="text-[11px] flex items-center gap-2.5 font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0"
                      style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
                    >T</span>
                    Nationwide delivery across Nigeria
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
