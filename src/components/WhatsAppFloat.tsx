"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/2348030523555?text=Hello%20FGC%20Autos%2C%20I%27d%20like%20to%20make%20an%20inquiry.";

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 gold-action flex items-center gap-2 px-5 py-3 rounded-full shadow-xl text-sm font-semibold lg:hidden"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span>WhatsApp</span>
    </a>
  );
}
