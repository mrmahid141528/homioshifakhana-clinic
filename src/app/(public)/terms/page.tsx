import React from 'react';

export default function TermsOfServicePage() {
    return (
        <div className="max-w-4xl mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <div className="prose prose-green max-w-none">
                <p className="mb-4">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
                <p className="mb-4">
                    Welcome to Homio Shifa Khana. By accessing our website or using our services, you agree to comply with and be bound by the following terms and conditions.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3">1. Medical Disclaimer</h2>
                <p className="mb-4">
                    The content on our website is for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3">2. Appointments and Consultations</h2>
                <p className="mb-4">
                    While we strive to maintain our appointment schedule, times may vary depending on patient needs. We request that you provide advance notice if you need to cancel or reschedule an appointment.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3">3. Treatment Outcomes</h2>
                <p className="mb-4">
                    Homeopathic treatments may affect individuals differently. We cannot guarantee specific results for any condition.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3">4. Changes to Terms</h2>
                <p className="mb-4">
                    We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting to our website.
                </p>
            </div>
        </div>
    );
}
