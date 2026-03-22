"use client";

import { useState, useEffect } from "react";
import { 
  Car, 
  Search, 
  Save, 
  Loader2, 
  DollarSign, 
  TrendingUp,
  AlertCircle,
  Tag,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCars, updateCarPrice } from "../../actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function CarPricesPage() {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [cars, setCars] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [updates, setUpdates] = useState<Record<number, string>>({});

  useEffect(() => {
    loadCars();
  }, []);

  async function loadCars() {
    setDataLoading(true);
    const data = await getCars();
    setCars(data);
    setDataLoading(false);
  }

  async function handlePriceUpdate(id: number) {
    const newPrice = updates[id];
    if (!newPrice) return;

    setLoading(true);
    const result = await updateCarPrice(id, newPrice);
    setLoading(false);

    if (result.success) {
      toast.success("Price updated successfully!");
      setUpdates(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      loadCars();
    } else {
      toast.error(result.error || "Failed to update price");
    }
  }

  const filteredCars = cars.filter(c => 
    `${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto px-1 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-display font-bold text-slate-900 italic line-clamp-1">Economic Control</h1>
            <p className="text-slate-500 mt-0.5 uppercase tracking-widest text-[9px] md:text-[10px] font-bold">Vehicle Pricing Strategy</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 md:p-8 border-b border-slate-50">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Filter showroom inventory..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 bg-slate-50 border-none h-12 md:h-14 rounded-xl focus:ring-primary/10 w-full" 
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                <th className="px-8 py-5">Vehicle Entity</th>
                <th className="px-8 py-5">Value modification</th>
                <th className="px-8 py-5 text-right">Commit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {dataLoading ? (
                <tr>
                  <td colSpan={3} className="px-8 py-20 text-center text-slate-400 font-display italic">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4" />
                    Fetching records...
                  </td>
                </tr>
              ) : filteredCars.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-8 py-20 text-center text-slate-400 font-display italic">
                    No matching vehicles in inventory.
                  </td>
                </tr>
              ) : filteredCars.map((car) => (
                <tr key={car.id} className="hover:bg-slate-50/20 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden border border-slate-100 shadow-sm">
                        <img src={car.imageUrl} alt={car.brand} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-base font-bold text-slate-900 leading-tight truncate">{car.brand} {car.model}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ref ID: #{car.id.toString().slice(-4)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4 max-w-xs">
                      <div className="flex-1">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Current: {car.price}</p>
                        <div className="relative group/input">
                           <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within/input:text-primary transition-colors" />
                           <Input 
                             placeholder="Set modification..." 
                             value={updates[car.id] || ""}
                             onChange={(e) => setUpdates(prev => ({ ...prev, [car.id]: e.target.value }))}
                             className="pl-9 h-11 border-slate-200 bg-white rounded-xl focus:ring-primary/20 text-sm font-bold"
                           />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Button 
                      disabled={loading || !updates[car.id]}
                      onClick={() => handlePriceUpdate(car.id)}
                      className="bg-primary hover:bg-primary/90 text-white h-11 px-6 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-md shadow-primary/10 gap-2 transition-all"
                    >
                      {loading && updates[car.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Update Price
                    </Button>
                  </td>
                </tr>
              ) )}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden divide-y divide-slate-100">
          {dataLoading ? (
            <div className="p-12 text-center text-slate-400 font-display italic">
               <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4" />
               Syncing showroom...
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-display italic">
              No matching records.
            </div>
          ) : (
            filteredCars.map((car) => (
              <div key={car.id} className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden border border-slate-100 shadow-sm flex-shrink-0">
                    <img src={car.imageUrl} alt={car.brand} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-bold text-slate-900 leading-tight">{car.brand}</p>
                    <p className="text-sm font-medium text-slate-500 truncate">{car.model}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">#{car.id.toString().slice(-4)}</span>
                      <span className="text-[9px] font-black text-primary uppercase tracking-widest italic">{car.price}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="relative group/input flex-1">
                     <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                     <Input 
                       placeholder="New ₦ price..." 
                       value={updates[car.id] || ""}
                       onChange={(e) => setUpdates(prev => ({ ...prev, [car.id]: e.target.value }))}
                       className="pl-9 h-12 border-slate-200 bg-white rounded-xl focus:ring-primary/10 text-sm font-bold"
                     />
                  </div>
                  <Button 
                    disabled={loading || !updates[car.id]}
                    onClick={() => handlePriceUpdate(car.id)}
                    className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] gap-2 shadow-lg shadow-primary/5"
                  >
                    {loading && updates[car.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Confirm Adjustment
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex items-start gap-3 md:gap-4 mx-3 md:mx-0">
        <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-amber-600 mt-1 md:shrink-0" />
        <div>
          <h4 className="font-bold text-amber-900 text-sm md:text-base">Commercial Intelligence</h4>
          <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">Price modifications are reflected across the global showroom immediately. Ensure all values are verified against market trends.</p>
        </div>
      </div>
    </div>
  );
}
