"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase/client";
import { toast, Toaster } from "sonner";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            // Successfully authenticated, forcefully reload to the admin panel
            // This triggers the middleware which validates the cookie 
            toast.success("Welcome back!");
            window.location.href = "/admin";

        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Toaster position="top-center" />
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full">
                <h1 className="text-2xl font-bold text-primary-dark-green text-center mb-6 flex flex-col items-center">
                    Admin Login
                    <span className="text-sm font-normal text-gray-500 mt-2">Homio Shifa Khana Portal</span>
                </h1>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-neutral-gray mb-1">Clinic Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary-dark-green bg-white text-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-neutral-gray mb-1">Master Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary-dark-green bg-white text-gray-800"
                        />
                    </div>

                    <Button variant="primary" type="submit" fullWidth className="mt-4 rounded-lg flex items-center justify-center gap-2" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
                        Sign Into Dashboard
                    </Button>
                </form>
            </div>
        </div>
    );
}
