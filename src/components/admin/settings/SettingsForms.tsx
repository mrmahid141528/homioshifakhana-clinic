"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";

// --- Custom Button Component ---
function SubmitBtn({ isSubmitting }: { isSubmitting: boolean }) {
    return (
        <button
            disabled={isSubmitting}
            className="bg-primary-dark-green text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-800 transition disabled:opacity-70 flex items-center justify-center gap-2 min-w-[120px]"
        >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Save Changes"}
        </button>
    );
}

// --- GENERAL INFO & BRANDING FORM ---
const generalSchema = z.object({
    clinic_name: z.string().min(1, "Clinic name is required"),
    tagline: z.string().optional(),
    hero_heading: z.string().optional(),
    about_text: z.string().optional(),
    hero_images: z.array(z.string().url("Must be a valid URL")).optional(),
    hero_slide_interval_sec: z.coerce.number().min(1, "Must be at least 1s").optional(),
    logo_url: z.string().url("Must be valid URL").optional().or(z.literal("")),
    admin_logo_url: z.string().url("Must be valid URL").optional().or(z.literal("")),
});

export function GeneralInfoForm({ initialData }: { initialData: any }) {
    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<z.infer<typeof generalSchema>>({
        // @ts-ignore
        resolver: zodResolver(generalSchema),
        defaultValues: {
            clinic_name: initialData?.clinic_name || "",
            tagline: initialData?.tagline || "",
            hero_heading: initialData?.hero_heading || "",
            about_text: initialData?.about_text || "",
            hero_images: initialData?.hero_images || [],
            hero_slide_interval_sec: initialData?.hero_slide_interval_sec || 5,
            logo_url: initialData?.logo_url || "",
            admin_logo_url: initialData?.admin_logo_url || "",
        }
    });

    const onSubmit = async (data: any) => {
        const { error } = await supabase.from('site_settings').update(data).eq('id', 1);
        if (error) { toast.error("Failed to save Gen Info: " + error.message); }
        else { toast.success("General Info updated successfully!"); }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Clinic Name</label>
                    <input {...register('clinic_name')} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" />
                    {errors.clinic_name && <p className="text-red-500 text-xs mt-1">{errors.clinic_name.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Hero Heading</label>
                    <input {...register('hero_heading')} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold mb-1">Tagline</label>
                <input {...register('tagline')} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" />
            </div>
            <div>
                <label className="block text-sm font-semibold mb-1">About Text</label>
                <textarea {...register('about_text')} rows={4} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <ImageUploader
                        label="Website Logo"
                        value={watch('logo_url')}
                        onChange={(url) => setValue('logo_url', url, { shouldValidate: true })}
                    />
                    {errors.logo_url && <p className="text-red-500 text-xs mt-1">{errors.logo_url.message}</p>}
                </div>
                <div>
                    <ImageUploader
                        label="Admin Panel Logo"
                        value={watch('admin_logo_url')}
                        onChange={(url) => setValue('admin_logo_url', url, { shouldValidate: true })}
                    />
                    {errors.admin_logo_url && <p className="text-red-500 text-xs mt-1">{errors.admin_logo_url.message}</p>}
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-4">
                <h3 className="font-bold text-gray-800 border-b pb-2">Hero Slider Configurations</h3>
                <div>
                    <label className="block text-sm font-semibold mb-1">Slide Timer (Seconds)</label>
                    <input type="number" {...register('hero_slide_interval_sec')} className="w-full border rounded-lg p-2 bg-white focus:outline-primary-dark-green max-w-xs" />
                </div>

                <div className="flex flex-col gap-4">
                    <label className="block text-sm font-semibold">Slider Images</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(watch('hero_images') || []).map((url: string, index: number) => (
                            <ImageUploader
                                key={index}
                                label={`Slide ${index + 1}`}
                                value={url}
                                onChange={(newUrl) => {
                                    const curr = [...(watch('hero_images') || [])];
                                    if (newUrl) { curr[index] = newUrl; } else { curr.splice(index, 1); }
                                    setValue('hero_images', curr, { shouldValidate: true });
                                }}
                            />
                        ))}
                        {/* New Slide Upload Box */}
                        <ImageUploader
                            label="Add New Slide"
                            onChange={(newUrl) => {
                                if (newUrl) {
                                    setValue('hero_images', [...(watch('hero_images') || []), newUrl], { shouldValidate: true })
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100 mt-2">
                <SubmitBtn isSubmitting={isSubmitting} />
            </div>
        </form>
    )
}

// --- LEGAL PAGES FORM ---
const legalSchema = z.object({
    privacy_policy: z.string().optional(),
    terms_of_service: z.string().optional(),
});

export function LegalPagesForm({ initialData }: { initialData: any }) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof legalSchema>>({
        // @ts-ignore
        resolver: zodResolver(legalSchema),
        defaultValues: {
            privacy_policy: initialData?.privacy_policy || "",
            terms_of_service: initialData?.terms_of_service || "",
        }
    });

    const onSubmit = async (data: any) => {
        const { error } = await supabase.from('site_settings').update(data).eq('id', 1);
        if (error) { toast.error("Failed to save Legal pages"); }
        else { toast.success("Legal pages updated successfully!"); }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit as any)} className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-semibold mb-1">Privacy Policy</label>
                <textarea {...register('privacy_policy')} rows={6} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green"></textarea>
            </div>
            <div>
                <label className="block text-sm font-semibold mb-1">Terms of Service</label>
                <textarea {...register('terms_of_service')} rows={6} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green"></textarea>
            </div>
            <div className="flex justify-end pt-2 border-t border-gray-100 mt-2">
                <SubmitBtn isSubmitting={isSubmitting} />
            </div>
        </form>
    )
}

// --- CONTACT & LOCATION FORM ---
const contactSchema = z.object({
    whatsapp_number: z.string().min(1, "WhatsApp is required"),
    emergency_contact: z.string().optional(),
    clinic_address: z.string().optional(),
    opening_hours: z.string().optional(),
    clinic_lat: z.coerce.number().optional(),
    clinic_lng: z.coerce.number().optional()
});

export function ContactLocationForm({ initialData }: { initialData: any }) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof contactSchema>>({
        // @ts-ignore
        resolver: zodResolver(contactSchema),
        defaultValues: {
            whatsapp_number: initialData?.whatsapp_number || "",
            emergency_contact: initialData?.emergency_contact || "",
            clinic_address: initialData?.clinic_address || "",
            opening_hours: initialData?.opening_hours || "",
            clinic_lat: initialData?.clinic_lat || 0,
            clinic_lng: initialData?.clinic_lng || 0,
        }
    });

    const onSubmit = async (data: any) => {
        const { error } = await supabase.from('site_settings').update(data).eq('id', 1);
        if (error) { toast.error("Failed to save Contact Info"); }
        else { toast.success("Contact Details updated successfully!"); }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">WhatsApp Number</label>
                    <input {...register('whatsapp_number')} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" />
                    {errors.whatsapp_number && <p className="text-red-500 text-xs mt-1">{errors.whatsapp_number.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Emergency Contact</label>
                    <input {...register('emergency_contact')} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold mb-1">Clinic Address</label>
                <textarea {...register('clinic_address')} rows={2} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green"></textarea>
            </div>
            <div>
                <label className="block text-sm font-semibold mb-1">Opening Hours</label>
                <textarea {...register('opening_hours')} rows={2} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" placeholder="e.g. Mon-Sat: 10:00 AM - 08:00 PM"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Latitude</label>
                    <input type="number" step="any" {...register('clinic_lat')} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Longitude</label>
                    <input type="number" step="any" {...register('clinic_lng')} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" />
                </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100 mt-2">
                <SubmitBtn isSubmitting={isSubmitting} />
            </div>
        </form>
    )
}

// --- SOCIAL & SEO FORM ---
const seoSchema = z.object({
    facebook_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    instagram_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    meta_title: z.string().max(60, "Optimal title length is under 60 chars").optional(),
    meta_description: z.string().max(160, "Optimal description is under 160 chars").optional(),
});

export function SocialSEOForm({ initialData }: { initialData: any }) {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<z.infer<typeof seoSchema>>({
        // @ts-ignore
        resolver: zodResolver(seoSchema),
        defaultValues: {
            facebook_url: initialData?.facebook_url || "",
            instagram_url: initialData?.instagram_url || "",
            meta_title: initialData?.meta_title || "",
            meta_description: initialData?.meta_description || "",
        }
    });

    const titleVal = watch("meta_title") || "";
    const descVal = watch("meta_description") || "";

    const onSubmit = async (data: any) => {
        const { error } = await supabase.from('site_settings').update(data).eq('id', 1);
        if (error) { toast.error("Failed to save SEO config"); }
        else { toast.success("SEO metrics updated successfully!"); }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Facebook URL</label>
                    <input {...register('facebook_url')} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" />
                    {errors.facebook_url && <p className="text-red-500 text-xs mt-1">{errors.facebook_url.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Instagram URL</label>
                    <input {...register('instagram_url')} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" />
                    {errors.instagram_url && <p className="text-red-500 text-xs mt-1">{errors.instagram_url.message}</p>}
                </div>
            </div>
            <div>
                <div className="flex justify-between items-end mb-1">
                    <label className="block text-sm font-semibold">Meta Title</label>
                    <span className={`text-xs ${titleVal.length > 60 ? 'text-orange-500' : 'text-gray-400'}`}>{titleVal.length}/60 chars</span>
                </div>
                <input {...register('meta_title')} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" />
                {errors.meta_title && <p className="text-red-500 text-xs mt-1">{errors.meta_title.message}</p>}
            </div>
            <div>
                <div className="flex justify-between items-end mb-1">
                    <label className="block text-sm font-semibold">Meta Description</label>
                    <span className={`text-xs ${descVal.length > 160 ? 'text-orange-500' : 'text-gray-400'}`}>{descVal.length}/160 chars</span>
                </div>
                <textarea {...register('meta_description')} rows={3} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green"></textarea>
                {errors.meta_description && <p className="text-red-500 text-xs mt-1">{errors.meta_description.message}</p>}
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100 mt-2">
                <SubmitBtn isSubmitting={isSubmitting} />
            </div>
        </form>
    )
}
