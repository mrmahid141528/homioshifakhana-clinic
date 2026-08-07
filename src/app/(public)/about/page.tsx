export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-primary-dark-green mb-6">আমাদের সম্পর্কে (About Us)</h1>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
                <p className="text-neutral-gray mb-4">
                    {/* Placeholder for about text, later fetched from site_settings.about_text */}
                    Here is the story of our clinic. Founded with the vision to provide natural, holistic homeopathy treatments for chronic cases.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 h-40 flex items-center justify-center rounded-xl text-sm font-semibold">Photo 1</div>
                <div className="bg-gray-50 h-40 flex items-center justify-center rounded-xl text-sm font-semibold">Photo 2</div>
                <div className="bg-gray-50 h-40 flex items-center justify-center rounded-xl text-sm font-semibold">Photo 3</div>
            </div>

            <div className="bg-primary-dark-green/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-primary-dark-green mb-4">Book your consultation today</h2>
                <a href="/contact" className="bg-accent-gold text-white px-6 py-3 rounded-full font-bold shadow hover:bg-yellow-600 transition-colors">
                    Book Appointment
                </a>
            </div>
        </div>
    );
}
