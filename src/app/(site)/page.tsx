import React from 'react';
import { Hero } from '@/components/site/hero';
import { FeatureCards } from '@/components/site/card';
import App from '@/components/atom/parallax-text';
import { SuperchargeSection } from '@/components/site/super';
import { MeshScaleSection } from '@/components/site/mesh';
import ImageCSS from '@/components/site/image-css';
import { PaediatricOnbording } from '@/components/site/onbording';

export default function Home() {
    return (
        <>
            <Hero />
            <PaediatricOnbording />
            <FeatureCards />
            
            <App />
{/*             
            <ImageCSS /> */}
            
        </>
    );
}

