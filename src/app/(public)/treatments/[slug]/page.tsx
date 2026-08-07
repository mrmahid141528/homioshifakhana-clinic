import { Button } from "@/components/ui/Button";
import { getTreatmentBySlug, getSiteSettings } from "@/lib/api";
import Head from "next/head";

export default async function TreatmentDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const treatment = await getTreatmentBySlug(slug);
    const settings = await getSiteSettings();

    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Hero Section */}
            <div className="bg-primary-dark-green/5 py-12 border-b border-primary-dark-green/10">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-primary-dark-green mb-4">{treatment.title} Treatment</h1>
                    <p className="text-lg text-neutral-gray max-w-2xl">
                        {treatment.short_description || `Effective, root-cause homeopathy treatment for ${treatment.title.toLowerCase()} without side effects.`}
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 py-12 prose prose-green lg:prose-lg" dangerouslySetInnerHTML={{ __html: treatment.full_content || "" }} />

            {/* Sticky Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40">
                <div className="max-w-4xl mx-auto flex justify-center">
                    <a href={`https://wa.me/${settings.whatsapp_number?.replace(/\+/g, '')}?text=Hello,%20I%20would%20like%20to%20book%20an%20appointment%20for%20${treatment.title}`} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                        <Button variant="whatsapp" className="w-full shadow-none hover:shadow-lg">
                            Book Appointment for {treatment.title}
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
