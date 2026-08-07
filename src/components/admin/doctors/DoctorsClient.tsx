"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Pencil, Trash2, PlusCircle, X, Loader2, ArrowUp, ArrowDown } from "lucide-react";

// --- Schema ---
const docSchema = z.object({
    id: z.number().optional(),
    full_name: z.string().min(1, "Full name is required"),
    qualification: z.string().min(1, "Qualification is required"),
    designation: z.string().min(1, "Designation is required"),
    years_experience: z.coerce.number().min(0, "Must be valid number"),
    bio: z.string().max(300, "Bio should be brief (under 300 chars)").optional(),
    photo_url: z.string().url("Must be valid URL").optional().or(z.literal("")),
    display_order: z.coerce.number().optional(),
});

type Doctor = z.infer<typeof docSchema>;

export function DoctorsClient({ initialDoctors }: { initialDoctors: any[] }) {
    const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoc, setEditingDoc] = useState<Doctor | null>(null);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Doctor>({
        resolver: zodResolver(docSchema)
    });

    const openNew = () => {
        setEditingDoc(null);
        reset({
            full_name: "", qualification: "", designation: "", years_experience: 0,
            bio: "", photo_url: "", display_order: doctors.length
        });
        setIsModalOpen(true);
    };

    const openEdit = (doc: Doctor) => {
        setEditingDoc(doc);
        reset(doc);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to remove this doctor?")) return;
        const { error } = await supabase.from('doctors').delete().eq('id', id);
        if (error) {
            toast.error("Failed to delete doctor.");
        } else {
            setDoctors((prev) => prev.filter(d => d.id !== id));
            toast.success("Doctor removed successfully");
        }
    };

    const onSubmit = async (data: Doctor) => {
        if (editingDoc?.id) {
            // Update
            const { error } = await supabase.from('doctors').update(data).eq('id', editingDoc.id);
            if (error) return toast.error(error.message);
            setDoctors((prev) => prev.map(d => d.id === editingDoc.id ? { ...data, id: editingDoc.id } : d));
            toast.success("Doctor updated!");
        } else {
            // Insert
            const { id, ...insertData } = data;
            const { data: newDoc, error } = await supabase.from('doctors').insert([insertData]).select().single();
            if (error) return toast.error(error.message);
            setDoctors((prev) => [...prev, newDoc].sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
            toast.success("Doctor added!");
        }
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-sm text-gray-500 font-medium">Total: {doctors.length} Doctors</span>
                <button onClick={openNew} className="bg-primary-dark-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-800 transition flex gap-2 items-center">
                    <PlusCircle size={16} /> Add Doctor
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
                {doctors.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">No doctors added yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Designation</th>
                                    <th className="px-6 py-4">Order</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map((d) => (
                                    <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{d.full_name}</div>
                                            <div className="text-xs text-gray-400">{d.qualification}</div>
                                        </td>
                                        <td className="px-6 py-4">{d.designation}</td>
                                        <td className="px-6 py-4">{d.display_order ?? 0}</td>
                                        <td className="px-6 py-4 flex justify-end gap-3">
                                            <button onClick={() => openEdit(d)} className="text-blue-600 hover:text-blue-800 p-2"><Pencil size={18} /></button>
                                            <button onClick={() => d.id && handleDelete(d.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex justify-between items-center z-10">
                            <h2 className="text-xl font-bold">{editingDoc ? 'Edit Doctor' : 'Add New Doctor'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-800 bg-gray-100 p-2 rounded-full"><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Full Name</label>
                                    <input {...register('full_name')} className="w-full border rounded-lg p-2 bg-gray-50" />
                                    {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Qualification</label>
                                    <input {...register('qualification')} placeholder="e.g. BHMS, DBMS" className="w-full border rounded-lg p-2 bg-gray-50" />
                                    {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Designation</label>
                                    <input {...register('designation')} className="w-full border rounded-lg p-2 bg-gray-50" />
                                    {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Years of Exp.</label>
                                    <input type="number" {...register('years_experience')} className="w-full border rounded-lg p-2 bg-gray-50" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Bio</label>
                                <textarea {...register('bio')} rows={3} className="w-full border rounded-lg p-2 bg-gray-50"></textarea>
                                {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Display Order</label>
                                    <input type="number" {...register('display_order')} className="w-full border rounded-lg p-2 bg-gray-50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Photo URL</label>
                                    <input {...register('photo_url')} placeholder="Public URL after upload" className="w-full border rounded-lg p-2 bg-gray-50" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-500 hover:bg-gray-100 rounded-lg font-medium transition">Cancel</button>
                                <button disabled={isSubmitting} type="submit" className="bg-primary-dark-green text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-800 flex items-center gap-2">
                                    {isSubmitting && <Loader2 size={16} className="animate-spin" />} Save Doctor
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
