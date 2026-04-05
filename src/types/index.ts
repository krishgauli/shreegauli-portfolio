export interface NavLink {
  label: string;
  href: string;
}

export interface ChallengeItem {
  icon: string;
  title: string;
  description: string;
}

export interface StrategyItem {
  icon: string;
  title: string;
  description: string;
  color?: 'violet' | 'cyan' | 'amber';
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  problem: string;
  result: string;
  tags: string[];
  thumbnail: string;
  metrics: Metric[];
  href: string;
  /* Rich detail fields (optional) */
  subtitle?: string;
  duration?: string;
  accentColor?: 'violet' | 'cyan' | 'amber';
  challengeHeading?: string;
  challengeDescription?: string[];
  challengeItems?: ChallengeItem[];
  strategyHeading?: string;
  strategyItems?: StrategyItem[];
  quote?: { text: string; author: string };
}

export interface Metric {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  icon?: string;
  description?: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  outcomes: string[];
  tags: string[];
}

export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarInitials: string;
  avatarColor: string;
  stars: number;
}

export interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  href: string;
  gradient: string;
}

export interface TrustItem {
  label: string;
  icon?: string;
}

export interface ProofChip {
  label: string;
  value?: string;
}
