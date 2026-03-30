"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

interface SparePart {
  id: number;
  name: string;
  partNumber?: string | null;
  category: string;
  price: string;
  imageUrls?: string[];
  imageUrl?: string;
  description: string;
  createdAt?: Date;
}

interface SparePartsCatalogueProps {
  initialParts: SparePart[];
}

const WHATSAPP_BASE = "https://wa.me/2348030523555?text=";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function SparePartsCatalogue({ initialParts }: SparePartsCatalogueProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const dynamicCategories = ["All", ...Array.from(new Set(initialParts.map(p => p.category).filter(Boolean)))];

  const filtered = activeCategory === "All" 
    ? initialParts 
    : initialParts.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="container">
      <div className="mb-12">
        <p className="spec-label text-primary mb-2">Catalogue</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">Spare Parts</h1>
        <p className="mt-3 text-muted-foreground max-w-lg">Genuine, authenticated parts for all major vehicle brands.</p>
      </div>

      {/* Dynamic Filters */}
      <div className="flex overflow-x-auto scroller-hide gap-2 sm:gap-3 mb-8 sm:mb-10 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {dynamicCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as string)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-[13px] sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
              activeCategory === cat
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-slate-50"
            }`}
          >
            {cat as string}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((part) => (
          <motion.div
            key={part.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="group rounded-card bg-card border border-border overflow-hidden card-lift flex flex-col h-full"
          >
            {/* Image Section */}
            <div className="relative aspect-[5/4] overflow-hidden bg-secondary">
               <Image 
                 src={part.imageUrls?.[0] || part.imageUrl || "/placeholder.jpg"} 
                 alt={part.name} 
                 fill
                 className="object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
               />
               <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm">
                 {part.category}
               </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <div className="flex-grow">
                <h3 className="font-display font-bold text-sm text-foreground line-clamp-1">{part.name}</h3>
                <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-medium">SKU: {part.partNumber || "GENUINE-OEM"}</p>
              </div>
              
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <p className="font-display font-bold text-base text-primary tabular-price">{part.price}</p>
                <a
                  href={`${WHATSAPP_BASE}${encodeURIComponent(`I'd like to request: ${part.name} (${part.price})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-action inline-flex items-center gap-2 px-4 py-2 rounded-btn text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary/5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Request
                </a>
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center bg-muted/20 border border-dashed border-border rounded-3xl">
            <p className="text-muted-foreground font-medium">No components found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
