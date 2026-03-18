'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SKILLS_DATA = [
  {
    category: 'AI Engineering',
    skills: ['Generative AI', 'LangChain & LlamaIndex', 'OpenAI / Anthropic APIs', 'PyTorch Ecosystem', 'HuggingFace', 'Pinecone Vector DB'],
  },
  {
    category: 'Frontend UI',
    skills: ['Next.js 14/15', 'React.js Architecture', 'TypeScript (Strict)', 'TailwindCSS', 'GSAP & Framer Motion', 'WebSockets / Real-Time'],
  },
  {
    category: 'Backend & Cloud',
    skills: ['Node.js Runtime', 'Python (FastAPI)', 'PostgreSQL / Prisma', 'Redis Caching', 'Docker Containerization', 'AWS Infrastructure'],
  }
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const rows = gsap.utils.toArray('.skill-row') as HTMLElement[];
    
    // Top-level border animation
    gsap.fromTo('.master-skill-border', 
      { scaleX: 0 }, 
      { 
        scaleX: 1, 
        duration: 1.5, 
        ease: 'expo.inOut', 
        transformOrigin: 'left center',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );

    // Row-by-row cascade
    rows.forEach((row) => {
      const title = row.querySelector('.skill-title');
      const pills = row.querySelectorAll('.skill-pill');
      const border = row.querySelector('.skill-border-bottom');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
        }
      });
      
      tl.fromTo(border, 
          { scaleX: 0 }, 
          { scaleX: 1, duration: 1.2, ease: 'expo.inOut', transformOrigin: 'left center' }
        )
        .fromTo(title, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
          '-=0.8'
        )
        .fromTo(pills, 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power2.out' }, 
          '-=0.8'
        );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="skills-container w-full mt-24 mb-24 md:mt-32 md:mb-32 relative">
      <div className="mb-12 md:mb-16 flex justify-between items-end px-2">
         <h2 className="text-[12px] uppercase tracking-[0.3em] text-[var(--muted)] font-medium">Technical Arsenal</h2>
         <div className="hidden md:block text-[10px] text-[var(--text-secondary)] tracking-widest uppercase">Select Capabilities</div>
      </div>

      <div className="flex flex-col border-t border-[var(--border)] master-skill-border" style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}>
        {SKILLS_DATA.map((item, idx) => (
          <div key={idx} className="skill-row relative flex flex-col md:flex-row py-10 md:py-16 group">
            <div className="md:w-1/4 mb-6 md:mb-0">
              <h3 className="skill-title text-[13px] md:text-[14px] uppercase tracking-[0.2em] text-[var(--text)] font-semibold mt-2 opacity-0">
                {item.category}
              </h3>
            </div>
            <div className="md:w-3/4">
              <p className="text-[clamp(18px,2vw,32px)] font-light leading-[1.8] tracking-wide text-[var(--text-secondary)]">
                {item.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="inline-block">
                    <span 
                      className="skill-pill hover-trigger inline-block hover:text-[var(--text)] transition-colors duration-500 opacity-0" 
                      data-text={skill}
                    >
                      {skill}
                    </span>
                    {sIdx < item.skills.length - 1 && (
                      <span className="skill-pill inline-block mx-4 md:mx-6 text-[var(--border)] text-[0.8em] align-middle transform -translate-y-1 opacity-0">
                        —
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>
            <div className="skill-border-bottom absolute bottom-0 left-0 w-full h-[1px] bg-[var(--border)]" style={{ transform: 'scaleX(0)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
