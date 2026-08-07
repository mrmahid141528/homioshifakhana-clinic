import { supabase } from "@/lib/supabase/client";
import { LeadsClient } from "@/components/admin/leads/LeadsClient";

export default async function LeadsPage() {
    const { data: leads } = await supabase.from('appointment_leads').select('*').order('created_at', { ascending: false });

    return (
        <div className="flex flex-col gap-6 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Appointment Leads</h1>
                <p className="text-gray-500">View and export all incoming appointment requests from patients.</p>
            </div>
            <LeadsClient initialLeads={leads || []} />
        </div>
    );
}
