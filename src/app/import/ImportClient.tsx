"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const steps = [
  { step: "01", title: "Choose Vehicle", desc: "Browse US, Canada & Europe auction listings or tell us exactly what you need." },
  { step: "02", title: "We Inspect", desc: "Independent pre-purchase inspection with detailed photo/video report." },
  { step: "03", title: "We Ship", desc: "Containerized shipping with marine insurance and real-time tracking." },
  { step: "04", title: "Nigeria Clearance", desc: "Full customs documentation and port clearance handled by our team." },
  { step: "05", title: "Delivery", desc: "Door-to-door delivery to any location in Nigeria." },
];

const WHATSAPP_URL = "https://wa.me/2348030523555?text=I%27m%20interested%20in%20your%20vehicle%20importation%20service.";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function ImportClient() {
  return (
    <main className="pt-24 md:pt-28">
      <section className="section-padding-hero bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="spec-label text-primary mb-2">Import Service</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Car Importation to Nigeria</h1>
            <p className="mt-4 text-secondary-foreground/70 leading-relaxed text-base sm:text-lg max-w-xl">
              We source, inspect, and deliver vehicles from the US, Canada, and Europe to any location in Nigeria. Full transparency, port clearance, and end-to-end service.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-action flex sm:inline-flex items-center justify-center gap-2 px-6 py-4 sm:py-3 rounded-btn text-sm sm:text-base font-semibold mt-8 sm:mt-10 tracking-wide"
            >
              <MessageCircle className="w-5 h-5 sm:w-4 sm:h-4" />
              Start Import Inquiry
            </a>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-5 gap-6"
          >
            {steps.map((s) => (
              <motion.div key={s.step} variants={fadeUp} className="p-6 rounded-card bg-secondary-foreground/5 border border-secondary-foreground/10">
                <span className="font-display text-3xl font-bold text-primary/30">{s.step}</span>
                <h3 className="font-display font-semibold text-base mt-2">{s.title}</h3>
                <p className="text-sm text-secondary-foreground/60 mt-1 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
