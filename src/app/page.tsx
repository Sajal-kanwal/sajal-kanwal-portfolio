'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import Footer from '@/components/layout/Footer';
import GoTopButton from '@/components/layout/GoTopButton';
import { CASE_STUDIES, EXPERIENCES, SOCIAL_LINKS } from '@/lib/constants';
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

          {/* Sharp thumbnail container */}
          <div className="cs-fullpage-thumb-container">
            <div className="cs-fullpage-thumb-base">
              <Image src={cs.baseImage} alt={cs.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 45vw" />
            </div>
            <div className="cs-fullpage-thumb-hover">
              <Image src={cs.hoverImage} alt={cs.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 45vw" />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

/* ============================
   HOMEPAGE
============================ */
export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

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
              (©SAJAL<br />KANWAL — 2026)
            </h1>
            <p className="hero-landing-desc">
              I am a Full-Stack AI Engineer based in Dharamshala, building intelligent multi-agent systems and scalable real-time SaaS applications.
            </p>
            <div className="hero-landing-barcode">
              <Link href="/about" className="hover-trigger" data-text="Beep Beep">
                <img src="/images/profile/profile_barcode.png" alt="Barcode" />
              </Link>
              <span>Made in India</span>
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
                      <a href={SOCIAL_LINKS.github} target="_blank" className="social-pill hover-trigger" data-text="GitHub">
                        <span>GitHub</span>
                        <i className="ri-arrow-right-line" />
                      </a>
                      <a href={SOCIAL_LINKS.instagram} target="_blank" className="social-pill hover-trigger" data-text="Instagram">
                        <span>Instagram</span>
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
                          {exp.bullets && (
                            <ul className="mt-6 space-y-3 opacity80">
                              {exp.bullets.map((b, idx) => (
                                <li key={idx} className="text-[14px] leading-relaxed flex items-start gap-3">
                                  <span className="text-[var(--text-secondary)] mt-1">•</span>
                                  <span className="text-[var(--text)]">{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
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

          {/* SKILLS */}
          <div className="hero-extra" id="skills">
            <div className="hero-extra-box">
              <div className="hero-casestudy-title hero-top-intro-para-moreworks-box">
                <RevealOnScroll>
                  <div className="section-indicators-project">
                    <h3><span>Skills</span></h3>
                  </div>
                </RevealOnScroll>

                <div className="hero-top-intro-para w-full flex-col">
                  <RevealOnScroll>
                    <div className="hero-top-intro-para-title w-full">
                      <h3>Technical Arsenal.</h3>
                      <h4 className="mt-2" style={{ color: 'var(--text-secondary)' }}>Languages, Frameworks, and Cloud Architecture.</h4>
                    </div>
                  </RevealOnScroll>
                </div>
              </div>

              <div className="skills-grid mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 lg:px-44 px-4 w-full">
                <RevealOnScroll>
                  <div className="skill-category">
                    <h4 className="text-[18px] mb-4" style={{ color: 'var(--text)' }}>Languages &amp; DBs</h4>
                    <ul className="text-[14px] space-y-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <li>Python, TypeScript, JS (ES6+)</li>
                      <li>Java</li>
                      <li>PostgreSQL, MySQL</li>
                    </ul>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll>
                  <div className="skill-category">
                    <h4 className="text-[18px] mb-4" style={{ color: 'var(--text)' }}>Frontend &amp; UI</h4>
                    <ul className="text-[14px] space-y-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <li>React.js, Next.js 14/15</li>
                      <li>React Query, Zustand</li>
                      <li>Tailwind CSS, Recharts</li>
                    </ul>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll>
                  <div className="skill-category">
                    <h4 className="text-[18px] mb-4" style={{ color: 'var(--text)' }}>Backend &amp; API</h4>
                    <ul className="text-[14px] space-y-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <li>Node.js, REST APIs</li>
                      <li>Prisma ORM, SQLAlchemy</li>
                      <li>tRPC</li>
                    </ul>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll>
                  <div className="skill-category">
                    <h4 className="text-[18px] mb-4" style={{ color: 'var(--text)' }}>AI Engineering</h4>
                    <ul className="text-[14px] space-y-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <li>Multi-Agent Systems, LangChain</li>
                      <li>RAG Architecture, Semantic Search</li>
                      <li>Vector DBs, Vercel AI SDK</li>
                    </ul>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll>
                  <div className="skill-category">
                    <h4 className="text-[18px] mb-4" style={{ color: 'var(--text)' }}>DevOps &amp; Cloud</h4>
                    <ul className="text-[14px] space-y-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <li>Docker, Git/GitHub</li>
                      <li>Vercel, Stripe Webhooks</li>
                      <li>Clerk Auth, n8n Automation</li>
                    </ul>
                  </div>
                </RevealOnScroll>
              </div>
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
    </div>
  );
}
