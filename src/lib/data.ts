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
  { label: "Writing", href: "/writing" },
  { label: "SEO Tools", href: "/seo-tools" },
  { label: "Contact", href: "/contact" },
];

export const trustItems: TrustItem[] = [
  { label: "SEO Strategy" },
  { label: "Paid Campaigns" },
  { label: "Social Growth" },
  { label: "Content Systems" },
  { label: "n8n Automation" },
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
    href: "/writing/15-questions-hiring-marketing-agency",
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
    href: "/writing/n8n-workflows-production",
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
    href: "/writing/attribution-problem-small-business-ads",
    gradient: "from-amber-900/40 to-orange-900/20",
  },
];
