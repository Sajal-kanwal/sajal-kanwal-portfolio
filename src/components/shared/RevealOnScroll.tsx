'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

export default function RevealOnScroll({ children, className = '', threshold = 0.2 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    gsap.fromTo(ref.current, 
      { opacity: 0, y: 40 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none' // Play once and keep it
        }
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={`reveal-wrapper ${className}`}>
      {children}
    </div>
  );
}
