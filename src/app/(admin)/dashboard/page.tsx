"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("settings");

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[70vh]">
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("settings")}
                    className={`px-6 py-4 font-semibold ${activeTab === 'settings' ? 'text-primary-dark-green border-b-2 border-primary-dark-green' : 'text-neutral-gray'}`}
                >
                    Site Settings
                </button>
                <button
                    onClick={() => setActiveTab("doctors")}
                    className={`px-6 py-4 font-semibold ${activeTab === 'doctors' ? 'text-primary-dark-green border-b-2 border-primary-dark-green' : 'text-neutral-gray'}`}
                >
                    Doctors
                </button>
                <button
                    onClick={() => setActiveTab("treatments")}
                    className={`px-6 py-4 font-semibold ${activeTab === 'treatments' ? 'text-primary-dark-green border-b-2 border-primary-dark-green' : 'text-neutral-gray'}`}
                >
                    Treatments
                </button>
            </div>

            <div className="p-6">
                {activeTab === 'settings' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Edit Global Site Settings</h2>
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <input type="text" placeholder="Clinic Name" className="border p-2 rounded" defaultValue="হোমিও চিকিৎসা খানা" />
                            <input type="text" placeholder="WhatsApp Number" className="border p-2 rounded" defaultValue="+8801XXXXXXXXX" />
                            <textarea placeholder="About Text" className="border p-2 rounded h-32" />
                            <Button className="w-32 rounded-lg">Save Settings</Button>
                        </div>
                    </div>
                )}

                {activeTab === 'doctors' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Manage Doctors</h2>
                        <p className="text-gray-500 text-sm mb-4">CRUD interface will be mounted here.</p>
                        <Button className="rounded-lg">+ Add New Doctor</Button>
                    </div>
                )}

                {activeTab === 'treatments' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Manage Treatments</h2>
                        <p className="text-gray-500 text-sm mb-4">CRUD interface will be mounted here.</p>
                        <Button className="rounded-lg">+ Add New Treatment</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
