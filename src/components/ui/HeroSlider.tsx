"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";

interface HeroSliderProps {
    images: string[];
    intervalSec: number;
    heading: string;
    tagline: string;
}

export function HeroSlider({ images, intervalSec, heading, tagline }: HeroSliderProps) {
    const [history, setHistory] = useState({ prevIndex: -1, currentIndex: 0 });
    const [isPaused, setIsPaused] = useState(false);

    const activeImages = images && images.length > 0 ? images : [];

    // If exactly 2 images, duplicate them to 4. This gives the CSS slider enough DOM nodes to park 
    // exiting items at +100% without visually rewinding them backward to 0%.
    const sliderImages = activeImages.length === 2 ? [...activeImages, ...activeImages] : activeImages;

    useEffect(() => {
        if (sliderImages.length <= 1 || isPaused) return;

        const timer = setInterval(() => {
            setHistory((prev) => ({
                prevIndex: prev.currentIndex,
                currentIndex: (prev.currentIndex + 1) % sliderImages.length
            }));
        }, (intervalSec || 5) * 1000);

        return () => clearInterval(timer);
    }, [sliderImages.length, intervalSec, isPaused]);

    return (
        <section
            className="relative bg-teal-50/50 overflow-hidden min-h-[400px] md:min-h-[600px] flex items-center select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onTouchCancel={() => setIsPaused(false)}
        >
            {/* Background Images */}
            {sliderImages.length > 0 ? (
                sliderImages.map((img, index) => {
                    let translateX = '100%';
                    let transition = 'none';

                    if (index === history.currentIndex) {
                        translateX = '0%';
                        transition = 'transform 1s ease-in-out';
                    } else if (index === history.prevIndex) {
                        translateX = '-100%';
                        transition = 'transform 1s ease-in-out';
                    }

                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 z-0`}
                            style={{
                                backgroundImage: `url(${img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                transform: `translateX(${translateX})`,
                                transition: transition
                            }}
                        ></div>
                    );
                })
            ) : (
                <div className="absolute inset-0 bg-teal-50 z-0"></div>
            )}

            {/* Decorative background element to ensure text readability */}
            <div className="absolute inset-y-0 left-0 w-[95%] md:w-3/4 lg:w-2/3 bg-gradient-to-r from-teal-50/95 via-teal-50/70 to-transparent z-10 transition-all pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 py-16 md:py-32 relative z-20 w-full">
                {/* Left Text */}
                <div className="w-11/12 sm:w-full md:w-1/2 lg:w-7/12 text-left transition-all">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111827] leading-tight mb-4 drop-shadow-sm">
                        {heading || "Natural Homeopathic Treatment"}
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-lg font-medium">
                        {tagline || "Discover enduring health solutions for your family."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start">
                        <Button className="bg-accent-gold text-white font-bold py-3 px-8 rounded-full border-none shadow-sm hover:shadow-md transition">
                            Call Now
                        </Button>
                        <Button className="bg-primary-dark-green text-white font-bold py-3 px-8 rounded-full border-none shadow-sm hover:shadow-md transition flex items-center justify-center gap-2">
                            <MessageCircle size={20} /> WhatsApp Appointment
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
