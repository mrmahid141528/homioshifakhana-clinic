import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TreatmentCardProps {
    slug: string;
    title: string;
    shortDescription?: string;
    iconOrImageUrl?: string;
}

export function TreatmentCard({ slug, title, iconOrImageUrl }: TreatmentCardProps) {
    return (
        <Link href={`/treatments/${slug}`} className="block group h-full">
            <div className="bg-white border border-[#E5E7EB] rounded-lg sm:rounded-2xl p-1 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-primary-dark-green/30 flex flex-col items-center justify-center text-center h-full gap-1 sm:gap-4 overflow-hidden">
                <div className="w-6 h-6 sm:w-14 sm:h-14 shrink-0 bg-teal-50 text-primary-dark-green rounded-full flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                    {iconOrImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={iconOrImageUrl} alt={title} className="w-full h-full object-cover" />
                    ) : (
                        <span className="font-bold text-[10px] sm:text-xl">{title.charAt(0)}</span>
                    )}
                </div>
                <div className="flex items-center gap-1 sm:gap-2 justify-center w-full">
                    <h3 className="font-bold text-gray-800 text-[8px] sm:text-lg group-hover:text-primary-dark-green transition-colors line-clamp-2">{title}</h3>
                    <ArrowRight size={10} className="sm:hidden text-gray-900 group-hover:text-primary-dark-green transition-colors" />
                    <ArrowRight size={18} className="hidden sm:block text-gray-900 group-hover:text-primary-dark-green transition-colors" />
                </div>
            </div>
        </Link>
    );
}
