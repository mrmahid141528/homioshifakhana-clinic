import React from 'react';
import { Toaster } from 'sonner';
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

// Server layout enforcing auth protection (already established via middleware roughly, but wrapper here)
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar />

            {/* Main Content Pane */}
            <div className="flex-1 flex flex-col lg:ml-64 w-full">
                <AdminTopbar />
                <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-8 w-full max-w-7xl mx-auto overflow-x-hidden">
                    {children}
                </main>
            </div>
            <Toaster richColors position="top-right" />
        </div>
    );
}
