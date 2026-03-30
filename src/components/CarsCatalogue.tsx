"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VehicleCard from "@/components/VehicleCard";

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  category: string;
  imageUrls: string[];
  description: string;
}

interface CarsCatalogueProps {
  initialCars: Car[];
}

export default function CarsCatalogue({ initialCars }: CarsCatalogueProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Dynamically extract distinct categories from the car inventory
  const categories = ["All", ...Array.from(new Set(initialCars.map(c => c.category).filter(Boolean)))];

  const filtered = activeCategory === "All" 
    ? initialCars 
    : initialCars.filter((v) => v.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="container">
      <div className="mb-12">
        <p className="spec-label text-primary mb-2">Inventory</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">Vehicle Catalogue</h1>
        <p className="mt-3 text-muted-foreground max-w-lg">Browse our selection of market-verified, inspected vehicles ready for delivery.</p>
      </div>

      {/* Dynamic Filters */}
      <div className="flex overflow-x-auto scroller-hide gap-2 sm:gap-3 mb-8 sm:mb-10 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-[13px] sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
              activeCategory === cat
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((v) => (
            <motion.div
              layout
              key={v.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <VehicleCard 
                id={v.id}
                image={v.imageUrls?.[0]}
                brand={v.brand}
                model={v.model}
                year={v.year.toString()}
                price={v.price}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="col-span-full py-32 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
            <p className="text-muted-foreground font-display italic text-lg">No vehicles found in this category.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
