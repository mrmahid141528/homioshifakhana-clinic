import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TreatmentCardProps {
    slug: string;
    title: string;
    shortDescription?: string; // Opted out visually in this mockup design
}

export function TreatmentCard({ slug, title }: TreatmentCardProps) {
    return (
        <Link href={`/treatments/${slug}`} className="block group h-full">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-primary-dark-green/30 flex flex-col items-center justify-center text-center h-full gap-4">
                <div className="w-14 h-14 bg-teal-50 text-primary-dark-green rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {/* Placeholder for Icon (e.g. bones, lungs etc) - Hardcoding an aesthetic initial for now */}
                    <span className="font-bold text-xl">{title.charAt(0)}</span>
                </div>
                <div className="flex items-center gap-2 justify-center w-full">
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-primary-dark-green transition-colors">{title}</h3>
                    <ArrowRight size={18} className="text-gray-900 group-hover:text-primary-dark-green transition-colors" />
                </div>
            </div>
        </Link>
    );
}
