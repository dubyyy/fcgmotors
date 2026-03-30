"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Users, Award, Zap, Globe, Package, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function AboutClient() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroImageOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.5]);
  const heroTextScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.05]);

  return (
    <main className="bg-background overflow-hidden" ref={containerRef}>
      {/* 1. Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <motion.div 
          className="absolute inset-0 z-0 bg-black"
          style={{ opacity: heroImageOpacity }}
        >
          <Image 
            src="/about_hero.png" 
            alt="FGC Autos Luxury" 
            fill
            priority
            className="object-cover grayscale brightness-[0.4]"
            sizes="100vw"
          />
        </motion.div>
        
        <div className="container relative z-10 text-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ scale: heroTextScale }}
          >
            <motion.p variants={fadeUp} className="spec-label text-white/90 mb-6 tracking-[0.4em]">
              Established 2012
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-8xl font-medium tracking-tight mb-8">
              Excellence <br className="hidden md:block" /> Without Compromise
            </motion.h1>
            <motion.div variants={fadeUp} className="w-px h-24 bg-white/40 mx-auto mt-12 mb-4 hidden md:block" />
            <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-lg md:text-xl text-white font-light leading-relaxed px-4">
              Nigeria's premier destination for high-end automotive procurement, logistical precision, and luxury vehicle solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="section-padding bg-background relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
            >
              <div className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden group">
                <Image 
                  src="/about_story.png" 
                  alt="Craftsmanship" 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
              </div>
            </motion.div>

            <div className="space-y-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.p variants={fadeUp} className="spec-label mb-2">Our Origins</motion.p>
                <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display mb-6">
                  A Legacy of <br /> Engineering and Trust.
                </motion.h2>
                <motion.div variants={fadeUp} className="space-y-6 text-foreground/80 leading-relaxed font-normal">
                  <p>
                    Founded over a decade ago, FGC Autos began with a simple yet ambitious vision: to redefine the automotive landscape in Nigeria by bringing international standards of transparency and quality to the local market.
                  </p>
                  <p>
                    What started as a small specialist firm has evolved into Nigeria's most trusted name in luxury vehicle importation and genuine spare parts sourcing. Our journey is paved with high-performance vehicles and the trust of over 5,000 satisfied clients.
                  </p>
                  <p>
                    We don't just sell cars; we curate experiences that match the ambition of our clientele. Every vehicle in our showroom and every part in our warehouse undergoes a rigorous multi-point verification process.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeUp} className="pt-8 grid grid-cols-2 gap-8 border-t border-border mt-12">
                  <div>
                    <h4 className="text-3xl font-display font-bold">12+</h4>
                    <p className="spec-label mt-1">Years of Excellence</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-display font-bold">5K+</h4>
                    <p className="spec-label mt-1">Clients Served</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-display mb-4">The FGC Standard</h2>
            <div className="h-px w-20 bg-primary mx-auto mb-6" />
            <p className="text-foreground/90 font-medium tracking-wide">Our operations are guided by four unwavering pillars that ensure we remain at the pinnacle of the Nigerian automotive industry.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Shield, 
                title: "Absolute Integrity", 
                desc: "We provide complete CARFAX reports and auction details for every importation. No hidden repairs, no altered mileages." 
              },
              { 
                icon: Globe, 
                title: "Global Sourcing", 
                desc: "Direct access to luxury auctions in USA, United Arab Emirates, and Europe, giving you a world of choice at your fingertips." 
              },
              { 
                icon: Package, 
                title: "Genuine Precision", 
                desc: "Our spare parts division deals exclusively in OEM components, ensuring your vehicle performs as intended by the manufacturer." 
              },
              { 
                icon: Award, 
                title: "Mastery of Craft", 
                desc: "Our technicians and consultants are industry veterans who understand the nuances of luxury brand maintenance." 
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: EASE }}
                className="bg-background p-10 rounded-2xl border border-border group hover:border-primary/30 transition-all card-lift shadow-sm"
              >
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4 text-foreground">{value.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed font-medium">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why FGC section (The Process) */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-12"
                >
                  <div className="space-y-4">
                    <p className="spec-label">Our Philosophy</p>
                    <h2 className="text-4xl md:text-5xl font-display leading-tight text-foreground">Why the Elite <br /> Choose FGC Autos</h2>
                    <p className="text-foreground/80 text-lg font-medium">In a market filled with uncertainty, FGC Autos stands as a beacon of reliability and professional automotive logistics.</p>
                  </div>

                  <div className="space-y-10">
                    {[
                      { 
                        title: "Transparent Importation Flow", 
                        desc: "From the first bid at auction to the final clearance at the port, you are informed at every milestone with tracking and real-time updates."
                      },
                      { 
                        title: "Bespoke Concierge Sourcing", 
                        desc: "Looking for a limited edition color or a specific performance package? Our consultants specialize in finding the exact configuration you desire."
                      },
                      { 
                        title: "End-to-End Asset Protection", 
                        desc: "Every vehicle we ship is fully insured and handled with extreme care by our specialized logistics partners."
                      },
                    ].map((item, idx) => (
                      <motion.div variants={fadeUp} key={idx} className="flex gap-6 items-start">
                        <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold font-sans">
                          0{idx + 1}
                        </div>
                        <div>
                          <h4 className="text-xl font-display font-semibold mb-2 text-foreground">{item.title}</h4>
                          <p className="text-foreground/70 leading-relaxed text-sm font-medium">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE }}
                  className="relative group aspect-video lg:aspect-square overflow-hidden rounded-2xl"
                >
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-muted/50 rounded-full blur-3xl z-0" />
                  <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl z-0" />
                  <Image 
                    src="https://images.unsplash.com/photo-1549399542-7e3f8b79c34b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Luxury Interior" 
                    fill
                    className="relative z-10 grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 shadow-lg object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 z-20 border-[20px] border-background -m-8 pointer-events-none rounded-2xl hidden lg:block" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Statement of Quality */}
      <section className="section-padding bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
              >
              <h3 className="font-display text-2xl md:text-3xl italic mb-10 leading-relaxed font-light">
                "We don't just sell vehicles; we facilitate the pursuit of engineering excellence and the prestige that comes with it. Our reputation is built on the vehicles we deliver and the relationships we've nurtured over the last decade."
              </h3>
              <div className="w-16 h-px bg-white/40 mx-auto mb-6" />
              <p className="spec-label text-white/70">Management, FGC Autos Limited</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="section-padding bg-background">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-5xl mx-auto bg-muted/30 border border-border rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-display mb-8 text-foreground">Begin Your Journey</h2>
              <p className="text-foreground/80 text-lg mb-12 max-w-xl mx-auto font-medium">
                Whether you are looking for your next luxury sedan or require a persistent supply of genuine parts, our team is ready to assist.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/cars" 
                  className="px-10 py-5 bg-primary text-white rounded-full font-semibold hover:bg-black/90 transition-all flex items-center gap-2 group shadow-lg"
                >
                  Explore Inventory
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  href="/contact" 
                  className="px-10 py-5 bg-transparent border border-black text-black hover:bg-black/5 rounded-full font-semibold transition-all"
                >
                  Consult an Expert
                </Link>
              </div>
            </div>
            
            {/* Background micro-elements */}
            <div className="absolute top-10 left-10 w-24 h-24 border border-black/[0.03] rounded-full" />
            <div className="absolute bottom-10 right-10 w-32 h-32 border border-black/[0.03] rounded-full" />
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-border bg-background">
        <div className="container text-center">
          <p className="spec-label text-[10px]">FGC Autos — Automotive Excellence Guaranteed</p>
        </div>
      </footer>
    </main>
  );
}
