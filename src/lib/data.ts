import type {
  NavLink,
  CaseStudy,
  Service,
  Stat,
  Testimonial,
  Article,
  TrustItem,
} from "@/types";

export const navLinks: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blogs" },
  { label: "SEO Tools", href: "/seo-tools" },
  { label: "Contact", href: "/contact" },
];

export const trustItems: TrustItem[] = [
  { label: "SEO Strategy" },
  { label: "AEO/GEO" },
  { label: "Paid Campaigns" },
  { label: "Social Growth" },
  { label: "Content Systems" },
  { label: "n8n Automation" },
  { label: "Fullstack" },
  { label: "Next.js" },
  { label: "Mobile App" },
  { label: "Google Analytics" },
  { label: "Meta Ads" },
  { label: "Email Marketing" },
  { label: "Project Management" },
  { label: "Growth Reporting" },
  { label: "CRM Workflows" },
  { label: "WordPress" },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "seo-growth",
    client: "Healthcare SaaS",
    title: "Organic search rebuilt from near-zero to consistent top-10 rankings",
    problem: "No SEO foundation. Thin content. Zero domain presence.",
    result: "340% increase in organic sessions over 8 months",
    tags: ["SEO", "Content", "Technical Audit"],
    thumbnail: "/1.png",
    metrics: [
      { label: "Organic Growth", value: "+340%", positive: true, icon: "trending-up", description: "Sustainable traffic increase across core high-intent search terms that convert." },
      { label: "Keywords Ranked", value: "120+", positive: true, icon: "key-round", description: "Top-tier industry phrases securing permanent Page 1 visibility for the first time." },
      { label: "ROI Timeline", value: "8 mo.", icon: "timer", description: "From foundational technical audit to a market-leading authority." },
    ],
    href: "/work/seo-growth",
    subtitle: "A zero-to-top-10 ranking transformation.",
    duration: "8 Month Implementation",
    accentColor: "violet",
    challengeHeading: "The invisible wall blocking patient acquisition.",
    challengeDescription: [
      "Despite having a market-leading product, the brand was digitally non-existent. Their technical architecture functioned as a digital barrier, effectively blocking search engine crawlers from ever discovering their most critical clinical content.",
      "We identified a critical lack of SEO foundation: thin, superficial service pages that failed to speak the language of healthcare professionals, coupled with a complete absence of domain authority. They weren\u2019t just losing\u2014they weren\u2019t even in the race.",
    ],
    challengeItems: [
      { icon: "bug", title: "Crawlability Barriers", description: "JS-heavy rendering hiding 80% of clinical documentation from Google." },
      { icon: "layers", title: "Thin Semantic Depth", description: "Keywords lacked the medical specificity required for E-E-A-T compliance." },
      { icon: "unlink", title: "Zero Authority", description: "A non-existent backlink profile against legacy giants with 15+ years of tenure." },
    ],
    strategyHeading: "A precision surgical approach to SEO.",
    strategyItems: [
      { icon: "wrench", title: "Technical Cleanup", description: "Re-engineered the site architecture to ensure every high-value page was indexed within 48 hours of publication.", color: "violet" },
      { icon: "file-text", title: "Content Deployment", description: "Deployment of 50+ deep-dive clinical whitepapers addressing exact search intent of medical decision makers.", color: "cyan" },
      { icon: "network", title: "Authority Mapping", description: "Strategic backlink acquisition from Tier-1 medical publications and SaaS industry leaders.", color: "violet" },
    ],
    quote: { text: "The transformation was immediate. Within 12 weeks, our indexing coverage jumped from 18% to 99%.", author: "Head of Engineering" },
  },
  {
    id: "paid-media",
    client: "E-Commerce Brand",
    title: "Paid media overhaul: from 1.2x ROAS to 4.8x in one quarter",
    problem: "Ad spend bleeding with no clear attribution or structure.",
    result: "4.8x ROAS on $30K monthly budget",
    tags: ["Meta Ads", "Google Ads", "Attribution"],
    thumbnail: "/2.png",
    metrics: [
      { label: "Return on Ad Spend", value: "4.8x", positive: true, icon: "trending-up", description: "From 1.2x to 4.8x in a single quarter through restructured campaigns." },
      { label: "Monthly Budget", value: "$30K", icon: "dollar-sign", description: "Optimized allocation across Meta and Google with zero budget increase." },
      { label: "CAC Reduction", value: "-42%", positive: true, icon: "gauge", description: "Customer acquisition cost slashed through audience consolidation." },
    ],
    href: "/work/paid-media",
    subtitle: "A complete paid media restructure delivering 4x returns.",
    duration: "3 Month Sprint",
    accentColor: "cyan",
    challengeHeading: "Burning budget with zero accountability.",
    challengeDescription: [
      "The brand was spending $30K/month on ads across Meta and Google with no clear attribution model. Campaign structure was a tangled mess of overlapping audiences and creative fatigue.",
      "Without proper conversion tracking, the team had no idea which campaigns were actually driving revenue. They were essentially flying blind with a significant monthly budget.",
    ],
    challengeItems: [
      { icon: "circle-dollar-sign", title: "Budget Waste", description: "70% of ad spend flowing to non-converting campaigns with no kill criteria." },
      { icon: "bar-chart-3", title: "Broken Attribution", description: "No server-side tracking, no UTM discipline, and platform-reported ROAS inflated by 3x." },
      { icon: "target", title: "Audience Overlap", description: "12 active campaigns competing against each other, driving up CPMs by 40%." },
    ],
    strategyHeading: "A systematic rebuild of the paid engine.",
    strategyItems: [
      { icon: "bar-chart-3", title: "Attribution Rebuild", description: "Server-side tracking via CAPI, UTM framework, and first-party data clean rooms for true conversion measurement.", color: "cyan" },
      { icon: "layout-grid", title: "Campaign Restructure", description: "Consolidated 12 campaigns to 4 pillar campaigns with clear audience segmentation and budget allocation.", color: "violet" },
      { icon: "paintbrush", title: "Creative Testing", description: "Systematic A/B testing framework with 3-day kill criteria, resulting in 8 winning ad variations.", color: "cyan" },
    ],
    quote: { text: "We went from not knowing if ads worked to having a predictable revenue engine. The ROAS improvement was immediate.", author: "Founder & CEO" },
  },
  {
    id: "automation",
    client: "Local Services Group",
    title: "Automated reporting and lead pipeline saving 20+ hours per week",
    problem: "Manual reporting, missed leads, no process consistency.",
    result: "20+ hours saved weekly via n8n automation",
    tags: ["n8n", "CRM", "Automation", "Reporting"],
    thumbnail: "/3.png",
    metrics: [
      { label: "Hours Saved / Week", value: "20+", positive: true, icon: "clock", description: "Reclaimed from repetitive data entry, report generation, and tool syncing." },
      { label: "Lead Response Time", value: "-85%", positive: true, icon: "zap", description: "From 6+ hours to under 15 minutes through automated routing and alerts." },
      { label: "Pipelines Built", value: "7", icon: "workflow", description: "Interconnected n8n workflows handling every step from lead to close." },
    ],
    href: "/work/automation",
    subtitle: "From manual chaos to autonomous operations.",
    duration: "6 Week Build",
    accentColor: "amber",
    challengeHeading: "Drowning in manual processes nobody owns.",
    challengeDescription: [
      "The team was spending 20+ hours per week on repetitive tasks: copying data between tools, manually generating reports, and chasing leads that fell through the cracks.",
      "Without any automation infrastructure, every process depended on someone remembering to do it. Lead response times averaged 6+ hours, and weekly reports took an entire day to compile.",
    ],
    challengeItems: [
      { icon: "clock", title: "Manual Everything", description: "20+ hours/week spent on repetitive data entry, report generation, and tool syncing." },
      { icon: "alert-triangle", title: "Missed Leads", description: "Average response time of 6+ hours, with 15% of leads never receiving a response." },
      { icon: "file-spreadsheet", title: "Report Hell", description: "Weekly client reports took 8+ hours to compile from 5 different data sources." },
    ],
    strategyHeading: "An automation-first infrastructure overhaul.",
    strategyItems: [
      { icon: "workflow", title: "n8n Workflow Engine", description: "Built 7 interconnected workflows handling lead routing, data sync, and notification chains.", color: "amber" },
      { icon: "database", title: "CRM Integration", description: "Unified 5 data sources into a single CRM pipeline with automatic stage progression and alerts.", color: "violet" },
      { icon: "layout-dashboard", title: "Live Dashboards", description: "Real-time reporting dashboards replacing manual weekly report compilation entirely.", color: "amber" },
    ],
    quote: { text: "What used to take half a day now runs overnight without anyone touching it. Game-changing for a small team.", author: "Operations Manager" },
  },

  /* ── New Case Studies ────────────────────────────────────────── */
  {
    id: "lead-conversion-fix",
    client: "Multi-Location Clinic",
    title: "From 0.1% to 10% conversion rate — without changing a single ad",
    problem: "$6,000/month ad spend generating 300 leads but only a 0.1% conversion rate due to poor follow-up.",
    result: "100x conversion rate increase from 0.1% to 10% in one month",
    tags: ["Lead Management", "Google Ads", "Meta Ads", "Process Optimization"],
    thumbnail: "/1.png",
    metrics: [
      { label: "Conversion Rate", value: "10%", positive: true, icon: "trending-up", description: "Jumped from 0.1% to 10% — a 100x improvement — in just 30 days." },
      { label: "Monthly Leads", value: "300", icon: "users", description: "The same 300 leads from existing campaigns now actually converting into paying patients." },
      { label: "Monthly Ad Spend", value: "$6K", icon: "dollar-sign", description: "Zero increase in ad budget. The problem was never the ads — it was the follow-up." },
    ],
    href: "/work/lead-conversion-fix",
    subtitle: "A 100x conversion lift by fixing what happens after the click.",
    duration: "1 Month Turnaround",
    accentColor: "violet",
    challengeHeading: "300 leads a month — and almost none converting.",
    challengeDescription: [
      "This client was spending $6,000 per month on Google Ads and Meta Ads and consistently generating around 300 leads each month. On paper, the ad performance looked solid. But conversion sat at 0.1% — meaning only one lead out of every thousand was becoming a paying client.",
      "The marketing team assumed the ads were the problem. They had cycled through multiple agencies, changed creatives, tested new audiences — but nothing moved the needle. Revenue was stagnant despite a healthy top-of-funnel.",
    ],
    challengeItems: [
      { icon: "phone-missed", title: "Missed Calls & Slow Follow-Up", description: "Leads were waiting 24–48 hours for a callback. Most had already moved on to a competitor." },
      { icon: "users", title: "No Dedicated Follow-Up Process", description: "The existing team was juggling intake, scheduling, and follow-up — nothing had a clear owner." },
      { icon: "trending-down", title: "0.1% Conversion Rate", description: "Out of 300 leads per month, less than one was converting into a booked appointment." },
    ],
    strategyHeading: "The fix wasn't in the ads — it was in the follow-up.",
    strategyItems: [
      { icon: "search", title: "Full-Funnel Audit", description: "Reviewed the entire journey from ad click to booking. Identified that lead response time and follow-up quality were the real bottleneck — not targeting or creative.", color: "violet" },
      { icon: "user-plus", title: "Dedicated Follow-Up Hire", description: "Recommended and helped onboard a dedicated person to handle inbound lead calls within 5 minutes of submission and follow a structured multi-touch cadence.", color: "cyan" },
      { icon: "phone", title: "Structured Call Scripts", description: "Built a call framework with objection handling, appointment-setting scripts, and a CRM-based follow-up sequence to ensure no lead slipped through.", color: "violet" },
    ],
    quote: { text: "We spent months blaming the ads. Shree showed us the real problem in one meeting. A month later, our conversion rate went from 0.1% to 10%.", author: "Clinic Owner" },
    takeaway: "Ad performance means nothing without strong follow-up. Before spending more on ads, audit what happens after the lead comes in. A single operational fix outperformed months of campaign changes.",
  },
  {
    id: "seo-website-launch",
    client: "New Clinic Launch",
    title: "From zero to 9.41K impressions in 60 days with a one-day website build",
    problem: "Brand-new clinic with no website, no domain authority, and zero online presence.",
    result: "9.41K impressions and 252 organic clicks within 2 months",
    tags: ["SEO", "Web Development", "Local SEO", "Google Search Console"],
    thumbnail: "/case-study-seo-search-console.png",
    metrics: [
      { label: "Impressions", value: "9.41K", positive: true, icon: "eye", description: "Appeared in front of 9,410 potential patients within the first 60 days of launch." },
      { label: "Organic Clicks", value: "252", positive: true, icon: "mouse-pointer-click", description: "252 real visitors from Google without a single dollar spent on ads." },
      { label: "Website Build Time", value: "1 Day", icon: "timer", description: "From concept to a fully SEO-optimized, mobile-ready, live website in a single day." },
    ],
    href: "/work/seo-website-launch",
    subtitle: "A one-day build that started ranking in weeks.",
    duration: "1 Day Build + 2 Month Results",
    accentColor: "cyan",
    challengeHeading: "A brand-new clinic with zero digital presence.",
    challengeDescription: [
      "This client had just launched a new clinic and had nothing online — no website, no Google Business Profile optimization, and no domain history. They were starting from absolute zero in one of the most competitive local markets: healthcare.",
      "Speed was critical. The clinic was already open and seeing walk-ins, but without any web presence, they were invisible to the thousands of patients searching for care in their area every day.",
    ],
    challengeItems: [
      { icon: "globe", title: "No Website or Domain", description: "Zero online footprint — no website, no indexed pages, and no domain authority to build from." },
      { icon: "map-pin", title: "Competitive Local Market", description: "Healthcare search in their area was dominated by established clinics with years of SEO history." },
      { icon: "clock", title: "Time-Sensitive Launch", description: "The clinic was already operational. Every day without a website meant lost patients to competitors." },
    ],
    strategyHeading: "A rapid, SEO-first website launch.",
    strategyItems: [
      { icon: "code", title: "One-Day Website Build", description: "Designed and deployed a fully responsive, mobile-optimized website in a single day with proper site architecture, meta tags, schema markup, and fast Core Web Vitals.", color: "cyan" },
      { icon: "search", title: "SEO From Day One", description: "Every page built with keyword-mapped content targeting high-intent local searches. Sitemap submitted to Google Search Console on launch day.", color: "violet" },
      { icon: "map-pin", title: "Local SEO Setup", description: "Google Business Profile optimization, local citation building, and NAP consistency across directories to boost local pack visibility.", color: "cyan" },
    ],
    quote: { text: "We went from zero to showing up on Google in less than two weeks. By the end of month two, we had real patients finding us through search.", author: "Clinic Founder" },
    proofImage: { src: "/case-study-seo-search-console.png", alt: "Google Search Console showing 9.41K impressions and 252 clicks within 2 months of launch", caption: "Google Search Console — 60-day performance after launch" },
    takeaway: "You don't need months to build a website that ranks. With the right SEO foundation from day one, even a brand-new domain can generate meaningful organic traffic within weeks.",
  },
  {
    id: "ai-call-centre",
    client: "Service-Based Business",
    title: "AI call centre agent turns missed leads into 10–12 new clients per month",
    problem: "Inconsistent manual follow-up causing leads to go cold and revenue to leak.",
    result: "10–12 new leads per month through AI-powered follow-up",
    tags: ["AI Automation", "Lead Follow-Up", "Conversational AI", "CRM"],
    thumbnail: "/3.png",
    metrics: [
      { label: "New Leads / Month", value: "10–12", positive: true, icon: "trending-up", description: "Consistent monthly lead flow generated entirely by the AI call agent." },
      { label: "Follow-Up Speed", value: "<1 min", positive: true, icon: "zap", description: "Every lead gets an immediate AI-powered response with zero human delay." },
      { label: "Human Hours Saved", value: "40+/mo", positive: true, icon: "clock", description: "Over 40 hours per month reclaimed from repetitive follow-up calls and scheduling." },
    ],
    href: "/work/ai-call-centre",
    subtitle: "One AI agent replaced an entire follow-up workflow — and started closing leads.",
    duration: "2 Week Build",
    accentColor: "amber",
    challengeHeading: "Good leads going cold because nobody followed up.",
    challengeDescription: [
      "This client was generating inbound leads through ads and referrals, but had no reliable system for following up. Some leads got a callback within a day, others waited three or four days, and many never heard back at all.",
      "The owner knew they were losing revenue, but couldn't afford to hire a full-time receptionist or call centre team. Every missed follow-up was a missed appointment — and the longer a lead waited, the less likely they were to convert.",
    ],
    challengeItems: [
      { icon: "phone-missed", title: "Inconsistent Follow-Up", description: "No system in place — some leads got a call in hours, others never received one at all." },
      { icon: "user-x", title: "No Dedicated Staff", description: "The business couldn't justify a full-time hire just for follow-up, so it kept falling through the cracks." },
      { icon: "clock", title: "Leads Going Cold", description: "Average first-contact time was 2–3 days. By then, most leads had already booked with a competitor." },
    ],
    strategyHeading: "An AI agent that never misses a lead.",
    strategyItems: [
      { icon: "bot", title: "AI Call Centre Agent", description: "Built a conversational AI agent that calls or texts every new lead within 60 seconds of submission — qualifying, answering questions, and scheduling appointments automatically.", color: "amber" },
      { icon: "workflow", title: "CRM Integration", description: "Connected the AI agent to the client's CRM so every interaction is logged, follow-ups are tracked, and no lead falls through the cracks.", color: "violet" },
      { icon: "repeat", title: "Multi-Touch Sequences", description: "Designed automated follow-up sequences — if the lead doesn't respond on the first attempt, the AI retries via text and call across a 7-day cadence.", color: "amber" },
    ],
    quote: { text: "Before this, half our leads disappeared. Now every single one gets a call within a minute. We're booking 10–12 new clients a month without lifting a finger.", author: "Business Owner" },
    takeaway: "Most businesses don't have a lead generation problem — they have a lead follow-up problem. An AI call agent can solve it for a fraction of the cost of a full-time hire, and it never takes a day off.",
  },
];

