import { getCars } from "@/app/admin/actions";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function Index() {
  // Fetch only the latest 3 cars for the featured section
  const cars = await getCars();
  const featuredCars = cars.slice(0, 3);

  return <HomeClient vehicles={featuredCars} />;
}
