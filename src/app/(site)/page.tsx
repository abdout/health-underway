import { ModernGradientHero } from "@/components/template/hero-sections/modern-gradient";
import { MinimalSplitHero } from "@/components/template/hero-sections/minimal-split";
import { AnimatedStatsHero } from "@/components/template/hero-sections/animated-stats";
import { VideoBackgroundHero } from "@/components/template/hero-sections/video-background";
import { FeatureGridHero } from "@/components/template/hero-sections/feature-grid";
import { CTACenteredHero } from "@/components/template/hero-sections/cta-centered";
import { ImageMosaicHero } from "@/components/template/hero-sections/image-mosaic";
import { InteractiveCardsHero } from "@/components/template/hero-sections/interactive-cards";
import { FloatingElementsHero } from "@/components/template/hero-sections/floating-elements";
import { Header1 } from "@/components/template/headers/header1";
import { Header2 } from "@/components/template/headers/header2";
import { Header3 } from "@/components/template/headers/header3";
import { Header4 } from "@/components/template/headers/header4";
import { Header5 } from "@/components/template/headers/header5";
import { Header6 } from "@/components/template/headers/header6";
import { Header7 } from "@/components/template/headers/header7";
import { Header8 } from "@/components/template/headers/header8";
import { Header9 } from "@/components/template/headers/header9";
export default function Home() {
  return (


    <div className="space-y-32">
      <CTACenteredHero />
      <FloatingElementsHero />
      <VideoBackgroundHero />
      <ModernGradientHero />
      <MinimalSplitHero />
      <AnimatedStatsHero />
      <FeatureGridHero />
      <ImageMosaicHero />
      <InteractiveCardsHero />
      <Header1 />
      <Header2 />
      <Header3 />
      <Header4 />
      <Header5 />
      <Header6 />
      <Header7 />
      <Header8 />
      <Header9 />
    </div>




  );
}
