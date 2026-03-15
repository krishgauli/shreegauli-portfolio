import { services } from "@/lib/data";
import { ServiceModule } from "./ServiceModule";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function ServicesSection() {
  return (
    <section id="services" className="relative z-10 section-pad px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="What I Do"
          title="What I actually do"
          subtitle="Four areas. All connected. All pointed at the same goal: clear growth."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.08}>
              <ServiceModule service={service} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
