import { supabase } from "@/lib/supabase/client";
import { TreatmentsClient } from "@/components/admin/treatments/TreatmentsClient";

export default async function TreatmentsPage() {
    const { data: treatments } = await supabase.from('treatments').select('*').order('display_order');

    return (
        <div className="flex flex-col gap-6 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Treatments Management</h1>
                <p className="text-gray-500">Add, edit, or unpublish your clinical services and their dedicated SEO pages.</p>
            </div>
            <TreatmentsClient initialTreatments={treatments || []} />
        </div>
    );
}
