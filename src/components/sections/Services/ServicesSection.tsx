import { services } from "@/lib/data";
import { ServiceModule } from "./ServiceModule";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function ServicesSection() {
  return (
    <section id="services" className="relative z-10 section-pad px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="The System"
          title="One system. Four layers. All connected."
          subtitle="Most consultants manage channels in silos. I build the system that connects them — so leads come in, get followed up, get tracked, and convert into revenue."
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
