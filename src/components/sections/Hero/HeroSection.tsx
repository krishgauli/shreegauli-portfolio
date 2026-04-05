import { HeroText } from "./HeroText";
import { HeroModuleCluster } from "./HeroModuleCluster";

export function HeroSection() {
  return (
    <section className="relative z-10 overflow-hidden bg-[#070B14]">
      {/* ── Static ambient background ─────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Top-left violet glow */}
        <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[60%] rounded-full bg-[#7C3AED]/[0.07] blur-[120px]" />
        {/* Top-right cyan glow */}
        <div className="absolute -top-[10%] -right-[10%] h-[60%] w-[50%] rounded-full bg-[#22D3EE]/[0.06] blur-[120px]" />
        {/* Bottom-center warm glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[40%] w-[60%] rounded-full bg-[#F59E0B]/[0.04] blur-[100px]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Bottom fade to page bg */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070B14] to-transparent" />
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="relative min-h-screen flex items-center pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">
            <HeroText />
            <HeroModuleCluster />
          </div>
        </div>
      </div>
    </section>
  );
}
