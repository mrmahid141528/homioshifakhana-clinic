import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TreatmentCardProps {
    slug: string;
    title: string;
    shortDescription: string;
    iconUrl?: string; // We'll just mock this for now
}

export function TreatmentCard({ slug, title, shortDescription }: TreatmentCardProps) {
    return (
        <Link href={`/treatments/${slug}`} className="block group">
            <div className="bg-white border border-gray-100 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:border-primary-dark-green/20 flex flex-col items-center h-full text-center">
                <div className="w-16 h-16 bg-gray-50 text-primary-dark-green rounded-full mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {/* Placeholder for real icon */}
                    <span className="font-bold text-xl">{title.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-lg text-primary-dark-green mb-2">{title}</h3>
                <p className="text-neutral-gray text-sm mb-4 line-clamp-2 flex-grow">
                    {shortDescription}
                </p>
                <div className="text-accent-gold flex items-center gap-1 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    View Detail <ArrowRight size={16} />
                </div>
            </div>
        </Link>
    );
}
