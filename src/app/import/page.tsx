import { Metadata } from 'next';
import ImportClient from './ImportClient';

export const metadata: Metadata = {
  title: "Vehicle Importation Service to Nigeria | USA, Canada & Europe",
  description: "Seamlessly import premium cars from the US, Canada, and Europe. We handle auction bidding, independent inspection, containerized shipping, and Nigerian customs clearance.",
  keywords: ["Car importation Nigeria", "Import cars from USA to Lagos", "Buy cars from Canada to Nigeria", "Auction inspection service", "Nigerian customs clearance"],
};

export default function ImportPage() {
  return <ImportClient />;
}
