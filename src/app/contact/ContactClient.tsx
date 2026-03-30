"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/2348030523555?text=Hello%20FGC%20Autos%2C%20I%27d%20like%20to%20make%20an%20inquiry.";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/2348030523555?text=${text}`, "_blank");
  };

  return (
    <main className="pt-24 md:pt-28">
      <section className="section-padding bg-background">
        <div className="container">
          <div className="mb-12">
            <p className="spec-label text-primary mb-2">Get in Touch</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">Contact FGC Autos</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.form
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {[
                { key: "name", label: "Name", type: "text", placeholder: "Your full name" },
                { key: "phone", label: "Phone", type: "tel", placeholder: "+234..." },
                { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
              ].map((f) => (
                <motion.div key={f.key} variants={fadeUp}>
                  <label className="spec-label mb-2 block">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-btn border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </motion.div>
              ))}
              <motion.div variants={fadeUp}>
                <label className="spec-label mb-2 block">Message</label>
                <textarea
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-btn border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <button type="submit" className="gold-action w-full py-3 rounded-btn text-sm font-semibold shadow-xl">
                  Send via WhatsApp
                </button>
              </motion.div>
            </motion.form>

            <div className="space-y-8">
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-4">Contact Details</h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /> +234 803 052 3555</li>
                  <li className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">Official WhatsApp</a>
                  </li>
                  <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /> ceo@fgcautosltd.com</li>
                  <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <span className="flex-1">154 Obafemi Awolowo Way, Central Business District, Ikeja, Lagos</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-4">Business Hours</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Monday – Friday: 8:00 AM – 6:00 PM</li>
                  <li>Saturday: 9:00 AM – 4:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
