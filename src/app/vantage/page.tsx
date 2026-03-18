import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import GoTopButton from '@/components/layout/GoTopButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vantage — Sajal Kanwal',
  description: 'Supply Chain Intelligence Pipeline',
};

export default function VantagePage() {
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
            <h4 style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Casestudy 04</h4>
            <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300, lineHeight: 1.1, marginBottom: '12px' }}>Vantage</h1>
            <h3 style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text-secondary)' }}>Supply Chain Intelligence Pipeline</h3>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div style={{ display: 'flex', gap: '32px', marginBottom: '64px', flexWrap: 'wrap' }}>
            <div>
              <h5 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '8px' }}>TASKS</h5>
              <ul style={{ listStyle: 'none', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Python', 'MySQL', 'SQLAlchemy', 'Pandas', 'NumPy'].map(t => (
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
                Unifying millions of retail records into <br className="hidden md:block"/>
                <span className="text-[var(--text-secondary)]">instant analytical insights.</span>
              </h3>
              <p className="mt-8 text-[16px] md:text-[18px] leading-[1.8] text-[var(--text-secondary)] max-w-2xl">
                Vantage is an end-to-end ELT pipeline processing over 1M+ rows of retail data. Built to handle immense transactional scale, it dynamically synthesizes vendor relationships and raw procurement metrics into high-speed predictive aggregations.
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
                    <h5 className="text-[clamp(24px,3vw,32px)] font-light text-[var(--text)] mb-4 tracking-tight transition-colors">High-Concurrency Processing</h5>
                    <p className="text-[15px] md:text-[16px] leading-relaxed text-[var(--text-secondary)] max-w-xl">
                      Utilizes sophisticated SQLAlchemy connection pooling to effortlessly manage thread-safe data flow and high-concurrency database writes without deadlock.
                    </p>
                  </li>
                </RevealOnScroll>
                <RevealOnScroll>
                  <li className="group">
                    <h5 className="text-[clamp(24px,3vw,32px)] font-light text-[var(--text)] mb-4 tracking-tight transition-colors">SQL-Level Aggregation</h5>
                    <p className="text-[15px] md:text-[16px] leading-relaxed text-[var(--text-secondary)] max-w-xl">
                      Abstracts complex logic to the <code>vendor_sales_summary</code> analytical shell, shrinking query fulfillment times from 15 minutes of heavy Python crunching to under 3 seconds.
                    </p>
                  </li>
                </RevealOnScroll>
                <RevealOnScroll>
                  <li className="group">
                    <h5 className="text-[clamp(24px,3vw,32px)] font-light text-[var(--text)] mb-4 tracking-tight transition-colors">Brand-Level Imputation</h5>
                    <p className="text-[15px] md:text-[16px] leading-relaxed text-[var(--text-secondary)] max-w-xl">
                      Executes statistical "Strong Imputation" logic by mapping median data structures, recovering 15% of records previously abandoned due to fragmented pricing metrics.
                    </p>
                  </li>
                </RevealOnScroll>
                <RevealOnScroll>
                  <li className="group">
                    <h5 className="text-[clamp(24px,3vw,32px)] font-light text-[var(--text)] mb-4 tracking-tight transition-colors">Margin ROI Extraction</h5>
                    <p className="text-[15px] md:text-[16px] leading-relaxed text-[var(--text-secondary)] max-w-xl">
                      Quantifies sweeping bulk-purchasing efficiencies, delivering structured insights capable of scaling down unit costs by 12% across global supply networks.
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
                    <span className="block text-[clamp(20px,2vw,24px)] font-light text-[var(--text)] mb-2">Python</span>
                    <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.1em]">Core Engine</span>
                  </div>
                  <div>
                    <span className="block text-[clamp(20px,2vw,24px)] font-light text-[var(--text)] mb-2">MySQL</span>
                    <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.1em]">Relational DB</span>
                  </div>
                  <div>
                    <span className="block text-[clamp(20px,2vw,24px)] font-light text-[var(--text)] mb-2">SQLAlchemy</span>
                    <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.1em]">Thread-safe ORM</span>
                  </div>
                  <div>
                    <span className="block text-[clamp(20px,2vw,24px)] font-light text-[var(--text)] mb-2">Pandas</span>
                    <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.1em]">Data Modeling</span>
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
