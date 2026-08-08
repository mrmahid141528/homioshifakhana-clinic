import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { getTreatments } from "@/lib/api";

export default async function TreatmentsPage() {
    const treatments = await getTreatments();

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-primary-dark-green mb-2 text-center">Treatment Options</h1>
                <p className="text-center text-neutral-gray mb-10">We treat diseases at their root, not just the symptoms.</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
            </div>
        </div>
    );
}
