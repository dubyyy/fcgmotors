import { getSpareParts } from "@/app/admin/actions";
import SparePartsCatalogue from "@/components/SparePartsCatalogue";

export const dynamic = "force-dynamic";

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
