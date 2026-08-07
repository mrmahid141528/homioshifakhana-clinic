"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Pencil, Trash2, PlusCircle, X, Loader2, GripVertical } from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";

// --- Schema ---
const faqSchema = z.object({
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required")
});

const tSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Lowercase alphanumeric and dashes only"),
    short_description: z.string().max(250, "Limit descriptions to 250 characters").optional(),
    full_content: z.string().optional(),
    icon_or_image_url: z.string().url("Must be valid URL").optional().or(z.literal("")),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    is_published: z.boolean(),
    display_order: z.coerce.number().optional(),
    faq_json: z.array(faqSchema).optional()
});

type Treatment = z.infer<typeof tSchema>;
type TreatmentForm = z.infer<typeof tSchema>;

export function TreatmentsClient({ initialTreatments }: { initialTreatments: Treatment[] }) {
    const [treatments, setTreatments] = useState<Treatment[]>(initialTreatments);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingT, setEditingT] = useState<any | null>(null);

    const { register, handleSubmit, reset, control, watch, setValue, formState: { errors, isSubmitting } } = useForm<TreatmentForm>({
        // @ts-ignore
        resolver: zodResolver(tSchema),
        defaultValues: { faq_json: [] }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "faq_json"
    });

    const openNew = () => {
        setEditingT(null);
        reset({
            title: "", slug: "", short_description: "", full_content: "",
            icon_or_image_url: "", meta_title: "", meta_description: "",
            is_published: true, display_order: treatments.length, faq_json: []
        });
        setIsModalOpen(true);
    };

    const openEdit = (t: Treatment) => {
        setEditingT(t);
        // Parse JSON string fallback just in case database gave a stringified array wrapper
        let sanitizedFaqs = t.faq_json || [];
        if (typeof sanitizedFaqs === 'string') {
            try { sanitizedFaqs = JSON.parse(sanitizedFaqs); } catch (e) { sanitizedFaqs = []; }
        }
        reset({ ...t, faq_json: sanitizedFaqs });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to completely remove this treatment?")) return;
        const { error } = await supabase.from('treatments').delete().eq('id', id);
        if (error) { toast.error("Failed to delete treatment."); }
        else {
            setTreatments((prev) => prev.filter(d => d.id !== id));
            toast.success("Treatment removed successfully");
        }
    };

    const togglePublish = async (id: number, currentStatus: boolean) => {
        const { error } = await supabase.from('treatments').update({ is_published: !currentStatus }).eq('id', id);
        if (!error) {
            setTreatments((prev) => prev.map(t => t.id === id ? { ...t, is_published: !currentStatus } : t));
            toast.success(currentStatus ? "Treatment unpublished" : "Treatment published");
        }
    };

    const onSubmit = async (data: TreatmentForm) => {
        if (editingT?.id) {
            const { error } = await supabase.from('treatments').update(data).eq('id', editingT.id);
            if (error) return toast.error(error.message);
            setTreatments((prev) => prev.map(t => t.id === editingT.id ? { ...data, id: editingT.id } : t));
            toast.success("Treatment updated!");
        } else {
            const { id, ...insertData } = data;
            const { data: newT, error } = await supabase.from('treatments').insert([insertData]).select().single();
            if (error) return toast.error(error.message);
            setTreatments((prev) => [...prev, newT].sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
            toast.success("Treatment added!");
        }
        setIsModalOpen(false);
    };

    // Auto-generate slug from title if empty
    const handleTitleBlur = (e: any) => {
        if (!watch("slug")) {
            setValue("slug", e.target.value.toLowerCase().trim().replace(/[\s\W-]+/g, '-'), { shouldValidate: true });
        }
    };

    return (
        <>
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-sm text-gray-500 font-medium">Total: {treatments.length} Services</span>
                <button onClick={openNew} className="bg-primary-dark-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-800 transition flex gap-2 items-center">
                    <PlusCircle size={16} /> Add Treatment
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
                {treatments.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">No treatments documented.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Title / Slug</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {treatments.map((t) => (
                                    <tr key={t.id} className={`border-b border-gray-50 hover:bg-gray-50/50 ${!t.is_published && 'opacity-60'}`}>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900 text-base mb-1">{t.title}</div>
                                            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block">/{t.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => t.id && togglePublish(t.id, t.is_published)} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${t.is_published ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                                {t.is_published ? 'Live' : 'Draft'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 flex justify-end gap-3 h-full items-center">
                                            <button onClick={() => openEdit(t)} className="text-blue-600 hover:text-blue-800 p-2 bg-blue-50 rounded"><Pencil size={18} /></button>
                                            <button onClick={() => t.id && handleDelete(t.id)} className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded"><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal Editor */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl">
                        <div className="bg-white p-6 border-b border-gray-100 flex justify-between items-center rounded-t-2xl shrink-0">
                            <h2 className="text-2xl font-bold text-gray-900">{editingT ? 'Edit Treatment' : 'New Treatment'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-800 bg-gray-100 p-2 rounded-full"><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit as any)} className="overflow-y-auto flex-1 p-6 flex flex-col gap-8 bg-gray-50">

                            {/* Basic Info */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4">
                                <h3 className="font-bold border-b pb-2">Basic Info</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Title</label>
                                        <input {...register('title')} onBlur={handleTitleBlur} className="w-full border rounded-lg p-3 bg-gray-50" />
                                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Slug URL</label>
                                        <input {...register('slug')} className="w-full border rounded-lg p-3 bg-gray-50 text-primary-dark-green font-mono" />
                                        {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <label className="block text-sm font-semibold">Short Description (for cards)</label>
                                        <span className="text-xs text-gray-400">{watch("short_description")?.length || 0}/250</span>
                                    </div>
                                    <textarea {...register('short_description')} rows={2} className="w-full border rounded-lg p-3 bg-gray-50"></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-4 items-center">
                                    <label className="flex items-center gap-3 font-semibold cursor-pointer p-4 bg-gray-50 border rounded-lg">
                                        <input type="checkbox" {...register('is_published')} className="w-5 h-5 accent-primary-dark-green" />
                                        Publish to Live Site directly
                                    </label>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Display Order</label>
                                        <input type="number" {...register('display_order')} className="w-full border rounded-lg p-3 bg-gray-50" />
                                    </div>
                                </div>
                                <div>
                                    <ImageUploader
                                        label="Treatment Thumbnail/Icon"
                                        value={watch('icon_or_image_url')}
                                        onChange={(url) => setValue('icon_or_image_url', url, { shouldValidate: true })}
                                    />
                                </div>
                            </div>

                            {/* Full Content */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4">
                                <h3 className="font-bold border-b pb-2">Full Content (HTML/Markdown)</h3>
                                <textarea {...register('full_content')} rows={8} className="w-full border rounded-lg p-4 bg-gray-50 font-mono text-sm leading-relaxed" placeholder="<h1>Main Heading</h1><p>Description here...</p>"></textarea>
                            </div>

                            {/* FAQ Repeater */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <h3 className="font-bold">Frequently Asked Questions</h3>
                                    <button type="button" onClick={() => append({ question: "", answer: "" })} className="text-sm font-semibold text-primary-dark-green flex items-center gap-1"><PlusCircle size={14} /> Add FAQ</button>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="p-4 border rounded-lg bg-gray-50 relative flex gap-4">
                                            <div className="flex-1 flex flex-col gap-3">
                                                <input placeholder="Question" {...register(`faq_json.${index}.question` as const)} className="w-full border rounded-lg p-2 bg-white font-bold" />
                                                {errors?.faq_json?.[index]?.question && <p className="text-red-500 text-xs mt-1">{errors.faq_json[index]?.question?.message}</p>}

                                                <textarea placeholder="Answer" {...register(`faq_json.${index}.answer` as const)} rows={2} className="w-full border rounded-lg p-2 bg-white"></textarea>
                                                {errors?.faq_json?.[index]?.answer && <p className="text-red-500 text-xs mt-1">{errors.faq_json[index]?.answer?.message}</p>}
                                            </div>
                                            <button type="button" onClick={() => remove(index)} className="text-red-400 hover:text-red-600 self-start p-2"><Trash2 size={20} /></button>
                                        </div>
                                    ))}
                                    {fields.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No FAQs added yet.</p>}
                                </div>
                            </div>

                            {/* SEO */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4 mb-4">
                                <h3 className="font-bold border-b pb-2">SEO Meta</h3>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Meta Title</label>
                                    <input {...register('meta_title')} className="w-full border rounded-lg p-3 bg-gray-50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Meta Description</label>
                                    <textarea {...register('meta_description')} rows={2} className="w-full border rounded-lg p-3 bg-gray-50"></textarea>
                                </div>
                            </div>

                        </form>
                        <div className="bg-white p-4 border-t border-gray-100 flex justify-end gap-3 shrink-0 rounded-b-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3 text-gray-500 hover:bg-gray-100 rounded-lg font-bold transition">Cancel</button>
                            <button disabled={isSubmitting} onClick={handleSubmit(onSubmit as any)} className="bg-primary-dark-green text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-800 flex items-center gap-2">
                                {isSubmitting && <Loader2 size={16} className="animate-spin" />} Save Treatment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
