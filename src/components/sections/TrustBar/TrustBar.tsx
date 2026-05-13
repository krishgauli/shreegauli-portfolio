import { trustItems } from "@/lib/data";

export function TrustBar() {
  // Duplicate for seamless loop
  const items = [...trustItems, ...trustItems];

  return (
    <section className="relative z-10 py-6 overflow-hidden border-y border-black/[0.08] bg-[#FDFAF5]/45 backdrop-blur-sm">
      <div className="marquee-container overflow-hidden">
        <div className="flex gap-4 animate-marquee whitespace-nowrap w-max">
          {items.map((item, i) => (
            <span
              key={`${item.label}-${i}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.1] bg-[#F5F0E8]/65 text-sm text-gray-600 font-medium shrink-0"
            >
              <span className="w-1 h-1 rounded-full bg-[#7C3AED]" />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
