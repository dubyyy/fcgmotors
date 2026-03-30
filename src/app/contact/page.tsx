import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Contact FGC Autos | Inquiry & Showroom Location Lagos",
  description: "Get in touch with FGC Autos for luxury vehicle inquiries, genuine spare parts requests, or car importation assistance. Visit our Lagos showroom today.",
  keywords: ["Contact FGC Autos", "Lagos luxury car showroom", "Car dealer office Lagos", "WhatsApp car inquiry Nigeria"],
};

export default function ContactPage() {
  return <ContactClient />;
}
