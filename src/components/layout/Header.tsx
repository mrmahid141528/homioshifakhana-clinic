"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "../ui/Button";

export function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const isHome = pathname === "/";

    // For subpages on mobile, strictly a back arrow
    if (!isHome) {
        return (
            <header className="bg-primary-dark-green text-clean-white p-4 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex items-center h-10">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 font-semibold hover:text-gray-200 transition-colors"
                    >
                        <ArrowLeft size={24} />
                        <span>হোম</span>
                    </button>
                </div>
            </header>
        );
    }

    // Home Page Header
    return (
        <header className="bg-primary-dark-green text-clean-white p-4 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link href="/" className="font-bold text-xl tracking-tight">
                    হোমিও চিকিৎসা খানা
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/about" className="hover:text-gray-200 transition-colors">About</Link>
                    <Link href="/doctors" className="hover:text-gray-200 transition-colors">Doctors</Link>
                    <Link href="/treatments" className="hover:text-gray-200 transition-colors">Treatments</Link>
                    <Link href="/contact" className="hover:text-gray-200 transition-colors">Contact</Link>
                    <Button variant="whatsapp" className="ml-4 py-2 px-4 shadow-none hover:shadow-lg">
                        Book Appointment
                    </Button>
                </nav>
            </div>
        </header>
    );
}
