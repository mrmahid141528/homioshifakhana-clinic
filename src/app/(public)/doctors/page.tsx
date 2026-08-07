import { DoctorCard } from "@/components/ui/DoctorCard";
import { getDoctors } from "@/lib/api";

export default async function DoctorsPage() {
    const doctors = await getDoctors();

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-primary-dark-green mb-2 text-center">Our Doctors</h1>
                <p className="text-center text-neutral-gray mb-10 max-w-2xl mx-auto">Meet our highly skilled and experienced homeopathic practitioners dedicated to your health.</p>

                <div className="grid md:grid-cols-3 gap-8">
                    {doctors.map((doc: any) => (
                        <DoctorCard
                            key={doc.id}
                            fullName={doc.full_name}
                            qualification={doc.qualification}
                            designation={doc.designation}
                            bio={doc.bio}
                            yearsExperience={doc.years_experience}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
