import { ModernGradientHero } from "@/components/template/hero-sections/modern-gradient";
import { MinimalSplitHero } from "@/components/template/hero-sections/minimal-split";
import { AnimatedStatsHero } from "@/components/template/hero-sections/animated-stats";
import { VideoBackgroundHero } from "@/components/template/hero-sections/video-background";
import { FeatureGridHero } from "@/components/template/hero-sections/feature-grid";
import { CTACenteredHero } from "@/components/template/hero-sections/cta-centered";
import { ImageMosaicHero } from "@/components/template/hero-sections/image-mosaic";
import { InteractiveCardsHero } from "@/components/template/hero-sections/interactive-cards";
import { FloatingElementsHero } from "@/components/template/hero-sections/floating-elements";

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
    </div>


  );
}
