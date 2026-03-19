'use client';

import { useRef, ElementType, HTMLAttributes } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticWrapperProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode; 
  className?: string;
  strength?: number;
  as?: ElementType;
}

export default function MagneticWrapper({ 
  children, 
  className = '',
  strength = 0.35,
  as: Component = 'div',
  ...props
}: MagneticWrapperProps) {
  const magnetic = useRef<any>(null);

  useGSAP(() => {
    const xTo = gsap.quickTo(magnetic.current, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(magnetic.current, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetic.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    magnetic.current?.addEventListener('mousemove', handleMouseMove);
    magnetic.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      magnetic.current?.removeEventListener('mousemove', handleMouseMove);
      magnetic.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: magnetic });

  return (
    <Component ref={magnetic} className={`inline-flex ${className}`} {...props}>
      {children}
    </Component>
  );
}
