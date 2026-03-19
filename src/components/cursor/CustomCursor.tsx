'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import { lerp } from '@/lib/utils';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ cursorX: 0, cursorY: 0, currentX: 0, currentY: 0 });
  const textRef = useRef('');
  const rafRef = useRef<number>(0);
  const pathname = usePathname();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const resetCursor = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    textRef.current = '';
    cursor.textContent = '';
    cursor.classList.remove('expanded');
    cursor.style.opacity = '0';
  }, []);

  const animateCursor = useCallback(() => {
    const pos = posRef.current;
    const cursor = cursorRef.current;
    if (!cursor || isTouchDevice) return;

    pos.currentX = lerp(pos.currentX, pos.cursorX, 0.15);
    pos.currentY = lerp(pos.currentY, pos.cursorY, 0.15);
    cursor.style.transform = `translate(calc(-50% + ${pos.currentX}px), calc(-50% + ${pos.currentY}px))`;
    rafRef.current = requestAnimationFrame(animateCursor);
  }, [isTouchDevice]);

  // Reset on route change
  useEffect(() => {
    resetCursor();
  }, [pathname, resetCursor]);

  useEffect(() => {
    // Detection for touch devices
    const touchCheck = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    touchCheck();

    const cursor = cursorRef.current;
    if (!cursor || isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.display = 'flex';
      cursor.style.opacity = '1';
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
        cursor.classList.remove('expanded');
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
  }, [animateCursor, isTouchDevice, resetCursor]);

  if (isTouchDevice) return null;

  return <div id="mouse_cursor" ref={cursorRef} style={{ opacity: 0 }}><span className="cursor-blur" /></div>;
}
