import RevealOnScroll from '@/components/shared/RevealOnScroll';
import Footer from '@/components/layout/Footer';
import GoTopButton from '@/components/layout/GoTopButton';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spendora — Sajal Kanwal',
  description: 'Real-Time Financial Telemetry Dashboard case study by Sajal Kanwal',
};

export default function SpendoraPage() {
  const images = [];

  return (
    <section className="about-section" style={{ paddingTop: '80px' }}>
      <div className="about-container" style={{ maxWidth: '1000px' }}>
        <RevealOnScroll>
          <div style={{ marginBottom: '16px' }}>
            <Link href="/#casestudies" className="btn-wrapper" data-text="Back">
              <i className="ri-arrow-left-line" />
              <h4>Back to Projects</h4>
            </Link>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div style={{ marginBottom: '48px' }}>
            <h4 style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Casestudy 03</h4>
            <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300, lineHeight: 1.1, marginBottom: '12px' }}>Spendora</h1>
            <h3 style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text-secondary)' }}>Real-Time Financial Telemetry Dashboard</h3>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div style={{ display: 'flex', gap: '32px', marginBottom: '64px', flexWrap: 'wrap' }}>
            <div>
              <h5 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '8px' }}>TASKS</h5>
              <ul style={{ listStyle: 'none', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Next.js', 'PostgreSQL', 'Prisma', 'Clerk'].map(t => (
                  <li key={t} style={{ fontSize: '12px', padding: '4px 10px', border: '1px solid var(--border)', borderRadius: '16px', color: 'var(--text-secondary)' }}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>

        <div className="my-24 md:my-32">
          <RevealOnScroll>
            <div className="mb-24 md:mb-32">
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] mb-8 font-medium">The Vision</h2>
              <h3 className="text-[clamp(28px,4vw,48px)] font-light leading-[1.2] text-[var(--text)] tracking-tight max-w-4xl">
                Illuminating financial habits with <br className="hidden md:block"/>
                <span className="text-[var(--text-secondary)]">real-time predictive telemetry.</span>
              </h3>
              <p className="mt-8 text-[16px] md:text-[18px] leading-[1.8] text-[var(--text-secondary)] max-w-2xl">
                Spendora is a Real-Time Financial Telemetry Dashboard providing unparalleled visibility into personal and enterprise spending behaviors. Moving beyond static budgets, Spendora uses machine learning to categorize transactions, forecast future cash flows, and alert users to anomalous patterns instantly.
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pt-16 border-t border-[var(--border)] mb-24 md:mb-32">
            <div className="md:col-span-4">
              <RevealOnScroll>
                <h4 className="text-[13px] uppercase tracking-[0.2em] text-[var(--text)] font-medium">Core Capabilities</h4>
              </RevealOnScroll>
            </div>
            <div className="md:col-span-8">
              <ul className="space-y-16">
                <RevealOnScroll>
                  <li className="group">
                    <h5 className="text-[clamp(24px,3vw,32px)] font-light text-[var(--text)] mb-4 tracking-tight transition-colors">Algorithmic Categorization</h5>
                    <p className="text-[15px] md:text-[16px] leading-relaxed text-[var(--text-secondary)] max-w-xl">
                      Automatically sorts inbound and outbound transactions with 98% programmatic accuracy using historical bank data and ML clustering.
                    </p>
                  </li>
                </RevealOnScroll>
                <RevealOnScroll>
                  <li className="group">
                    <h5 className="text-[clamp(24px,3vw,32px)] font-light text-[var(--text)] mb-4 tracking-tight transition-colors">Predictive Forecasting</h5>
                    <p className="text-[15px] md:text-[16px] leading-relaxed text-[var(--text-secondary)] max-w-xl">
                      Projects end-of-month balances and cash flow trajectories by factoring in recurring subscriptions and historical burn rates.
                    </p>
                  </li>
                </RevealOnScroll>
                <RevealOnScroll>
                  <li className="group">
                    <h5 className="text-[clamp(24px,3vw,32px)] font-light text-[var(--text)] mb-4 tracking-tight transition-colors">Interactive Visualizations</h5>
                    <p className="text-[15px] md:text-[16px] leading-relaxed text-[var(--text-secondary)] max-w-xl">
                      Clean, highly responsive metric charts enabling fluid deep-dives into spending behaviors across custom dimensions and timeframes.
                    </p>
                  </li>
                </RevealOnScroll>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pt-16 border-t border-[var(--border)]">
            <div className="md:col-span-4">
              <RevealOnScroll>
                <h4 className="text-[13px] uppercase tracking-[0.2em] text-[var(--text)] font-medium">Architecture</h4>
              </RevealOnScroll>
            </div>
            <div className="md:col-span-8">
              <RevealOnScroll>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-8">
                  <div>
                    <span className="block text-[clamp(20px,2vw,24px)] font-light text-[var(--text)] mb-2">Next.js</span>
                    <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.1em]">Reactive UI</span>
                  </div>
                  <div>
                    <span className="block text-[clamp(20px,2vw,24px)] font-light text-[var(--text)] mb-2">PostgreSQL</span>
                    <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.1em]">Data Core</span>
                  </div>
                  <div>
                    <span className="block text-[clamp(20px,2vw,24px)] font-light text-[var(--text)] mb-2">Prisma</span>
                    <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.1em]">Safe ORM</span>
                  </div>
                  <div>
                    <span className="block text-[clamp(20px,2vw,24px)] font-light text-[var(--text)] mb-2">Clerk</span>
                    <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.1em]">Auth Provider</span>
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
