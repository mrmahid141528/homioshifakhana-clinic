import { Button } from "@/components/ui/Button";
import { getSiteSettings, getTreatments } from "@/lib/api";
import { ContactForm } from "@/components/forms/ContactForm";

export default async function ContactPage() {
    const settings = await getSiteSettings();
    const treatments = await getTreatments();

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-primary-dark-green mb-8 text-center">যোগাযোগ করুন (Contact Us)</h1>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Appointment Form (Interactive) */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-primary-dark-green mb-6">Book an Appointment</h2>
                        <ContactForm whatsapp={settings.whatsapp_number} treatments={treatments} />
                    </div>

                    {/* Clinic Info */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-primary-dark-green mb-2">Clinic Address</h3>
                            <p className="text-neutral-gray text-sm mb-4">{settings.clinic_address}</p>

                            <h3 className="font-bold text-primary-dark-green mb-2">Opening Hours</h3>
                            <p className="text-neutral-gray text-sm">{settings.opening_hours}</p>
                        </div>

                        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
                            <h3 className="font-bold text-red-700 mb-2">Emergency Contact</h3>
                            <p className="text-red-900 font-semibold">{settings.emergency_contact}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