export const services: Service[] = [
  {
    id: "seo",
    icon: "Search",
    title: "SEO & Content",
    description:
      "Technical audits, keyword strategy, and content systems that build lasting organic presence.",
    outcomes: [
      "Technical site health improvements",
      "Keyword-mapped content strategy",
      "Monthly performance reporting",
    ],
    tags: ["Technical SEO", "Content", "Link Building"],
  },
  {
    id: "paid",
    icon: "TrendingUp",
    title: "Paid Media",
    description:
      "Meta and Google campaign builds, audience testing, and ROAS-focused optimization.",
    outcomes: [
      "Full campaign architecture",
      "Creative strategy & iteration",
      "Attribution & tracking setup",
    ],
    tags: ["Meta Ads", "Google Ads", "Analytics"],
  },
  {
    id: "social",
    icon: "Users",
    title: "Social Media Growth",
    description:
      "Platform strategies, content calendars, and community systems that build engaged audiences.",
    outcomes: [
      "Platform-specific content strategy",
      "Scheduling & publishing systems",
      "Engagement & growth tracking",
    ],
    tags: ["Instagram", "LinkedIn", "Content Calendar"],
  },
  {
    id: "automation",
    icon: "Zap",
    title: "Reporting & Automation",
    description:
      "n8n workflows, CRM integrations, and reporting dashboards that eliminate manual work.",
    outcomes: [
      "Custom n8n workflow builds",
      "CRM & tool integrations",
      "Live dashboard reporting",
    ],
    tags: ["n8n", "CRM", "Dashboards"],
  },
];

