"use client";

import { motion } from "framer-motion";
import { Shield, Users, Award } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function About() {
  return (
    <main className="pt-24 md:pt-28">
      <section className="section-padding-hero bg-background">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.p variants={fadeUp} className="spec-label text-primary mb-2">About Us</motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Trusted Automotive Dealer in Nigeria
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-muted-foreground leading-relaxed text-lg">
              FGC Autos has been supplying vehicles and spare parts across Nigeria for over a decade.
              We combine market expertise with rigorous inspection standards to deliver vehicles and parts that meet international quality benchmarks.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground leading-relaxed">
              From sourcing pre-owned luxury vehicles to stocking genuine OEM spare parts, every product in our catalogue is authenticated and market-verified. Our importation service provides full transparency — from auction bid to doorstep delivery.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Integrity", desc: "Every vehicle comes with a verified inspection report. No surprises." },
              { icon: Users, title: "Customer First", desc: "5,000+ satisfied customers across Nigeria trust our service." },
              { icon: Award, title: "Excellence", desc: "10+ years of consistent quality and market-leading standards." },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-center p-8"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
