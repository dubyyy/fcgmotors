"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Package, Truck, ArrowRight, MessageCircle, ChevronRight, Cog, Disc3, Zap, Filter, Sofa, Car, Lightbulb, CircuitBoard, Star, Quote, CheckCircle } from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import heroImg from "@/assets/hero-showroom.jpg";
import importImg from "@/assets/import-service.png";

const WHATSAPP_URL = "https://wa.me/2348000000000?text=Hello%20FGC%20Autos%2C%20I%27d%20like%20to%20make%20an%20inquiry.";

const partCategories = [
  { label: "Engine Parts", icon: Cog },
  { label: "Brake Systems", icon: Disc3 },
  { label: "Suspension", icon: Car },
  { label: "Electrical Parts", icon: CircuitBoard },
  { label: "Filters", icon: Filter },
  { label: "Interior", icon: Sofa },
  { label: "Body Parts", icon: Car },
  { label: "Lights", icon: Lightbulb },
];

const importSteps = [
  { step: "01", title: "Global Access", desc: "Select from exclusive, verified US, Canadian, and European luxury listings." },
  { step: "02", title: "Precision Inspection", desc: "Rigorous independent diagnostics to ensure uncompromising quality." },
  { step: "03", title: "Secure Transit", desc: "Premium containerized shipping completely covered by top-tier insurance." },
  { step: "04", title: "White-Glove Clearance", desc: "We manage all documentation and customs procedures quietly and efficiently." },
  { step: "05", title: "Doorstep Delivery", desc: "Your vehicle arrives in immaculate condition right to your driveway." },
];

const whyUs = [
  { icon: Shield, title: "Uncompromising Quality", desc: "Every vehicle undergoes an exhaustive multi-point inspection process. We only deal in perfection." },
  { icon: Package, title: "Authentic Parts Only", desc: "Our network sources exclusively from verified OEMs, ensuring true unadulterated performance." },
  { icon: Truck, title: "Nationwide Logistics", desc: "Seamless and secure transport across all states. You focus on the destination, we handle the journey." },
];

const testimonials = [
  { name: "Chinedu O.", text: "The entire process was masterfully handled from start to finish. I've bought countless cars over the years, but the transparency and luxury service here is simply unmatched. A true paradigm shift." },
  { name: "Amina S.", text: "Sourcing original parts in Nigeria has always been a nightmare until I found FGC Autos. Unbelievably fast delivery and absolute authenticity. They've earned a lifelong client." },
];

