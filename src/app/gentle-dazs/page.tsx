import RevealOnScroll from '@/components/shared/RevealOnScroll';
import Footer from '@/components/layout/Footer';
import GoTopButton from '@/components/layout/GoTopButton';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gentle Dazs — Sajal Kanwal',
  description: 'Brand Identity & Packaging case study by Sajal Kanwal',
};

export default function GentleDazsPage() {
  const images = [
    '/images/gentledazs/GentleDazs_Thumbnail.jpg',
    '/images/gentledazs/GentleDazs_Logo.jpg',
    '/images/gentledazs/GentleDazs_Packages_01.jpg',
    '/images/gentledazs/GentleDazs_Packages_02.jpg',
    '/images/gentledazs/GentleDazs_Packages_03.jpg',
    '/images/gentledazs/GentleDazs_Packages_04.jpg',
    '/images/gentledazs/GentleDazs_Packages_06.jpg',
    '/images/gentledazs/GentleDazs_Packages_07.jpg',
    '/images/gentledazs/GentleDazs_Packages_08.jpg',
    '/images/gentledazs/GentleDazs_Packages_09.jpg',
    '/images/gentledazs/GentleDazs_Packages_10.jpg',
    '/images/gentledazs/GentleDazs_Packages_11.jpg',
    '/images/gentledazs/GentleDazs_Packages_12.jpg',
    '/images/gentledazs/GentleDazs_Packages_13.jpg',
    '/images/gentledazs/GentleDazs_Packages_14.jpg',
    '/images/gentledazs/GentleDazs_Poster01.jpg',
    '/images/gentledazs/SocialMedia04_Full.jpg',
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
            <h4 style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Casestudy 02</h4>
            <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 300, lineHeight: 1.1, marginBottom: '12px' }}>Gentle Dazs</h1>
            <h3 style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text-secondary)' }}>Brand Identity &amp; Packaging</h3>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div style={{ display: 'flex', gap: '32px', marginBottom: '64px', flexWrap: 'wrap' }}>
            <div>
              <h5 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '8px' }}>TASKS</h5>
              <ul style={{ listStyle: 'none', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Brand Research', 'Concept Development', 'Brand Identity', 'Packaging'].map(t => (
                  <li key={t} style={{ fontSize: '12px', padding: '4px 10px', border: '1px solid var(--border)', borderRadius: '16px', color: 'var(--text-secondary)' }}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {images.map((img, i) => (
            <RevealOnScroll key={i}>
              <img src={img} alt={`Gentle Dazs ${i + 1}`} loading="lazy" style={{ width: '100%', borderRadius: '8px' }} />
            </RevealOnScroll>
          ))}
        </div>

        <GoTopButton />
      </div>
      <Footer />
    </section>
  );
}
