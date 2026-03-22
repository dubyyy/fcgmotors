"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Car, 
  Loader2, 
  Image as ImageIcon, 
  CheckCircle,
  X,
  Trash2,
  Edit2,
  Calendar,
  Tag,
  Save
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addCar, getCars, deleteCar, updateCar } from "../actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

export default function CarsInventoryPage() {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [cars, setCars] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [carImage, setCarImage] = useState<File | null>(null);
  const [editingCar, setEditingCar] = useState<any>(null);

  useEffect(() => {
    loadCars();
  }, []);

  async function loadCars() {
    setDataLoading(true);
    const data = await getCars();
    setCars(data);
    setDataLoading(false);
  }

  async function handleCarSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (carImage) formData.set('image', carImage);
    
    let result;
    if (editingCar) {
      result = await updateCar(editingCar.id, formData);
    } else {
      result = await addCar(formData);
    }
    
    setLoading(false);

    if (result.success) {
      toast.success(editingCar ? "Vehicle details updated!" : "Vehicle added to showroom successfully!");
      (e.target as HTMLFormElement).reset();
      setCarImage(null);
      setEditingCar(null);
      loadCars();
      setShowAddForm(false);
    } else {
      toast.error(result.error || "Failed to commit car to inventory");
    }
  }

  function handleEdit(car: any) {
    setEditingCar(car);
    setShowAddForm(true);
    // Scroll to top to see the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancel() {
    setShowAddForm(false);
    setEditingCar(null);
    setCarImage(null);
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to remove this vehicle from inventory?")) return;
    
    setLoading(true);
    const result = await deleteCar(id);
    setLoading(false);

    if (result.success) {
      toast.success("Vehicle removed successfully");
      loadCars();
    } else {
      toast.error(result.error || "Failed to delete vehicle");
    }
  }

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 line-clamp-1 italic">Vehicle Inventory</h1>
          <p className="text-slate-500 mt-1 uppercase tracking-widest text-[9px] md:text-[10px] font-bold">Showroom Intake & Cataloging</p>
        </div>
        <Button 
          onClick={showAddForm ? handleCancel : () => setShowAddForm(true)}
          className={cn(
            "h-12 md:h-14 px-6 md:px-8 rounded-2xl font-bold uppercase tracking-widest gap-2 transition-all duration-300",
            showAddForm ? "bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-none" : "bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20"
          )}
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddForm ? "Cancel Entry" : "Add Vehicle"}
        </Button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="overflow-hidden"
          >
            <Card className="border-none shadow-2xl rounded-[1.5rem] md:rounded-[2.5rem] bg-white overflow-hidden">
              <CardHeader className="p-6 md:p-8 border-b border-slate-50">
                <CardTitle className="text-xl md:text-2xl font-display">{editingCar ? "Update Listing" : "Listing Details"}</CardTitle>
                <CardDescription className="text-sm">
                  {editingCar ? `Modifying specifications for ${editingCar.brand} ${editingCar.model}` : "Enter the specifications for the new luxury vehicle."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form key={editingCar?.id || 'new'} onSubmit={handleCarSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Brand / Manufacturer</Label>
                      <Input name="brand" defaultValue={editingCar?.brand} placeholder="e.g. Range Rover" required className="bg-slate-50 border-none h-12 md:h-14 rounded-xl focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Model Name</Label>
                      <Input name="model" defaultValue={editingCar?.model} placeholder="e.g. Vogue LWB" required className="bg-slate-50 border-none h-12 md:h-14 rounded-xl focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Manufacture Year</Label>
                      <Input name="year" defaultValue={editingCar?.year} type="number" placeholder="2024" required className="bg-slate-50 border-none h-12 md:h-14 rounded-xl focus:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Retail Price (₦)</Label>
                      <Input name="price" defaultValue={editingCar?.price} placeholder="₦185,000,000" required className="bg-slate-50 border-none h-12 md:h-14 rounded-xl focus:ring-primary/20" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Description & Technical Data</Label>
                    <Textarea name="description" defaultValue={editingCar?.description} placeholder="Full specification list and vehicle status..." required className="bg-slate-50 border-none min-h-[120px] md:min-h-[150px] rounded-xl focus:ring-primary/20 resize-none" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">High-Res Media</Label>
                    <div 
                      className={`relative h-48 md:h-64 border-2 border-dashed rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer ${carImage ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/50'}`}
                      onClick={() => document.getElementById('car-image-input')?.click()}
                    >
                      <input 
                        id="car-image-input" 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        title="Vehicle Image"
                        onChange={(e) => setCarImage(e.target.files?.[0] || null)}
                      />
                      {carImage ? (
                        <div className="text-center p-6">
                          <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-3" />
                          <p className="text-sm font-bold text-slate-900 line-clamp-1">{carImage.name}</p>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Replacement Required? Click again.</p>
                        </div>
                      ) : (
                        <div className="text-center p-6">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4 mx-auto group-hover:scale-110 transition-transform">
                            <ImageIcon className="w-6 h-6 md:w-8 md:h-8" />
                          </div>
                          <p className="text-sm font-bold text-slate-900">Upload Studio Quality Imagery</p>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold italic">Landscape orientation (16:9) preferred.</p>
                        </div>
                      )}
                    </div>
                  </div>

                   <Button 
                    disabled={loading} 
                    className="w-full h-14 md:h-16 bg-primary text-white hover:bg-primary/90 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-primary/20"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingCar ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />)}
                    {editingCar ? "Confirm Modifications" : "Commit Vehicle to Showroom"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 md:p-8 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search inventory..." className="pl-12 bg-slate-50 border-none h-12 rounded-xl focus:ring-primary/10 w-full" />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
             <Button variant="outline" className="h-12 rounded-xl font-bold gap-2 text-slate-400 whitespace-nowrap">
               <Filter className="w-4 h-4" /> Filter
             </Button>
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 border-l border-slate-100 flex items-center h-12 whitespace-nowrap">
               {cars.length} Listings
             </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                <th className="px-8 py-5">Vehicle Listing</th>
                <th className="px-8 py-5">Year</th>
                <th className="px-8 py-5">Retail Price</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {dataLoading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-slate-400 font-display italic">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4" />
                    Syncing inventory assets...
                  </td>
                </tr>
              ) : cars.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-slate-400 font-display italic">
                     No vehicles found in stock.
                  </td>
                </tr>
              ) : cars.map((car) => (
                <tr key={car.id} className="hover:bg-slate-50/50 group transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm">
                        <img src={car.imageUrl} alt={car.brand} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900 leading-tight">{car.brand} {car.model}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ref ID: #{car.id.toString().slice(-4)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">{car.year}</span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-base font-black text-slate-900">{car.price}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider border border-emerald-100/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      Live
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(car)}
                        className="w-10 h-10 rounded-xl text-slate-400 hover:text-primary hover:bg-slate-100 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(car.id)}
                        className="w-10 h-10 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden divide-y divide-slate-100">
          {dataLoading ? (
            <div className="p-12 text-center text-slate-400 font-display italic">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4" />
              Syncing inventory...
            </div>
          ) : cars.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-display italic">
              No vehicles found in stock.
            </div>
          ) : (
            cars.map((car) => (
              <div key={car.id} className="p-4 sm:p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm">
                    <img src={car.imageUrl} alt={car.brand} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                       <div>
                         <p className="text-lg font-bold text-slate-900 leading-tight">{car.brand}</p>
                         <p className="text-base font-medium text-slate-500 truncate">{car.model}</p>
                       </div>
                       <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider border border-emerald-100/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Live
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> {car.year}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 flex items-center gap-1.5">
                        <Tag className="w-3 h-3" /> #{car.id.toString().slice(-4)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-0.5">Retail Price</p>
                    <p className="text-lg font-black text-slate-900">{car.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(car)}
                      className="h-10 px-4 rounded-xl text-slate-400 font-bold gap-2"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleDelete(car.id)}
                      className="w-10 h-10 rounded-xl text-red-400 hover:text-red-500 hover:bg-red-50 border-slate-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