const stats = [
  { value: "10+", label: "Years in Business" },
  { value: "3,000+", label: "Vehicles Sold" },
  { value: "5,000+", label: "Customers Served" },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const fadeUpLarge = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerSlow = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function HomeClient({ vehicles }: { vehicles: any[] }) {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <img
          src={heroImg.src}
          alt="FGC Autos Showroom"
          className="absolute inset-0 w-full h-full object-cover img-editorial"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />
        <div className="relative container pb-16 sm:pb-20 md:pb-28 pt-32 sm:pt-40">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} className="spec-label text-white/80 mb-4 tracking-widest">THE STANDARD OF NIGERIAN MOTION</motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] text-background"
            >
              Premium Cars <span className="italic font-light opacity-80">&</span> <br/>Genuine <span className="italic">Spare Parts</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 text-base md:text-xl text-background/70 leading-relaxed max-w-lg font-medium">
              Curating Nigeria's finest automotive collection and authentic components for the discerning driver.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/cars"
                className="bg-white text-black hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full text-xs uppercase tracking-widest font-bold w-full sm:w-auto"
              >
                Browse Cars <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/spare-parts"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full text-xs uppercase tracking-widest font-bold border border-white/30 text-white hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto"
              >
                Shop Spare Parts
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 sm:mt-16 grid grid-cols-2 sm:flex sm:flex-row gap-x-8 gap-y-10 sm:gap-12 md:gap-16"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <p className="font-display text-3xl sm:text-4xl font-bold text-white tabular-price">{s.value}</p>
                <p className="spec-label text-white/50 mt-1 sm:mt-2 text-[9px] sm:text-[10px]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED VEHICLES */}
      <section className="section-padding relative bg-background overflow-hidden preserve-3d">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerSlow} className="max-w-xl">
              <motion.div variants={fadeUpLarge} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Featured Inventory
              </motion.div>
              <motion.h2 variants={fadeUpLarge} className="font-display text-4xl sm:text-5xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.1]">
                Impeccable<br/><span className="italic font-light">Vehicles.</span>
              </motion.h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Link href="/cars" className="group hidden md:inline-flex items-center gap-3 text-sm font-bold text-foreground bg-secondary/5 hover:bg-secondary/10 px-8 py-4 rounded-full transition-all duration-300">
                View Gallery <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
          
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {vehicles.map((v, i) => (
              <motion.div key={v.id || v.model} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.15, duration: 0.8, ease: EASE }}>
                <VehicleCard 
                  image={v.imageUrl || v.image}
                  brand={v.brand}
                  model={v.model}
                  year={v.year.toString()}
                  price={v.price}
                />
              </motion.div>
            ))}
            {vehicles.length === 0 && (
              <div className="col-span-full py-20 text-center border border-dashed border-border rounded-3xl">
                <p className="text-muted-foreground font-medium">New inventory arriving soon.</p>
              </div>
            )}
          </motion.div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/cars" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-foreground bg-secondary/5 hover:bg-secondary/10 px-8 py-4 rounded-full transition-all duration-300 w-full max-w-sm">
              View all vehicles <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SPARE PARTS */}
      <section className="section-padding relative bg-muted/40">
        <div className="container relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerSlow} className="text-center mb-10 sm:mb-16 md:mb-24 max-w-3xl mx-auto">
            <motion.div variants={fadeUpLarge} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Ultimate Reliability
            </motion.div>
            <motion.h2 variants={fadeUpLarge} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Authentic Components. No Compromises.
            </motion.h2>
            <motion.p variants={fadeUpLarge} className="text-muted-foreground text-base sm:text-lg md:text-xl font-medium leading-relaxed px-4 sm:px-0">
              We provide only 100% genuine OEM parts to keep your vehicle performing at its absolute peak.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerSlow}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
          >
            {partCategories.map((cat) => (
              <motion.div key={cat.label} variants={fadeUpLarge}>
                <Link
                  href="/spare-parts"
                  className="group relative flex flex-col items-center justify-center gap-3 sm:gap-5 p-4 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] bg-background border border-border/60 hover:border-primary/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-[1.5rem] bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-500">
                    <cat.icon className="w-6 h-6 sm:w-10 sm:h-10 text-foreground group-hover:text-primary transition-all duration-500 group-hover:scale-110" />
                  </div>
                  <span className="relative z-10 text-sm sm:text-lg font-bold text-foreground text-center">{cat.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* IMPORT SERVICE */}
      <section className="section-padding-hero relative bg-secondary text-secondary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-24 items-center">
            <div className="max-w-xl">
              <motion.div variants={fadeUpLarge} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                Global Network
              </motion.div>
              <motion.h2 variants={fadeUpLarge} className="font-display text-4xl sm:text-5xl lg:text-7xl font-medium tracking-tight mb-8 leading-[1.05]">
                Importation,<br/><span className="text-white/40 italic font-light">Redefined.</span>
              </motion.h2>
              <motion.p variants={fadeUpLarge} className="text-lg sm:text-xl text-secondary-foreground/70 leading-relaxed mb-12">
                Seamlessly source, inspect, and import exclusive vehicles from the US, Canada, and Europe. Absolute transparency, uncompromising care.
              </motion.p>
              
              <div className="space-y-10">
                {importSteps.map((s, idx) => (
                  <motion.div key={s.step} variants={fadeUpLarge} className="relative pl-14 group">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    {idx !== importSteps.length - 1 && (
                      <div className="absolute left-4 top-11 bottom-[-30px] w-[2px] bg-white/10 group-hover:bg-white/40 transition-colors duration-300" />
                    )}
                    <h3 className="text-2xl font-bold text-secondary-foreground mb-2">{s.title}</h3>
                    <p className="text-lg text-secondary-foreground/60 leading-relaxed">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <img src={importImg.src} alt="Import Service" className="w-full h-full object-cover img-editorial scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 right-4 sm:right-6 md:left-10">
                <div className="backdrop-blur-xl bg-black/40 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                      </div>
                      <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Active Fleet Logistics</span>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 transform group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500 text-white shadow-lg">
                      <Truck className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
                      <span className="text-white font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">42</span>
                      <span className="text-sm sm:text-base text-white/50 font-medium">Premium Vehicles</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '74%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="h-full bg-white rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/50 animate-pulse" />
                      </motion.div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-widest">
                      <span>In Transit: <span className="text-white/90">31</span></span>
                      <span>Clearing: <span className="text-white/90">11</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding relative bg-background">
        <div className="container">
          <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
               The FGC Autos Advantage
             </motion.div>
             <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-display text-4xl sm:text-5xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.1]">
               Elevating the<br/><span className="italic font-light">Industry Standard.</span>
             </motion.h2>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerSlow}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
          >
            {whyUs.map((item) => (
              <motion.div key={item.title} variants={fadeUpLarge} className="group p-10 lg:p-14 rounded-[3rem] bg-muted/40 border border-border/60 hover:bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors duration-500 -z-10" />
                <div className="w-20 h-20 rounded-[1.5rem] bg-background border border-border flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-sm">
                  <item.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display font-bold text-2xl lg:text-3xl text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-muted/30 overflow-hidden relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full -z-10" />
        
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                Client Trust
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.1]">
                Unparalleled<br/><span className="italic font-light">Experiences.</span>
              </h2>
            </div>
            <p className="text-muted-foreground font-medium text-base sm:text-lg md:text-xl max-w-sm">Every delivery represents a promise kept and an expectation exceeded.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: EASE }}
                className="relative p-8 sm:p-10 md:p-14 rounded-[2rem] sm:rounded-[3rem] bg-background border border-border/80 shadow-xl shadow-black/5 hover:border-primary/30 transition-colors duration-500 group"
              >
                <Quote className="absolute top-10 right-10 w-16 h-16 text-primary/10 group-hover:text-primary/20 transition-colors duration-500" />
                <div className="flex gap-1.5 mb-8">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-6 h-6 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground text-xl sm:text-2xl lg:text-3xl leading-snug font-medium mb-8 sm:mb-10 relative z-10 text-balance">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-5 mt-auto">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-muted group-hover:bg-primary/20 flex items-center justify-center font-bold text-foreground group-hover:text-primary text-2xl transition-colors duration-500">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-xl text-foreground">{t.name}</p>
                    <p className="text-base text-muted-foreground font-medium">Verified Client</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-20 sm:py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-secondary" />
        <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10 mix-blend-overlay" style={{ backgroundImage: `url(${heroImg.src})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-secondary" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] aspect-square bg-primary/20 rounded-full blur-[200px] pointer-events-none" />
        
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="max-w-5xl mx-auto bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl sm:rounded-[4rem] p-8 sm:p-12 md:p-24 text-center shadow-2xl overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-medium tracking-tighter text-white mb-6 sm:mb-8 leading-[0.9]">
                Ready to Upgrade<br/><span className="italic font-light opacity-60">Your Drive?</span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/70 leading-relaxed mb-8 sm:mb-12 max-w-3xl mx-auto font-medium">
                Link up with our world-class concierge today. We're on standby to pair you with your perfect vehicle.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold text-[11px] uppercase tracking-widest overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-300 w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-black/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                  <MessageCircle className="w-6 h-6 relative z-10 group-hover/btn:animate-pulse" />
                  <span className="relative z-10">Concierge Desk</span>
                </a>
                <Link
                  href="/cars"
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-white/20 text-white hover:bg-white/10 rounded-full font-bold text-[11px] uppercase tracking-widest backdrop-blur-sm transition-colors duration-300 w-full sm:w-auto"
                >
                  Explore Inventory
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
