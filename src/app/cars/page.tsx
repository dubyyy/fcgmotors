"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import VehicleCard from "@/components/VehicleCard";
import camryImg from "@/assets/car-camry.jpg";
import lexusImg from "@/assets/car-lexus.jpg";
import mercedesImg from "@/assets/car-mercedes.jpg";

const allVehicles = [
  { image: camryImg, brand: "Toyota", model: "Camry", year: "2018", price: "₦14,500,000", fuel: "Petrol", transmission: "Automatic" },
  { image: lexusImg, brand: "Lexus", model: "RX 350", year: "2017", price: "₦24,000,000", fuel: "Petrol", transmission: "Automatic" },
  { image: mercedesImg, brand: "Mercedes", model: "C300", year: "2016", price: "₦19,000,000", fuel: "Petrol", transmission: "Automatic" },
  { image: camryImg, brand: "Toyota", model: "Corolla", year: "2020", price: "₦12,000,000", fuel: "Petrol", transmission: "Automatic" },
  { image: lexusImg, brand: "Lexus", model: "ES 350", year: "2019", price: "₦20,000,000", fuel: "Petrol", transmission: "Automatic" },
  { image: mercedesImg, brand: "Mercedes", model: "E350", year: "2018", price: "₦28,000,000", fuel: "Petrol", transmission: "Automatic" },
];

const brands = ["All", "Toyota", "Lexus", "Mercedes"];

export default function Cars() {
  const [activeBrand, setActiveBrand] = useState("All");

  const filtered = activeBrand === "All" ? allVehicles : allVehicles.filter((v) => v.brand === activeBrand);

  return (
    <main className="pt-24 md:pt-28">
      <section className="section-padding bg-background">
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
            {filtered.map((v, i) => (
              <VehicleCard key={`${v.brand}-${v.model}-${i}`} {...v} />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
