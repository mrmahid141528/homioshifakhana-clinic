import React from 'react';

export default function PrivacyPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <div className="prose prose-green max-w-none">
                <p className="mb-4">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="mb-4">
                    At Homio Shifa Khana, we are committed to protecting your privacy and ensuring the security of your personal information.
                </p>
                <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
                <p className="mb-4">
                    We may collect personal information such as your name, contact details, and medical history when you use our services or contact us for consultation.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
                <p className="mb-4">
                    The information we collect is used to provide you with the best possible homeopathic treatment, maintain your medical records, and communicate with you regarding your appointments.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3">3. Data Protection</h2>
                <p className="mb-4">
                    We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3">4. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about this Privacy Policy, please contact us at our clinic.
                </p>
            </div>
        </div>
    );
}
