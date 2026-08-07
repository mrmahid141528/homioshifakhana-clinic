import { Button } from "@/components/ui/Button";
import { getSiteSettings, getTreatments } from "@/lib/api";

export default async function ContactPage() {
    const settings = await getSiteSettings();
    const treatments = await getTreatments();

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-primary-dark-green mb-8 text-center">যোগাযোগ করুন (Contact Us)</h1>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Appointment Form (Rendered loosely since Next Server Component lacks interactivity without client hooks) */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-primary-dark-green mb-6">Book an Appointment</h2>
                        <form className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-neutral-gray mb-1">Patient Name</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary-dark-green" placeholder="Full Name" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-neutral-gray mb-1">Disease / Concern</label>
                                <select className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-primary-dark-green">
                                    {treatments.map((t: any) => (
                                        <option key={t.slug} value={t.title}>{t.title}</option>
                                    ))}
                                    <option>Other</option>
                                </select>
                            </div>

                            <a href={`https://wa.me/${settings.whatsapp_number?.replace(/\+/g, '')}?text=Hello,%20I%20would%20like%20to%20book%20an%20appointment.`} target="_blank" rel="noopener noreferrer" className="mt-4 block">
                                <Button variant="whatsapp" className="w-full" type="button">
                                    Send Request via WhatsApp
                                </Button>
                            </a>
                        </form>
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
