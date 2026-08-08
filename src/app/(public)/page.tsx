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
            <section className="max-w-6xl mx-auto px-1 sm:px-4 relative -mt-6 sm:-mt-12 md:-mt-16 z-20 mb-6 sm:mb-12 md:mb-20">
                <div className="bg-[#F0F8F6] border border-[#E0F2EF] rounded-xl sm:rounded-2xl p-2 sm:p-5 md:p-8 flex flex-row justify-around items-center gap-1 sm:gap-4 md:gap-6 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-1 sm:gap-4 text-primary-dark-green text-center sm:text-left flex-col sm:flex-row">
                        <div className="bg-white p-1 sm:p-3 rounded-full shadow-sm"><span className="text-xs sm:text-xl">👨‍⚕️</span></div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[8px] sm:text-lg leading-tight">3 Expert Doctors</span>
                            <span className="text-[6px] sm:text-sm font-medium opacity-80">(BHMS)</span>
                        </div>
                    </div>

                    <div className="w-px h-6 sm:h-12 bg-teal-900/10 block"></div>

                    <div className="flex items-center gap-1 sm:gap-4 text-primary-dark-green text-center sm:text-left flex-col sm:flex-row">
                        <div className="bg-white p-1 sm:p-3 rounded-full shadow-sm"><span className="text-xs sm:text-xl">👩‍⚕️</span></div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[8px] sm:text-lg leading-tight">Special Female</span>
                            <span className="text-[6px] sm:text-sm font-medium opacity-80">Avail.</span>
                        </div>
                    </div>

                    <div className="w-px h-6 sm:h-12 bg-teal-900/10 block"></div>

                    <div className="flex items-center gap-1 sm:gap-4 text-primary-dark-green text-center sm:text-left flex-col sm:flex-row">
                        <div className="bg-white p-1 sm:p-3 rounded-full shadow-sm"><span className="text-xs sm:text-xl">🌿</span></div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[8px] sm:text-lg leading-tight">100% Natural</span>
                            <span className="text-[6px] sm:text-sm font-medium opacity-80">Med.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Treatments Section */}
            <section className="max-w-7xl mx-auto px-2 sm:px-4 pb-6 sm:pb-12 md:pb-20">
                <h2 className="text-lg sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-8 text-center md:text-left">Treatments</h2>
                <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
                    {treatments.map((t: any) => (
                        <TreatmentCard
                            key={t.slug}
                            slug={t.slug}
                            title={t.title}
                            shortDescription={t.short_description}
                            iconOrImageUrl={t.icon_or_image_url}
                        />
                    ))}
                </div>
            </section>

            {/* 5. Why Choose Us */}
            <section className="bg-[#F0F8F6] py-8 sm:py-16 md:py-24 px-2 sm:px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header Row */}
                    <div className="flex flex-row justify-between items-start mb-6 sm:mb-12">
                        <div className="max-w-2xl text-left">
                            <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-4">Why Choose Us?</h2>
                            <p className="text-gray-600 text-[8px] sm:text-base leading-snug w-[90%] sm:w-full">
                                Our commitment to your wellness goes beyond just medication. Discover the unique benefits that set us apart and ensure you receive the safest, most effective homeopathic care tailored purely for you.
                            </p>
                        </div>
                        <div className="pl-1 sm:pl-4 shrink-0">
                            <Button className="bg-primary-dark-green text-white font-bold py-1 sm:py-3 px-3 sm:px-8 text-[8px] sm:text-base rounded-full shadow-md hover:bg-teal-800 transition whitespace-nowrap border-none">
                                Book Now
                            </Button>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-4 gap-2 sm:gap-6">
                        {[
                            {
                                title: "100% Safe Methods",
                                icon: "🛡️",
                                desc: "Long-lasting side-effect-free results addressing the root cause organically without complex procedures.",
                            },
                            {
                                title: "Experienced Staff",
                                icon: "👨‍⚕️",
                                desc: "Our seasoned doctors bring decades of homeopathic expertise to ensure accurate diagnosis.",
                            },
                            {
                                title: "Modern Diagnostics",
                                icon: "🔬",
                                desc: "Blending pure homeopathy with modern testing parameters to guarantee perfect remedies.",
                            },
                            {
                                title: "Personalized Plans",
                                icon: "🌿",
                                desc: "Every patient's constitution is unique. Our plans are purely tailored to your immunity.",
                            }
                        ].map((item, index) => (
                            <div key={index} className="group bg-[#E0F2EF] hover:bg-primary-dark-green transition-colors duration-300 p-3 sm:p-8 rounded-xl sm:rounded-[32px] flex flex-col justify-between items-start text-left h-full border border-teal-50 hover:border-transparent cursor-pointer shadow-sm hover:shadow-lg">
                                <div>
                                    <div className="mb-2 sm:mb-6">
                                        <span className="text-lg sm:text-3xl text-primary-dark-green group-hover:text-white transition-colors duration-300 opacity-80 group-hover:opacity-100">{item.icon}</span>
                                    </div>
                                    <h3 className="text-[9px] sm:text-xl md:text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300 mb-1 sm:mb-4 leading-tight">{item.title}</h3>
                                    <p className="text-gray-600 group-hover:text-[#a5d4cc] transition-colors duration-300 text-[6px] sm:text-sm hidden sm:block leading-relaxed mb-4">
                                        {item.desc}
                                    </p>
                                </div>
                                <Button className="bg-primary-dark-green group-hover:bg-white/20 text-white font-semibold py-1 sm:py-3 px-2 sm:px-6 text-[7px] sm:text-sm rounded-full w-fit hover:bg-teal-800 group-hover:hover:bg-white/30 border-none group-hover:border group-hover:border-white/30 transition-all duration-300">
                                    View Details
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Meet The Doctors */}
            <section className="py-6 sm:py-12 md:py-20 px-2 sm:px-4 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-4 sm:mb-12">
                    <h2 className="text-lg sm:text-3xl md:text-4xl font-extrabold text-gray-900">Meet The Doctors</h2>
                    <Link href="/doctors" className="text-primary-dark-green font-bold text-xs sm:text-base hover:underline">View All &rarr;</Link>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-8">
                    {doctors.map((doc: any) => (
                        <div key={doc.id} className="text-center">
                            <div className="bg-gray-100 rounded-xl sm:rounded-2xl h-16 sm:h-64 mb-2 sm:mb-4 mx-auto w-full overflow-hidden flex items-center justify-center">
                                {doc.photo_url ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={doc.photo_url} alt={doc.full_name} className="w-full h-full object-cover object-top" />
                                ) : (
                                    <span className="text-gray-400 opacity-50 text-[10px] sm:text-base">No Photo</span>
                                )}
                            </div>
                            <h3 className="font-bold text-[10px] sm:text-xl text-gray-900">{doc.full_name}</h3>
                            <p className="text-primary-dark-green text-[8px] sm:text-base font-semibold">{doc.designation}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. Treatment Process */}
            <section className="bg-white py-6 sm:py-12 md:py-20 px-2 sm:px-4 border-t border-gray-100">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-lg sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-12">How We Treat You</h2>
                    <div className="flex flex-row justify-center items-start sm:items-center gap-2 sm:gap-12">
                        <div className="flex flex-col items-center max-w-xs flex-1">
                            <div className="w-8 h-8 sm:w-20 sm:h-20 bg-[#F0F8F6] text-primary-dark-green rounded-full flex justify-center items-center font-bold text-sm sm:text-2xl border-2 sm:border-4 border-white shadow-lg mb-2 sm:mb-6 z-10">1</div>
                            <h3 className="text-[10px] sm:text-xl font-bold mb-1 sm:mb-2">Book</h3>
                        </div>
                        <div className="flex flex-col items-center max-w-xs flex-1">
                            <div className="w-8 h-8 sm:w-20 sm:h-20 bg-[#F0F8F6] text-primary-dark-green rounded-full flex justify-center items-center font-bold text-sm sm:text-2xl border-2 sm:border-4 border-white shadow-lg mb-2 sm:mb-6 z-10">2</div>
                            <h3 className="text-[10px] sm:text-xl font-bold mb-1 sm:mb-2">Diagnose</h3>
                        </div>
                        <div className="flex flex-col items-center max-w-xs flex-1">
                            <div className="w-8 h-8 sm:w-20 sm:h-20 bg-primary-dark-green text-white rounded-full flex justify-center items-center font-bold text-sm sm:text-2xl border-2 sm:border-4 border-white shadow-lg mb-2 sm:mb-6 z-10">3</div>
                            <h3 className="text-[10px] sm:text-xl font-bold mb-1 sm:mb-2">Recover</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. FAQ Section */}
            <section className="bg-[#F0F8F6] py-12 md:py-20 px-4">
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
            <section className="bg-primary-dark-green py-8 sm:py-16 md:py-24 px-2 sm:px-4 text-center">
                <h2 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-white mb-2 sm:mb-6">Ready to Start?</h2>
                <div className="flex flex-row gap-2 sm:gap-4 justify-center mt-4">
                    <Button variant="whatsapp" className="px-2 sm:px-8 py-2 sm:py-4 text-[10px] sm:text-lg">WhatsApp</Button>
                    <Button className="bg-white text-primary-dark-green font-bold px-2 sm:px-8 py-2 sm:py-4 text-[10px] sm:text-lg border-none hover:bg-gray-100 shadow-xl">Call Us</Button>
                </div>
            </section>

        </div>
    );
}
