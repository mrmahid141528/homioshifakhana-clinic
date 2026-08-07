import Image from "next/image";
import { Button } from "./Button";

interface DoctorCardProps {
    fullName: string;
    qualification: string;
    designation: string;
    bio: string;
    yearsExperience: number;
}

export function DoctorCard({ fullName, qualification, designation, bio, yearsExperience }: DoctorCardProps) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-100 relative w-full flex items-center justify-center text-gray-400">
                {/* Placeholder for Doctor Image */}
                <span className="opacity-50">Photo Placeholder</span>
            </div>
            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-primary-dark-green mb-1">{fullName}</h3>
                    <p className="font-medium text-accent-gold text-sm">{qualification} | {designation}</p>
                </div>

                <p className="text-neutral-gray text-sm mb-4 line-clamp-3">
                    {bio}
                </p>

                <div className="inline-block bg-primary-dark-green/10 text-primary-dark-green px-3 py-1 rounded-full text-xs font-semibold mb-6">
                    {yearsExperience}+ Years Experience
                </div>

                <Button variant="whatsapp" fullWidth className="text-sm py-2">
                    Consult on WhatsApp
                </Button>
            </div>
        </div>
    );
}
