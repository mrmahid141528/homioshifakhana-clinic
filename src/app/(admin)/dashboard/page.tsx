import { supabase } from "@/lib/supabase/client";
import { Users, Activity, FileText, PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {

    // Fetch stats safely
    const getStats = async () => {
        try {
            const [doctorsReq, treatmentsReq, leadsReq, recentLeadsReq] = await Promise.all([
                supabase.from('doctors').select('*', { count: 'exact', head: true }),
                supabase.from('treatments').select('*', { count: 'exact', head: true }),
                supabase.from('appointment_leads').select('*', { count: 'exact', head: true }),
                supabase.from('appointment_leads').select('*').order('created_at', { ascending: false }).limit(5)
            ]);

            return {
                totalDoctors: doctorsReq.count || 0,
                totalTreatments: treatmentsReq.count || 0,
                totalLeads: leadsReq.count || 0,
                recentLeads: recentLeadsReq.data || []
            };
        } catch (e) {
            console.error(e);
            return { totalDoctors: 0, totalTreatments: 0, totalLeads: 0, recentLeads: [] };
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
                    <Link href="/dashboard/settings" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium text-sm transition">
                        Edit Site Settings
                    </Link>
                    <Link href="/dashboard/treatments?action=new" className="bg-primary-dark-green hover:bg-teal-800 text-white px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-1">
                        <PlusCircle size={16} /> New Treatment
                    </Link>
                    <Link href="/dashboard/doctors?action=new" className="bg-accent-gold hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-1">
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

            {/* Recent Leads Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Recent Appointment Leads</h2>
                    <Link href="/dashboard/leads" className="text-sm font-semibold text-primary-dark-green hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Patient Name</th>
                                <th className="px-6 py-4">Disease / Concern</th>
                                <th className="px-6 py-4">Date Submitted</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentLeads.length > 0 ? (
                                stats.recentLeads.map((lead: any) => (
                                    <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{lead.patient_name || 'N/A'}</td>
                                        <td className="px-6 py-4">{lead.concern || 'Not Specified'}</td>
                                        <td className="px-6 py-4">
                                            {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-yellow-50 text-yellow-700 font-semibold px-2 py-1 rounded text-xs">New</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                        No recent leads found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
