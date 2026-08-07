import { supabase } from "@/lib/supabase/client";
import { DoctorsClient } from "@/components/admin/doctors/DoctorsClient";

export default async function DoctorsPage() {
    const { data: doctors } = await supabase.from('doctors').select('*').order('display_order');

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Doctors Management</h1>
                <p className="text-gray-500">Manage the clinic's physicians and consultants.</p>
            </div>
            <DoctorsClient initialDoctors={doctors || []} />
        </div>
    );
}
