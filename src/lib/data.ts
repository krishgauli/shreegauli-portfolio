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
      { label: "Organic Growth", value: "+340%", positive: true },
      { label: "Keywords Ranked", value: "120+", positive: true },
      { label: "Timeline", value: "8 months" },
    ],
    href: "/work/seo-growth",
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
      { label: "ROAS", value: "4.8x", positive: true },
      { label: "Monthly Budget", value: "$30K" },
      { label: "CAC Reduction", value: "-42%", positive: true },
    ],
    href: "/work/paid-media",
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
      { label: "Hours Saved / Week", value: "20+", positive: true },
      { label: "Lead Response Time", value: "-85%", positive: true },
      { label: "Pipelines Built", value: "7" },
    ],
    href: "/work/automation",
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
