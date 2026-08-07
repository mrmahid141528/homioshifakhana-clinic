"use client";

import { UserCircle } from "lucide-react";

export function AdminTopbar() {
    return (
        <header className="hidden lg:flex bg-white h-16 border-b border-gray-100 items-center justify-end px-8 sticky top-0 z-30 shadow-sm">
            <div className="flex items-center gap-3 text-gray-600">
                <div className="flex flex-col text-right">
                    <span className="font-bold text-sm text-gray-900">Admin User</span>
                    <span className="text-xs text-gray-400">clinic@example.com</span>
                </div>
                <UserCircle size={36} className="text-gray-300" />
            </div>
        </header>
    );
}
