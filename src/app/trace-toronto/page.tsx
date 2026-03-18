import RevealOnScroll from '@/components/shared/RevealOnScroll';
import Footer from '@/components/layout/Footer';
import GoTopButton from '@/components/layout/GoTopButton';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trace Toronto — Sajal Kanwal',
  description: 'Brand Identity & UX/UI App case study by Sajal Kanwal',
};

export default function TraceTorontoPage() {
  const images = [
    '/images/tracetoronto/tracetoronto-logo.jpg',
    '/images/tracetoronto/tracetoronto-logo-space.jpg',
    '/images/tracetoronto/tracetoronto-banner01.jpg',
    '/images/tracetoronto/tracetoronto-banner02.jpg',
    '/images/tracetoronto/tracetoronto-banner03.jpg',
    '/images/tracetoronto/tracetoronto-banner04.jpg',
    '/images/tracetoronto/tracetoronto-banner05.jpg',
    '/images/tracetoronto/tracetoronto-app01.jpg',
    '/images/tracetoronto/tracetoronto-app02.jpg',
    '/images/tracetoronto/tracetoronto-app03.jpg',
    '/images/tracetoronto/tracetoronto-appstore01.jpg',
    '/images/tracetoronto/tracetoronto-appstore02.jpg',
    '/images/tracetoronto/tracetoronto-mac01.jpg',
    '/images/tracetoronto/tracetoronto-mac02.jpg',
    '/images/tracetoronto/tracetoronto-cap01.jpg',
    '/images/tracetoronto/tracetoronto-envelope01.jpg',
    '/images/tracetoronto/tracetoronto-file01.jpg',
    '/images/tracetoronto/tracetoronto-casestudy01.jpg',
    '/images/tracetoronto/tracetoronto-casestudy02.jpg',
    '/images/tracetoronto/tracetoronto-casestudy03.jpg',
    '/images/tracetoronto/tracetoronto-casestudy04.jpg',
  ];

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
            <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300, lineHeight: 1.1, marginBottom: '12px' }}>Trace Toronto</h1>
            <h3 style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text-secondary)' }}>Brand Identity &amp; UX/UI (App)</h3>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div style={{ display: 'flex', gap: '32px', marginBottom: '64px', flexWrap: 'wrap' }}>
            <div>
              <h5 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '8px' }}>TASKS</h5>
              <ul style={{ listStyle: 'none', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['UX Research & Strategy', 'Information Architecture', 'UI Design', 'Brand Identity'].map(t => (
                  <li key={t} style={{ fontSize: '12px', padding: '4px 10px', border: '1px solid var(--border)', borderRadius: '16px', color: 'var(--text-secondary)' }}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {images.map((img, i) => (
            <RevealOnScroll key={i}>
              <img src={img} alt={`Trace Toronto ${i + 1}`} loading="lazy" style={{ width: '100%', borderRadius: '8px' }} />
            </RevealOnScroll>
          ))}
        </div>

        <GoTopButton />
      </div>
      <Footer />
    </section>
  );
}
