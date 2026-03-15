import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import "@/index.css"; // The global CSS

export const metadata: Metadata = {
  title: "FGC Autos",
  description: "Premium Cars & Genuine Spare Parts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans bg-background text-foreground" suppressHydrationWarning>
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppFloat />
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
