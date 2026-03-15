"use client";

import { motion } from "framer-motion";

interface VehicleCardProps {
  image: string | { src: string };
  brand: string;
  model: string;
  year: string;
  price: string;
  mileage?: string;
  fuel?: string;
  transmission?: string;
}

const WHATSAPP_BASE = "https://wa.me/2348000000000?text=";

export default function VehicleCard({ image, brand, model, year, price, mileage = "45,000 km", fuel = "Petrol", transmission = "Automatic" }: VehicleCardProps) {
  const whatsappText = encodeURIComponent(
    `I'm interested in the ${year} ${brand} ${model} (${price}). Is it available for inspection?`
  );

  return (
    <motion.div
      className="group card-lift rounded-card overflow-hidden bg-card border border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={typeof image === 'string' ? image : image.src}
          alt={`${year} ${brand} ${model}`}
          className="w-full h-full object-cover img-editorial transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-sm">
          Verified
        </div>
      </div>

      {/* Spec strip */}
      <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-2 sm:py-2.5 border-b border-border bg-muted/50 overflow-x-auto scroller-hide">
        <span className="spec-label text-[9px] sm:text-[10px] whitespace-nowrap tabular-price">{year}</span>
        <span className="w-px h-3 bg-border shrink-0" />
        <span className="spec-label text-[9px] sm:text-[10px] whitespace-nowrap tabular-price">{mileage}</span>
        <span className="w-px h-3 bg-border shrink-0" />
        <span className="spec-label text-[9px] sm:text-[10px] whitespace-nowrap">{fuel}</span>
        <span className="w-px h-3 bg-border shrink-0" />
        <span className="spec-label text-[9px] sm:text-[10px] whitespace-nowrap">{transmission}</span>
      </div>

      {/* Details */}
      <div className="p-4 sm:p-5 flex flex-row items-end justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h3 className="font-display font-bold text-lg text-foreground">
            {brand} {model}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{year} Model</p>
        </div>
        <p className="font-display font-bold text-lg text-primary tabular-price whitespace-nowrap shrink-0">
          {price}
        </p>
      </div>

      {/* CTA */}
      <div className="px-4 sm:px-5 pb-5">
        <a
          href={`${WHATSAPP_BASE}${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="gold-action w-full inline-flex items-center justify-center gap-2 py-3 rounded-btn text-xs sm:text-sm font-semibold tracking-wider"
        >
          Book Inspection
        </a>
      </div>
    </motion.div>
  );
}
