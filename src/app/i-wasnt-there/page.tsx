import RevealOnScroll from '@/components/shared/RevealOnScroll';
import Footer from '@/components/layout/Footer';
import GoTopButton from '@/components/layout/GoTopButton';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "I Wasn't There — Sajal Kanwal",
  description: 'Editorial case study by Sajal Kanwal',
};

export default function IWasntTherePage() {
  const images = [
    '/images/iwasntthere/iwasntthere_Cover01.jpg',
    '/images/iwasntthere/iwasntthere_ThreeBooks.jpg',
    '/images/iwasntthere/iwasntthere_Mockup01.jpg',
    '/images/iwasntthere/iwasntthere_Mockup02.jpg',
    '/images/iwasntthere/iwasntthere_Mockup03.jpg',
    '/images/iwasntthere/iwasntthere_Mockup04.jpg',
    '/images/iwasntthere/iwasntthere_Page02.jpg',
    '/images/iwasntthere/iwasntthere_Page06.jpg',
    '/images/iwasntthere/iwasntthere_Page10.jpg',
    '/images/iwasntthere/iwasntthere_grid_01.jpg',
    '/images/iwasntthere/iwasntthere_grid_04.jpg',
    '/images/iwasntthere/2025Dec_FirstBooklet_Page01.jpg',
    '/images/iwasntthere/2025Dec_FirstBooklet_Page02.jpg',
    '/images/iwasntthere/2025Dec_FirstBooklet_Page03.jpg',
    '/images/iwasntthere/2025Dec_FirstBooklet_Page04.jpg',
    '/images/iwasntthere/2025Dec_FirstBooklet_Page05.jpg',
    '/images/iwasntthere/2025Dec_FirstBooklet_Page06.jpg',
    '/images/iwasntthere/2025Dec_FirstBooklet_Page07.jpg',
    '/images/iwasntthere/2025Dec_FirstBooklet_Page08.jpg',
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
            <h4 style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Casestudy 05</h4>
            <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300, lineHeight: 1.1, marginBottom: '12px' }}>I Wasn&apos;t There</h1>
            <h3 style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text-secondary)' }}>Editorial</h3>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div style={{ display: 'flex', gap: '32px', marginBottom: '64px', flexWrap: 'wrap' }}>
            <div>
              <h5 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '8px' }}>TASKS</h5>
              <ul style={{ listStyle: 'none', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Concept Development', 'Literary Analysis', 'Editorial Design', 'Narrative Structuring'].map(t => (
                  <li key={t} style={{ fontSize: '12px', padding: '4px 10px', border: '1px solid var(--border)', borderRadius: '16px', color: 'var(--text-secondary)' }}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <RevealOnScroll>
            <video src="/videos/IWasn'tThere_thumbnail.mp4" autoPlay muted loop playsInline style={{ width: '100%', borderRadius: '8px' }} />
          </RevealOnScroll>

          {images.map((img, i) => (
            <RevealOnScroll key={i}>
              <img src={img} alt={`I Wasn't There ${i + 1}`} loading="lazy" style={{ width: '100%', borderRadius: '8px' }} />
            </RevealOnScroll>
          ))}
        </div>

        <GoTopButton />
      </div>
      <Footer />
    </section>
  );
}
