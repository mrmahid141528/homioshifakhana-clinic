import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getSiteSettings, getDoctors, getTreatments } from "@/lib/api";

export default async function Home() {
    const settings = await getSiteSettings();
    const doctors = await getDoctors(3);
    const treatments = await getTreatments(4);

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-primary-dark-green text-clean-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{settings.hero_heading || settings.clinic_name}</h1>
                    <p className="text-xl md:text-2xl mb-8">{settings.tagline}</p>
                    <a href={`https://wa.me/${settings.whatsapp_number.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-accent-gold text-white font-bold py-3 px-8 rounded-full flex items-center justify-center gap-2 mx-auto w-fit hover:bg-yellow-600 transition-colors">
                        <MessageCircle size={20} />
                        Book Appointment
                    </a>
                </div>
            </section>

            {/* Trust Strip */}
            <section className="py-8 bg-gray-50 border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-around gap-4 text-center">
                    <div><div className="text-3xl font-bold text-primary-dark-green">20+</div><div className="text-neutral-gray text-sm">Years Experience</div></div>
                    <div><div className="text-3xl font-bold text-primary-dark-green">3</div><div className="text-neutral-gray text-sm">BHMS/DBMS Doctors</div></div>
                    <div><div className="text-3xl font-bold text-primary-dark-green">1000+</div><div className="text-neutral-gray text-sm">Patients Treated</div></div>
                </div>
            </section>

            {/* Treatments Preview */}
            <section className="py-16 px-4 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-primary-dark-green">Our Treatments</h2>
                    <Link href="/treatments" className="text-primary-dark-green font-semibold hover:underline">
                        View All →
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {treatments.map((t: any) => (
                        <Link key={t.slug} href={`/treatments/${t.slug}`} className="bg-white border rounded-lg p-6 flex flex-col items-center hover:shadow-md transition">
                            <div className="w-12 h-12 bg-gray-100 rounded-full mb-4 flex items-center justify-center text-primary-dark-green font-bold">{t.title.charAt(0)}</div>
                            <h3 className="font-semibold text-center text-sm md:text-base">{t.title}</h3>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
