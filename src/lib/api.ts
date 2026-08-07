import { supabase } from "./supabase/client";

export async function getSiteSettings() {
    try {
        const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Failed to fetch settings, using fallback", error);
        return {
            clinic_name: 'হোমিও চিকিৎসা খানা',
            tagline: 'Trusted Homeopathy Care for Your Family',
            hero_heading: 'হোমিও চিকিৎসা খানা',
            whatsapp_number: '+8801XXXXXXXXX',
            opening_hours: 'Mon-Sat: 10:00 AM - 8:00 PM',
            clinic_address: '123 Main Road, City Center, Area Name, Kolkata - 700001',
            emergency_contact: '+88 01XXXXXXXXX'
        };
    }
}

export async function getDoctors(limit?: number) {
    try {
        let query = supabase.from('doctors').select('*').order('display_order');
        if (limit) query = query.limit(limit);

        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Failed to fetch doctors, using mock data", error);
        return [
            { id: 1, full_name: "Dr. A. Rahman", qualification: "BHMS", designation: "Chief Physician", bio: "Experienced homeopathy physician specializing in chronic diseases.", years_experience: 25 },
            { id: 2, full_name: "Dr. S. Khatun", qualification: "BHMS, DBMS", designation: "Senior Consultant", bio: "Expert in female health and pediatric homeopathy.", years_experience: 15 },
            { id: 3, full_name: "Dr. M. Ali", qualification: "DBMS", designation: "Consultant", bio: "Specializes in joint pain and gastric issues.", years_experience: 10 }
        ];
    }
}

export async function getTreatments(limit?: number) {
    try {
        let query = supabase.from('treatments').select('*').order('display_order');
        if (limit) query = query.limit(limit);

        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Failed to fetch treatments, using mock data", error);
        return [
            { slug: "joint-pain", title: "Joint Pain & Arthritis", short_description: "Effective homeopathic relief for chronic joint inflammation and stiffness." },
            { slug: "diabetes", title: "Diabetes Management", short_description: "Holistic approaches to manage blood sugar naturally." },
            { slug: "gastric", title: "Gastric & Acidity", short_description: "Permanent cure for chronic indigestion and severe acidity." },
            { slug: "skin-diseases", title: "Skin Diseases", short_description: "Safe treatments for Eczema, Psoriasis, and other skin ailments." },
        ];
    }
}

export async function getTreatmentBySlug(slug: string) {
    try {
        const { data, error } = await supabase.from('treatments').select('*').eq('slug', slug).single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(`Failed to fetch treatment ${slug}, using mock data`, error);
        const displayTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        return {
            title: displayTitle,
            slug: slug,
            full_content: `Homeopathy believes that ${displayTitle.toLowerCase()} is often a manifestation of deeper internal imbalances.`
        };
    }
}
