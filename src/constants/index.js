// index.js
export const servicesData = [
  {
    title: "AI-Powered Full-Stack Development",
    description:
      "Building intelligent applications that combine modern web technologies with machine learning. I create scalable systems that process real-world data and deliver actionable insights through intuitive user interfaces.",
    items: [
      {
        title: "AI Integration & APIs",
        description: "(GPT/Claude APIs, OCR Processing, Multi-model Pipelines)",
      },
      {
        title: "Modern Frontend Architecture",
        description: "(React 19, Next.js 14, TypeScript, Server Components)",
      },
      {
        title: "Database Optimization",
        description: "(PostgreSQL, Prisma ORM, Sub-200ms Query Performance)",
      },
    ],
  },
  {
    title: "Financial & Data Platforms",
    description:
      "Specialized in building secure, high-performance financial applications with real-time processing capabilities. Expert in handling sensitive data, compliance requirements, and transaction-heavy workflows.",
    items: [
      {
        title: "Transaction Processing",
        description: "(Real-time Categorization, 10K+ Records, Type-safe APIs)",
      },
      {
        title: "Secure Authentication",
        description: "(Clerk Integration, MFA, OAuth, 90% Support Reduction)",
      },
      {
        title: "Performance Engineering",
        description: "(SSR Optimization, 40% Faster Load Times, Efficient Indexing)",
      },
    ],
  },
  {
    title: "Cloud Architecture & DevOps",
    description:
      "Deploying production-ready applications with zero-downtime strategies. I architect serverless solutions and implement robust CI/CD pipelines that scale automatically with your business growth.",
    items: [
      {
        title: "Serverless Architecture",
        description: "(Vercel, AWS Lambda, Zero-infrastructure Solutions)",
      },
      {
        title: "Automated Deployment",
        description: "(GitHub Actions, Docker, CI/CD Pipelines)",
      },
      {
        title: "Monitoring & Analytics",
        description: "(Performance Tracking, Error Monitoring, User Insights)",
      },
    ],
  },
  {
    title: "Machine Learning Solutions",
    description:
      "From concept to deployment, I build ML-powered features that enhance user experience. Specializing in document processing, computer vision, and intelligent automation for business applications.",
    items: [
      {
        title: "Document Intelligence",
        description: "(Resume Analysis, ATS Scoring, 95% Parsing Accuracy)",
      },
      {
        title: "Computer Vision",
        description: "(AWS Rekognition, Facial Recognition, 99.2% Accuracy)",
      },
      {
        title: "Data Processing",
        description: "(PyTorch, pandas, NumPy, Real-time Analytics)",
      },
    ],
  },
];

export const projects = [
  {
    id: 1,
    name: "Spendora - Financial Management Platform",
    description:
      "Production-ready financial platform with real-time transaction categorization, secure authentication, and advanced analytics. Optimized for handling 10K+ transactions with sub-200ms response times.",
    href: "https://spendora-vue.vercel.app/",
    github: "https://github.com/Sajal-kanwal/Spendora",
    image: "/assets/projects/spendora.png",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "Next.js 14" },
      { id: 2, name: "PostgreSQL" },
      { id: 3, name: "Shadcn UI" },
      { id: 4, name: "Clerk Auth" },
      { id: 5, name: "Prisma ORM" },
      { id: 6, name: "Recharts" },
    ],
  },
  {
    id: 2,
    name: "Cortex-CV - AI Resume Analyzer",
    description:
      "Serverless AI platform providing instant ATS compatibility scoring with 95% accuracy. Features multi-resume management and personalized feedback generation using advanced ML models.",
    href: "https://cortex-cv.vercel.app/",
    github: "https://github.com/Sajal-kanwal/cortex-cv",
    image: "/assets/projects/cortex.png",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Puter.js" },
      { id: 4, name: "Tailwind CSS" },
      { id: 5, name: "Zustand" },
      { id: 6, name: "GPT/Claude APIs" },
    ],
  },
];

export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/sajal-kanwal/" },
  { name: "GitHub", href: "https://github.com/Sajal-kanwal" },
  { name: "Instagram", href: "https://www.instagram.com/anytng.sajal/" },
  { name: "Email", href: "mailto:sajal.kanwal02@gmail.com" },
];