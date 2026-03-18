import RevealOnScroll from '@/components/shared/RevealOnScroll';
import Footer from '@/components/layout/Footer';
import GoTopButton from '@/components/layout/GoTopButton';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Favric Expo — Sajal Kanwal',
  description: 'Brand Identity & Exhibition case study by Sajal Kanwal',
};

export default function TheFavricExpoPage() {
  const images = [
    '/images/thefavricexpo/thefabricexpo-logo-main.jpg',
    '/images/thefavricexpo/thefabricexpo-logo-green.jpg',
    '/images/thefavricexpo/thefabricexpo-logo-white.jpg',
    '/images/thefavricexpo/thefabricexpo-logo-clearspace.jpg',
    '/images/thefavricexpo/thefabricexpo-binder01.jpg',
    '/images/thefavricexpo/thefabricexpo-binder02.jpg',
    '/images/thefavricexpo/thefabricexpo-binder03.jpg',
    '/images/thefavricexpo/thefabricexpo-billboard01.jpg',
    '/images/thefavricexpo/thefabricexpo-billboard02.jpg',
    '/images/thefavricexpo/thefabricexpo-billboard03.jpg',
    '/images/thefavricexpo/thefabricexpo-posters01.jpg',
    '/images/thefavricexpo/thefabricexpo-totebag01.jpg',
    '/images/thefavricexpo/thefabricexpo-paperbag01.jpg',
    '/images/thefavricexpo/thefabricexpo-cap01.jpg',
    '/images/thefavricexpo/thefabricexpo-phone01.jpg',
    '/images/thefavricexpo/thefabricexpo-website01.jpg',
    '/images/thefavricexpo/thefabricexpo-misc01.jpg',
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
            <h4 style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Casestudy 01</h4>
            <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300, lineHeight: 1.1, marginBottom: '12px' }}>The Favric Expo</h1>
            <h3 style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text-secondary)' }}>Brand Identity &amp; Exhibition</h3>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div style={{ display: 'flex', gap: '32px', marginBottom: '64px', flexWrap: 'wrap' }}>
            <div>
              <h5 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '8px' }}>TASKS</h5>
              <ul style={{ listStyle: 'none', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Brand Identity', 'Concept Development', 'Exhibition/Expo'].map(t => (
                  <li key={t} style={{ fontSize: '12px', padding: '4px 10px', border: '1px solid var(--border)', borderRadius: '16px', color: 'var(--text-secondary)' }}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {images.map((img, i) => (
            <RevealOnScroll key={i}>
              <img src={img} alt={`The Favric Expo ${i + 1}`} loading="lazy" style={{ width: '100%', borderRadius: '8px' }} />
            </RevealOnScroll>
          ))}
        </div>

        <GoTopButton />
      </div>
      <Footer />
    </section>
  );
}
