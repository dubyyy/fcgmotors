"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Car, 
  Package, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Search,
  MoreVertical,
  ChevronRight,
  Clock,
  Boxes,
  ShieldCheck,
  Zap,
  Tag,
  Loader2,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCars, getSpareParts } from "./actions";
import { cn } from "@/lib/utils";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as any;

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    carsCount: 0,
    partsCount: 0,
    totalValue: 0,
    activeUsers: 0,
    recentItems: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [cars, parts] = await Promise.all([getCars(), getSpareParts()]);
      
      const parsePrice = (priceStr: string) => {
        return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
      };

      const totalValue = [...cars, ...parts].reduce((acc, item) => acc + parsePrice(item.price), 0);
      
      const combined = [
        ...cars.map(c => ({ ...c, type: 'Car', name: `${c.brand} ${c.model}` })),
        ...parts.map(p => ({ ...p, type: 'Part' }))
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

      setStats({
        carsCount: cars.length,
        partsCount: parts.length,
        totalValue: totalValue,
        activeUsers: cars.length + parts.length > 0 ? 12 : 0,
        recentItems: combined
      });
      setLoading(false);
    }
    fetchData();
  }, []);

  const statCards = [
    { 
      label: "Total Vehicles", 
      value: stats.carsCount, 
      icon: Car, 
      color: "bg-slate-950", 
      trend: "+3%", 
      isUp: true,
      description: "Available inventory"
    },
    { 
      label: "Spare Components", 
      value: stats.partsCount, 
      icon: Package, 
      color: "bg-emerald-600", 
      trend: "+5%", 
      isUp: true,
      description: "Parts registry"
    },
    { 
      label: "Showroom Value", 
      value: new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(stats.totalValue), 
      icon: TrendingUp, 
      color: "bg-violet-600", 
      trend: "+8%", 
      isUp: true,
      description: "Economic valuation"
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6, ease: EASE }}
           className="min-w-0"
        >
          <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 italic line-clamp-1">Dashboard Command</h1>
          <p className="text-slate-500 mt-1 uppercase tracking-widest text-[9px] md:text-[10px] font-bold">Showroom Intelligence & Global Control</p>
        </motion.div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/cars" className="flex-1 sm:flex-none">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 md:h-14 px-6 md:px-8 font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 gap-2 transition-all">
              <Plus className="w-4 h-4 md:w-5 md:h-5" /> Add Car
            </Button>
          </Link>
          <Link href="/admin/parts" className="flex-1 sm:flex-none">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 md:h-14 px-6 md:px-8 font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-500/20 gap-2 transition-all">
              <Plus className="w-4 h-4 md:w-5 md:h-5" /> Add Part
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
          >
            <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group bg-white border border-slate-100">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className={cn("p-3 md:p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-500", stat.color)}>
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                    <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" /> {stat.trend}
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-primary transition-colors truncate">{stat.value}</h3>
                  <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.15em]">{stat.label}</p>
                  <p className="text-[9px] md:text-[10px] text-slate-400 mt-2 font-medium italic">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-display font-bold italic text-slate-900">Recent Intake Activity</h2>
            <p className="uppercase tracking-[0.15em] text-[9px] md:text-[10px] font-bold mt-1 text-slate-400">Latest global inventory sync</p>
          </div>
          <Link href="/admin/cars" className="hidden sm:block">
            <Button variant="ghost" className="text-slate-400 hover:text-primary font-bold text-[10px] uppercase tracking-widest gap-2">
              View Catalog <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                <th className="px-8 py-5">Asset Entity</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Inventory Value</th>
                <th className="px-8 py-5">Sync Status</th>
                <th className="px-8 py-5 text-right">Commit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-display italic">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4" />
                    Syncing economic data...
                  </td>
                </tr>
              ) : stats.recentItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-display italic">
                    Showroom is offline. Add assets to begin tracking.
                  </td>
                </tr>
              ) : stats.recentItems.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50/50 group transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm relative">
                        <img src={item.imageUrls?.[0] || item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 leading-tight truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                          {item.type} • {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider",
                      item.type === 'Car' ? "bg-slate-100 text-slate-900 border border-slate-200" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    )}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-black text-slate-900 italic">
                    {item.price}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-black text-[10px] uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Online
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right font-sans">
                    <Link href={item.type === 'Car' ? '/admin/prices/cars' : '/admin/prices/parts'}>
                      <Button variant="ghost" className="text-slate-400 hover:text-primary font-bold text-[10px] uppercase tracking-widest italic gap-2">
                        Control <Activity className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet List View */}
        <div className="lg:hidden divide-y divide-slate-100">
          {loading ? (
             <div className="p-12 text-center text-slate-400 font-display italic">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4" />
              Syncing live feed...
            </div>
          ) : stats.recentItems.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-display italic">
              Showroom empty.
            </div>
          ) : (
            stats.recentItems.map((item, i) => (
              <div key={i} className="p-4 sm:p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm">
                    <img src={item.imageUrls?.[0] || item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                       <p className="text-base font-bold text-slate-900 leading-tight truncate">{item.name}</p>
                       <span className={cn(
                        "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border",
                        item.type === 'Car' ? "bg-slate-100 text-slate-900 border-slate-200" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                      )}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                       <p className="text-base font-black text-slate-900 italic">{item.price}</p>
                       <Link href={item.type === 'Car' ? '/admin/prices/cars' : '/admin/prices/parts'}>
                        <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[9px] font-bold uppercase tracking-widest gap-2">
                          Edit <ArrowUpRight className="w-3 h-3" />
                        </Button>
                       </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="p-4 bg-slate-50/50">
            <Link href="/admin/cars" className="w-full">
              <Button variant="ghost" className="w-full text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                View Entire Catalog Registry
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
