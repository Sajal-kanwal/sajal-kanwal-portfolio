import RevealOnScroll from '@/components/shared/RevealOnScroll';
import Footer from '@/components/layout/Footer';
import GoTopButton from '@/components/layout/GoTopButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Sajal Kanwal',
  description: 'About Sajal Kanwal, a software engineer focused on AI systems.',
};

export default function AboutPage() {
  return (
    <section id="page-about" className="about-section" data-page-section="about">
      <div className="about-container">
        {/* ABOUT HERO */}
        <div className="about-container-myself">
          <div className="about-myself-wrapper">
            <RevealOnScroll>
              <div className="about-myself">
                <div className="about-myself-title">
                  <div className="about-title-highlight">
                    <h2>About.</h2>
                    <div className="point-colour-box" />
                  </div>
                </div>
                <h3>I am Sajal, a Full-Stack AI Engineer based in Dharamshala, building intelligent applications and robust scalable systems.</h3>
              </div>
            </RevealOnScroll>

            <div className="about-myself-details">
              <RevealOnScroll>
                <div className="about-myself-details-each">
                  <h2>Focusing on</h2>
                  <ul>
                    <li>AI Engineering</li>
                    <li>Full-Stack Development</li>
                    <li>SaaS Architecture</li>
                  </ul>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="about-myself-details-each">
                  <h2>Knowledge of</h2>
                  <ul>
                    <li>Python &amp; TypeScript</li>
                    <li>LLM &amp; RAG Integration</li>
                  </ul>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          <div className="about-myself-desc-wrapper">
            <RevealOnScroll>
              <div className="about-myself-desc-names">
                <h3>My name is</h3>
                <ul>
                  <li>Sajal Kanwal</li>
                </ul>
              </div>
            </RevealOnScroll>

            <div className="about-myself-desc">
              <RevealOnScroll>
                <div className="about-profile-img">
                  <img src="/images/profile/man.png" alt="Sajal Kanwal" loading="lazy" />
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="about-myself-desc-text">
                  <p>
                    Hi, I&apos;m Sajal Kanwal. I am a Full-Stack AI Engineer with expertise in building real-time interactive dashboards and intelligent multi-agent systems. My practice is rooted in robust back-end architecture and highly performant front-end experiences. 
                  </p>
                  <p className="mt-4">
                    I currently focus on LLM integrations, modern React architectures (Next.js 14/15), and complex database optimisations. Right now, I am pursuing my B.Tech in Computer Science &amp; Engineering with a specialization in Data Science &amp; ML at Lovely Professional University.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>

        <RevealOnScroll><div className="line" /></RevealOnScroll>

        {/* EDUCATION */}
        <div className="about-container-details">
          <RevealOnScroll>
            <div className="about-details-left">
              <h3>Education</h3>
              <h4>in Computer Science.</h4>
            </div>
          </RevealOnScroll>

          <ul>
            <div className="about-details-right">
              <RevealOnScroll><h3>Degrees</h3></RevealOnScroll>
              <RevealOnScroll>
                <li>
                  <h4>Bachelor of Technology in Computer Science &amp; Engineering</h4>
                  <div className="about-each-detail-content">
                    <h5>2023 Aug - Present (CGPA: 8.55)</h5>
                    <h6>Lovely Professional University, Phagwara, Punjab</h6>
                  </div>
                </li>
              </RevealOnScroll>
            </div>
          </ul>
        </div>

        <RevealOnScroll><div className="line" /></RevealOnScroll>

        {/* WORK EXPERIENCE */}
        <div className="about-container-details">
          <RevealOnScroll>
            <div className="about-details-left">
              <h3>Featured Projects</h3>
              <h4>in Full-Stack, AI, &amp; Cloud.</h4>
            </div>
          </RevealOnScroll>

          <ul>
            <RevealOnScroll>
              <div className="about-details-right">
                <h3>Repo Lens</h3>
                <ul>
                  <li>
                    <h4>AI-Powered GitHub Collaboration SaaS</h4>
                    <div className="about-each-detail-content">
                      <h5>Independent Project</h5>
                      <h6>2026 March</h6>
                    </div>
                  </li>
                  <li>
                    <h4 className="italic">Stack — Next.js 15, PostgreSQL, LangChain, tRPC</h4>
                    <div className="about-each-detail-content">
                      <h6>Full-Stack</h6>
                    </div>
                  </li>
                </ul>
              </div>
            </RevealOnScroll>

            <RevealOnScroll><div className="line" /></RevealOnScroll>

            <RevealOnScroll>
              <div className="about-details-right">
                <h3>Sentinel</h3>
                <ul>
                  <li>
                    <h4>Autonomous AI Content Intelligence System</h4>
                    <div className="about-each-detail-content">
                      <h5>Independent Project</h5>
                      <h6>2026 January</h6>
                    </div>
                  </li>
                  <li>
                    <h4 className="italic">Stack — Python, OpenAI API, Docker, PostgreSQL</h4>
                    <div className="about-each-detail-content">
                      <h6>AI Engineering</h6>
                    </div>
                  </li>
                </ul>
              </div>
            </RevealOnScroll>

            <RevealOnScroll><div className="line" /></RevealOnScroll>

            <RevealOnScroll>
              <div className="about-details-right">
                <h3>Spendora</h3>
                <li>
                  <h4>Real-Time Financial Telemetry Dashboard</h4>
                  <div className="about-each-detail-content">
                    <h5>Independent Project</h5>
                    <h6>2025 July</h6>
                  </div>
                </li>
                <li>
                  <h4 className="italic">Stack — Next.js 14, PostgreSQL, Prisma, Clerk, Zod</h4>
                  <div className="about-each-detail-content">
                    <h6>Full-Stack</h6>
                  </div>
                </li>
              </div>
            </RevealOnScroll>
          </ul>
        </div>

        <RevealOnScroll><div className="line" /></RevealOnScroll>

        {/* EXHIBITIONS */}
        <div className="about-container-details">
          <RevealOnScroll>
            <div className="about-details-left">
              <h3>Certifications</h3>
              <h4>&amp; Achievements.</h4>
            </div>
          </RevealOnScroll>

          <ul>
            <RevealOnScroll>
              <div className="about-details-right">
                <h3>Oracle Cloud Infrastructure 2025</h3>
                <li>
                  <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=24B6EEDC87B3DE0A9A6F571F80A4EFA673B015501A9C507F9F1198EB0E27D2BB" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 w-fit cursor-none hover-trigger" data-text="Verify">
                    <h4 className="group-hover:text-[var(--text)] transition-colors duration-300">Certified Developer Professional</h4>
                    <i className="ri-external-link-line text-[16px] md:text-[18px] opacity-40 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2" />
                  </a>
                  <div className="about-each-detail-content">
                    <h5>Oracle</h5>
                    <h6>2025 November</h6>
                  </div>
                </li>
              </div>
            </RevealOnScroll>

            <RevealOnScroll><div className="line" /></RevealOnScroll>

            <RevealOnScroll>
              <div className="about-details-right">
                <h3>Oracle Cloud Infrastructure 2025</h3>
                <li>
                  <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=CC0A083BB7FACCD92C6EAB833B7C57D89C9682E1CBA3731039652EF707B66611" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 w-fit cursor-none hover-trigger" data-text="Verify">
                    <h4 className="group-hover:text-[var(--text)] transition-colors duration-300">Certified Generative AI Professional</h4>
                    <i className="ri-external-link-line text-[16px] md:text-[18px] opacity-40 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2" />
                  </a>
                  <div className="about-each-detail-content">
                    <h5>Oracle</h5>
                    <h6>2025 October</h6>
                  </div>
                </li>
                
                <li className="mt-8 md:mt-12">
                  <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=6202688841B06EDEA270F3814B2DA92FA06B01ADE2E41DD8035849A9476FFF1E" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 w-fit cursor-none hover-trigger" data-text="Verify">
                    <h4 className="group-hover:text-[var(--text)] transition-colors duration-300">Certified AI Foundations Associate</h4>
                    <i className="ri-external-link-line text-[16px] md:text-[18px] opacity-40 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2" />
                  </a>
                  <div className="about-each-detail-content">
                    <h5>Oracle</h5>
                    <h6>2025 October</h6>
                  </div>
                </li>
              </div>
            </RevealOnScroll>

            <RevealOnScroll><div className="line" /></RevealOnScroll>

            <RevealOnScroll>
              <div className="about-details-right">
                <h3>GeeksforGeeks Hack the Future</h3>
                <li>
                  <h4>Top 50 — Local RAG Pipeline Optimization</h4>
                  <div className="about-each-detail-content">
                    <h5>GeeksforGeeks</h5>
                    <h6>2025 April</h6>
                  </div>
                </li>
              </div>
            </RevealOnScroll>
          </ul>
        </div>

        <GoTopButton />
      </div>

      <Footer />
    </section>
  );
}
