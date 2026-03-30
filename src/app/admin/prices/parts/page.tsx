"use client";

import { useState, useEffect } from "react";
import { 
  Package, 
  Search, 
  Save, 
  Loader2, 
  DollarSign, 
  Activity,
  AlertCircle,
  Hash,
  Box
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSpareParts, updateSparePartPrice } from "../../actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function PartPricesPage() {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [parts, setParts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [updates, setUpdates] = useState<Record<number, string>>({});

  useEffect(() => {
    loadParts();
  }, []);

  async function loadParts() {
    setDataLoading(true);
    const data = await getSpareParts();
    setParts(data);
    setDataLoading(false);
  }

  async function handlePriceUpdate(id: number) {
    const newPrice = updates[id];
    if (!newPrice) return;

    setLoading(true);
    const result = await updateSparePartPrice(id, newPrice);
    setLoading(false);

    if (result.success) {
      toast.success("Component price updated!");
      setUpdates(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      loadParts();
    } else {
      toast.error(result.error || "Failed to catalog new price");
    }
  }

  const filteredParts = parts.filter(p => 
    `${p.name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto px-1 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-display font-bold text-slate-900 italic line-clamp-1">Component Values</h1>
            <p className="text-slate-500 mt-0.5 uppercase tracking-widest text-[9px] md:text-[10px] font-bold">OEM Parts Price Synchronization</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 md:p-8 border-b border-slate-50">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Filter component catalog..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 bg-slate-50 border-none h-12 md:h-14 rounded-xl focus:ring-emerald-500/10 w-full" 
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                <th className="px-8 py-5">Component</th>
                <th className="px-8 py-5">Value Modification</th>
                <th className="px-8 py-5 text-right">Commit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {dataLoading ? (
                <tr>
                  <td colSpan={3} className="px-8 py-20 text-center text-slate-400 font-display italic">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4" />
                    Fetching registry...
                  </td>
                </tr>
              ) : filteredParts.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-8 py-20 text-center text-slate-400 font-display italic">
                    No matching components found.
                  </td>
                </tr>
              ) : filteredParts.map((part) => (
                <tr key={part.id} className="hover:bg-slate-50/20 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden border border-slate-100">
                        <img src={part.imageUrls?.[0] || part.imageUrl} alt={part.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-base font-bold text-slate-900 leading-tight truncate">{part.name}</p>
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded mt-1.5 inline-block">
                          {part.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4 max-w-xs">
                       <div className="flex-1">
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Current Price: {part.price}</p>
                          <div className="relative group/input">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within/input:text-emerald-600 transition-colors" />
                            <Input 
                              placeholder="New modification..." 
                              value={updates[part.id] || ""}
                              onChange={(e) => setUpdates(prev => ({ ...prev, [part.id]: e.target.value }))}
                              className="pl-9 h-11 border-slate-200 bg-white rounded-xl focus:ring-emerald-500/20 text-sm font-bold"
                            />
                          </div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Button 
                      disabled={loading || !updates[part.id]}
                      onClick={() => handlePriceUpdate(part.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white h-11 px-6 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-md shadow-emerald-600/10 gap-2 transition-all"
                    >
                      {loading && updates[part.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Sync Price
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="lg:hidden divide-y divide-slate-100">
          {dataLoading ? (
            <div className="p-12 text-center text-slate-400 font-display italic">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4" />
              Fetching records...
            </div>
          ) : filteredParts.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-display italic">
              No matching components.
            </div>
          ) : (
            filteredParts.map((part) => (
              <div key={part.id} className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden border border-slate-100 flex-shrink-0">
                    <img src={part.imageUrls?.[0] || part.imageUrl} alt={part.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-slate-900 leading-tight truncate">{part.name}</p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">{part.category}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">{part.partNumber || 'No SKU'}</span>
                      <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{part.price}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="relative group/input flex-1">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <Input 
                      placeholder="Input new price..." 
                      value={updates[part.id] || ""}
                      onChange={(e) => setUpdates(prev => ({ ...prev, [part.id]: e.target.value }))}
                      className="pl-9 h-12 border-slate-200 bg-white rounded-xl focus:ring-emerald-500/10 text-sm font-bold"
                    />
                  </div>
                  <Button 
                    disabled={loading || !updates[part.id]}
                    onClick={() => handlePriceUpdate(part.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] gap-2 shadow-lg shadow-emerald-600/5"
                  >
                    {loading && updates[part.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Confirm Sync
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] flex items-start gap-3 md:gap-4 mx-3 md:mx-0">
        <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 mt-1 md:shrink-0" />
        <div>
          <h4 className="font-bold text-emerald-900 text-sm md:text-base">Technical Integrity</h4>
          <p className="text-xs md:text-sm text-emerald-700 leading-relaxed mt-1">Component registry updates are immediate and distributed across the catalog. Verify OEM market values before sync.</p>
        </div>
      </div>
    </div>
  );
}
