import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { Montserrat, Bodoni_Moda } from "next/font/google";
import "@/index.css"; 

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FGC Autos | Premium Luxury Cars & Genuine Spare Parts Nigeria",
    template: "%s | FGC Autos"
  },
  description: "Nigeria's premier destination for high-end luxury vehicles and 100% genuine OEM spare parts. Expert car importation services from US, Canada & Europe.",
  keywords: ["Luxury cars Nigeria", "Genuine spare parts Lagos", "Car importation Nigeria", "FGC Autos", "Buy Mercedes Benz Nigeria", "OEM car parts Nigeria", "Luxury vehicle dealer Lagos"],
  authors: [{ name: "FGC Autos" }],
  creator: "FGC Autos",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://fgcautos.com",
    title: "FGC Autos | The Standard of Nigerian Motion",
    description: "Curating Nigeria's finest automotive collection and authentic components for the discerning driver.",
    siteName: "FGC Autos",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FGC Autos Luxury Showroom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FGC Autos | Luxury Cars & Spare Parts",
    description: "Premium automotive collection and authentic components in Nigeria.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://fgcautos.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${bodoni.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground" suppressHydrationWarning>
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
