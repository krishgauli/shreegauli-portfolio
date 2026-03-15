"use client";

import AnimatedShaderHero from "@/components/ui/animated-shader-hero";

export default function AnimatedShaderHeroDemo() {
  const handlePrimaryClick = () => {
    console.log("Get Started clicked");
  };

  const handleSecondaryClick = () => {
    console.log("Explore Features clicked");
  };

  return (
    <div className="w-full">
      <AnimatedShaderHero
        trustBadge={{
          text: "Trusted by forward-thinking teams.",
          icons: ["✨"],
        }}
        headline={{
          line1: "Launch Your",
          line2: "Workflow Into Orbit",
        }}
        subtitle="Supercharge productivity with AI-powered automation and integrations built for the next generation of teams — fast, seamless, and limitless."
        buttons={{
          primary: {
            text: "Get Started for Free",
            onClick: handlePrimaryClick,
          },
          secondary: {
            text: "Explore Features",
            onClick: handleSecondaryClick,
          },
        }}
      />
    </div>
  );
}
