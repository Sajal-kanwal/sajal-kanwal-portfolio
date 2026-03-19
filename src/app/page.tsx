'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import Footer from '@/components/layout/Footer';
import GoTopButton from '@/components/layout/GoTopButton';
import SkillsSection from '@/components/sections/SkillsSection';
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
              <Link href="/about" className="hover-trigger relative inline-block group" data-text="Beep Beep">
                <svg width="120" height="40" viewBox="0 0 180 60" fill="var(--text)" xmlns="http://www.w3.org/2000/svg" className="block relative z-10 transition-colors duration-300">
                  <rect x="0" y="0" width="4" height="60" />
                  <rect x="6" y="0" width="2" height="60" />
                  <rect x="10" y="0" width="6" height="60" />
                  <rect x="18" y="0" width="2" height="60" />
                  <rect x="22" y="0" width="8" height="60" />
                  <rect x="33" y="0" width="3" height="60" />
                  <rect x="38" y="0" width="1" height="60" />
                  <rect x="41" y="0" width="5" height="60" />
                  <rect x="48" y="0" width="3" height="60" />
                  <rect x="54" y="0" width="7" height="60" />
                  <rect x="64" y="0" width="2" height="60" />
                  <rect x="68" y="0" width="4" height="60" />
                  <rect x="74" y="0" width="6" height="60" />
                  <rect x="82" y="0" width="1" height="60" />
                  <rect x="85" y="0" width="3" height="60" />
                  <rect x="90" y="0" width="8" height="60" />
                  <rect x="101" y="0" width="2" height="60" />
                  <rect x="105" y="0" width="5" height="60" />
                  <rect x="112" y="0" width="3" height="60" />
                  <rect x="117" y="0" width="6" height="60" />
                  <rect x="125" y="0" width="1" height="60" />
                  <rect x="128" y="0" width="4" height="60" />
                  <rect x="134" y="0" width="7" height="60" />
                  <rect x="143" y="0" width="3" height="60" />
                  <rect x="148" y="0" width="2" height="60" />
                  <rect x="152" y="0" width="5" height="60" />
                  <rect x="159" y="0" width="4" height="60" />
                  <rect x="165" y="0" width="2" height="60" />
                  <rect x="169" y="0" width="6" height="60" />
                  <rect x="177" y="0" width="3" height="60" />
                </svg>
                <div className="absolute top-1/2 left-0 w-full h-[15%] bg-[#e31f1f] -translate-y-1/2 scale-x-110 opacity-100 transition-transform duration-500 ease-out z-20 pointer-events-none group-hover:scale-x-125"></div>
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
                  {/* <div className="about-label-circle"></div> */}
                </div>

                <div className="about-content">
                  <RevealOnScroll>
                    <h3 className="about-text">
                      Hello, I&apos;m Sajal, a Full-Stack AI Engineer based in Dharamshala.{' '}
                      <span>
                        I build intelligent multi-agent systems and highly scalable SaaS architectures, specializing in LLM integration and real-time backend infrastructure.
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
                      {/* <a href={SOCIAL_LINKS.instagram} target="_blank" className="social-pill hover-trigger" data-text="Instagram">
                        <span>Instagram</span>
                        <i className="ri-arrow-right-line" />
                      </a> */}
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
          <div id="skills">
            <SkillsSection />
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
                      <div className="hero-top-call-btn" data-text="Get in Touch">
                        <a className="ft-credit-call-each" href={SOCIAL_LINKS.calendly} target="_blank">
                          <h4>Get in Touch</h4>
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
