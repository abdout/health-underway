import React from 'react';
import { Hero } from '@/components/site/hero';
import { FeatureCards } from '@/components/site/card';
import App from '@/components/atom/parallax-text';
import { SuperchargeSection } from '@/components/site/super';
import { MeshScaleSection } from '@/components/site/mesh';
import ImageCSS from '@/components/site/image-css';
import { PaediatricOnbording } from '@/components/site/onbording';
import FeaturedArticles from '@/components/template/article/featured-articles';
import Faqs from '@/components/contact/faqs';
import Newsletter from '@/components/contact/newsletter';
import SocialIcons from '@/components/contact/social';

export default function Home() {
    return (
        <>
            <Hero />
            {/* <PaediatricOnbording /> */}
            {/* <FeatureCards /> */}
            <FeaturedArticles />
            
            <App />
            
            <Newsletter />
            <div className='mr-10 -ml-10'>
            <Faqs />
            </div>
            <div className='py-20 md:scale-150 flex items-center justify-center max-w-2xl mx-auto'>
                <SocialIcons />
            </div>
            
{/*             
            <ImageCSS /> */}
            
        </>
    );
}

