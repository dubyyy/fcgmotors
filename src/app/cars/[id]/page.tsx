import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CarDetailClient from "./CarDetailClient";

type CarPageProps = {
  params: Promise<{ id: string }>;
};

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