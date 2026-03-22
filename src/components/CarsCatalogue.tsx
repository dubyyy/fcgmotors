"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import VehicleCard from "@/components/VehicleCard";

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  imageUrl: string;
  description: string;
}

interface CarsCatalogueProps {
  initialCars: Car[];
}

const brands = ["All", "Toyota", "Lexus", "Mercedes"];

export default function CarsCatalogue({ initialCars }: CarsCatalogueProps) {
  const [activeBrand, setActiveBrand] = useState("All");

  const filtered = activeBrand === "All" 
    ? initialCars 
    : initialCars.filter((v) => v.brand.toLowerCase() === activeBrand.toLowerCase());

  return (
    <div className="container">
      <div className="mb-12">
        <p className="spec-label text-primary mb-2">Inventory</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">Vehicle Catalogue</h1>
        <p className="mt-3 text-muted-foreground max-w-lg">Browse our selection of market-verified, inspected vehicles ready for delivery.</p>
      </div>

      {/* Filters */}
      <div className="flex overflow-x-auto scroller-hide gap-2 sm:gap-3 mb-8 sm:mb-10 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {brands.map((b) => (
          <button
            key={b}
            onClick={() => setActiveBrand(b)}
            className={`flex-shrink-0 px-4 py-2 rounded-btn text-[13px] sm:text-sm font-medium transition-colors duration-200 border ${
              activeBrand === b
                ? "gold-action border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((v) => (
          <VehicleCard 
            key={v.id} 
            image={v.imageUrl}
            brand={v.brand}
            model={v.model}
            year={v.year.toString()}
            price={v.price}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-muted-foreground font-medium">No vehicles found in this category.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