export const stats: Stat[] = [
  { value: 14, suffix: "+", label: "Brands Supported", sublabel: "across 5 industries" },
  { value: 340, suffix: "%", label: "Organic Growth", sublabel: "highest campaign result" },
  { value: 4, suffix: ".8x", label: "Peak ROAS", sublabel: "paid media optimization" },
  { value: 20, suffix: "+", label: "Hours Saved / Week", sublabel: "via automation systems" },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Shree completely overhauled our SEO strategy and the results were immediate. Within 3 months we were ranking for terms we had never touched before. Clear communicator, works fast, delivers.",
    name: "Sarah M.",
    role: "Head of Marketing",
    company: "Healthcare SaaS",
    avatarInitials: "SM",
    avatarColor: "#7C3AED",
    stars: 5,
    result: "+185% qualified organic traffic",
  },
  {
    id: "t2",
    quote:
      "We were burning money on ads with no idea why. Shree rebuilt the entire campaign structure in two weeks and our ROAS doubled in the first month. Highly recommend for any brand serious about growth.",
    name: "Daniel R.",
    role: "Founder",
    company: "E-Commerce Brand",
    avatarInitials: "DR",
    avatarColor: "#22D3EE",
    stars: 5,
    result: "2.1x ROAS in 30 days",
  },
  {
    id: "t3",
    quote:
      "The automation workflows Shree built for our team saved us over 20 hours a week. What used to take half a day now runs overnight without anyone touching it. Game-changing for a small team.",
    name: "Priya K.",
    role: "Operations Manager",
    company: "Local Services Group",
    avatarInitials: "PK",
    avatarColor: "#F59E0B",
    stars: 5,
    result: "20+ hours saved weekly",
  },
  {
    id: "t4",
    quote:
      "Our reporting used to be a mess of screenshots and guesses. Shree turned it into one clean dashboard tied to real business outcomes, and suddenly our weekly decisions got much easier.",
    name: "Maria L.",
    role: "Marketing Director",
    company: "Multi-Location Clinic",
    avatarInitials: "ML",
    avatarColor: "#38BDF8",
    stars: 5,
    result: "Weekly reporting time cut by 80%",
  },
  {
    id: "t5",
    quote:
      "The best part was not just traffic growth. Shree fixed the offer positioning, tightened the funnel, and helped us generate leads that were actually qualified enough for sales to close.",
    name: "Omar T.",
    role: "Co-Founder",
    company: "B2B Services Firm",
    avatarInitials: "OT",
    avatarColor: "#A855F7",
    stars: 5,
    result: "3.4x more qualified demo requests",
  },
  {
    id: "t6",
    quote:
      "We brought Shree in for Google Ads, but the real value was the strategic clarity. He found the leaks across tracking, landing pages, and follow-up, then fixed all three fast.",
    name: "Jenna P.",
    role: "Growth Lead",
    company: "DTC Wellness Brand",
    avatarInitials: "JP",
    avatarColor: "#F97316",
    stars: 5,
    result: "CPL down 37% after rebuild",
  },
];

