"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Cog, Disc3, Zap, Filter, Sofa, Car, Lightbulb, CircuitBoard } from "lucide-react";

const categories = [
  { label: "All", icon: null },
  { label: "Engine Parts", icon: Cog },
  { label: "Brake Systems", icon: Disc3 },
  { label: "Suspension", icon: Car },
  { label: "Electrical", icon: CircuitBoard },
  { label: "Filters", icon: Filter },
  { label: "Interior", icon: Sofa },
  { label: "Body Parts", icon: Car },
  { label: "Lights", icon: Lightbulb },
];

const spareParts = [
  { name: "Toyota Camry Brake Pad Set", category: "Brake Systems", brand: "Toyota", price: "₦25,000" },
  { name: "Lexus RX 350 Air Filter", category: "Filters", brand: "Lexus", price: "₦15,000" },
  { name: "Mercedes C300 Headlight Assembly", category: "Lights", brand: "Mercedes", price: "₦185,000" },
  { name: "Toyota Corolla Engine Mount", category: "Engine Parts", brand: "Toyota", price: "₦35,000" },
  { name: "Lexus ES Shock Absorber", category: "Suspension", brand: "Lexus", price: "₦65,000" },
  { name: "Mercedes E350 Alternator", category: "Electrical", brand: "Mercedes", price: "₦120,000" },
  { name: "Toyota Camry Door Mirror", category: "Body Parts", brand: "Toyota", price: "₦45,000" },
  { name: "Lexus RX Dashboard Trim", category: "Interior", brand: "Lexus", price: "₦55,000" },
];

const WHATSAPP_BASE = "https://wa.me/2348000000000?text=";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function SpareParts() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? spareParts : spareParts.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-24 md:pt-28">
      <section className="section-padding bg-background">
        <div className="container">
          <div className="mb-12">
            <p className="spec-label text-primary mb-2">Catalogue</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">Spare Parts</h1>
            <p className="mt-3 text-muted-foreground max-w-lg">Genuine, authenticated parts for all major vehicle brands.</p>
          </div>

          <div className="flex overflow-x-auto scroller-hide gap-2 sm:gap-3 mb-8 sm:mb-10 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((c) => (
              <button
                key={c.label}
                onClick={() => setActiveCategory(c.label)}
                className={`flex-shrink-0 px-4 py-2 rounded-btn text-[13px] sm:text-sm font-medium transition-colors duration-200 border ${
                  activeCategory === c.label
                    ? "gold-action border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((part) => (
              <motion.div
                key={part.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-5 rounded-card bg-card border border-border card-lift"
              >
                <span className="spec-label text-primary">{part.category}</span>
                <h3 className="font-display font-semibold text-sm mt-2 text-foreground">{part.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{part.brand}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-display font-bold text-base text-primary tabular-price">{part.price}</p>
                  <a
                    href={`${WHATSAPP_BASE}${encodeURIComponent(`I'd like to request: ${part.name} (${part.price})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-action inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-xs font-semibold"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Request
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
