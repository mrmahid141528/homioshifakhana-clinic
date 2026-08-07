"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Hook up Supabase Auth here later
        alert("Login trigger with: " + email);
        window.location.href = "/dashboard";
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full">
                <h1 className="text-2xl font-bold text-primary-dark-green text-center mb-6">Admin Login</h1>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-neutral-gray mb-1">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary-dark-green" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-neutral-gray mb-1">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary-dark-green" />
                    </div>

                    <Button variant="primary" type="submit" fullWidth className="mt-4 rounded-lg">
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}