export const articles: Article[] = [
  {
    id: "a1",
    category: "SEO",
    title: "15 Questions to Ask Before Hiring a Digital Marketing Agency",
    excerpt:
      "Most agencies will tell you what you want to hear. Here's how to ask the questions that reveal what they actually know.",
    date: "March 2025",
    readTime: "8 min read",
    href: "/blogs/15-questions-hiring-marketing-agency",
    gradient: "from-violet-900/40 to-purple-900/20",
  },
  {
    id: "a2",
    category: "Automation",
    title: "Why Most n8n Workflows Break in Production (And How to Fix Them)",
    excerpt:
      "Building a workflow that runs in dev is easy. Building one that runs reliably in production for 6 months is a different discipline.",
    date: "February 2025",
    readTime: "6 min read",
    href: "/blogs/n8n-workflows-production",
    gradient: "from-cyan-900/40 to-teal-900/20",
  },
  {
    id: "a3",
    category: "Paid Media",
    title: "The Attribution Problem Nobody Talks About in Small Business Ads",
    excerpt:
      "Your ROAS number is probably wrong. Not because the platform is lying—because attribution models hide more than they reveal.",
    date: "January 2025",
    readTime: "7 min read",
    href: "/blogs/attribution-problem-small-business-ads",
    gradient: "from-amber-900/40 to-orange-900/20",
  },
];
