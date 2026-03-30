"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Car, 
  Package, 
  Settings, 
  ChevronRight, 
  Menu, 
  X,
  CreditCard,
  LogOut,
  Hash,
  Bell,
  Search,
  ShieldCheck,
  Zap,
  TrendingUp,
  Boxes
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Vehicles", href: "/admin/cars", icon: Car },
    { label: "Components", href: "/admin/parts", icon: Package },
    { label: "Economics", href: "/admin/prices/cars", icon: TrendingUp },
    { label: "Catalog", href: "/admin/prices/parts", icon: Boxes },
  ];

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const NavLink = ({ item, mobile = false }: { item: typeof navItems[0], mobile?: boolean }) => {
    const isActive = pathname === item.href;
    return (
      <Link 
        key={item.href}
        href={item.href}
        onClick={() => mobile && setIsMobileOpen(false)}
        className={cn(
          "flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 font-bold tracking-tight text-sm",
          isActive 
            ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
            : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
        )}
      >
        <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400")} />
        {item.label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Mobile Toggle & Header (Visible only on < lg) */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-black italic tracking-tighter text-slate-900 text-lg uppercase">FGC ADMIN</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMobileOpen(true)}
          className="text-slate-600 hover:bg-slate-50"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Mobile Sidebar */}
            <motion.div 
              key="mobile-sidebar"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: EASE as any }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white z-[60] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-display font-black italic tracking-tighter text-slate-900 text-lg uppercase">HQ CENTER</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="space-y-2 flex-1">
                {navItems.map((item) => (
                  <NavLink key={item.href} item={item} mobile />
                ))}
              </nav>

              <div className="pt-8 border-t border-slate-50 mt-auto">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                       <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Global Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-900" />
                    <span className="text-[11px] font-bold text-slate-500">Node Sync: 100%</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full text-slate-400 hover:text-red-600 hover:bg-red-50 justify-start gap-4 px-5 py-4 rounded-xl font-bold"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </Button>
              </div>
            </motion.div>

            {/* Overlay */}
            <motion.div 
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
            />
          </>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen pt-16 lg:pt-0">
        {/* Desktop Sidebar (lg and up) */}
        <aside className="hidden lg:flex w-72 h-screen border-r border-slate-100 flex-col p-8 fixed bg-white sticky top-0 overflow-y-auto">
          <div className="flex items-center gap-4 mb-14 px-2">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="font-display font-black italic tracking-tighter text-slate-900 text-xl leading-none">FGC HQ</p>
              <p className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400 mt-1">Lagos • NG</p>
            </div>
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>

          <div className="pt-8 border-t border-slate-50 mt-auto">
            <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200">
                   <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest">System Status</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Latency</span>
                  <span className="text-[10px] font-black text-slate-900">12ms</span>
                </div>
                <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[90%] h-full bg-slate-900 rounded-full" />
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full text-slate-400 hover:text-red-600 hover:bg-red-50 justify-start gap-4 px-6 py-4 rounded-2xl font-bold transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 md:p-8 lg:p-12 lg:ml-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
