import { supabase } from "@/lib/supabase/client";
import { Users, Activity, FileText, PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {

    // Fetch stats safely
    const getStats = async () => {
        try {
            const [doctorsReq, treatmentsReq] = await Promise.all([
                supabase.from('doctors').select('*', { count: 'exact', head: true }),
                supabase.from('treatments').select('*', { count: 'exact', head: true })
            ]);

            return {
                totalDoctors: doctorsReq.count || 0,
                totalTreatments: treatmentsReq.count || 0,
                totalLeads: 0
            };
        } catch (e) {
            console.error(e);
            return { totalDoctors: 0, totalTreatments: 0, totalLeads: 0 };
        }
    };

    const stats = await getStats();

    return (
        <div className="flex flex-col gap-8">
            {/* Header & Quick Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500">Welcome to your clinic's management portal.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link href="/admin/settings" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium text-sm transition">
                        Settings
                    </Link>
                    <Link href="/admin/treatments?action=new" className="bg-primary-dark-green hover:bg-teal-800 text-white px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-1">
                        <PlusCircle size={16} /> New Treatment
                    </Link>
                    <Link href="/admin/doctors?action=new" className="bg-accent-gold hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-1">
                        <PlusCircle size={16} /> Add Doctor
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-50 text-primary-dark-green flex items-center justify-center">
                        <Users size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-500">Total Doctors</div>
                        <div className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-50 text-primary-dark-green flex items-center justify-center">
                        <Activity size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-500">Treatments Published</div>
                        <div className="text-2xl font-bold text-gray-900">{stats.totalTreatments}</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-50 text-primary-dark-green flex items-center justify-center">
                        <FileText size={24} />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-500">Total Leads</div>
                        <div className="text-2xl font-bold text-gray-900">{stats.totalLeads}</div>
                    </div>
                </div>
            </div>

        </div>
    );
}
