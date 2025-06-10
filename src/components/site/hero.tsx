import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ExpandButton from '@/components/atom/expand-button';
import { LogoCloud } from './logo-cloud';

export function Hero() {
    return (
        <header className="tt-hero py-20 gradient-top-right min-h-screen relative overflow-hidden">
            {/* Gradient Container with Background Image */}
            <div className="tt-gradient-container absolute top-0 right-0 z-0">
                <div className="tt-gradient-panel">
                    <Image 
                        className="tt-gradient-image gradient-accordion-square w-screen h-auto md:w-[744px] block"
                        src="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/6580b17f35510ffc21541053_gradient-noise-green-red.png"
                        alt="decorative background"
                        width={744}
                        height={744}
                        draggable={false}
                        sizes="(max-width: 767px) 100vw, 744px"
                        loading="lazy"
                    />
                </div>
            </div>
            
            {/* Hero Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-6 sm:px-8 lg:px-12">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-[80px]">
                            Healing begins here <br />
                            with the right answers
                        </h1>
                        <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                            Effective treatment depends on getting the right diagnosis. Our experts diagnose and treat the toughest medical challenges.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-center mt-2">
                            <Link href="/appointment">
                                <ExpandButton variant="default">
                                    Appointment
                                </ExpandButton>
                            </Link>
                            <Link href="/services">
                                <ExpandButton variant="outline">
                                    Services
                                </ExpandButton>
                            </Link>
                        </div>
                        <LogoCloud />
                    </div>
                </div>
            </div>
        </header>
    );
}
