import { getCars } from "@/app/admin/actions";
import CarsCatalogue from "@/components/CarsCatalogue";

export const dynamic = "force-dynamic";

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <main className="pt-24 md:pt-28">
      <section className="section-padding bg-background">
        <CarsCatalogue initialCars={cars} />
      </section>
    </main>
  );
}
