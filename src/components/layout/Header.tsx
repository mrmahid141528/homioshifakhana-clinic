"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, MapPin, Clock, Menu, X } from "lucide-react";
import { Button } from "../ui/Button";

export function Header({ logoUrl, clinicName, phone, whatsapp }: { logoUrl?: string, clinicName?: string, phone?: string, whatsapp?: string }) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const callHref = phone ? `tel:${phone}` : `tel:+910000000000`;
    const waHref = whatsapp
        ? `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=Hello,%20I%20want%20to%20book%20an%20appointment`
        : `https://wa.me/910000000000`;

    return (
        <>
            {/* Top Bar (Desktop Only) */}
            <div className="hidden md:flex bg-primary-dark-green text-clean-white py-2 px-4 text-sm font-medium">
                <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>Address, New, Gum, Calchori, 31734</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>Time - 7:00 PM</span>
                        </div>
                    </div>
                    <div>
                        <Link href="/contact" className="bg-accent-gold text-white px-4 py-1 rounded-full font-bold hover:bg-yellow-600 transition text-sm">
                            Book Appointment
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        {logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={logoUrl} alt={clinicName || "Clinic Logo"} className="h-10 md:h-12 object-contain" />
                        ) : (
                            <>
                                <div className="text-primary-dark-green flex flex-col items-center justify-center font-bold text-2xl">
                                    <span className="text-3xl leading-none">☤</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-xl text-primary-dark-green leading-none">{clinicName || "হোমিও চিকিৎসা খানা"}</span>
                                    <span className="text-xs text-neutral-gray tracking-wide">Homeopathy Clinic</span>
                                </div>
                            </>
                        )}
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden lg:flex items-center gap-6 font-semibold text-neutral-gray">
                        <Link href="/" className={`${pathname === '/' ? 'text-primary-dark-green border-b-2 border-primary-dark-green' : 'hover:text-primary-dark-green'}`}>Home</Link>
                        <Link href="/about" className={`${pathname === '/about' ? 'text-primary-dark-green border-b-2 border-primary-dark-green' : 'hover:text-primary-dark-green'}`}>About</Link>
                        <Link href="/doctors" className={`${pathname === '/doctors' ? 'text-primary-dark-green border-b-2 border-primary-dark-green' : 'hover:text-primary-dark-green'}`}>Doctors</Link>
                        <Link href="/treatments" className={`${pathname === '/treatments' ? 'text-primary-dark-green border-b-2 border-primary-dark-green' : 'hover:text-primary-dark-green'}`}>Treatments</Link>
                        <Link href="/blog" className={`${pathname === '/blog' ? 'text-primary-dark-green border-b-2 border-primary-dark-green' : 'hover:text-primary-dark-green'}`}>Blog</Link>
                        <Link href="/contact" className={`${pathname === '/contact' ? 'text-primary-dark-green border-b-2 border-primary-dark-green' : 'hover:text-primary-dark-green'}`}>Contact</Link>
                    </nav>

                    {/* Desktop Action Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Button href={callHref} className="bg-accent-gold text-white border-none text-sm px-5 py-2 hover:bg-yellow-600 gap-2">
                            <Phone size={16} /> Call Now
                        </Button>
                        <Button href={waHref} target="_blank" className="bg-primary-dark-green text-white border-none text-sm px-5 py-2 hover:bg-teal-800 gap-2">
                            <MessageCircle size={16} /> WhatsApp Appointment
                        </Button>
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <button
                        className="lg:hidden text-primary-dark-green p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 absolute w-full shadow-lg">
                        <nav className="flex flex-col gap-4 font-semibold text-neutral-gray mb-6">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
                            <Link href="/doctors" onClick={() => setMobileMenuOpen(false)}>Doctors</Link>
                            <Link href="/treatments" onClick={() => setMobileMenuOpen(false)}>Treatments</Link>
                            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                        </nav>
                    </div>
                )}
            </header>

        </>
    );
}
