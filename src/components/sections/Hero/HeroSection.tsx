import { HeroText } from "./HeroText";
import { HeroModuleCluster } from "./HeroModuleCluster";
import AnimatedShaderHero from "@/components/ui/animated-shader-hero";

export function HeroSection() {
  return (
    <section className="relative z-10">
      <AnimatedShaderHero
        trustBadge={{
          text: "Trusted by growth-minded teams.",
          icons: ["✨"],
        }}
        headline={{
          line1: "Build Growth",
          line2: "That Compounds",
        }}
        subtitle="SEO, social, paid media, and automation systems built for measurable momentum."
      >
        <div className="relative min-h-screen flex items-center pt-24 pb-16 px-6">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 20% 35%, rgba(7, 11, 20, 0.62) 0%, transparent 70%)",
            }}
          />

          <div className="max-w-5xl mx-auto w-full">
            <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">
              <HeroText />
              <HeroModuleCluster />
            </div>
          </div>
        </div>
      </AnimatedShaderHero>
    </section>
  );
}
