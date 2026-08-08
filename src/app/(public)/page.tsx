import Link from "next/link";
import { MessageCircle, Phone, Calendar } from "lucide-react";

export const revalidate = 0;
import { getSiteSettings, getTreatments, getDoctors } from "@/lib/api";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { HeroSlider } from "@/components/ui/HeroSlider";
import { Button } from "@/components/ui/Button";

export default async function Home() {
    const settings = await getSiteSettings();
    const treatments = await getTreatments();
    const doctors = await getDoctors(3);

    return (
        <div className="bg-white min-h-screen">

            {/* 2. Hero Section (Dynamic Slider) */}
            <HeroSlider
                images={settings.hero_images?.length > 0 ? settings.hero_images : [settings.hero_image_url].filter(Boolean)}
                intervalSec={settings.hero_slide_interval_sec}
                heading={settings.hero_heading}
                tagline={settings.tagline}
            />

            {/* 3. Authority Bar */}
            <section className="max-w-6xl mx-auto px-4 relative -mt-16 z-20 mb-20">
                <div className="bg-[#F0F8F6] border border-[#E0F2EF] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-around items-center gap-6 shadow-sm">
                    <div className="flex items-center gap-4 text-primary-dark-green">
                        <div className="bg-white p-3 rounded-full shadow-sm"><span className="text-xl">👨‍⚕️</span></div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg leading-tight">3 Expert Doctors</span>
                            <span className="text-sm font-medium opacity-80">(BHMS & D.M.B.S.)</span>
                        </div>
                    </div>

                    <div className="w-px h-12 bg-teal-900/10 hidden md:block"></div>

                    <div className="flex items-center gap-4 text-primary-dark-green">
                        <div className="bg-white p-3 rounded-full shadow-sm"><span className="text-xl">👩‍⚕️</span></div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg leading-tight">Special Female</span>
                            <span className="text-sm font-medium opacity-80">Doctor Available</span>
                        </div>
                    </div>

                    <div className="w-px h-12 bg-teal-900/10 hidden md:block"></div>

                    <div className="flex items-center gap-4 text-primary-dark-green">
                        <div className="bg-white p-3 rounded-full shadow-sm"><span className="text-xl">🌿</span></div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg leading-tight">100% Natural</span>
                            <span className="text-sm font-medium opacity-80">Medicine</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Treatments Section */}
            <section className="max-w-7xl mx-auto px-4 pb-20">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">Treatments</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {treatments.map((t: any) => (
                        <TreatmentCard
                            key={t.slug}
                            slug={t.slug}
                            title={t.title}
                            shortDescription={t.short_description}
                        />
                    ))}
                </div>
            </section>

            {/* 5. Why Choose Us */}
            <section className="bg-[#F0F8F6] py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Why Choose Us?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">We provide natural, side-effect-free homeopathic remedies tailored to your unique diagnosis.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {['100% Safe Methods', 'Experienced Staff', 'Modern Diagnostics'].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-50 flex flex-col items-center">
                                <div className="w-16 h-16 bg-teal-50 text-primary-dark-green rounded-full flex items-center justify-center mb-6"><span className="text-2xl font-bold">{i + 1}</span></div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item}</h3>
                                <p className="text-gray-500 text-sm">Long-lasting results addressing the root cause organically without complex surgeries.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Meet The Doctors */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Meet The Doctors</h2>
                    <Link href="/doctors" className="text-primary-dark-green font-bold hover:underline">View All &rarr;</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {doctors.map((doc: any) => (
                        <div key={doc.id} className="text-center">
                            <div className="bg-gray-100 rounded-2xl h-64 mb-4 mx-auto w-full overflow-hidden flex items-center justify-center">
                                {doc.photo_url ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={doc.photo_url} alt={doc.full_name} className="w-full h-full object-cover object-top" />
                                ) : (
                                    <span className="text-gray-400 opacity-50">No Photo</span>
                                )}
                            </div>
                            <h3 className="font-bold text-xl text-gray-900">{doc.full_name}</h3>
                            <p className="text-primary-dark-green font-semibold">{doc.designation}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. Treatment Process */}
            <section className="bg-white py-20 px-4 border-t border-gray-100">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">How We Treat You</h2>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                        <div className="flex flex-col items-center max-w-xs">
                            <div className="w-20 h-20 bg-[#F0F8F6] text-primary-dark-green rounded-full flex justify-center items-center font-bold text-2xl border-4 border-white shadow-lg mb-6 z-10">1</div>
                            <h3 className="text-xl font-bold mb-2">Book Consultation</h3>
                            <p className="text-gray-500">Contact us via WhatsApp to choose a comfortable time slot.</p>
                        </div>
                        <div className="flex flex-col items-center max-w-xs">
                            <div className="w-20 h-20 bg-[#F0F8F6] text-primary-dark-green rounded-full flex justify-center items-center font-bold text-2xl border-4 border-white shadow-lg mb-6 z-10">2</div>
                            <h3 className="text-xl font-bold mb-2">Diagnosis</h3>
                            <p className="text-gray-500">In-depth analysis of your symptoms and lifestyle root causes.</p>
                        </div>
                        <div className="flex flex-col items-center max-w-xs">
                            <div className="w-20 h-20 bg-primary-dark-green text-white rounded-full flex justify-center items-center font-bold text-2xl border-4 border-white shadow-lg mb-6 z-10">3</div>
                            <h3 className="text-xl font-bold mb-2">Start Recovery</h3>
                            <p className="text-gray-500">Receive pure homeopathic remedies customized exclusively for you.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. FAQ Section */}
            <section className="bg-[#F0F8F6] py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
                    <div className="flex flex-col gap-4">
                        {['Are homeopathic medicines safe for children?', 'How long does a chronic treatment take?', 'Can I take homeopathy alongside allopathic medicines?'].map((q, i) => (
                            <details key={i} className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer">
                                <summary className="font-bold text-lg text-gray-900 group-open:text-primary-dark-green outline-none">{q}</summary>
                                <p className="pt-4 text-gray-600">Yes, it is completely safe and organically tailored to ensure maximum efficacy without compromising natural immunities.</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. CTA Section */}
            <section className="bg-primary-dark-green py-24 px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to Start Your Healing Journey?</h2>
                <p className="text-teal-100 mb-10 max-w-2xl mx-auto text-lg">Contact our experts today. We are here to guide your family toward lasting wellness.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="whatsapp" className="px-8 py-4 text-lg">Chat on WhatsApp</Button>
                    <Button className="bg-white text-primary-dark-green font-bold px-8 py-4 text-lg border-none hover:bg-gray-100 shadow-xl">Call Us Directly</Button>
                </div>
            </section>

        </div>
    );
}
