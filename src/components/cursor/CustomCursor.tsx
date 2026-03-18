'use client';

import { useEffect, useRef, useCallback } from 'react';
import { lerp } from '@/lib/utils';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ cursorX: 0, cursorY: 0, currentX: 0, currentY: 0 });
  const textRef = useRef('');
  const rafRef = useRef<number>(0);

  const animateCursor = useCallback(() => {
    const pos = posRef.current;
    const cursor = cursorRef.current;
    if (!cursor) return;

    pos.currentX = lerp(pos.currentX, pos.cursorX, 0.15);
    pos.currentY = lerp(pos.currentY, pos.cursorY, 0.15);
    cursor.style.transform = `translate(calc(-50% + ${pos.currentX}px), calc(-50% + ${pos.currentY}px))`;
    rafRef.current = requestAnimationFrame(animateCursor);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.display = 'flex';
      posRef.current.cursorX = e.clientX;
      posRef.current.cursorY = e.clientY;
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const dataTextEl = target.closest('[data-text]') as HTMLElement | null;
      const text = dataTextEl?.dataset.text || '';
      textRef.current = text;
      
      if (cursor) {
        cursor.textContent = text;
        cursor.classList.add('expanded');
      }
    };

    const onMouseLeave = () => {
      textRef.current = '';
      if (cursor) {
        cursor.textContent = '';
        cursor.classList.remove('expanded');
      }
    };

    const onClick = () => {
      if (cursor) {
        cursor.style.transform += ' scale(0.9)';
        setTimeout(() => {
          if (cursor) {
            cursor.style.transform = cursor.style.transform.replace(' scale(0.9)', '');
          }
        }, 80);
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const setupHoverTargets = () => {
      const targets = document.querySelectorAll('a, button, label, i, .hover-trigger, [data-text]');
      targets.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter as EventListener);
        el.addEventListener('mouseleave', onMouseLeave);
        el.addEventListener('click', onClick);
      });
      return targets;
    };

    const targets = setupHoverTargets();
    rafRef.current = requestAnimationFrame(animateCursor);

    // Re-setup on DOM changes
    const observer = new MutationObserver(() => {
      setupHoverTargets();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter as EventListener);
        el.removeEventListener('mouseleave', onMouseLeave);
        el.removeEventListener('click', onClick);
      });
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [animateCursor]);

  return <div id="mouse_cursor" ref={cursorRef}><span className="cursor-blur" /></div>;
}
