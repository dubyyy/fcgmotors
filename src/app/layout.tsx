import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { Montserrat, Bodoni_Moda } from "next/font/google";
import Link from "next/link";
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
          <Link
            href="http://wa.me/2348030523555"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            style={{
              position: 'fixed',
              right: '24px',
              bottom: '24px',
              zIndex: 1000,
              background: '#25D366',
              borderRadius: '50%',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transition: 'background 0.2s',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="white"
            >
              <path d="M16 3C9.373 3 4 8.373 4 15c0 2.485.81 4.785 2.188 6.688L4 29l7.406-2.125C13.187 27.59 14.56 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.282 0-2.53-.25-3.688-.719l-.26-.104-4.406 1.25 1.25-4.281-.166-.271C6.813 18.062 6 16.562 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.354-7.927c-.293-.146-1.734-.857-2.004-.955-.27-.099-.468-.146-.666.147-.198.293-.764.955-.937 1.15-.172.195-.344.22-.637.073-.293-.146-1.236-.455-2.357-1.453-.87-.776-1.458-1.732-1.63-2.025-.172-.293-.018-.45.13-.594.134-.132.293-.342.439-.513.146-.171.195-.293.293-.488.098-.195.049-.366-.025-.513-.073-.146-.666-1.611-.913-2.206-.24-.578-.487-.5-.666-.51-.171-.008-.366-.01-.561-.01-.195 0-.512.073-.78.366-.268.293-1.025 1.003-1.025 2.444 0 1.441 1.049 2.834 1.195 3.03.146.195 2.062 3.155 5.002 4.297.7.302 1.247.482 1.674.617.703.224 1.344.193 1.849.117.564-.084 1.734-.709 1.98-1.395.244-.684.244-1.27.171-1.395-.073-.122-.268-.195-.561-.342z" />
            </svg>
          </Link>

          <Footer />
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
