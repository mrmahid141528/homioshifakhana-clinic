"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Loader2, UploadCloud, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function ImageUploader({
    value,
    onChange,
    label = "Upload Image"
}: {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
}) {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            return toast.error("Please upload a valid image file.");
        }

        // Limit to ~2MB just for sanity
        if (file.size > 2 * 1024 * 1024) {
            return toast.error("Image must be smaller than 2MB.");
        }

        setIsUploading(true);
        // Standardize file name
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

        try {
            // Upload to Storage
            const { data, error } = await supabase.storage
                .from('clinic-images')
                .upload(fileName, file, { cacheControl: '3600', upsert: true });

            if (error) throw error;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage.from('clinic-images').getPublicUrl(data.path);

            onChange(publicUrl);
            toast.success("Image uploaded successfully!");
        } catch (error: any) {
            toast.error("Upload failed: " + (error.message || "Ensure bucket exists"));
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = () => {
        onChange("");
    };

    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">{label}</span>

            <div className="flex items-center gap-4">
                {value ? (
                    <div className="relative group w-24 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={value} alt="Preview" className="w-full h-full object-contain" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button type="button" onClick={handleRemove} className="bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-600 transition">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <label className={`w-full flex flex-col items-center justify-center h-24 border-2 border-dashed border-primary-dark-green/30 bg-primary-dark-green/5 rounded-lg cursor-pointer hover:bg-primary-dark-green/10 transition relative ${isUploading && 'pointer-events-none opacity-60'}`}>
                        {isUploading ? (
                            <Loader2 size={24} className="text-primary-dark-green animate-spin" />
                        ) : (
                            <>
                                <UploadCloud size={24} className="text-primary-dark-green mb-1" />
                                <span className="text-xs font-semibold text-primary-dark-green">Click to Upload</span>
                                <span className="text-[10px] text-gray-500">Max size 2MB</span>
                            </>
                        )}
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={isUploading}
                        />
                    </label>
                )}

                {/* If an image exists, still allow to replace by putting another box, or relying on remove then upload. */}
                {value && (
                    <div className="flex-1">
                        <p className="text-xs text-green-600 font-medium mb-1">Upload complete</p>
                        <input type="text" readOnly value={value} className="w-full text-xs text-gray-400 bg-gray-50 border p-2 rounded outline-none" />
                    </div>
                )}
            </div>
        </div>
    );
}
