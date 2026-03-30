"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface VehicleCardProps {
  id?: string | number;
  image: string | { src: string };
  brand: string;
  model: string;
  year: string;
  price: string;
  mileage?: string;
  fuel?: string;
  transmission?: string;
}

const WHATSAPP_BASE = "https://wa.me/2348030523555?text=";

export default function VehicleCard({ id, image, brand, model, year, price, mileage = "45,000 km", fuel = "Petrol", transmission = "Automatic" }: VehicleCardProps) {
  const whatsappText = encodeURIComponent(
    `I'm interested in the ${year} ${brand} ${model} (${price}). Is it available for inspection?`
  );

  return (
    <motion.div
      className="group bg-card border border-border/60 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={typeof image === 'string' ? image : (image?.src || '')}
          alt={`${year} ${brand} ${model}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 left-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-full shadow-xl">
            Verified
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex gap-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-md border border-white/10">{fuel}</span>
            <span className="bg-white/20 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-md border border-white/10">{transmission}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-1">{brand}</p>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground leading-tight">
              {model}
            </h3>
          </div>
          <div className="text-right">
            <p className="font-display font-bold text-lg sm:text-xl text-foreground tabular-price">
              {price}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{year} Model</p>
          </div>
        </div>

        <div className="flex items-center gap-4 py-4 border-y border-border/50 mb-6">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-0.5">Mileage</span>
            <span className="text-xs font-bold text-foreground tabular-price">{mileage}</span>
          </div>
          <div className="w-px h-6 bg-border/50" />
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-0.5">Condition</span>
            <span className="text-xs font-bold text-foreground">Pristine</span>
          </div>
        </div>

        <Link
          href={`/cars/${id || `${brand.toLowerCase()}-${model.toLowerCase()}`.replace(/\s+/g, '-')}`}
          className="group/btn relative w-full inline-flex items-center justify-center gap-2 py-4 bg-secondary text-secondary-foreground rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-primary hover:text-white overflow-hidden shadow-lg shadow-black/5"
        >
          <span className="relative z-10">View Details</span>
          <motion.span className="relative z-10 transition-transform group-hover/btn:translate-x-1">→</motion.span>
        </Link>
      </div>
    </motion.div>
  );
}
