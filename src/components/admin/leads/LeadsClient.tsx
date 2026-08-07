"use client";

import { useState } from "react";
import { Download, Search } from "lucide-react";

export function LeadsClient({ initialLeads }: { initialLeads: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLeads = initialLeads.filter(lead =>
        lead.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone_number?.includes(searchTerm)
    );

    const downloadCSV = () => {
        if (filteredLeads.length === 0) return;

        const headers = ["ID", "Patient Name", "Phone", "Disease / Concern", "Preferred Date", "Source Page", "Submitted On"];
        const rows = filteredLeads.map(lead => [
            lead.id,
            lead.patient_name,
            lead.phone_number,
            lead.disease_concern,
            lead.preferred_date ? new Date(lead.preferred_date).toLocaleDateString() : "",
            lead.source_page || "Direct",
            lead.created_at ? new Date(lead.created_at).toLocaleString() : ""
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(e => e.map(val => `"${String(val || '').replace(/"/g, '""')}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `Appointment_Leads_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 gap-4">
                <div className="relative w-full sm:w-64">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search name or phone..."
                        className="pl-9 pr-4 py-2 w-full border rounded-lg bg-gray-50 focus:outline-primary-dark-green text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <span className="text-sm text-gray-500 font-medium whitespace-nowrap">Total: {filteredLeads.length}</span>
                    <button onClick={downloadCSV} className="w-full sm:w-auto bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition flex gap-2 items-center justify-center">
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
                {filteredLeads.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">No leads found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Patient Name</th>
                                    <th className="px-6 py-4">Phone</th>
                                    <th className="px-6 py-4">Disease / Concern</th>
                                    <th className="px-6 py-4">Preferred Date</th>
                                    <th className="px-6 py-4">Submitted On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                        <td className="px-6 py-4 font-bold text-gray-900">
                                            {lead.patient_name} <br />
                                            <span className="text-xs text-gray-400 font-normal">via {lead.source_page || "Direct"}</span>
                                        </td>
                                        <td className="px-6 py-4 text-primary-dark-green font-semibold">{lead.phone_number || "N/A"}</td>
                                        <td className="px-6 py-4">{lead.disease_concern || "-"}</td>
                                        <td className="px-6 py-4">{lead.preferred_date ? new Date(lead.preferred_date).toLocaleDateString() : "-"}</td>
                                        <td className="px-6 py-4 text-xs">
                                            {lead.created_at ? new Date(lead.created_at).toLocaleString() : "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
