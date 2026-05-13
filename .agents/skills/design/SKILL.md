---
name: design
description: Professional UI/UX Pro Max design skill. Uses Framer Motion for fluid animations, 21st.dev for premium pre-built React components, and Framer.com for design inspiration. Enforces high-end design principles — no generic layouts.
---
# UI/UX Pro Max Design Skill

## Stack & Tools
- **Framer Motion** (`framer-motion` v12) — installed. Use for: page transitions, scroll-triggered reveals, hover interactions, stagger children, layout animations.
- **21st.dev** — premium pre-built React component registry. Add any component with:
  ```bash
  npx @21st-dev/cli@latest add "https://21st.dev/r/[author]/[component]"
  ```
  Browse components at https://21st.dev
- **Framer.com** — use as design inspiration reference before starting any UI work.

## UI/UX Pro Max Principles

### 1. Typography Hierarchy (Never flat)
- Hero: `text-5xl–text-8xl font-black tracking-tight leading-[1.0]`
- Section H2: `text-3xl–text-5xl font-extrabold tracking-tight`
- Body: `text-base–text-lg leading-relaxed opacity-70`
- Eyebrow labels: `text-xs font-bold uppercase tracking-[0.18em]`

### 2. Color Contrast (Always accessible)
- NEVER use light tints (`#A5F3FC`, `#FDE68A`, `#C4B5FD`) as text on light backgrounds.
- On cream/white: use dark shades — `#0E7490` (cyan), `#B45309` (amber), `#6D28D9` (violet).
- On dark/black: use vivid tints — `#22D3EE`, `#F59E0B`, `#A78BFA`.

### 3. Spacing & Rhythm
- Sections: `py-24 md:py-32 lg:py-40`
- Component breathing room: `gap-6 md:gap-10 lg:gap-16`
- Never cram — whitespace IS the design.

### 4. Motion Design (Framer Motion)
Standard reveal:
```tsx
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
const ease = [0.22, 1, 0.36, 1]

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-60px" }}
  variants={fadeUp}
  transition={{ duration: 0.65, ease }}
/>
```
Stagger children: add `transition: { staggerChildren: 0.08 }` to the parent `visible` variant.

### 5. Card & Surface Design
- Light: `bg-[#FDFAF5] border border-[#D4CFC8]` + hover shadow
- Glass: `backdrop-blur-md bg-white/60 border border-white/30`
- Hover lift: `hover:-translate-y-1.5 transition-all duration-300`
- Glow: `hover:shadow-[0_20px_60px_-20px_rgba(accent,0.3)]`

### 6. Buttons
- Primary: solid accent, `rounded-full px-6 py-3 font-semibold` + glow on hover
- Secondary: `border border-[color] text-[color] hover:bg-[color]/10`
- NEVER flat grey buttons.

### 7. Adding 21st.dev Components
Before building any new component from scratch, check 21st.dev first:
1. Browse https://21st.dev
2. Run: `npx @21st-dev/cli@latest add "[component-url]"`
3. Import and customize with project design tokens

### 8. Inspiration Workflow
1. Visit https://www.framer.com/templates/ for layout inspiration
2. Sketch section hierarchy: eyebrow → H2 → body → CTA
3. Pick accent from palette (violet/cyan/amber)
4. Every section entry must animate with Framer Motion
5. Verify contrast ratios before shipping