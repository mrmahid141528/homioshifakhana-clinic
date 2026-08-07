export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-50 text-neutral-gray">
            <header className="bg-white border-b border-gray-200 p-4">
                <div className="max-w-6xl mx-auto font-bold text-primary-dark-green">
                    Admin Dashboard
                </div>
            </header>
            <main className="p-4 max-w-6xl mx-auto">
                {children}
            </main>
        </div>
    );
}
