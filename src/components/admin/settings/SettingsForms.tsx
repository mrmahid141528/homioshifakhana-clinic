"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
    hero_image_url: z.string().url("Must be valid URL").optional().or(z.literal("")),
    logo_url: z.string().url("Must be valid URL").optional().or(z.literal("")),
    admin_logo_url: z.string().url("Must be valid URL").optional().or(z.literal("")),
});

export function GeneralInfoForm({ initialData }: { initialData: any }) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof generalSchema>>({
        resolver: zodResolver(generalSchema),
        defaultValues: {
            clinic_name: initialData?.clinic_name || "",
            tagline: initialData?.tagline || "",
            hero_heading: initialData?.hero_heading || "",
            about_text: initialData?.about_text || "",
            hero_image_url: initialData?.hero_image_url || "",
            logo_url: initialData?.logo_url || "",
            admin_logo_url: initialData?.admin_logo_url || "",
        }
    });

    const onSubmit = async (data: z.infer<typeof generalSchema>) => {
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
                    <label className="block text-sm font-semibold mb-1">Website Logo URL</label>
                    <input {...register('logo_url')} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" placeholder="Public image URL" />
                    {errors.logo_url && <p className="text-red-500 text-xs mt-1">{errors.logo_url.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Admin Panel Logo URL</label>
                    <input {...register('admin_logo_url')} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" placeholder="Public image URL" />
                    {errors.admin_logo_url && <p className="text-red-500 text-xs mt-1">{errors.admin_logo_url.message}</p>}
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold mb-1">Hero Banner Image URL (Home Page)</label>
                <input {...register('hero_image_url')} className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-primary-dark-green" placeholder="Public image URL" />
                {errors.hero_image_url && <p className="text-red-500 text-xs mt-1">{errors.hero_image_url.message}</p>}
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
        resolver: zodResolver(legalSchema),
        defaultValues: {
            privacy_policy: initialData?.privacy_policy || "",
            terms_of_service: initialData?.terms_of_service || "",
        }
    });

    const onSubmit = async (data: z.infer<typeof legalSchema>) => {
        const { error } = await supabase.from('site_settings').update(data).eq('id', 1);
        if (error) { toast.error("Failed to save Legal pages"); }
        else { toast.success("Legal pages updated successfully!"); }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

    const onSubmit = async (data: z.infer<typeof contactSchema>) => {
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

    const onSubmit = async (data: z.infer<typeof seoSchema>) => {
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
