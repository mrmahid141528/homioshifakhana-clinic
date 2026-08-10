import React from 'react';
import { Header } from '../../components/layout/Header';
import { getSiteSettings } from '@/lib/api';

export const revalidate = 0;


export default async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getSiteSettings();

    return (
        <>
            <Header
                logoUrl={settings.logo_url}
                clinicName={settings.clinic_name}
                phone={settings.emergency_contact}
                whatsapp={settings.whatsapp_number}
            />
            <main className="min-h-screen">
                {children}
            </main>
            <footer className="bg-[#111827] text-gray-300 py-16 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Info */}
                    <div className="md:col-span-2">
                        {settings.logo_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={settings.logo_url} alt="Logo" className="h-12 object-contain mb-4 bg-white p-2 rounded" />
                        ) : (
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-primary-dark-green bg-white rounded p-1 inline-block">☤</span>
                                {settings.clinic_name || "হোমিও চিকিৎসা খানা"}
                            </h2>
                        )}
                        <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
                            {settings.about_text || "We provide 100% natural and effective homeopathic treatments. Over 20 years of excellence in chronic disease resolution."}
                        </p>
                        <div className="flex gap-4 mb-8 md:mb-0">
                            <span className="px-3 py-1 bg-gray-800 text-xs rounded border border-gray-700">ISO Certified</span>
                            <span className="px-3 py-1 bg-gray-800 text-xs rounded border border-gray-700">100% Natural</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Quick Links</h3>
                        <ul className="flex flex-col gap-3">
                            <li><a href="/about" className="hover:text-primary-dark-green transition">About Us</a></li>
                            <li><a href="/treatments" className="hover:text-primary-dark-green transition">Treatments</a></li>
                            <li><a href="/doctors" className="hover:text-primary-dark-green transition">Our Doctors</a></li>
                            <li><a href="/contact" className="hover:text-primary-dark-green transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Legal / Contact Data */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Support & Legal</h3>
                        <ul className="flex flex-col gap-3">
                            <li><a href="/privacy" className="hover:text-primary-dark-green transition">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-primary-dark-green transition">Terms of Service</a></li>
                            <li className="mt-4 border-t border-gray-800 pt-4">
                                <strong>Emergency Phone:</strong><br /><span className="text-accent-gold">{settings.emergency_contact || "Not Configured"}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto text-center border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} হোমিও চিকিৎসা খানা (Homeopathy Clinic). All Rights Reserved.
                </div>
            </footer>
        </>
    );
}
