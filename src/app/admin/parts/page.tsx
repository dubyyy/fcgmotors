"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Package, 
  Loader2, 
  Image as ImageIcon, 
  CheckCircle,
  X,
  Trash2,
  Edit2,
  Box,
  Layers,
  Tag,
  Hammer,
  Save
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addSparePart, getSpareParts, deleteSparePart, updateSparePart } from "../actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

const categoryOptions = [
  "Engine Parts",
  "Brake Systems",
  "Suspension",
  "Electrical Parts",
  "Filters",
  "Interior",
  "Body Parts",
  "Lights",
];

export default function PartsInventoryPage() {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [parts, setParts] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [partImage, setPartImage] = useState<File | null>(null);
  const [editingPart, setEditingPart] = useState<any>(null);

  useEffect(() => {
    loadParts();
  }, []);

  async function loadParts() {
    setDataLoading(true);
    const data = await getSpareParts();
    setParts(data);
    setDataLoading(false);
  }

  async function handlePartSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (partImage) formData.set('image', partImage);

    let result;
    if (editingPart) {
      result = await updateSparePart(editingPart.id, formData);
    } else {
      result = await addSparePart(formData);
    }
    
    setLoading(false);

    if (result.success) {
      toast.success(editingPart ? "Component updated!" : "Component listed in inventory!");
      (e.target as HTMLFormElement).reset();
      setPartImage(null);
      setEditingPart(null);
      loadParts();
      setShowAddForm(false);
    } else {
      toast.error(result.error || "Failed to catalog component");
    }
  }

  function handleEdit(part: any) {
    setEditingPart(part);
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancel() {
    setShowAddForm(false);
    setEditingPart(null);
    setPartImage(null);
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to remove this component from inventory?")) return;
    
    setLoading(true);
    const result = await deleteSparePart(id);
    setLoading(false);

    if (result.success) {
      toast.success("Component removed successfully");
      loadParts();
    } else {
      toast.error(result.error || "Failed to delete component");
    }
  }

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
            <Layers className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl md:text-3xl font-display font-bold text-slate-900 italic line-clamp-1">Spare Components</h1>
            <p className="text-slate-500 mt-0.5 uppercase tracking-widest text-[9px] md:text-[10px] font-bold">OEM Registry & Technical Intake</p>
          </div>
        </div>
        <Button 
          onClick={showAddForm ? handleCancel : () => setShowAddForm(true)}
          className={cn(
            "h-12 md:h-14 px-6 md:px-8 rounded-2xl font-bold uppercase tracking-widest gap-2 transition-all duration-300 w-full sm:w-auto",
            showAddForm ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl shadow-emerald-600/20"
          )}
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddForm ? "Cancel Intake" : "Add Component"}
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
                <CardTitle className="text-xl md:text-2xl font-display">{editingPart ? "Modify Technical Record" : "Technical Cataloging"}</CardTitle>
                <CardDescription className="text-sm">
                  {editingPart ? `Adjusting details for ${editingPart.name}` : "Specify the component details and technical compatibility."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form key={editingPart?.id || 'new'} onSubmit={handlePartSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Component Name</Label>
                      <Input name="name" defaultValue={editingPart?.name} placeholder="e.g. Turbocharger Unit" required className="bg-slate-50 border-none h-12 md:h-14 rounded-xl focus:ring-emerald-500/20" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Part Number / SKU</Label>
                      <Input name="part_number" defaultValue={editingPart?.partNumber} placeholder="OEM-TRB-45X9" required className="bg-slate-50 border-none h-12 md:h-14 rounded-xl focus:ring-emerald-500/20" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Category System</Label>
                      <Select name="category" defaultValue={editingPart?.category} required>
                        <SelectTrigger className="bg-slate-50 border-none h-12 md:h-14 rounded-xl focus:ring-emerald-500/20">
                          <SelectValue placeholder="System Selection" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                          {categoryOptions.map(cat => (
                            <SelectItem key={cat} value={cat} className="rounded-lg h-10">{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Inventory Price (₦)</Label>
                      <Input name="price" defaultValue={editingPart?.price} placeholder="₦450,000" required className="bg-slate-50 border-none h-12 md:h-14 rounded-xl focus:ring-emerald-500/20" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Technical Brief & Specifications</Label>
                    <Textarea name="description" defaultValue={editingPart?.description} placeholder="Technical specs, compatibility, and fitting guide..." required className="bg-slate-50 border-none min-h-[120px] md:min-h-[150px] rounded-xl focus:ring-emerald-500/20 resize-none" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Component Visual Asset</Label>
                    <div 
                      className={`relative h-48 md:h-64 border-2 border-dashed rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer ${partImage ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:border-emerald-500/50'}`}
                      onClick={() => document.getElementById('part-image-input')?.click()}
                    >
                      <input 
                        id="part-image-input" 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        title="Part Image"
                        onChange={(e) => setPartImage(e.target.files?.[0] || null)}
                      />
                      {partImage ? (
                        <div className="text-center p-6">
                          <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-emerald-600 mx-auto mb-3" />
                          <p className="text-sm font-bold text-slate-900 line-clamp-1">{partImage.name}</p>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Image Locked. Click to reset.</p>
                        </div>
                      ) : (
                        <div className="text-center p-6">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 mb-4 mx-auto group-hover:scale-110 group-hover:rotate-12 transition-transform shadow-sm">
                            <Box className="w-6 h-6 md:w-8 md:h-8" />
                          </div>
                          <p className="text-sm font-bold text-slate-900">Upload Component Media</p>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Clear technical photos highly recommended.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button 
                    disabled={loading} 
                    className="w-full h-14 md:h-16 bg-emerald-600 text-white hover:bg-emerald-700 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-emerald-600/20"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingPart ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />)}
                    {editingPart ? "Confirm Economic Update" : "Catalog Technical Component"}
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
            <Input placeholder="Search catalog..." className="pl-12 bg-slate-50 border-none h-12 rounded-xl focus:ring-emerald-500/10 w-full" />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 flex items-center h-12 whitespace-nowrap">
               {parts.length} Items Listed
             </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                <th className="px-8 py-5">Component Segment</th>
                <th className="px-8 py-5">Technical Category</th>
                <th className="px-8 py-5">Unit Price</th>
                <th className="px-8 py-5">Sync</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium font-sans">
              {dataLoading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-display italic uppercase tracking-widest text-xs">
                     <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4" />
                     Fetching catalog records...
                  </td>
                </tr>
              ) : parts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-display italic">
                     No parts found in inventory.
                  </td>
                </tr>
              ) : parts.map((part) => (
                <tr key={part.id} className="hover:bg-slate-50/50 group transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm">
                        <img src={part.imageUrl} alt={part.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900 leading-tight">{part.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">SKU: {part.partNumber || 'N/A'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg uppercase tracking-tight">{part.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-base font-black text-slate-900">{part.price}</p>
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
                        onClick={() => handleEdit(part)}
                        className="w-10 h-10 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(part.id)}
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
            <div className="p-12 text-center text-slate-400 font-display italic uppercase tracking-widest text-xs">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4" />
              Fetching records...
            </div>
          ) : parts.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-display italic">
              No components listed.
            </div>
          ) : (
            parts.map((part) => (
              <div key={part.id} className="p-4 sm:p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm relative">
                    <img src={part.imageUrl} alt={part.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                       <p className="text-base font-bold text-slate-900 leading-tight truncate">{part.name}</p>
                       <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-wider border border-emerald-100/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Live
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1.5 mb-2">{part.category}</p>
                    <div className="flex flex-wrap gap-2">
                       <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 flex items-center gap-1.5">
                        <Tag className="w-3 h-3" /> SKU: {part.partNumber || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Unit Price</p>
                    <p className="text-lg font-black text-slate-900">{part.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(part)}
                      className="h-10 px-4 rounded-xl text-slate-400 font-bold gap-2 focus:ring-emerald-500/20"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleDelete(part.id)}
                      className="w-10 h-10 rounded-xl text-red-400 hover:text-red-500 hover:bg-red-50 border-slate-100 focus:ring-red-500/20"
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
