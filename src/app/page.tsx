'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import Footer from '@/components/layout/Footer';
import GoTopButton from '@/components/layout/GoTopButton';
import { CASE_STUDIES, ARCHIVE_ITEMS, EXPERIENCES, SOCIAL_LINKS } from '@/lib/constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============================
   CASE STUDY CARD — Full Viewport with Blurred BG
============================ */
function CaseStudyCard({ cs }: { cs: typeof CASE_STUDIES[0] }) {
  return (
    <li className="cs-fullpage-slide" data-text="View Casestudy">
      <Link href={`/${cs.slug}`} className="cs-fullpage-link">
        {/* Blurred background */}
        <div className="cs-fullpage-bg">
          <Image src={cs.baseImage} alt="" fill style={{ objectFit: 'cover' }} sizes="100vw" priority />
        </div>
        <div className="cs-fullpage-overlay" />

        {/* Content */}
        <div className="cs-fullpage-content">
          <div className="cs-fullpage-info">
            <span className="cs-fullpage-number">{cs.number}</span>
            <h2 className="cs-fullpage-title">{cs.title}</h2>
            <p className="cs-fullpage-subtitle">{cs.subtitle}</p>

            <div className="cs-fullpage-tasks">
              <h5>TASKS</h5>
              <ul>
                {cs.tasks.map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>

            <div className="cs-fullpage-btn">
              <h4>View Project</h4>
              <span className="cs-fullpage-btn-arrow"><i className="ri-arrow-right-line" /></span>
            </div>
          </div>

          {/* Sharp thumbnail card */}
          <div className="cs-fullpage-thumb">
            <Image src={cs.hoverImage} alt={cs.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 45vw" />
          </div>
        </div>
      </Link>
    </li>
  );
}

/* ============================
   ARCHIVE ITEM
============================ */
function ArchiveListItem({ item, onClick }: { item: typeof ARCHIVE_ITEMS[0]; onClick: () => void }) {
  return (
    <RevealOnScroll>
      <li className="casestudy-each-list hover-trigger" data-text="View Work" onClick={onClick}>
        <div className="hero-more-projects-thumbnails">
          <div className="hero-more-projects-thumbnails-title">
            <h3>{item.title}</h3>
            <i className="ri-arrow-right-line" />
          </div>
          <div className="hero-more-projects-img">
            {item.images.slice(0, 1).map((img, i) => (
              <img key={i} src={img} alt={item.title} loading="lazy" />
            ))}
          </div>
        </div>
        <div className="hero-more-projects-text-details">
          <div className="hero-extra-works-text">
            <h4>{item.category}</h4>
            <h4>{item.year}</h4>
          </div>
        </div>
      </li>
    </RevealOnScroll>
  );
}

/* ============================
   ARCHIVE DETAIL
============================ */
function ArchiveDetail({ item, onBack }: { item: typeof ARCHIVE_ITEMS[0]; onBack: () => void }) {
  return (
    <div className="casestudy-container-archive">
      <div className="archive-details">
        <div className="archive-details-wrapper">
          <RevealOnScroll>
            <div className="archive-details-top">
              <h3>{item.title}</h3>
              <h4>{item.category}</h4>
              <h5>{item.date}</h5>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="archive-details-bottom">
              <div className="archive-details-bottom-roles">
                <h5>TASKS</h5>
                <ul>
                  {item.tasks.map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>

              {item.behanceUrl && (
                <div className="btn-wrapper hover-trigger" style={{ marginTop: '16px' }}>
                  <a href={item.behanceUrl} target="_blank" data-text="View Behance">
                    <h4>Behance</h4>
                    <i className="ri-arrow-right-line" />
                  </a>
                </div>
              )}
              {item.websiteUrl && (
                <div className="btn-wrapper hover-trigger" style={{ marginTop: '16px' }}>
                  <a href={item.websiteUrl} target="_blank" data-text="View Website">
                    <h4>Website</h4>
                    <i className="ri-arrow-right-line" />
                  </a>
                </div>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="archive-details-imgs">
        <ul className="archive-details-imgs-wrapper">
          {item.images.map((img, i) => (
            <li key={i}><img src={img} alt={`${item.title} ${i + 1}`} loading="lazy" /></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ============================
   HOMEPAGE
============================ */
export default function HomePage() {
  const [archiveView, setArchiveView] = useState<'list' | 'gallery'>('list');
  const [activeArchive, setActiveArchive] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const archiveSectionRef = useRef<HTMLDivElement>(null);

  const openArchive = useCallback((id: string) => {
    setActiveArchive(id);
    setTimeout(() => {
      archiveSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const closeArchive = useCallback(() => {
    setActiveArchive(null);
    document.getElementById('archives')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const activeItem = ARCHIVE_ITEMS.find(i => i.id === activeArchive);

  // Animate case study slides on scroll
  useGSAP(() => {
    const slides = gsap.utils.toArray('.cs-fullpage-slide');
    if (!slides.length) return;

    slides.forEach((slide: any) => {
      gsap.fromTo(slide,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: slide,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <section id="page-projects" className="hero-section" data-page-section="home">
        {/* HERO TOP — Full viewport with large title */}
        <div className="hero-landing">
          <div className="hero-landing-content">
            <h1 className="hero-landing-title">
              (©SAJAL<br/>KANWAL — 2026)
            </h1>
            <p className="hero-landing-desc">
              I am a Full-Stack AI Engineer based in Dharamshala, building intelligent multi-agent systems and scalable real-time SaaS applications.
            </p>
            <div className="hero-landing-barcode">
              <Link href="/about" className="hover-trigger" data-text="Beep Beep">
                <img src="/images/profile/profile_barcode.png" alt="Barcode" />
              </Link>
              <span>Made in India—Canada</span>
            </div>
          </div>
        </div>

        <div className="hero-middle">
          {/* ABOUT INTRO */}
          <div className="hero-extra">
            <div className="hero-extra-box">
              <div className="about-grid">
                <div className="about-label">
                  <span>About</span>
                  <div className="about-label-circle"></div>
                </div>

                <div className="about-content">
                  <RevealOnScroll>
                    <h3 className="about-text">
                      Hello, I&apos;m Sajal, a Full-Stack AI Engineer based in Dharamshala.{' '}
                      <span>
                        With expertise in building intelligent multi-agent systems and real-time interactive SaaS applications, I craft scalable architectures and responsive interfaces. I focus on LLM integration, complex database optimizations, and resilient web frameworks.
                      </span>
                    </h3>
                  </RevealOnScroll>

                  <RevealOnScroll>
                    <Link href="/about" className="btn-wrapper hover-trigger" data-text="Read More">
                      <h4>Read More</h4>
                      <i className="ri-arrow-right-line" />
                    </Link>
                  </RevealOnScroll>

                  <RevealOnScroll>
                    <div className="social-pills">
                      <a href={SOCIAL_LINKS.linkedin} target="_blank" className="social-pill hover-trigger" data-text="LinkedIn">
                        <span>LinkedIn</span>
                        <i className="ri-arrow-right-line" />
                      </a>
                      <a href={SOCIAL_LINKS.behance} target="_blank" className="social-pill hover-trigger" data-text="Behance">
                        <span>Behance</span>
                        <i className="ri-arrow-right-line" />
                      </a>
                      <a href={SOCIAL_LINKS.email} className="social-pill hover-trigger" data-text="Email">
                        <span>Get in Touch</span>
                        <i className="ri-arrow-right-line" />
                      </a>
                    </div>
                  </RevealOnScroll>
                </div>
              </div>
            </div>
          </div>

          {/* CASE STUDIES */}
          <div className="hero-extra hero-extra-black" id="casestudies">
            <div className="hero-extra-works-box-black">
              <ul className="work-gallery-each-box">
                {CASE_STUDIES.map(cs => (
                  <CaseStudyCard key={cs.slug} cs={cs} />
                ))}
              </ul>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="hero-extra">
            <div className="hero-extra-box">
              <div className="hero-extra-box-experience">
                <RevealOnScroll>
                  <div className="section-indicators-project">
                    <h3><span>Recent Experience</span></h3>
                  </div>
                </RevealOnScroll>

                <div className="hero-top-intro-para">
                  <RevealOnScroll>
                    <h3>Study. Continue. Experience.</h3>
                  </RevealOnScroll>

                  <RevealOnScroll>
                    <ul>
                      {EXPERIENCES.map((exp, i) => (
                        <li key={i}>
                          <span className="hero-top-intro-para-jobTitle">{exp.title}</span>
                          <div className="hero-top-intro-para-jobDetail">
                            <div className="hero-top-intro-para-jobRoles_Dates">
                              <span className="opacity60">{exp.type}</span>
                              <span className="opacity60">{exp.dates}</span>
                            </div>
                            <span className="hero-top-intro-para-jobLogo">
                              <div className="jobLogo_img">
                                <img src={exp.logoSrc} alt={exp.company} loading="lazy" />
                              </div>
                              <div className="jobLogo_text">
                                <p>{exp.company}</p>
                                <p>{exp.location}</p>
                              </div>
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </RevealOnScroll>

                  <RevealOnScroll>
                    <div className="hero-extra-goOtherPage">
                      <Link href="/about" className="btn-wrapper" data-text="View More">
                        <h4>View More</h4>
                        <i className="ri-arrow-right-line" />
                      </Link>
                    </div>
                  </RevealOnScroll>
                </div>
              </div>
            </div>
          </div>

          {/* ARCHIVE */}
          <div className="hero-extra" id="archives">
            <RevealOnScroll>
              <div className="hero-extra-box">
                <div className="hero-casestudy-title hero-top-intro-para-moreworks-box">
                  <div className="section-indicators-project">
                    <h3><span>Archive</span></h3>
                  </div>

                  <div className="hero-top-intro-para">
                    <div className="hero-top-intro-para-title">
                      <h3>Keep Working.</h3>
                      <h4>2024—2026, and Keep Moving Forward.</h4>
                    </div>

                    <div className="works-view-toggle">
                      <button
                        className={archiveView === 'list' ? 'active' : ''}
                        onClick={() => setArchiveView('list')}
                        data-text="List"
                      >
                        <i className="ri-menu-fill" />
                      </button>
                      <button
                        className={archiveView === 'gallery' ? 'active' : ''}
                        onClick={() => setArchiveView('gallery')}
                        data-text="Gallery"
                      >
                        <i className="ri-mac-fill" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <div className={`hero-extra-works-box ${archiveView}`}>
              <ul>
                {ARCHIVE_ITEMS.map(item => (
                  <ArchiveListItem
                    key={item.id}
                    item={item}
                    onClick={() => openArchive(item.id)}
                  />
                ))}
              </ul>
            </div>
          </div>

          {/* CONTACT CTA */}
          <div className="hero-extra">
            <div className="hero-extra-box">
              <div className="hero-extra-box-contact">
                <RevealOnScroll>
                  <div className="section-indicators-project">
                    <h3><span>Contact</span></h3>
                  </div>
                </RevealOnScroll>

                <div className="hero-top-intro-para">
                  <div className="hero-top-intro-para-title-wrapper">
                    <div className="hero-top-intro-para-title">
                      <RevealOnScroll>
                        <h3>Let&apos;s Talk ツ゚</h3>
                        <p>Have a project in mind? Let&apos;s talk. Or just come say hi.</p>
                      </RevealOnScroll>
                    </div>

                    <RevealOnScroll>
                      <div className="hero-top-call-btn" data-text="Book a call">
                        <a className="ft-credit-call-each" href={SOCIAL_LINKS.calendly} target="_blank">
                          <h4>Book a Call</h4>
                          <i className="ri-arrow-right-line" />
                        </a>
                      </div>
                    </RevealOnScroll>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GO TOP */}
          <GoTopButton />
        </div>

        {/* FOOTER */}
        <Footer />
      </section>

      {/* ARCHIVE DETAIL SECTION */}
      <section
        ref={archiveSectionRef}
        id="page-archive"
        className={`archive-section ${activeArchive ? 'is-active' : ''}`}
      >
        <div className="goback-btn-wrapper">
          <button className="goback-btn" data-text="Back" onClick={closeArchive}>
            <i className="ri-arrow-left-line" />
            <h4>Go Back</h4>
          </button>
        </div>

        <div className="archive-container-wrapping-box">
          {activeItem && <ArchiveDetail item={activeItem} onBack={closeArchive} />}
        </div>
      </section>
    </div>
  );
}
