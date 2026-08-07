import React from 'react';
import { Header } from '../../components/layout/Header';

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <footer className="bg-neutral-gray text-clean-white p-8">
                <div className="max-w-6xl mx-auto text-center text-sm">
                    &copy; {new Date().getFullYear()} হোমিও চিকিৎসা খানা
                </div>
            </footer>
        </>
    );
}
