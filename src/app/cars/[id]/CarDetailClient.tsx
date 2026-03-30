"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Calendar, 
  Gauge, 
  Fuel, 
  Shield, 
  ArrowLeft, 
  X,
  CreditCard,
  Zap,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  imageUrls: string[];
  description: string;
};

export default function CarDetailClient({ car }: { car: Car }) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({ 
    loop: true,
    initial: 0,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = car.imageUrls?.length > 0 ? car.imageUrls : ["/placeholder-car.jpg"];
  const formattedPrice = car.price.includes(",")
    ? car.price
    : Number(car.price).toLocaleString();

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 mt-20">
        <Link
          href="/cars"
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>
      </div>

      {/* Hero Image Slider */}
      <section className="relative h-[60vh] md:h-[75vh] w-full bg-slate-100 overflow-hidden">
        <div ref={sliderRef} className="keen-slider h-full">
          {images.map((img, i) => (
            <div
              key={i}
              className="keen-slider__slide relative h-full w-full cursor-zoom-in"
              onClick={() => {
                if (window.innerWidth >= 1024) {
                  setSelectedImage(img);
                }
              }}
            >
              <Image
                src={img}
                alt={`${car.brand} ${car.model} image ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-40">
          <Button
            size="icon"
            variant="secondary"
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border-none shadow-xl hover:bg-white transition-all scale-90 md:scale-100"
            onClick={() => instanceRef.current?.prev()}
          >
            <span className="sr-only">Previous</span>
            ◀
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border-none shadow-xl hover:bg-white transition-all scale-90 md:scale-100"
            onClick={() => instanceRef.current?.next()}
          >
            <span className="sr-only">Next</span>
            ▶
          </Button>
        </div>
        
        {/* Slide Counter Overlay */}
        <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
           Gallery Collection
        </div>
      </section>

      {/* 🔹 Image Modal for Large Screens */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full lg:w-[90vw] lg:h-[85vh]">
            <Image
              src={selectedImage}
              alt="Full Preview"
              fill
              className="object-contain"
            />
            <button
              className="absolute top-0 -right-4 lg:right-0 text-white bg-white/10 hover:bg-white/20 transition-colors rounded-full p-3 backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 grid lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left: Details */}
        <div className="lg:col-span-8 space-y-12 md:space-y-16">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Automotive Asset</span>
               <span className="text-slate-300">•</span>
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{car.year} Model</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tight text-slate-900 leading-tight">
              {car.brand} <br />
              <span className="text-slate-400 italic font-light">{car.model}</span>
            </h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-slate-100 mb-12">
            <SpecItem icon={<Calendar />} label="Year" value={car.year} />
            <SpecItem icon={<Gauge />} label="Condition" value="New / Showroom" />
            <SpecItem icon={<Fuel />} label="Type" value="Petrol / Electric" />
            <SpecItem icon={<Shield />} label="Status" value="Verified Audit" />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold italic border-l-4 border-slate-900 pl-4">Full Specification</h2>
            <div className="text-slate-600 leading-relaxed text-lg font-light space-y-4">
              {car.description.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              )) || "No detailed specifications provided for this listing."}
            </div>
          </div>

          {/* Location & Showroom Features */}
          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
             <div className="p-8 rounded-[2rem] bg-slate-50 space-y-4">
                <MapPin className="w-8 h-8 text-slate-900" />
                <h3 className="font-bold text-lg uppercase tracking-wider">Showroom Presence</h3>
                <p className="text-sm text-slate-500 font-medium">154 Obafemi Awolowo Way, Central Business District, Ikeja, Lagos. Available for viewing by appointment.</p>
             </div>
             <div className="p-8 rounded-[2rem] bg-slate-900 text-white space-y-4">
                <Zap className="w-8 h-8 text-white" />
                <h3 className="font-bold text-lg uppercase tracking-wider italic">Fast Delivery</h3>
                <p className="text-sm text-white/60 font-medium italic">Priority shipping available nationwide. Fully insured transit to your doorstep.</p>
             </div>
          </div>
        </div>

        {/* Right: Sidebar Sticky */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] p-8 md:p-10 sticky top-32 h-fit space-y-8">
            <div>
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.3em] mb-2">Investment Value</div>
              <div className="text-4xl md:text-5xl font-display font-bold text-slate-900">
                ₦{formattedPrice}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
               <div className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Availability</span>
               </div>
               <p className="text-sm font-bold text-slate-600 italic">Immediate delivery from our local inventory. Genuine documentation guaranteed.</p>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <Button 
                className="w-full h-16 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all font-bold uppercase tracking-widest text-xs shadow-xl shadow-slate-900/10 cursor-pointer"
                onClick={() => {
                  const phoneNumber = "2348030523555";
                  const message = `Hi, I’m interested in the ${car.brand} ${car.model} (${car.year}). Please provide more details.`;
                  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                  window.open(url, "_blank");
                }}
              >
                Book Consultation
              </Button>
              <Link href="/cars" className="w-full">
                <Button variant="outline" className="w-full h-16 rounded-2xl border-slate-200 text-slate-500 hover:text-slate-900 font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all cursor-pointer">
                  Back to Showroom
                </Button>
              </Link>
            </div>

            <div className="text-center">
               <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em]">FGC MOTORS • EST. 2024</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SpecItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="space-y-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-900">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">{label}</p>
        <p className="text-lg font-display font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}