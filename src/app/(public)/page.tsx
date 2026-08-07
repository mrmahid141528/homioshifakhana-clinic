import Link from "next/link";
import { MessageCircle, Phone, Calendar } from "lucide-react";
import { getSiteSettings, getTreatments } from "@/lib/api";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { Button } from "@/components/ui/Button";

export default async function Home() {
    const settings = await getSiteSettings();
    const treatments = await getTreatments();

    return (
        <div className="bg-white min-h-screen">

            {/* 2. Hero Section */}
            <section className="relative bg-teal-50/50 overflow-hidden">
                {/* Decorative background element simulating the image */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-100/40 to-transparent z-0"></div>

                <div className="max-w-7xl mx-auto px-4 pt-16 pb-32 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">

                    {/* Left Text */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111827] leading-tight mb-4">
                            Natural Homeopathic <br className="hidden md:block" /> Treatment for Your Family
                        </h1>
                        <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto md:mx-0">
                            Natural homeopathic medicine treatment for your family's health, ensuring long-term wellness without side effects.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Button className="bg-accent-gold text-white font-bold py-3 px-8 rounded-full border-none shadow-sm hover:shadow-md transition">
                                Call Now
                            </Button>
                            <Button className="bg-primary-dark-green text-white font-bold py-3 px-8 rounded-full border-none shadow-sm hover:shadow-md transition flex items-center gap-2">
                                <MessageCircle size={20} /> WhatsApp Appointment
                            </Button>
                        </div>
                    </div>

                    {/* Right Floating Form */}
                    <div className="w-full md:w-[400px] shrink-0">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative">
                            <h3 className="text-2xl font-bold text-center text-gray-900 mb-1">Appointment Form</h3>
                            <p className="text-center text-sm text-gray-500 mb-6">Confirm your appointment via WhatsApp</p>

                            <form className="flex flex-col gap-4">
                                <input type="text" placeholder="Name" className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary-dark-green bg-gray-50/50" />
                                <input type="tel" placeholder="Mobile" className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary-dark-green bg-gray-50/50" />
                                <input type="number" placeholder="Age" className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary-dark-green bg-gray-50/50" />

                                <select className="w-full border border-gray-200 rounded-lg p-3 text-gray-500 focus:outline-none focus:border-primary-dark-green bg-gray-50/50 appearance-none">
                                    <option value="" disabled selected>Disease Dropdown</option>
                                    {treatments.map((t: any) => (
                                        <option key={t.slug} value={t.title}>{t.title}</option>
                                    ))}
                                    <option>Other</option>
                                </select>

                                <div className="relative">
                                    <input type="date" placeholder="Preferred Date" className="w-full border border-gray-200 rounded-lg p-3 text-gray-500 focus:outline-none focus:border-primary-dark-green bg-gray-50/50" />
                                </div>

                                <Button className="w-full bg-[#C9A227] text-white mt-2 rounded-lg py-3 font-bold border-none shadow-md hover:shadow-lg hover:bg-yellow-600 transition flex items-center justify-center gap-2">
                                    Confirm Appointment <br className="lg:hidden" /> via WhatsApp <MessageCircle size={18} />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

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
                    <div className="text-center">
                        <div className="bg-gray-100 rounded-2xl h-64 mb-4 mx-auto w-full object-cover"></div>
                        <h3 className="font-bold text-xl text-gray-900">Dr. A. Rahman</h3>
                        <p className="text-primary-dark-green font-semibold">Chief Physician</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-gray-100 rounded-2xl h-64 mb-4 mx-auto w-full object-cover"></div>
                        <h3 className="font-bold text-xl text-gray-900">Dr. S. Khatun</h3>
                        <p className="text-primary-dark-green font-semibold">Senior Female Consultant</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-gray-100 rounded-2xl h-64 mb-4 mx-auto w-full object-cover"></div>
                        <h3 className="font-bold text-xl text-gray-900">Dr. M. Ali</h3>
                        <p className="text-primary-dark-green font-semibold">Homeopathy Expert</p>
                    </div>
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
