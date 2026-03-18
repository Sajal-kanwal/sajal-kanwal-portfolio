import { CaseStudy, ArchiveItem, SearchItem, FunResponse, ExperienceEntry } from '@/types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    number: 'Casestudy 01',
    title: 'Repo Lens',
    subtitle: 'AI-Powered GitHub Collaboration SaaS',
    tasks: ['Next.js 15', 'PostgreSQL', 'LangChain', 'tRPC'],
    slug: 'repo-lens',
    baseImage: '/images/thefavricexpo/thefabricexpo-binder03-square.jpg',
    hoverImage: '/images/thefavricexpo/thefabricexpo-misc01-square.jpg',
  },
  {
    number: 'Casestudy 02',
    title: 'Sentinel',
    subtitle: 'Autonomous AI Content Intelligence System',
    tasks: ['Python', 'OpenAI API', 'Docker', 'SQLAlchemy'],
    slug: 'sentinel',
    baseImage: '/images/gentledazs/GentleDazs_Packages_11.jpg',
    hoverImage: '/images/gentledazs/GentleDazs_Thumbnail.jpg',
  },
  {
    number: 'Casestudy 03',
    title: 'Spendora',
    subtitle: 'Real-Time Financial Telemetry Dashboard',
    tasks: ['Next.js', 'PostgreSQL', 'Prisma', 'Clerk'],
    slug: 'spendora',
    baseImage: '/images/lightsofseoul/lightsofseoul_thumbnail_square.jpg',
    hoverImage: '/images/lightsofseoul/Digital_Ticket01-square.jpg',
  }
];

// Archive items replaced by Skills Section
export const ARCHIVE_ITEMS: ArchiveItem[] = [];

export const SEARCH_ITEMS: SearchItem[] = [
  { label: 'Home', keywords: ['home'], url: '/' },
  { label: 'About', keywords: ['about', 'about me'], url: '/about' },
  { label: 'Contact', keywords: ['contact', 'co', 'con'], url: '/contact' },
  { label: 'Repo Lens', keywords: ['repo', 'lens', 'github', 'saas', 'ai'], url: '/repo-lens' },
  { label: 'Sentinel', keywords: ['sentinel', 'autonomous', 'news', 'agent'], url: '/sentinel' },
  { label: 'Spendora', keywords: ['spendora', 'finance', 'telemetry', 'dashboard'], url: '/spendora' }
];

export const FUN_RESPONSES: FunResponse[] = [
  { triggers: ['hello', 'hi', 'hey'], message: ['Hi there 👋 Search anything!'] },
  { triggers: ['howdy'], message: ['Howdy 🤠'] },
  { triggers: ['good morning', 'morning'], message: ['Good morning ☀️'] },
  { triggers: ['good afternoon', 'afternoon', 'lunch'], message: ['Good afternoon. Time flies!'] },
  { triggers: ['good evening', 'evening', 'night', 'dinner', 'good night'], message: ['Late night browsing? 🌙'] },
  { triggers: ['sleep', 'go to bed'], message: ['Go to bed too! 😴'] },
  { triggers: ['sydney', 'sajal', 'sajal kanwal', 'kanwal'], message: ["Yes, Sajal is here. He's busy coding 💻"] },
  { triggers: ['who made this'], message: ['Guess who! 😎'] },
  { triggers: ['who are you'], message: ["I'm Sajal's search assistant! 😎"] },
  { triggers: ['are you human'], message: ['Depends on how you define human 🤔'] },
  { triggers: ['what are you hiding'], message: ['Shh… nothing 🤫'] },
  { triggers: ['secret'], message: ["Tell me yours first, then I'll tell you 😏"] },
  { triggers: ['what do you do', 'job'], message: ["I'm a search assistant 💃"] },
  { triggers: ['cool', 'nice', 'awesome', 'amazing', 'fabulous', 'sick'], message: ['You think so? Thanks!'] },
  { triggers: ['wow', 'whoa', 'woah', 'ooo'], message: ['I take it as a compliment!'] },
  { triggers: ['meow', 'miaow', 'purr', 'cat', 'kitty'], message: ['Purrrr 🐈‍⬛🐾'] },
  { triggers: ['bark', 'dog', 'puppy', 'woof'], message: ['Woof Woof 🐕 🐾'] },
  { triggers: ['shit'], message: ['🫢😧'] },
  { triggers: ['pretty', 'beautiful'], message: ['Thank you 🫶'] },
  { triggers: ['bestie', 'friend', 'friends'], message: ['🫵🤝'] },
  { triggers: ['coffee', 'expresso'], message: ['Go tell Sajal your favourite coffee shop ☕️'] },
  { triggers: ['starbucks'], message: ['Yes, my favourite ☕✨'] },
  { triggers: ['tim hortons', 'tims'], message: ['Iced capp with croissant for all seasons 🥐'] },
  { triggers: ['happy new year', 'new year', '2026'], message: ['Happy New Year! 🎉'] },
  { triggers: ['2025'], message: ['Hope your 2025 was amazing! 💫'] },
  { triggers: ['merry christmas', 'christmas'], message: ['Merry Christmas! 🎄🎅'] },
  { triggers: ['portfolio', 'website'], message: ["You're already here! Enjoy!"] },
  { triggers: ['project', 'work', 'casestudy', 'case study'], message: ["Sajal's favourites are Repo Lens & Sentinel ✨"] },
  { triggers: ['help'], message: ['Try searching for home, about, or project names (e.g. Repo Lens).'] },
  { triggers: ['yes'], message: ['😏'] },
  { triggers: ['no'], message: ['😏'] },
  { triggers: ['okay'], message: ['👌'] },
  { triggers: ['what'], message: ['Need help?'] },
  { triggers: ['you'], message: ['Yes, you 🫵'] },
  { triggers: ['?'], message: ['Fingers crossed 🤞'] },
  { triggers: ['!'], message: ['‼️🫢'] },
  { triggers: ['.'], message: ['Yes, period.'] },
  { triggers: ['email'], message: ['Contact me via sajal.kanwal02@gmail.com!'] },
  { triggers: ['linkedin', 'li'], message: ['Find me @sajal-kanwal in LinkedIn!'] },
  { triggers: ['instagram', 'ins'], message: ['Find me @sajal-kanwal in GitHub!'] },
];

export const EXPERIENCES: ExperienceEntry[] = [
  {
    title: 'Top 50 - Hack the Future',
    type: 'Hackathon',
    dates: '2025 Apr',
    company: 'GeeksforGeeks',
    location: 'Remote',
    logoSrc: '/images/profile/man.png',
  },
  {
    title: 'B.Tech CSE (DS & ML)',
    type: 'Student',
    dates: '2023 Aug–Present',
    company: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    logoSrc: '/images/profile/man.png',
  },
];

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/sajal-kanwal',
  behance: 'https://github.com/Sajal-kanwal',
  instagram: 'https://github.com/Sajal-kanwal',
  github: 'https://github.com/Sajal-kanwal',
  email: 'mailto:sajal.kanwal02@gmail.com',
  calendly: 'mailto:sajal.kanwal02@gmail.com',
};
