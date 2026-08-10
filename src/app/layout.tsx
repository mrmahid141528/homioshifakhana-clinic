import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Homio Shifa Khana | Homeopathy Clinic",
  description: "Homio Shifa Khana provides 100% natural and effective homeopathic treatments. Over 20 years of excellence in chronic disease resolution.",
  openGraph: {
    title: "Homio Shifa Khana | Homeopathy Clinic",
    description: "Homio Shifa Khana provides 100% natural and effective homeopathic treatments. Over 20 years of excellence in chronic disease resolution.",
    url: 'https://homioshifakhana.com',
    siteName: 'Homio Shifa Khana',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
