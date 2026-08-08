"use client";

import { useState } from 'react';
import { Button } from '../ui/Button';

export function ContactForm({ whatsapp, treatments }: { whatsapp: string, treatments: any[] }) {
    const [name, setName] = useState('');
    const [disease, setDisease] = useState(treatments[0]?.title || 'Other');

    const handleSend = () => {
        const text = `Hello! My name is ${name}. I would like to book an appointment regarding ${disease}.`;
        const url = `https://wa.me/${(whatsapp || "").replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <div>
                <label className="block text-sm font-semibold text-neutral-gray mb-1">Patient Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary-dark-green"
                    placeholder="Full Name"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-neutral-gray mb-1">Disease / Concern</label>
                <select
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary-dark-green"
                >
                    {treatments.map((t: any) => (
                        <option key={t.slug} value={t.title}>{t.title}</option>
                    ))}
                    <option>Other</option>
                </select>
            </div>

            <Button variant="whatsapp" className="w-full mt-4" type="submit">
                Send Request via WhatsApp
            </Button>
        </form>
    );
}
