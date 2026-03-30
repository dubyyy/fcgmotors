import { getSpareParts } from "@/app/admin/actions";
import SparePartsCatalogue from "@/components/SparePartsCatalogue";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Genuine OEM Spare Parts",
  description: "Browse 100% genuine OEM spare parts in Nigeria. We stock engine parts, brake systems, suspension, and more for all major luxury car brands.",
};

export const revalidate = 3600;

export default async function SpareParts() {
  const spareParts = await getSpareParts();

  return (
    <main className="pt-24 md:pt-28">
      <section className="section-padding bg-background">
        <SparePartsCatalogue initialParts={spareParts} />
      </section>
    </main>
  );
}
