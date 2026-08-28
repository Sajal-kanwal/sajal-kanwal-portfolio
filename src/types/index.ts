export interface Capability {
  title: string;
  body: string;
}

export interface StackItem {
  name: string;
  role: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface CaseStudy {
  number: string;
  title: string;
  subtitle: string;
  tasks: string[];
  slug: string;
  baseImage: string;
  hoverImage: string;
  /* --- detail page --- */
  domain: string;
  year: string;
  headline: string;
  headlineAccent: string;
  overview: string;
  capabilities: Capability[];
  stack: StackItem[];
  metrics: Metric[];
  decisions: Capability[];
  repoUrl?: string;
  liveUrl?: string;
  aliases?: string[];
}

export interface ArchiveItem {
  id: string;
  title: string;
  category: string;
  year: string;
  date?: string;
  tasks: string[];
  images: string[];
  behanceUrl?: string;
  websiteUrl?: string;
}

export interface SearchItem {
  label: string;
  keywords: string[];
  url: string;
}

export interface FunResponse {
  triggers: string[];
  message: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  handle?: string;
}

export interface ExperienceEntry {
  title: string;
  type: string;
  dates: string;
  company: string;
  location: string;
  logoSrc: string;
  bullets?: string[];
}
