"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  const angleRef = useRef<number>(0);
  const autoRotateRef = useRef<boolean>(true);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  const RADIUS = 200;
  const total = timelineData.length;

  const getNodePosition = useCallback(
    (index: number, angle: number) => {
      const deg = ((index / total) * 360 + angle) % 360;
      const rad = (deg * Math.PI) / 180;
      const x = RADIUS * Math.cos(rad);
      const y = RADIUS * Math.sin(rad);
      const zIndex = Math.round(100 + 50 * Math.cos(rad));
      const opacity = Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(rad)) / 2)));
      return { x, y, zIndex, opacity };
    },
    [total]
  );

  useEffect(() => {
    lastTimeRef.current = null;

    const loop: FrameRequestCallback = (timestamp) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const delta = Math.min(timestamp - lastTimeRef.current, 50);
      lastTimeRef.current = timestamp;

      if (autoRotateRef.current) {
        angleRef.current = (angleRef.current + 0.005 * delta) % 360;
      }

      const angle = angleRef.current;
      timelineData.forEach((item, index) => {
        const el = nodeRefs.current[item.id];
        if (!el) return;
        const { x, y, zIndex, opacity } = getNodePosition(index, angle);
        el.style.transform = `translate(${x}px, ${y}px)`;
        if (!el.dataset.expanded) {
          el.style.zIndex = String(zIndex);
          el.style.opacity = String(opacity);
        }
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [timelineData, getNodePosition]);

  const getRelatedItems = (itemId: number): number[] => {
    const item = timelineData.find((i) => i.id === itemId);
    return item ? item.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const isOpening = !prev[id];

      Object.keys(nodeRefs.current).forEach((key) => {
        const el = nodeRefs.current[parseInt(key)];
        if (el) delete el.dataset.expanded;
      });

      if (isOpening) {
        autoRotateRef.current = false;
        setActiveNodeId(id);

        const nodeIndex = timelineData.findIndex((item) => item.id === id);
        angleRef.current = (270 - (nodeIndex / total) * 360 + 360) % 360;

        const newPulse: Record<number, boolean> = {};
        getRelatedItems(id).forEach((relId) => (newPulse[relId] = true));
        setPulseEffect(newPulse);

        const el = nodeRefs.current[id];
        if (el) {
          el.style.opacity = "1";
          el.style.zIndex = "1000";
          el.dataset.expanded = "true";
        }

        return { [id]: true };
      } else {
        autoRotateRef.current = true;
        setActiveNodeId(null);
        setPulseEffect({});
        lastTimeRef.current = null;
        return {};
      }
    });
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      autoRotateRef.current = true;
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      lastTimeRef.current = null;
    }
  };

  const getStatusColor = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/30";
      case "in-progress":
        return "bg-[#22D3EE]/10 text-[#0891B2] border-[#22D3EE]/40";
      default:
        return "bg-slate-100 text-slate-500 border-slate-200";
    }
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
        >
          {/* Central orb */}
          <div className="absolute w-16 h-16 rounded-full bg-linear-to-br from-brand-violet via-[#3B82F6] to-brand-cyan animate-pulse flex items-center justify-center z-10 shadow-lg shadow-violet-300/40">
            <div className="absolute w-20 h-20 rounded-full border border-violet-300/30 animate-ping opacity-60" />
            <div
              className="absolute w-24 h-24 rounded-full border border-violet-200/20 animate-ping opacity-40"
              style={{ animationDelay: "0.6s" }}
            />
            <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-inner" />
          </div>

          {/* Orbit rings */}
          <div className="absolute w-108 h-108 rounded-full border border-brand-violet/15" />
          <div className="absolute w-97.5 h-97.5 rounded-full border border-dashed border-brand-violet/6" />

          {timelineData.map((item, index) => {
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;
            // rAF manages position; use angle=0 only for initial paint
            const { x, y } = getNodePosition(index, 0);

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute cursor-pointer"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  willChange: "transform, opacity",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Aura glow */}
                <div
                  className={`absolute rounded-full pointer-events-none ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
                    width: `${item.energy * 0.4 + 40}px`,
                    height: `${item.energy * 0.4 + 40}px`,
                    left: `-${(item.energy * 0.4) / 2}px`,
                    top: `-${(item.energy * 0.4) / 2}px`,
                  }}
                />

                {/* Icon node */}
                <div
                  className={[
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isExpanded
                      ? "bg-brand-violet text-white border-brand-violet shadow-lg shadow-violet-300/50 scale-150"
                      : isRelated
                      ? "bg-brand-violet/10 text-brand-violet border-brand-violet/50 animate-pulse"
                      : "bg-white text-brand-violet border-brand-violet/25 shadow-sm",
                  ].join(" ")}
                >
                  <Icon size={15} />
                </div>

                {/* Label */}
                <div
                  className={[
                    "absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wide pointer-events-none transition-colors duration-300",
                    isExpanded ? "text-brand-violet" : "text-content-primary",
                  ].join(" ")}
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white/96 backdrop-blur-xl border-brand-violet/20 shadow-2xl shadow-violet-100/60 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-brand-violet/30" />
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-center gap-2">
                        <Badge className={`px-2 py-0.5 text-[10px] font-medium border ${getStatusColor(item.status)}`}>
                          {item.status === "completed" ? "ACTIVE" : item.status === "in-progress" ? "GROWING" : "UPCOMING"}
                        </Badge>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-content-primary font-semibold leading-snug">
                        {item.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="px-4 pb-4 pt-0">
                      <p className="text-xs text-content-muted leading-relaxed">{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <div className="flex justify-between items-center text-[10px] mb-1.5">
                          <span className="flex items-center gap-1 text-slate-400">
                            <Zap size={9} />
                            Expertise
                          </span>
                          <span className="font-semibold text-brand-violet">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${item.energy}%`,
                              background: "linear-gradient(to right, #7C3AED, #22D3EE)",
                            }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-1 mb-2">
                            <Link size={9} className="text-slate-400" />
                            <span className="text-[10px] uppercase tracking-wider font-medium text-slate-400">
                              Connected
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-2 text-[10px] rounded-md border-brand-violet/20 bg-brand-violet/5 hover:bg-brand-violet/10 text-brand-violet transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
