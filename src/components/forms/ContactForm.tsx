"use client";

import { useState } from 'react';
import { Button } from '../ui/Button';

export function ContactForm({ whatsapp, treatments }: { whatsapp: string, treatments: any[] }) {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        age: '',
        date: '',
        time: '',
        treatment: '',
        condition: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSend = () => {
        const text = `*New Appointment Request* 🗓️\n\n*Patient Details:*\n👤 Name: ${formData.name}\n📱 Mobile: ${formData.mobile}\n🎂 Age: ${formData.age}\n\n*Appointment Details:*\n📅 Date: ${formData.date}\n⏰ Time: ${formData.time}\n\n*Medical Info:*\n🩺 Treatment: ${formData.treatment || 'Not specified'}\n📝 Condition: ${formData.condition || 'Not specified'}`;

        const url = `https://wa.me/${(whatsapp || "").replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <form className="flex flex-col gap-4 bg-white rounded-xl" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>

            {/* Full Name */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-primary-dark-green focus:ring-1 focus:ring-primary-dark-green transition-all"
                    placeholder="e.g. Rahul Kumar"
                />
            </div>

            {/* Mobile & Age Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
                    <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-primary-dark-green focus:ring-1 focus:ring-primary-dark-green transition-all"
                        placeholder="10-digit mobile number"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Age <span className="text-red-500">*</span></label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-primary-dark-green focus:ring-1 focus:ring-primary-dark-green transition-all"
                        placeholder="Years"
                    />
                </div>
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Appointment Date <span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-primary-dark-green focus:ring-1 focus:ring-primary-dark-green transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Time Slot <span className="text-red-500">*</span></label>
                    <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-primary-dark-green focus:ring-1 focus:ring-primary-dark-green transition-all bg-white"
                    >
                        <option value="" disabled>Select Time Slot</option>
                        <option value="Morning (9 AM - 1 PM)">Morning (9 AM - 1 PM)</option>
                        <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                        <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                    </select>
                </div>
            </div>

            {/* Treatment (Optional) */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Treatment (Optional)</label>
                <select
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-primary-dark-green focus:ring-1 focus:ring-primary-dark-green transition-all bg-white"
                >
                    <option value="" disabled>Select Treatment (Optional)</option>
                    {treatments.map((t: any) => (
                        <option key={t.slug} value={t.title}>{t.title}</option>
                    ))}
                    <option value="Other">Other / Not Sure</option>
                </select>
            </div>

            {/* Condition (Optional) */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Describe Condition (Optional)</label>
                <textarea
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-primary-dark-green focus:ring-1 focus:ring-primary-dark-green transition-all resize-none"
                    placeholder="Briefly describe your symptoms or concerns..."
                />
            </div>

            <Button variant="whatsapp" className="w-full mt-2" type="submit">
                Send Request via WhatsApp
            </Button>
        </form>
    );
}
