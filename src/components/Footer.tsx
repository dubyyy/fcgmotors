"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="max-w-xs">
            <h3 className="font-display mb-6">
              <div className="flex items-center">
                <span className="font-bold tracking-[0.3em] text-2xl text-white">FGC</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary mx-2" />
                <span className="italic font-light tracking-[0.15em] text-2xl text-white/90">AUTOS</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.5em] mt-2 opacity-40 font-sans font-bold text-white">Nigeria's Finest</div>
            </h3>
            <p className="text-sm text-secondary-foreground/60 leading-relaxed font-medium">
              Curating Nigeria's finest automotive collection and authentic components for the discerning driver. Over a decade of uncompromising excellence and trust.
            </p>
          </div>

          <div>
            <h4 className="spec-label mb-4 text-secondary-foreground/50">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Browse Cars", href: "/cars" },
                { label: "Spare Parts", href: "/spare-parts" },
                { label: "Import Service", href: "/import" },
                { label: "About Us", href: "/about" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="spec-label mb-4 text-secondary-foreground/50">Contact</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/70">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary shrink-0" /><span>+234 803 052 3555</span></li>
              <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-primary shrink-0" /><span>WhatsApp</span></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary shrink-0" /><span>ceo@fgcautosltd.com</span></li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" /><span>Lagos, Nigeria</span></li>
            </ul>
          </div>

          <div>
            <h4 className="spec-label mb-4 text-secondary-foreground/50">Business Hours</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>Mon – Fri: 8AM – 6PM</li>
              <li>Saturday: 9AM – 4PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-foreground/40">© 2026 FGC Autos. All rights reserved.</p>
          <p className="text-xs text-secondary-foreground/40">The Standard of Nigerian Motion.</p>
        </div>
      </div>
    </footer>
  );
}
