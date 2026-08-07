import { supabase } from "@/lib/supabase/client";
import { GeneralInfoForm, ContactLocationForm, SocialSEOForm, LegalPagesForm } from "@/components/admin/settings/SettingsForms";

export default async function SettingsPage() {
    // Fetch initial data
    const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single();

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Settings</h1>
                <p className="text-gray-500">Manage global website content. Changes are saved independently per section.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="font-bold text-lg text-gray-900">General Information & Branding</h2>
                    <p className="text-sm text-gray-500">Logos, website banners, and home page introductory text.</p>
                </div>
                <div className="p-6">
                    <GeneralInfoForm initialData={settings || {}} />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="font-bold text-lg text-gray-900">Contact & Location</h2>
                    <p className="text-sm text-gray-500">Important phone numbers, map coordinates and clinic schedule.</p>
                </div>
                <div className="p-6">
                    <ContactLocationForm initialData={settings || {}} />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="font-bold text-lg text-gray-900">Social Links & SEO</h2>
                    <p className="text-sm text-gray-500">Meta tags for Google and social media presence.</p>
                </div>
                <div className="p-6">
                    <SocialSEOForm initialData={settings || {}} />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="font-bold text-lg text-gray-900">Footer Legal Pages</h2>
                    <p className="text-sm text-gray-500">Manage your comprehensive policy documents placed in the footer.</p>
                </div>
                <div className="p-6">
                    <LegalPagesForm initialData={settings || {}} />
                </div>
            </div>
        </div>
    );
}
