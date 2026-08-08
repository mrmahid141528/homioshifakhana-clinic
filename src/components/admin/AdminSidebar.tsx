"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, Stethoscope, Activity, Users, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/settings", label: "Site Settings", icon: Settings },
    { href: "/admin/doctors", label: "Doctors", icon: Stethoscope },
    { href: "/admin/treatments", label: "Treatments", icon: Activity },
];

export function AdminSidebar({ adminLogoUrl }: { adminLogoUrl?: string }) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile Header Toggle */}
            <div className="lg:hidden fixed top-0 w-full bg-[#0F6B5B] text-white p-4 flex justify-between items-center z-50">
                <div className="font-bold flex items-center gap-2">
                    {adminLogoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={adminLogoUrl} alt="Admin Logo" className="h-6 object-contain bg-white rounded" />
                    ) : (
                        <span className="text-xl">☤</span>
                    )}
                    <span>Admin</span>
                </div>
                <button onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`
        fixed top-0 left-0 h-screen w-64 bg-[#0F6B5B] text-white flex flex-col z-40 transition-transform duration-300
        ${mobileOpen ? 'translate-x-0 pt-20' : '-translate-x-full lg:translate-x-0 lg:pt-0'}
      `}>

                <div className="hidden lg:flex p-6 border-b border-teal-800 items-center justify-center gap-2">
                    {adminLogoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={adminLogoUrl} alt="Admin Logo" className="h-10 object-contain bg-white p-1 rounded" />
                    ) : (
                        <span className="text-white bg-teal-800 p-2 rounded-full font-bold">☤</span>
                    )}
                    <div className="font-bold">
                        <div className="leading-none">Admin Panel</div>
                        <div className="text-xs font-normal text-teal-300 opacity-80 mt-1">Homio Shifa Khana</div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                    {NAV_LINKS.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors
                      ${isActive ? 'bg-accent-gold text-white shadow-md' : 'text-teal-100 hover:bg-teal-800 hover:text-white'}
                    `}
                            >
                                <Icon size={20} />
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-teal-800">
                    <form action="/auth/logout" method="POST">
                        <button type="submit" className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-teal-200 hover:bg-teal-800 hover:text-white transition-colors w-full">
                            <LogOut size={20} />
                            Logout
                        </button>
                    </form>
                </div>

            </aside>
        </>
    );
}
