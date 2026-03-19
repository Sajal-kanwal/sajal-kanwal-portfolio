import RevealOnScroll from '@/components/shared/RevealOnScroll';
import Footer from '@/components/layout/Footer';
import GoTopButton from '@/components/layout/GoTopButton';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Repo Lens — Sajal Kanwal',
  description: 'AI-Powered GitHub Collaboration SaaS case study by Sajal Kanwal',
};

export default function RepoLensPage() {
  const images = [];

  return (
    <section className="about-section">
      <div className="about-container">
        <RevealOnScroll>
          <div className="mb-2 md:mb-4">
            <Link href="/#casestudies" className="btn-wrapper" data-text="Back">
              <i className="ri-arrow-left-line" />
              <h4>Back to Projects</h4>
            </Link>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mb-4 md:mb-8">
            <h4 className="text-[10px] text-[var(--muted)] tracking-[0.1em] uppercase mb-2">Casestudy 01</h4>
            <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-light leading-[1.1] mb-2">Repo Lens</h1>
            <h3 className="text-[12px] md:text-[14px] font-normal text-[var(--text-secondary)]">AI-Powered GitHub Repository Visualizer</h3>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="flex gap-4 mb-8 flex-wrap">
            <div>
              <h5 className="text-[10px] font-semibold tracking-[0.08em] text-[var(--muted)] mb-2 uppercase">TASKS</h5>
              <ul className="list-none flex gap-2 flex-wrap">
                {['Next.js 14', 'RSC', 'Tailwind', 'LangChain', 'OpenAI'].map(t => (
                  <li key={t} className="text-[11px] px-3 py-1 border border-[var(--border)] rounded-full text-[var(--text-secondary)]">{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>

        <div className="my-10 md:my-16">
          <RevealOnScroll>
            <div className="mb-8 md:mb-12">
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] mb-4 font-medium">The Vision</h2>
              <h3 className="text-[clamp(18px,2.5vw,32px)] font-light leading-[1.2] text-[var(--text)] tracking-tight max-w-4xl">
                Transforming chaotic codebases into <br className="hidden md:block"/>
                <span className="text-[var(--text-secondary)]">comprehensible visual narratives.</span>
              </h3>
              <p className="mt-4 text-[13px] md:text-[14px] leading-[1.8] text-[var(--text-secondary)] max-w-2xl">
                Repo Lens fundamentally changes how teams onboard and audit large codebases. By directly analyzing abstract syntax trees (ASTs) alongside git history, it generates interactive dependency graphs and architectural summaries automatically synced with every commit.
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-6 border-t border-[var(--border)] mb-10 md:mb-16">
            <div className="md:col-span-3">
              <RevealOnScroll>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] font-medium">Core Capabilities</h4>
              </RevealOnScroll>
            </div>
            <div className="md:col-span-9">
              <ul className="space-y-6 md:space-y-10">
                <RevealOnScroll>
                  <li className="group">
                    <h5 className="text-[clamp(16px,2vw,24px)] font-light text-[var(--text)] mb-2 tracking-tight">Semantic Code Analysis</h5>
                    <p className="text-[13px] md:text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-2xl">
                      Utilizing advanced LLMs to parse and understand code semantics beyond standard static analysis, providing human-readable explanations of complex functions.
                    </p>
                  </li>
                </RevealOnScroll>
                <RevealOnScroll>
                  <li className="group">
                    <h5 className="text-[clamp(16px,2vw,24px)] font-light text-[var(--text)] mb-2 tracking-tight">Interactive Visualizer</h5>
                    <p className="text-[13px] md:text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-2xl">
                      A high-performance WebGL-based visualization engine allowing seamless navigation through deeply nested project architectures.
                    </p>
                  </li>
                </RevealOnScroll>
                <RevealOnScroll>
                  <li className="group">
                    <h5 className="text-[clamp(16px,2vw,24px)] font-light text-[var(--text)] mb-2 tracking-tight">Automated Documentation</h5>
                    <p className="text-[13px] md:text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-2xl">
                      Instant generation and syncing of Markdown documentation ensuring your README and developer docs are always up-to-date with your codebase.
                    </p>
                  </li>
                </RevealOnScroll>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-6 border-t border-[var(--border)]">
            <div className="md:col-span-3">
              <RevealOnScroll>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] font-medium">Architecture</h4>
              </RevealOnScroll>
            </div>
            <div className="md:col-span-9">
              <RevealOnScroll>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-8">
                  <div>
                    <span className="block text-[clamp(20px,2vw,24px)] font-light text-[var(--text)] mb-2">Next.js 15</span>
                    <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.1em]">Frontend Engine</span>
                  </div>
                  <div>
                    <span className="block text-[clamp(20px,2vw,24px)] font-light text-[var(--text)] mb-2">LangChain</span>
                    <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.1em]">LLM Orchestrator</span>
                  </div>
                  <div>
                    <span className="block text-[clamp(20px,2vw,24px)] font-light text-[var(--text)] mb-2">pgvector</span>
                    <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.1em]">Vector Memory</span>
                  </div>
                  <div>
                    <span className="block text-[clamp(20px,2vw,24px)] font-light text-[var(--text)] mb-2">tRPC</span>
                    <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.1em]">Safe Transports</span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>

        <GoTopButton />
      </div>
      <Footer />
    </section>
  );
}
