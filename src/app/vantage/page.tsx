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
            <h4 className="text-[10px] text-[var(--muted)] tracking-[0.1em] uppercase mb-2">Casestudy 04</h4>
            <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-light leading-[1.1] mb-2">Vantage</h1>
            <h3 className="text-[12px] md:text-[14px] font-normal text-[var(--text-secondary)]">AI-Driven E-commerce Data Analytics</h3>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="flex gap-4 mb-8 flex-wrap">
            <div>
              <h5 className="text-[10px] font-semibold tracking-[0.08em] text-[var(--muted)] mb-2 uppercase">TASKS</h5>
              <ul className="list-none flex gap-2 flex-wrap">
                {['Vue.js', 'Go', 'Redis', 'Kubernetes'].map(t => (
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
                Unifying millions of retail records into <br className="hidden md:block"/>
                <span className="text-[var(--text-secondary)]">instant analytical insights.</span>
              </h3>
              <p className="mt-4 text-[13px] md:text-[14px] leading-[1.8] text-[var(--text-secondary)] max-w-2xl">
                Vantage is an end-to-end ELT pipeline processing over 1M+ rows of retail data. Built to handle immense transactional scale, it dynamically synthesizes vendor relationships and raw procurement metrics into high-speed predictive aggregations.
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
                    <h5 className="text-[clamp(16px,2vw,24px)] font-light text-[var(--text)] mb-2 tracking-tight">Demand Forecasting</h5>
                    <p className="text-[13px] md:text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-2xl">
                      Leveraging historical sales data and market trends to predict future product demand with high accuracy, optimizing inventory levels.
                    </p>
                  </li>
                </RevealOnScroll>
                <RevealOnScroll>
                  <li className="group">
                    <h5 className="text-[clamp(16px,2vw,24px)] font-light text-[var(--text)] mb-2 tracking-tight">Customer Segmentation</h5>
                    <p className="text-[13px] md:text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-2xl">
                      Clustering customers based on purchasing behavior and preferences to enable highly personalized marketing strategies and campaigns.
                    </p>
                  </li>
                </RevealOnScroll>
                <RevealOnScroll>
                  <li className="group">
                    <h5 className="text-[clamp(16px,2vw,24px)] font-light text-[var(--text)] mb-2 tracking-tight">Inventory Optimization</h5>
                    <p className="text-[13px] md:text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-2xl">
                      Reducing stockouts and overstocking through automated reorder points and intelligent supply chain notifications.
                    </p>
                  </li>
                </RevealOnScroll>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-6 border-t border-[var(--border)]">
            <div className="md:col-span-4">
              <RevealOnScroll>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] font-medium">Architecture</h4>
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
