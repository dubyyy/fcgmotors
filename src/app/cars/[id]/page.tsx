import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CarDetailClient from "./CarDetailClient";

type CarPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: CarPageProps): Promise<Metadata> {
  const { id } = await params;
  const carId = parseInt(id);
  if (isNaN(carId)) return { title: "Vehicle Not Found" };
  
  const car = await prisma.car.findUnique({
    where: { id: carId },
  });
  
  if (!car) return { title: "Vehicle Not Found" };
  
  const title = `${car.year} ${car.brand} ${car.model} | FGC Autos`;
  const description = `Discover this pristine ${car.year} ${car.brand} ${car.model} in Nigeria. Premium quality, expertly inspected. Contact FGC Autos today.`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: car.imageUrl ? [{ url: car.imageUrl }] : [],
    },
  };
}

export default async function CarDetailPage({ params }: CarPageProps) {
  const { id } = await params;
  const carId = parseInt(id);

  if (isNaN(carId)) notFound();

  const car = await prisma.car.findUnique({
    where: { id: carId },
  });

  if (!car) notFound();
  return <CarDetailClient car={car as any} />;
}