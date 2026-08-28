import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import Footer from '@/components/layout/Footer';
import GoTopButton from '@/components/layout/GoTopButton';
import { CASE_STUDIES } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const cs of CASE_STUDIES) {
    params.push({ slug: cs.slug });
    if (cs.aliases) {
      for (const alias of cs.aliases) {
        params.push({ slug: alias });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = CASE_STUDIES.find(
    (cs) => cs.slug.toLowerCase() === slug.toLowerCase() || (cs.aliases && cs.aliases.includes(slug.toLowerCase()))
  );

  if (!project) {
    return {
      title: 'Project Not Found — Sajal Kanwal',
    };
  }

  return {
    title: `${project.title} — Sajal Kanwal`,
    description: `${project.subtitle} | Case study by Sajal Kanwal`,
  };
}

function ExternalLinkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const currentIndex = CASE_STUDIES.findIndex(
    (cs) => cs.slug.toLowerCase() === slug.toLowerCase() || (cs.aliases && cs.aliases.includes(slug.toLowerCase()))
  );

  if (currentIndex === -1) {
    notFound();
  }

  const project = CASE_STUDIES[currentIndex];
  const nextProject = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  return (
    <section className="about-section">
      <div className="about-container">
        {/* TOP BACK NAV */}
        <RevealOnScroll>
          <div className="mb-4 md:mb-6 flex justify-between items-center">
            <Link href="/#casestudies" className="btn-wrapper flex items-center gap-2" data-text="Back">
              <ArrowLeftIcon className="w-4 h-4" />
              <h4>Back to Projects</h4>
            </Link>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
              {project.domain} • {project.year}
            </span>
          </div>
        </RevealOnScroll>

        {/* HEADER & LINKS */}
        <RevealOnScroll>
          <div className="mb-6 md:mb-10">
            <h4 className="text-[10px] text-[var(--muted)] tracking-[0.2em] uppercase mb-2 font-medium">
              {project.number}
            </h4>
            <div className="flex flex-wrap items-center gap-4 mb-2">
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1] text-[var(--text)]">
                {project.title}
              </h1>
              <div className="flex items-center gap-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-[var(--border)] rounded-full hover:border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] transition-all duration-300 hover-trigger"
                    data-text="Live Demo"
                    title="Live Demo"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-[var(--border)] rounded-full hover:border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] transition-all duration-300 hover-trigger"
                    data-text="GitHub"
                    title="GitHub Repository"
                  >
                    <GitHubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
            <h3 className="text-[14px] md:text-[16px] font-normal text-[var(--text-secondary)]">
              {project.subtitle}
            </h3>
          </div>
        </RevealOnScroll>

        {/* TECH PILLS */}
        <RevealOnScroll>
          <div className="flex gap-2 flex-wrap mb-10 md:mb-14">
            {project.tasks.map((task) => (
              <span
                key={task}
                className="text-[11px] px-3.5 py-1.5 border border-[var(--border)] rounded-full text-[var(--text-secondary)] bg-[rgba(255,255,255,0.02)]"
              >
                {task}
              </span>
            ))}
          </div>
        </RevealOnScroll>

        <div className="my-8 md:my-14 space-y-12 md:space-y-16">
          {/* THE VISION & OVERVIEW */}
          <RevealOnScroll>
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] mb-4 font-medium">
                The Vision & Architecture
              </h2>
              <h3 className="text-[clamp(18px,2.8vw,32px)] font-light leading-[1.25] text-[var(--text)] tracking-tight max-w-4xl">
                {project.headline} <br className="hidden md:block" />
                <span className="text-[var(--text-secondary)]">{project.headlineAccent}</span>
              </h3>
              <p className="mt-5 text-[13px] md:text-[15px] leading-[1.8] text-[var(--text-secondary)] max-w-3xl">
                {project.overview}
              </p>
            </div>
          </RevealOnScroll>

          {/* KEY METRICS */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8 border-t border-[var(--border)]">
              {project.metrics.map((metric, idx) => (
                <RevealOnScroll key={idx}>
                  <div className="p-4 md:p-6 rounded-xl border border-[var(--border)] bg-[rgba(255,255,255,0.01)]">
                    <span className="block text-[clamp(20px,2.5vw,28px)] font-light text-[var(--text)] mb-1">
                      {metric.value}
                    </span>
                    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
                      {metric.label}
                    </span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          )}

          {/* CORE CAPABILITIES */}
          {project.capabilities && project.capabilities.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-8 border-t border-[var(--border)]">
              <div className="md:col-span-3">
                <RevealOnScroll>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] font-medium">
                    Core Capabilities
                  </h4>
                </RevealOnScroll>
              </div>
              <div className="md:col-span-9">
                <ul className="space-y-6 md:space-y-8">
                  {project.capabilities.map((cap, idx) => (
                    <RevealOnScroll key={idx}>
                      <li className="group pb-4 border-b border-[var(--border)] last:border-0 last:pb-0">
                        <h5 className="text-[clamp(15px,1.6vw,20px)] font-normal text-[var(--text)] mb-2 tracking-tight">
                          {cap.title}
                        </h5>
                        <p className="text-[13px] md:text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-3xl">
                          {cap.body}
                        </p>
                      </li>
                    </RevealOnScroll>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ARCHITECTURE & TECH STACK */}
          {project.stack && project.stack.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-8 border-t border-[var(--border)]">
              <div className="md:col-span-3">
                <RevealOnScroll>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] font-medium">
                    Technology Stack
                  </h4>
                </RevealOnScroll>
              </div>
              <div className="md:col-span-9">
                <RevealOnScroll>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-6">
                    {project.stack.map((item, idx) => (
                      <div key={idx} className="p-3 border border-[var(--border)] rounded-lg">
                        <span className="block text-[14px] md:text-[16px] font-normal text-[var(--text)] mb-1">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-[var(--muted)] uppercase tracking-[0.1em]">
                          {item.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          )}

          {/* ARCHITECTURAL DECISIONS & TRADE-OFFS */}
          {project.decisions && project.decisions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-8 border-t border-[var(--border)]">
              <div className="md:col-span-3">
                <RevealOnScroll>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] font-medium">
                    Architectural Decisions
                  </h4>
                </RevealOnScroll>
              </div>
              <div className="md:col-span-9">
                <ul className="space-y-6 md:space-y-8">
                  {project.decisions.map((dec, idx) => (
                    <RevealOnScroll key={idx}>
                      <li className="p-4 md:p-6 rounded-xl border border-[var(--border)] bg-[rgba(255,255,255,0.01)]">
                        <h5 className="text-[14px] md:text-[16px] font-medium text-[var(--text)] mb-2">
                          {dec.title}
                        </h5>
                        <p className="text-[13px] md:text-[14px] leading-relaxed text-[var(--text-secondary)]">
                          {dec.body}
                        </p>
                      </li>
                    </RevealOnScroll>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* PROJECT FOOTER / NEXT PROJECT */}
          <div className="pt-10 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex gap-4 flex-wrap">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wrapper hover-trigger flex items-center gap-2"
                  data-text="Live Demo"
                >
                  <ExternalLinkIcon className="w-4 h-4" />
                  <h4>Live Demo</h4>
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wrapper hover-trigger flex items-center gap-2"
                  data-text="GitHub"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <h4>GitHub Repository</h4>
                </a>
              )}
            </div>

            <Link href={`/${nextProject.slug}`} className="btn-wrapper hover-trigger flex items-center gap-2" data-text="Next Project">
              <h4>Next: {nextProject.title}</h4>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <GoTopButton />
      </div>
      <Footer />
    </section>
  );
}
