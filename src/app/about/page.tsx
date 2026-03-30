import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "About FGC Autos | Nigeria's Luxury Automotive Experts",
  description: "With over a decade of excellence, FGC Autos is Nigeria's most trusted source for premium vehicles and genuine spare parts. Learn about our commitment to quality and transparency.",
  keywords: ["About FGC Autos", "Luxury car dealer history", "Genuine car parts expertise Nigeria", "Trusted car importers Lagos"],
};

export default function AboutPage() {
  return <AboutClient />;
}
