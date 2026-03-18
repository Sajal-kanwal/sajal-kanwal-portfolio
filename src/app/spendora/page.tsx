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
  const images = [
    '/images/lightsofseoul/lightofseoul_thumbnail_520h.jpg',
    '/images/lightsofseoul/Lights_of_Seoul_Banner01.jpg',
    '/images/lightsofseoul/Lights_of_Seoul_Banner02.jpg',
    '/images/lightsofseoul/Flag01.jpg',
    '/images/lightsofseoul/Flag02.jpg',
    '/images/lightsofseoul/ID01.jpg',
    '/images/lightsofseoul/ID02.jpg',
    '/images/lightsofseoul/Tickets01_ASetof3.jpg',
    '/images/lightsofseoul/Digital_Ticket01.jpg',
    '/images/lightsofseoul/Digital_Laptop01.jpg',
    '/images/lightsofseoul/Digital_MobilePhone.jpg',
    '/images/lightsofseoul/Wayfinding01.jpg',
    '/images/lightsofseoul/Wayfinding02.jpg',
    '/images/lightsofseoul/Wayfinding03.jpg',
    '/images/lightsofseoul/Wayfinding04.jpg',
    '/images/lightsofseoul/Lights_of_Seoul_Truck01.jpg',
    '/images/lightsofseoul/PaperBag01.jpg',
    '/images/lightsofseoul/ToteBag01.jpg',
    '/images/lightsofseoul/Revision_Mockups03.jpg',
    '/images/lightsofseoul/Revision_Mockups04.jpg',
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {images.map((img, i) => (
            <RevealOnScroll key={i}>
              <img src={img} alt={`Lights of Seoul ${i + 1}`} loading="lazy" style={{ width: '100%', borderRadius: '8px' }} />
            </RevealOnScroll>
          ))}

          <RevealOnScroll>
            <video src="/videos/lightsofseoul_visualdirection01.mp4" autoPlay muted loop playsInline style={{ width: '100%', borderRadius: '8px' }} />
          </RevealOnScroll>
          <RevealOnScroll>
            <video src="/videos/lightsofseoul_wayfinding01.mp4" autoPlay muted loop playsInline style={{ width: '100%', borderRadius: '8px' }} />
          </RevealOnScroll>
        </div>

        <GoTopButton />
      </div>
      <Footer />
    </section>
  );
}
