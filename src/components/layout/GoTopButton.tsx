'use client';

import { useEffect, useState, useCallback } from 'react';

export default function GoTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    toggle();
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className={`gotop-btn ${visible ? 'is-visible' : ''}`} data-text="Go to Top">
      <button onClick={scrollToTop}>
        <i className="ri-arrow-up-line" />
        <span>Go to Top</span>
      </button>
    </div>
  );
}
